CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  account_id TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exhibits (
  id TEXT PRIMARY KEY,
  owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Cara Mia',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auth_codes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL CHECK (purpose IN ('signup', 'password_reset')),
  code_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exhibit_pages (
  id TEXT PRIMARY KEY,
  exhibit_id TEXT NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Page 1',
  background_theme TEXT NOT NULL DEFAULT 'default',
  sort_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS widgets (
  id TEXT PRIMARY KEY,
  exhibit_id TEXT NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
  page_id TEXT REFERENCES exhibit_pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('canvas', 'wordbox', 'question', 'music', 'sticker', 'picture', 'gif')),
  x DOUBLE PRECISION NOT NULL DEFAULT 120,
  y DOUBLE PRECISION NOT NULL DEFAULT 120,
  width DOUBLE PRECISION NOT NULL DEFAULT 260,
  height DOUBLE PRECISION NOT NULL DEFAULT 180,
  z_index INTEGER NOT NULL DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shares (
  id TEXT PRIMARY KEY,
  exhibit_id TEXT NOT NULL REFERENCES exhibits(id) ON DELETE CASCADE,
  target_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('viewer', 'collaborator')),
  created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (exhibit_id, target_user_id)
);

CREATE INDEX IF NOT EXISTS idx_widgets_exhibit ON widgets(exhibit_id);
CREATE INDEX IF NOT EXISTS idx_widgets_created_by ON widgets(created_by);
CREATE INDEX IF NOT EXISTS idx_auth_codes_user_purpose ON auth_codes(user_id, purpose, created_at);
CREATE INDEX IF NOT EXISTS idx_pages_exhibit ON exhibit_pages(exhibit_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_exhibits_owner ON exhibits(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_shares_target ON shares(target_user_id);
CREATE INDEX IF NOT EXISTS idx_shares_exhibit ON shares(exhibit_id);
