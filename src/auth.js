const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { get, publicUser } = require('./db');

const COOKIE_NAME = 'cm_session';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'cara-mia-local-development-secret';

function base64Url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
}

function makeToken(userId) {
  const payload = base64Url(JSON.stringify({ sub: userId, exp: Date.now() + ONE_WEEK_MS }));
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
  const body = readToken(req.cookies?.[COOKIE_NAME]);
  if (!body) {
    return res.status(401).json({ error: 'Please log in again.' });
  }

  const user = await get('SELECT * FROM users WHERE id = ?', [body.sub]);
  if (!user) {
    clearSessionCookie(res);
    return res.status(401).json({ error: 'Please log in again.' });
  }

  req.user = user;
  req.publicUser = publicUser(user);
  next();
}

module.exports = {
  clearSessionCookie,
  makeToken,
  requireAuth,
  setSessionCookie,
  verifyPassword: bcrypt.compare,
  hashPassword: (password) => bcrypt.hash(password, 12)
};
