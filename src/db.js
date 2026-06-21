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

async function initDb() {
  fs.mkdirSync(databaseDir, { recursive: true });

  if (isPostgres) {
    client = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
    });
    await client.query(readSchema('schema.sql'));
  } else {
    const sqlitePath = path.join(databaseDir, 'cara-mia.sqlite');
    client = new BetterSqlite3(sqlitePath);
    client.pragma('foreign_keys = ON');
    client.exec(readSchema('schema.sqlite.sql'));
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
