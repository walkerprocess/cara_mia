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
    x: Number(row.x),
    y: Number(row.y),
    width: Number(row.width),
    height: Number(row.height),
    z_index: Number(row.z_index),
    data
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
  if (existing) return existing;

  const id = randomUUID();
  await query(
    'INSERT INTO exhibits (id, owner_user_id, title) VALUES (?, ?, ?)',
    [id, userId, 'Cara Mia']
  );
  return get('SELECT * FROM exhibits WHERE id = ?', [id]);
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
  if (table === 'widgets') return 'SELECT id, exhibit_id, type, x, y, width, height, z_index, data, created_by, created_at, updated_at FROM widgets ORDER BY exhibit_id ASC, z_index ASC, created_at ASC';
  return 'SELECT id, exhibit_id, target_user_id, role, created_by, created_at FROM shares ORDER BY created_at ASC';
}

async function writeCsv(table, rows) {
  const columns = rows[0] ? Object.keys(rows[0]) : [];
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
    const columns = rows[0] ? Object.keys(rows[0]) : [];
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

  await workbook.xlsx.writeFile(path.join(exportDir, 'cara-mia-database.xlsx'));
}

async function exportDatabaseSnapshot() {
  if (!exportSnapshots) return;
  await fsp.mkdir(exportDir, { recursive: true });

  const tableNames = ['users', 'exhibits', 'widgets', 'shares'];
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
      INSERT INTO widgets (id, exhibit_id, type, x, y, width, height, z_index, data, created_by, created_at, updated_at)
      SELECT id, exhibit_id, type, x, y, width, height, z_index, data, created_by, created_at, updated_at
      FROM widgets_old;
      DROP TABLE widgets_old;
      CREATE INDEX IF NOT EXISTS idx_widgets_exhibit ON widgets(exhibit_id);
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
  } else {
    const sqlitePath = path.join(databaseDir, 'cara-mia.sqlite');
    client = new BetterSqlite3(sqlitePath);
    client.pragma('foreign_keys = ON');
    client.exec(readSchema('schema.sqlite.sql'));
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
  normalizeWidget,
  publicUser,
  query,
  scheduleDatabaseExport,
  ensureDefaultExhibit
};
