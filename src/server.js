const path = require('path');
const { randomUUID } = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const {
  all,
  ensureDefaultExhibit,
  get,
  initDb,
  isPostgres,
  normalizeWidget,
  publicUser,
  query
} = require('./db');
const {
  clearSessionCookie,
  hashPassword,
  requireAuth,
  setSessionCookie,
  verifyPassword
} = require('./auth');

const app = express();
const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, '..', 'public');

app.use(express.json({ limit: '12mb' }));
app.use(cookieParser());
app.use(express.static(publicDir));

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeAccountId(value) {
  return String(value || '').trim().toLowerCase();
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function validAccountId(accountId) {
  return /^[a-z0-9_.-]{3,32}$/.test(accountId);
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function serializeData(data) {
  const safe = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  const json = JSON.stringify(safe);
  if (json.length > 8_000_000) {
    const error = new Error('This widget is too large to save.');
    error.statusCode = 413;
    throw error;
  }
  return json;
}

async function getAccess(exhibitId, userId) {
  const exhibit = await get(
    `SELECT e.*, u.account_id AS owner_account_id, u.email AS owner_email
     FROM exhibits e
     JOIN users u ON u.id = e.owner_user_id
     WHERE e.id = ?`,
    [exhibitId]
  );

  if (!exhibit) return null;
  if (exhibit.owner_user_id === userId) {
    return { exhibit, role: 'owner', canEdit: true, canShare: true };
  }

  const share = await get(
    'SELECT role FROM shares WHERE exhibit_id = ? AND target_user_id = ?',
    [exhibitId, userId]
  );

  if (!share) return null;
  return {
    exhibit,
    role: share.role,
    canEdit: share.role === 'collaborator',
    canShare: false
  };
}

function exhibitPayload(access, widgets = []) {
  return {
    id: access.exhibit.id,
    title: access.exhibit.title,
    ownerAccountId: access.exhibit.owner_account_id,
    role: access.role,
    canEdit: access.canEdit,
    canShare: access.canShare,
    widgets: widgets.map(normalizeWidget)
  };
}

async function listExhibits(userId) {
  await ensureDefaultExhibit(userId);

  const own = await all(
    `SELECT e.id, e.title, e.owner_user_id, u.account_id AS owner_account_id, 'owner' AS role
     FROM exhibits e
     JOIN users u ON u.id = e.owner_user_id
     WHERE e.owner_user_id = ?
     ORDER BY e.created_at ASC`,
    [userId]
  );

  const shared = await all(
    `SELECT e.id, e.title, e.owner_user_id, u.account_id AS owner_account_id, s.role AS role
     FROM shares s
     JOIN exhibits e ON e.id = s.exhibit_id
     JOIN users u ON u.id = e.owner_user_id
     WHERE s.target_user_id = ?
     ORDER BY s.created_at DESC`,
    [userId]
  );

  return [...own, ...shared].map((item) => ({
    id: item.id,
    title: item.title,
    ownerAccountId: item.owner_account_id,
    role: item.role
  }));
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'cara-mia', database: isPostgres ? 'postgres' : 'sqlite' });
});

app.post('/api/signup', async (req, res, next) => {
  try {
    const email = normalizeEmail(req.body.email);
    const accountId = normalizeAccountId(req.body.accountId);
    const password = String(req.body.password || '');

    if (!validEmail(email)) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }
    if (!validAccountId(accountId)) {
      return res.status(400).json({ error: 'Use 3-32 letters, numbers, dots, dashes, or underscores for the account id.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Use a password with at least 8 characters.' });
    }

    const existingEmail = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingEmail) {
      return res.status(409).json({ error: 'That email already has an account.' });
    }

    const existingAccount = await get('SELECT id FROM users WHERE account_id = ?', [accountId]);
    if (existingAccount) {
      return res.status(409).json({ error: 'That account id is already taken.' });
    }

    const userId = randomUUID();
    await query(
      'INSERT INTO users (id, email, account_id, password_hash, email_verified) VALUES (?, ?, ?, ?, ?)',
      [userId, email, accountId, await hashPassword(password), isPostgres ? true : 1]
    );
    await ensureDefaultExhibit(userId);

    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/login', async (req, res, next) => {
  try {
    const accountId = normalizeAccountId(req.body.accountId);
    const password = String(req.body.password || '');
    const user = await get('SELECT * FROM users WHERE account_id = ?', [accountId]);

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return res.status(401).json({ error: 'The account id or password is incorrect.' });
    }

    await ensureDefaultExhibit(user.id);
    setSessionCookie(res, user.id);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/logout', (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ user: req.publicUser });
});

app.get('/api/exhibits', requireAuth, async (req, res, next) => {
  try {
    res.json({ exhibits: await listExhibits(req.user.id) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/exhibits/:id', requireAuth, async (req, res, next) => {
  try {
    const access = await getAccess(req.params.id, req.user.id);
    if (!access) {
      return res.status(404).json({ error: 'This exhibit is not available.' });
    }

    const widgets = await all(
      'SELECT * FROM widgets WHERE exhibit_id = ? ORDER BY z_index ASC, created_at ASC',
      [req.params.id]
    );
    res.json({ exhibit: exhibitPayload(access, widgets) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/widgets', requireAuth, async (req, res, next) => {
  try {
    const exhibitId = String(req.body.exhibitId || '');
    const access = await getAccess(exhibitId, req.user.id);
    if (!access || !access.canEdit) {
      return res.status(403).json({ error: 'Only collaborators can change this exhibit.' });
    }

    const type = String(req.body.type || '');
    if (!['canvas', 'wordbox', 'music'].includes(type)) {
      return res.status(400).json({ error: 'Choose a valid widget.' });
    }

    const maxRow = await get('SELECT MAX(z_index) AS max_z FROM widgets WHERE exhibit_id = ?', [exhibitId]);
    const widget = {
      id: randomUUID(),
      exhibitId,
      type,
      x: clampNumber(req.body.x, 120, -10000, 10000),
      y: clampNumber(req.body.y, 120, -10000, 10000),
      width: clampNumber(req.body.width, type === 'music' ? 300 : 260, 40, 3000),
      height: clampNumber(req.body.height, type === 'music' ? 120 : 180, 40, 3000),
      zIndex: Number(maxRow?.max_z || 0) + 1,
      data: serializeData(req.body.data)
    };

    await query(
      `INSERT INTO widgets (id, exhibit_id, type, x, y, width, height, z_index, data, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        widget.id,
        widget.exhibitId,
        widget.type,
        widget.x,
        widget.y,
        widget.width,
        widget.height,
        widget.zIndex,
        widget.data,
        req.user.id
      ]
    );

    const saved = await get('SELECT * FROM widgets WHERE id = ?', [widget.id]);
    await query('UPDATE exhibits SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [exhibitId]);
    res.status(201).json({ widget: normalizeWidget(saved) });
  } catch (error) {
    next(error);
  }
});

app.patch('/api/widgets/:id', requireAuth, async (req, res, next) => {
  try {
    const existing = await get('SELECT * FROM widgets WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Widget not found.' });
    }

    const access = await getAccess(existing.exhibit_id, req.user.id);
    if (!access || !access.canEdit) {
      return res.status(403).json({ error: 'Only collaborators can change this exhibit.' });
    }

    const current = normalizeWidget(existing);
    const nextWidget = {
      x: clampNumber(req.body.x, current.x, -10000, 10000),
      y: clampNumber(req.body.y, current.y, -10000, 10000),
      width: clampNumber(req.body.width, current.width, 40, 3000),
      height: clampNumber(req.body.height, current.height, 40, 3000),
      zIndex: clampNumber(req.body.zIndex ?? req.body.z_index, current.z_index, 1, 100000),
      data: req.body.data === undefined ? serializeData(current.data) : serializeData(req.body.data)
    };

    await query(
      `UPDATE widgets
       SET x = ?, y = ?, width = ?, height = ?, z_index = ?, data = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [nextWidget.x, nextWidget.y, nextWidget.width, nextWidget.height, nextWidget.zIndex, nextWidget.data, req.params.id]
    );
    await query('UPDATE exhibits SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [existing.exhibit_id]);

    const saved = await get('SELECT * FROM widgets WHERE id = ?', [req.params.id]);
    res.json({ widget: normalizeWidget(saved) });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/widgets/:id', requireAuth, async (req, res, next) => {
  try {
    const existing = await get('SELECT * FROM widgets WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Widget not found.' });
    }

    const access = await getAccess(existing.exhibit_id, req.user.id);
    if (!access || !access.canEdit) {
      return res.status(403).json({ error: 'Only collaborators can change this exhibit.' });
    }

    await query('DELETE FROM widgets WHERE id = ?', [req.params.id]);
    await query('UPDATE exhibits SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [existing.exhibit_id]);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/share', requireAuth, async (req, res, next) => {
  try {
    const exhibitId = String(req.body.exhibitId || '');
    const access = await getAccess(exhibitId, req.user.id);
    if (!access || !access.canShare) {
      return res.status(403).json({ error: 'Only the owner can share this exhibit.' });
    }

    const email = normalizeEmail(req.body.email);
    const role = String(req.body.role || '');
    if (!validEmail(email)) {
      return res.status(400).json({ error: 'Enter the account email to share with.' });
    }
    if (!['viewer', 'collaborator'].includes(role)) {
      return res.status(400).json({ error: 'Choose viewer or collaborator.' });
    }

    const target = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!target) {
      return res.status(404).json({ error: 'No Cara Mia account uses that email yet.' });
    }
    if (target.id === req.user.id) {
      return res.status(400).json({ error: 'This exhibit already belongs to you.' });
    }

    await query(
      `INSERT INTO shares (id, exhibit_id, target_user_id, role, created_by)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (exhibit_id, target_user_id)
       DO UPDATE SET role = excluded.role, created_by = excluded.created_by, created_at = CURRENT_TIMESTAMP`,
      [randomUUID(), exhibitId, target.id, role, req.user.id]
    );

    res.json({ ok: true, sharedWith: publicUser(target), role });
  } catch (error) {
    next(error);
  }
});

app.get('/api/music/search', requireAuth, async (req, res, next) => {
  try {
    const term = String(req.query.q || '').trim();
    if (term.length < 2) {
      return res.json({ results: [] });
    }

    const url = new URL('https://itunes.apple.com/search');
    url.searchParams.set('term', term);
    url.searchParams.set('media', 'music');
    url.searchParams.set('entity', 'song');
    url.searchParams.set('limit', '8');

    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      return res.status(502).json({ error: 'Music search is unavailable right now.' });
    }

    const payload = await response.json();
    const results = (payload.results || []).map((track) => ({
      id: String(track.trackId),
      title: track.trackName,
      artist: track.artistName,
      album: track.collectionName,
      artwork: String(track.artworkUrl100 || '').replace('100x100bb', '600x600bb'),
      previewUrl: track.previewUrl
    }));

    res.json({ results });
  } catch (error) {
    if (error.name === 'TimeoutError') {
      return res.status(504).json({ error: 'Music search took too long.' });
    }
    next(error);
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use((error, _req, res, _next) => {
  const status = error.statusCode || 500;
  if (status >= 500) {
    console.error(error);
  }
  res.status(status).json({ error: error.message || 'Something went wrong.' });
});

initDb()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Cara Mia is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start Cara Mia:', error);
    process.exit(1);
  });
