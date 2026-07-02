const assert = require('node:assert/strict');
const test = require('node:test');

process.env.NODE_ENV = 'test';
process.env.DB_EXPORTS = 'false';

const { makeToken, _private: authPrivate } = require('../src/auth');
const { _private: serverPrivate } = require('../src/server');

test('cursor image validation rejects markup-bearing local cursor paths', () => {
  assert.equal(serverPrivate.cleanCursorImage('/cursors/preset-1.png'), '/cursors/preset-1.png');
  assert.equal(serverPrivate.cleanCursorImage('/cursors/preset-1.png" onerror="alert(1)'), '');
  assert.equal(serverPrivate.cleanCursorImage('/cursors/../preset-1.png'), '');
});

test('picture frame validation maps legacy values to approved booth frames', () => {
  assert.equal(serverPrivate.cleanPictureFrame('ticket'), 'ticket');
  assert.equal(serverPrivate.cleanPictureFrame('polaroid'), 'stamp');
  assert.equal(serverPrivate.cleanPictureFrame('classic'), 'fourcut');
  assert.equal(serverPrivate.cleanPictureFrame('"><script>'), 'fourcut');
});

test('signup verification tokens are bound to the verified email', () => {
  const token = serverPrivate.makeSignupVerificationToken('User@Example.com', 'code-row-1');
  assert.equal(serverPrivate.readSignupVerificationToken(token, 'user@example.com').codeId, 'code-row-1');
  assert.equal(serverPrivate.readSignupVerificationToken(token, 'other@example.com'), null);
});

test('rate limit buckets block after their configured allowance', () => {
  serverPrivate.rateLimitBuckets.clear();
  const options = { limit: 2, windowMs: 1000 };
  assert.equal(serverPrivate.takeRateLimit('unit', 'same-key', options, 1000).ok, true);
  assert.equal(serverPrivate.takeRateLimit('unit', 'same-key', options, 1001).ok, true);
  assert.equal(serverPrivate.takeRateLimit('unit', 'same-key', options, 1002).ok, false);
  assert.equal(serverPrivate.takeRateLimit('unit', 'same-key', options, 2500).ok, true);
});

test('widget serialization bounds and sanitizes attacker-controlled data', () => {
  const wordbox = JSON.parse(serverPrivate.serializeData({
    text: 'x'.repeat(25000),
    extra: '<script>alert(1)</script>'
  }, 'wordbox'));
  assert.equal(wordbox.text.length, 10000);
  assert.equal(wordbox.extra, undefined);

  const oversizedCanvas = `data:image/png;base64,${'A'.repeat(1_600_000)}`;
  assert.throws(
    () => serverPrivate.serializeData({ image: oversizedCanvas }, 'canvas'),
    /too large/
  );
});

test('production secret configuration fails closed', () => {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousSecret = process.env.UNIT_SECRET;
  try {
    process.env.NODE_ENV = 'production';
    delete process.env.UNIT_SECRET;
    assert.throws(
      () => serverPrivate.configuredSecret(['UNIT_SECRET'], 'local-only'),
      /UNIT_SECRET/
    );
    process.env.UNIT_SECRET = 'x'.repeat(32);
    assert.equal(serverPrivate.configuredSecret(['UNIT_SECRET'], 'local-only'), 'x'.repeat(32));
  } finally {
    process.env.NODE_ENV = previousNodeEnv;
    if (previousSecret === undefined) delete process.env.UNIT_SECRET;
    else process.env.UNIT_SECRET = previousSecret;
  }
});

test('production email diagnostics require the operator token', () => {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousToken = process.env.EMAIL_STATUS_TOKEN;
  const makeReq = (token = '') => ({
    get: () => token,
    query: {}
  });
  try {
    process.env.NODE_ENV = 'production';
    process.env.EMAIL_STATUS_TOKEN = 'operator-token';
    assert.equal(serverPrivate.hasOperatorDiagnosticsAccess(makeReq('wrong-token')), false);
    assert.equal(serverPrivate.hasOperatorDiagnosticsAccess(makeReq('operator-token')), true);
  } finally {
    process.env.NODE_ENV = previousNodeEnv;
    if (previousToken === undefined) delete process.env.EMAIL_STATUS_TOKEN;
    else process.env.EMAIL_STATUS_TOKEN = previousToken;
  }
});

test('session tokens issued before a password change are rejected', () => {
  const issuedAt = Date.now();
  const token = makeToken('user-1', issuedAt);
  const body = authPrivate.readToken(token);
  assert.equal(authPrivate.tokenIsFreshForUser(body, { password_changed_at: new Date(issuedAt - 500).toISOString() }), true);
  assert.equal(authPrivate.tokenIsFreshForUser(body, { password_changed_at: new Date(issuedAt + 2000).toISOString() }), false);
});

test('access logging skips noisy and static requests', () => {
  const makeReq = (method, path) => ({ method, path });
  assert.equal(serverPrivate.shouldLogAccess(makeReq('GET', '/')), true);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('POST', '/api/login')), true);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('GET', '/api/exhibits/exhibit-1/events')), true);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('POST', '/api/exhibits/exhibit-1/presence')), false);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('POST', '/api/exhibits/exhibit-1/cursor-drag')), false);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('GET', '/health')), false);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('GET', '/app.js')), false);
  assert.equal(serverPrivate.shouldLogAccess(makeReq('OPTIONS', '/api/login')), false);
});

test('access log fields are flattened and bounded', () => {
  const value = serverPrivate.compactLogField(`one\ntwo\t${'x'.repeat(600)}`, 12);
  assert.equal(value, 'one two xxxx');
});
