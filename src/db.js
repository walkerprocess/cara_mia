const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const BetterSqlite3 = require('better-sqlite3');

const rootDir = path.resolve(__dirname, '..');
const databaseDir = path.join(rootDir, 'database');
const isPostgres = Boolean(process.env.DATABASE_URL);

let client;
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
}

module.exports = {
  all,
  get,
  initDb,
  isPostgres,
  normalizeWidget,
  publicUser,
  query,
  ensureDefaultExhibit
};
