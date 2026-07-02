const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { get, publicUser } = require('./db');

const COOKIE_NAME = 'cm_session';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const LOCAL_SESSION_SECRET = 'cara-mia-local-development-secret';

function configuredSecret(name, fallback) {
  const value = String(process.env[name] || '');
  if (process.env.NODE_ENV === 'production' && value.length < 32) {
    throw new Error(`${name} must be set to at least 32 characters in production.`);
  }
  return value || fallback;
}

const SESSION_SECRET = configuredSecret('SESSION_SECRET', LOCAL_SESSION_SECRET);

function base64Url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

function makeToken(userId, issuedAt = Date.now()) {
  const payload = base64Url(JSON.stringify({
    sub: userId,
    iat: issuedAt,
    exp: issuedAt + ONE_WEEK_MS
  }));
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  if (!token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || sign(payload) !== signature) return null;

  try {
    const body = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!body.sub || !body.exp || Date.now() > body.exp) return null;
    return body;
  } catch {
    return null;
  }
}

function passwordChangedAt(user) {
  const timestamp = user?.password_changed_at || user?.created_at;
  const parsed = timestamp ? Date.parse(timestamp) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function tokenIsFreshForUser(body, user) {
  const issuedAt = Number(body?.iat || 0);
  if (!issuedAt) return false;
  const changedAt = passwordChangedAt(user);
  return !changedAt || issuedAt + 1000 >= changedAt;
}

function setSessionCookie(res, userId) {
  res.cookie(COOKIE_NAME, makeToken(userId), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_WEEK_MS
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
}

async function requireAuth(req, res, next) {
  if (req.user && req.publicUser) {
    return next();
  }

  const body = readToken(req.cookies?.[COOKIE_NAME]);
  if (!body) {
    return res.status(401).json({ error: 'Please log in again.' });
  }

  const user = await get('SELECT * FROM users WHERE id = ?', [body.sub]);
  if (!user || !tokenIsFreshForUser(body, user)) {
    clearSessionCookie(res);
    return res.status(401).json({ error: 'Please log in again.' });
  }

  req.user = user;
  req.publicUser = publicUser(user);
  next();
}

async function attachAuthUser(req, _res, next) {
  try {
    const body = readToken(req.cookies?.[COOKIE_NAME]);
    if (body) {
      const user = await get('SELECT * FROM users WHERE id = ?', [body.sub]);
      if (user && tokenIsFreshForUser(body, user)) {
        req.user = user;
        req.publicUser = publicUser(user);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  attachAuthUser,
  clearSessionCookie,
  makeToken,
  requireAuth,
  setSessionCookie,
  verifyPassword: bcrypt.compare,
  hashPassword: (password) => bcrypt.hash(password, 12),
  _private: {
    configuredSecret,
    readToken,
    tokenIsFreshForUser
  }
};
