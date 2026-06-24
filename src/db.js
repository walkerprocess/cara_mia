const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');
const ExcelJS = require('exceljs');
const { Pool } = require('pg');
const BetterSqlite3 = require('better-sqlite3');

const rootDir = path.resolve(__dirname, '..');
const databaseDir = path.join(rootDir, 'database');
const isPostgres = Boolean(process.env.DATABASE_URL);
const exportDir = path.join(databaseDir, 'exports');
const exportSnapshots =
  process.env.DB_EXPORTS === 'true' || (!isPostgres && process.env.DB_EXPORTS !== 'false');

let client;
let exportTimer = null;
let exportRunning = false;
let exportQueued = false;
const widgetTypeCheck = "type IN ('canvas', 'wordbox', 'music', 'sticker', 'gif')";
const exportColumns = {
  users: ['id', 'email', 'account_id', 'password_hash', 'email_verified', 'created_at'],
  exhibits: ['id', 'owner_user_id', 'title', 'created_at', 'updated_at'],
  exhibit_pages: ['id', 'exhibit_id', 'name', 'sort_order', 'created_at', 'updated_at'],
  widgets: ['id', 'exhibit_id', 'page_id', 'type', 'x', 'y', 'width', 'height', 'z_index', 'data', 'created_by', 'created_at', 'updated_at'],
  shares: ['id', 'exhibit_id', 'target_user_id', 'role', 'created_by', 'created_at']
};

function readSchema(fileName) {
  return fs.readFileSync(path.join(databaseDir, fileName), 'utf8');
}

function toPostgresPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

async function query(sql, params = []) {
  if (isPostgres) {
    return client.query(toPostgresPlaceholders(sql), params);
  }

  const trimmed = sql.trim().toLowerCase();
  if (trimmed.startsWith('select') || trimmed.startsWith('with') || trimmed.includes(' returning ')) {
    return { rows: client.prepare(sql).all(params) };
  }

  const result = client.prepare(sql).run(params);
  return { rows: [], rowCount: result.changes };
}

async function get(sql, params = []) {
  if (isPostgres) {
    const result = await query(sql, params);
    return result.rows[0] || null;
  }

  return client.prepare(sql).get(params) || null;
}

async function all(sql, params = []) {
  const result = await query(sql, params);
  return result.rows;
}

function normalizeWidget(row) {
  if (!row) return null;

  let data = row.data || {};
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data || '{}');
    } catch {
      data = {};
    }
  }

  return {
    ...row,
    page_id: row.page_id || null,
    x: Number(row.x),
    y: Number(row.y),
    width: Number(row.width),
    height: Number(row.height),
    z_index: Number(row.z_index),
    data
  };
}

function normalizePage(row) {
  if (!row) return null;
  return {
    id: row.id,
    exhibitId: row.exhibit_id,
    name: row.name,
    sortOrder: Number(row.sort_order),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    accountId: user.account_id,
    emailVerified: Boolean(user.email_verified)
  };
}

async function ensureDefaultExhibit(userId) {
  const existing = await get(
    'SELECT * FROM exhibits WHERE owner_user_id = ? ORDER BY created_at ASC LIMIT 1',
    [userId]
  );
  if (existing) {
    await ensureDefaultPage(existing.id);
    return existing;
  }

  const id = randomUUID();
  await query(
    'INSERT INTO exhibits (id, owner_user_id, title) VALUES (?, ?, ?)',
    [id, userId, 'Cara Mia']
  );
  await ensureDefaultPage(id);
  return get('SELECT * FROM exhibits WHERE id = ?', [id]);
}

async function ensureDefaultPage(exhibitId) {
  const existing = await get(
    'SELECT * FROM exhibit_pages WHERE exhibit_id = ? ORDER BY sort_order ASC, created_at ASC LIMIT 1',
    [exhibitId]
  );
  if (existing) {
    await query('UPDATE widgets SET page_id = ? WHERE exhibit_id = ? AND page_id IS NULL', [existing.id, exhibitId]);
    return existing;
  }

  const id = randomUUID();
  await query(
    'INSERT INTO exhibit_pages (id, exhibit_id, name, sort_order) VALUES (?, ?, ?, ?)',
    [id, exhibitId, 'Page 1', 1]
  );
  await query('UPDATE widgets SET page_id = ? WHERE exhibit_id = ? AND page_id IS NULL', [id, exhibitId]);
  return get('SELECT * FROM exhibit_pages WHERE id = ?', [id]);
}

async function seedTestAccount() {
  const accountId = 'babaganoosh';
  const email = 'babaganoosh@cara-mia.local';
  const existing = await get('SELECT * FROM users WHERE account_id = ?', [accountId]);

  if (existing) {
    await ensureDefaultExhibit(existing.id);
    return;
  }

  const id = randomUUID();
  const passwordHash = await bcrypt.hash('staygoldenponyboy', 12);

  await query(
    'INSERT INTO users (id, email, account_id, password_hash, email_verified) VALUES (?, ?, ?, ?, ?)',
    [id, email, accountId, passwordHash, isPostgres ? true : 1]
  );
  await ensureDefaultExhibit(id);
}

function csvCell(value) {
  if (value === null || value === undefined) return '';
  const text = typeof value === 'object' ? JSON.stringify(value) : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function normalizeExportValue(value) {
  if (value === null || value === undefined) return '';
  return typeof value === 'object' ? JSON.stringify(value) : value;
}

function orderedTableQuery(table) {
  if (table === 'users') return 'SELECT id, email, account_id, password_hash, email_verified, created_at FROM users ORDER BY created_at ASC';
  if (table === 'exhibits') return 'SELECT id, owner_user_id, title, created_at, updated_at FROM exhibits ORDER BY created_at ASC';
  if (table === 'exhibit_pages') return 'SELECT id, exhibit_id, name, sort_order, created_at, updated_at FROM exhibit_pages ORDER BY exhibit_id ASC, sort_order ASC, created_at ASC';
  if (table === 'widgets') return 'SELECT id, exhibit_id, page_id, type, x, y, width, height, z_index, data, created_by, created_at, updated_at FROM widgets ORDER BY exhibit_id ASC, page_id ASC, z_index ASC, created_at ASC';
  return 'SELECT id, exhibit_id, target_user_id, role, created_by, created_at FROM shares ORDER BY created_at ASC';
}

async function writeCsv(table, rows) {
  const columns = exportColumns[table] || (rows[0] ? Object.keys(rows[0]) : []);
  const lines = [
    columns.join(','),
    ...rows.map((row) => columns.map((column) => csvCell(normalizeExportValue(row[column]))).join(','))
  ];
  await fsp.writeFile(path.join(exportDir, `${table}.csv`), `${lines.join('\n')}\n`, 'utf8');
}

async function writeExcel(tables) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Cara Mia';
  workbook.created = new Date();
  workbook.modified = new Date();

  Object.entries(tables).forEach(([table, rows]) => {
    const worksheet = workbook.addWorksheet(table);
    const columns = exportColumns[table] || (rows[0] ? Object.keys(rows[0]) : []);
    worksheet.columns = columns.map((column) => ({
      header: column,
      key: column,
      width: Math.min(Math.max(column.length + 2, 14), 42)
    }));
    rows.forEach((row) => {
      worksheet.addRow(
        Object.fromEntries(columns.map((column) => [column, normalizeExportValue(row[column])]))
      );
    });
    worksheet.getRow(1).font = { bold: true };
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
  });

  const targetPath = path.join(exportDir, 'cara-mia-database.xlsx');
  const tempPath = path.join(exportDir, `cara-mia-database-${process.pid}.tmp.xlsx`);
  await workbook.xlsx.writeFile(tempPath);

  try {
    await fsp.rename(tempPath, targetPath);
  } catch (error) {
    if (['EBUSY', 'EPERM', 'EACCES'].includes(error.code)) {
      let fallbackPath = path.join(exportDir, 'cara-mia-database-fallback.xlsx');
      try {
        await fsp.rename(tempPath, fallbackPath);
      } catch (fallbackError) {
        if (!['EBUSY', 'EPERM', 'EACCES'].includes(fallbackError.code)) {
          throw fallbackError;
        }
        fallbackPath = path.join(exportDir, `cara-mia-database-${Date.now()}.xlsx`);
        await fsp.rename(tempPath, fallbackPath);
      }
      console.warn(`Database workbook is busy; wrote ${path.basename(fallbackPath)} instead.`);
      return;
    }
    throw error;
  }
}

async function exportDatabaseSnapshot() {
  if (!exportSnapshots) return;
  await fsp.mkdir(exportDir, { recursive: true });

  const tableNames = ['users', 'exhibits', 'exhibit_pages', 'widgets', 'shares'];
  const tables = {};
  for (const table of tableNames) {
    tables[table] = await all(orderedTableQuery(table));
    await writeCsv(table, tables[table]);
  }
  await writeExcel(tables);
}

function scheduleDatabaseExport(delay = 1500) {
  if (!exportSnapshots) return;
  if (exportRunning) {
    exportQueued = true;
    return;
  }

  clearTimeout(exportTimer);
  exportTimer = setTimeout(async () => {
    exportTimer = null;
    exportRunning = true;
    try {
      await exportDatabaseSnapshot();
    } catch (error) {
      console.error('Database export failed:', error);
    } finally {
      exportRunning = false;
      if (exportQueued) {
        exportQueued = false;
        scheduleDatabaseExport(delay);
      }
    }
  }, delay);
}

async function migratePostgresWidgetTypes() {
  await client.query('ALTER TABLE widgets DROP CONSTRAINT IF EXISTS widgets_type_check');
  await client.query(`ALTER TABLE widgets ADD CONSTRAINT widgets_type_check CHECK (${widgetTypeCheck})`);
}

async function migratePostgresPages() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS exhibit_pages (
      id TEXT PRIMARY KEY,
      exhibit_id TEXT NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
      name TEXT NOT NULL DEFAULT 'Page 1',
      sort_order INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await client.query('ALTER TABLE widgets ADD COLUMN IF NOT EXISTS page_id TEXT REFERENCES exhibit_pages(id) ON DELETE CASCADE');
  await client.query('CREATE INDEX IF NOT EXISTS idx_pages_exhibit ON exhibit_pages(exhibit_id, sort_order)');
  await client.query('CREATE INDEX IF NOT EXISTS idx_widgets_page ON widgets(page_id)');

  const exhibits = await client.query('SELECT id FROM exhibits');
  for (const exhibit of exhibits.rows) {
    await ensureDefaultPage(exhibit.id);
  }
}

function sqliteColumnExists(table, column) {
  return client.prepare(`PRAGMA table_info(${table})`).all().some((item) => item.name === column);
}

function migrateSqlitePages() {
  client.exec(`
    CREATE TABLE IF NOT EXISTS exhibit_pages (
      id TEXT PRIMARY KEY,
      exhibit_id TEXT NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
      name TEXT NOT NULL DEFAULT 'Page 1',
      sort_order INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_pages_exhibit ON exhibit_pages(exhibit_id, sort_order);
  `);

  if (!sqliteColumnExists('widgets', 'page_id')) {
    client.exec('ALTER TABLE widgets ADD COLUMN page_id TEXT REFERENCES exhibit_pages(id) ON DELETE CASCADE');
  }

  client.exec('CREATE INDEX IF NOT EXISTS idx_widgets_page ON widgets(page_id)');
  const exhibits = client.prepare('SELECT id FROM exhibits').all();
  for (const exhibit of exhibits) {
    const existing = client
      .prepare('SELECT * FROM exhibit_pages WHERE exhibit_id = ? ORDER BY sort_order ASC, created_at ASC LIMIT 1')
      .get(exhibit.id);
    const pageId = existing?.id || randomUUID();
    if (!existing) {
      client
        .prepare('INSERT INTO exhibit_pages (id, exhibit_id, name, sort_order) VALUES (?, ?, ?, ?)')
        .run(pageId, exhibit.id, 'Page 1', 1);
    }
    client.prepare('UPDATE widgets SET page_id = ? WHERE exhibit_id = ? AND page_id IS NULL').run(pageId, exhibit.id);
  }
}

function migrateSqliteWidgetTypes() {
  const table = client
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'widgets'")
    .get();
  if (!table || String(table.sql).includes("'sticker'")) return;

  client.pragma('foreign_keys = OFF');
  try {
    client.exec(`
      BEGIN;
      ALTER TABLE widgets RENAME TO widgets_old;
      CREATE TABLE widgets (
        id TEXT PRIMARY KEY,
        exhibit_id TEXT NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
        page_id TEXT REFERENCES exhibit_pages(id) ON DELETE CASCADE,
        type TEXT NOT NULL CHECK (${widgetTypeCheck}),
        x REAL NOT NULL DEFAULT 120,
        y REAL NOT NULL DEFAULT 120,
        width REAL NOT NULL DEFAULT 260,
        height REAL NOT NULL DEFAULT 180,
        z_index INTEGER NOT NULL DEFAULT 1,
        data TEXT NOT NULL DEFAULT '{}',
        created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      INSERT INTO widgets (id, exhibit_id, page_id, type, x, y, width, height, z_index, data, created_by, created_at, updated_at)
      SELECT id, exhibit_id, page_id, type, x, y, width, height, z_index, data, created_by, created_at, updated_at
      FROM widgets_old;
      DROP TABLE widgets_old;
      CREATE INDEX IF NOT EXISTS idx_widgets_exhibit ON widgets(exhibit_id);
      CREATE INDEX IF NOT EXISTS idx_widgets_page ON widgets(page_id);
      COMMIT;
    `);
  } catch (error) {
    client.exec('ROLLBACK');
    throw error;
  } finally {
    client.pragma('foreign_keys = ON');
  }
}

async function initDb() {
  fs.mkdirSync(databaseDir, { recursive: true });

  if (isPostgres) {
    client = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
    });
    await client.query(readSchema('schema.sql'));
    await migratePostgresWidgetTypes();
    await migratePostgresPages();
  } else {
    const sqlitePath = path.join(databaseDir, 'cara-mia.sqlite');
    client = new BetterSqlite3(sqlitePath);
    client.pragma('foreign_keys = ON');
    client.exec(readSchema('schema.sqlite.sql'));
    migrateSqlitePages();
    migrateSqliteWidgetTypes();
  }

  await seedTestAccount();
  scheduleDatabaseExport(250);
}

module.exports = {
  all,
  get,
  initDb,
  isPostgres,
  normalizePage,
  normalizeWidget,
  publicUser,
  query,
  scheduleDatabaseExport,
  ensureDefaultExhibit,
  ensureDefaultPage
};
