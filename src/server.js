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
  query,
  scheduleDatabaseExport
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
const exhibitStreams = new Map();

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

function cleanClientId(value) {
  return String(value || '').replace(/[^a-zA-Z0-9_.:-]/g, '').slice(0, 80);
}

function writeLiveEvent(res, event, payload = {}) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function addExhibitStream(exhibitId, client) {
  if (!exhibitStreams.has(exhibitId)) {
    exhibitStreams.set(exhibitId, new Set());
  }
  exhibitStreams.get(exhibitId).add(client);
}

function removeExhibitStream(exhibitId, client) {
  const clients = exhibitStreams.get(exhibitId);
  if (!clients) return;
  clients.delete(client);
  if (!clients.size) {
    exhibitStreams.delete(exhibitId);
  }
}

function broadcastExhibitEvent(exhibitId, event, payload = {}) {
  const clients = exhibitStreams.get(exhibitId);
  if (!clients) return;

  for (const client of clients) {
    writeLiveEvent(client.res, event, payload);
  }
}

function svgDataUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const recommendedAssets = {
  sticker: [
    {
      id: 'gothic-heart',
      title: 'Gothic Heart',
      tags: ['heart', 'love', 'gothic', 'black', 'red'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M120 206C72 166 38 132 38 88c0-25 19-44 44-44 17 0 31 9 38 23 7-14 21-23 38-23 25 0 44 19 44 44 0 44-34 78-82 118Z" fill="#09060d"/><path d="M120 184c-36-31-58-55-58-85 0-16 12-28 28-28 13 0 23 8 30 22 7-14 17-22 30-22 16 0 28 12 28 28 0 30-22 54-58 85Z" fill="#9f0f2d"/><path d="M120 168c-24-21-39-38-39-58 0-11 8-19 19-19 9 0 16 6 20 15 4-9 11-15 20-15 11 0 19 8 19 19 0 20-15 37-39 58Z" fill="#f2dbe7"/></svg>`
    },
    {
      id: 'violet-bow',
      title: 'Violet Bow',
      tags: ['bow', 'ribbon', 'purple', 'cute'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M112 118C72 82 38 70 23 96c-15 27 7 56 84 42-42 64-27 95 3 82 24-10 36-53 32-84 32 5 75-8 84-32 13-30-18-45-82-3 14-77-15-99-42-84-26 15-14 49 10 101Z" fill="#15091f"/><path d="M113 119C78 92 50 82 39 101c-11 20 11 39 77 24-31 54-23 76-4 67 16-7 26-40 23-65 26 3 58-7 65-23 9-19-13-27-67 4 15-66-4-88-24-77-19 11-9 39 4 88Z" fill="#7d38ff"/><circle cx="122" cy="124" r="18" fill="#f1bfd4"/></svg>`
    },
    {
      id: 'kiss-mark',
      title: 'Kiss Mark',
      tags: ['kiss', 'red', 'romance', 'lips'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M27 127c23-42 52-63 85-62 8 0 15 4 21 10 8-8 19-13 33-10 22 5 39 20 51 46-38 58-108 77-190 16Z" fill="#09060d"/><path d="M46 124c20-31 43-47 68-46 11 0 17 12 23 12 5 0 15-15 28-12 17 4 29 15 38 35-34 39-87 52-157 11Z" fill="#ef314d"/><path d="M52 126c40 16 88 17 144-9-29 42-84 52-144 9Z" fill="#7b1238"/><path d="M73 99c14-8 28-11 42-8" stroke="#ff95ac" stroke-width="8" stroke-linecap="round" fill="none"/></svg>`
    },
    {
      id: 'moon-letter',
      title: 'Moon Letter',
      tags: ['letter', 'moon', 'mail', 'love', 'white'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M41 74h158v104H41z" rx="14" fill="#0a0710"/><path d="M53 85h134v82H53z" rx="8" fill="#f4edf5"/><path d="M54 87l66 51 66-51" fill="none" stroke="#5a0719" stroke-width="10" stroke-linejoin="round"/><path d="M160 58c-25 4-39 28-30 51 8 23 35 34 57 23-7 17-23 30-43 32-31 3-58-19-62-50-3-31 19-58 50-62 10-1 19 1 28 6Z" fill="#d7cbd3"/></svg>`
    },
    {
      id: 'thorn-star',
      title: 'Thorn Star',
      tags: ['star', 'sparkle', 'thorn', 'purple', 'gothic'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M120 12l24 76 78 6-64 45 19 77-57-48-57 48 19-77-64-45 78-6 24-76Z" fill="#09060d"/><path d="M120 42l16 55 56 3-46 31 14 55-40-35-40 35 14-55-46-31 56-3 16-55Z" fill="#b06cff"/><path d="M120 76l8 28 28 2-23 16 7 27-20-17-20 17 7-27-23-16 28-2 8-28Z" fill="#fffafb"/></svg>`
    },
    {
      id: 'red-chain',
      title: 'Red Chain',
      tags: ['chain', 'red', 'gothic', 'border'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120"><g fill="none" stroke-linecap="round" stroke-width="16"><path d="M55 60h130" stroke="#09060d"/><path d="M69 60h102" stroke="#a90f2e"/><path d="M30 60c0-19 12-32 31-32h24c19 0 31 13 31 32S104 92 85 92H61c-19 0-31-13-31-32Z" stroke="#09060d"/><path d="M124 60c0-19 12-32 31-32h24c19 0 31 13 31 32s-12 32-31 32h-24c-19 0-31-13-31-32Z" stroke="#09060d"/></g></svg>`
    },
    {
      id: 'black-rose',
      title: 'Black Rose',
      tags: ['rose', 'flower', 'black', 'gothic', 'romance'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M126 214c-13-46-12-85 3-117" stroke="#18341f" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M121 155c-27 2-44-9-53-33 24-2 43 10 53 33Z" fill="#255a32"/><path d="M129 128c-42-2-68-21-68-52 28-31 65-31 98-2 16 33 3 53-30 54Z" fill="#09060d"/><path d="M124 117c-29-2-45-14-44-35 19-20 44-21 66-2 9 22 2 36-22 37Z" fill="#3b0a22"/><path d="M132 106c-16-2-25-9-25-21 11-11 26-11 38-1 5 13 1 21-13 22Z" fill="#a90f2e"/><path d="M151 78c15-15 32-14 49 4-8 28-27 40-58 36 17-9 20-23 9-40Z" fill="#1b1024"/></svg>`
    },
    {
      id: 'crimson-key',
      title: 'Crimson Key',
      tags: ['key', 'red', 'lock', 'love', 'gothic'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 160"><path d="M47 80a38 38 0 1 0 76 0 38 38 0 0 0-76 0Zm25 0a13 13 0 1 1 26 0 13 13 0 0 1-26 0Z" fill="#09060d"/><path d="M118 72h112v20h-20v22h-25V92h-19v27h-25V92h-23Z" fill="#09060d"/><path d="M61 80a24 24 0 1 0 48 0 24 24 0 0 0-48 0Zm15 0a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" fill="#a90f2e"/><path d="M115 77h95v10h-24v17h-11V87h-20v21h-11V87h-29Z" fill="#ef314d"/></svg>`
    },
    {
      id: 'lace-frame',
      title: 'Lace Frame',
      tags: ['frame', 'lace', 'black', 'white', 'border'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><rect x="30" y="30" width="200" height="200" rx="18" fill="none" stroke="#09060d" stroke-width="16"/><rect x="52" y="52" width="156" height="156" rx="10" fill="none" stroke="#f4edf5" stroke-width="8"/><g fill="#09060d"><circle cx="49" cy="49" r="18"/><circle cx="211" cy="49" r="18"/><circle cx="49" cy="211" r="18"/><circle cx="211" cy="211" r="18"/><path d="M130 11l13 28h-26l13-28ZM130 249l-13-28h26l-13 28ZM11 130l28-13v26l-28-13ZM249 130l-28 13v-26l28 13Z"/></g><path d="M80 31c15 22 85 22 100 0M80 229c15-22 85-22 100 0M31 80c22 15 22 85 0 100M229 80c-22 15-22 85 0 100" stroke="#7d38ff" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`
    },
    {
      id: 'velvet-crown',
      title: 'Velvet Crown',
      tags: ['crown', 'purple', 'royal', 'gothic'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180"><path d="M34 142h172l-19-88-43 50-24-74-24 74-43-50-19 88Z" fill="#09060d"/><path d="M55 129h130l-13-51-35 37-17-54-17 54-35-37-13 51Z" fill="#7d38ff"/><path d="M58 143h124v22H58z" rx="8" fill="#09060d"/><circle cx="120" cy="59" r="10" fill="#f1bfd4"/><circle cx="68" cy="77" r="8" fill="#ef314d"/><circle cx="172" cy="77" r="8" fill="#ef314d"/></svg>`
    },
    {
      id: 'midnight-candle',
      title: 'Midnight Candle',
      tags: ['candle', 'flame', 'dark', 'white', 'red'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240"><path d="M72 84h52v126c0 12-10 22-22 22h-8c-12 0-22-10-22-22V84Z" fill="#09060d"/><path d="M83 95h30v110c0 8-7 15-15 15s-15-7-15-15V95Z" fill="#f4edf5"/><path d="M101 74c28-28 11-54-8-66 4 26-28 35-28 61 0 19 16 30 33 30 18 0 33-11 36-28-10 8-20 8-33 3Z" fill="#ef314d"/><path d="M100 83c13-14 6-27-4-34 2 13-13 18-13 31 0 10 8 15 17 15 8 0 15-5 17-13-5 3-10 4-17 1Z" fill="#ffc857"/></svg>`
    },
    {
      id: 'silver-dagger',
      title: 'Silver Dagger',
      tags: ['dagger', 'silver', 'gothic', 'sharp'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><path d="M125 16c25 61 22 111-6 151-32-38-36-88-13-151h19Z" fill="#d7cbd3" stroke="#09060d" stroke-width="8" stroke-linejoin="round"/><path d="M115 26c-9 52-4 91 13 119" stroke="#fffafb" stroke-width="7" stroke-linecap="round"/><path d="M63 165h114v22H63z" rx="10" fill="#09060d"/><path d="M95 183h50v44H95z" rx="11" fill="#7b1238"/><path d="M84 220h72" stroke="#09060d" stroke-width="16" stroke-linecap="round"/></svg>`
    },
    {
      id: 'twin-moons',
      title: 'Twin Moons',
      tags: ['moon', 'purple', 'night', 'white'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180"><rect width="240" height="180" rx="24" fill="none"/><path d="M96 25c-27 9-46 34-46 64 0 37 30 67 67 67 26 0 49-15 60-37-47 15-88-20-81-94Z" fill="#f4edf5"/><path d="M151 42c-17 6-29 22-29 41 0 24 19 43 43 43 17 0 31-9 38-24-30 10-56-13-52-60Z" fill="#b06cff"/><path d="M42 38l8 24 24 8-24 8-8 24-8-24-24-8 24-8 8-24ZM205 20l5 15 15 5-15 5-5 15-5-15-15-5 15-5 5-15Z" fill="#09060d"/></svg>`
    },
    {
      id: 'broken-halo',
      title: 'Broken Halo',
      tags: ['halo', 'ring', 'gothic', 'white', 'purple'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><path d="M58 88c0-30 32-54 72-54 18 0 35 5 48 13" fill="none" stroke="#09060d" stroke-width="18" stroke-linecap="round"/><path d="M195 62c6 8 9 17 9 26 0 30-33 54-74 54-17 0-32-4-45-11" fill="none" stroke="#09060d" stroke-width="18" stroke-linecap="round"/><path d="M62 88c0-25 30-45 68-45 17 0 33 4 45 12M190 67c4 6 6 13 6 21 0 25-30 45-66 45-16 0-31-4-43-10" fill="none" stroke="#f4edf5" stroke-width="8" stroke-linecap="round"/><path d="M178 31l-18 36h29l-17 38 49-58h-30l16-31-29 15Z" fill="#7d38ff"/></svg>`
    }
  ],
  gif: [
    {
      id: 'pulse-heart',
      title: 'Pulsing Heart',
      tags: ['heart', 'love', 'pulse', 'red'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="none"/><g transform="translate(120 120)"><g transform="translate(-120 -120)"><animateTransform attributeName="transform" type="scale" values="1;1.12;1" dur="1.15s" repeatCount="indefinite" additive="sum"/><path d="M120 204C72 164 38 130 38 87c0-25 19-44 44-44 17 0 31 9 38 23 7-14 21-23 38-23 25 0 44 19 44 44 0 43-34 77-82 117Z" fill="#0a0710"/><path d="M120 181C84 150 62 125 62 96c0-16 12-28 28-28 13 0 23 8 30 22 7-14 17-22 30-22 16 0 28 12 28 28 0 29-22 54-58 85Z" fill="#ef314d"/></g></g></svg>`
    },
    {
      id: 'glow-sparkles',
      title: 'Glow Sparkles',
      tags: ['sparkle', 'stars', 'purple', 'magic'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="none"/><g fill="#fffafb"><path d="M120 16l16 55 55 16-55 16-16 55-16-55-55-16 55-16 16-55Z"><animate attributeName="opacity" values=".35;1;.35" dur="1.2s" repeatCount="indefinite"/></path><path d="M51 134l9 29 29 9-29 9-9 29-9-29-29-9 29-9 9-29Z" fill="#b06cff"><animate attributeName="opacity" values="1;.25;1" dur="1.4s" repeatCount="indefinite"/></path><path d="M185 135l7 22 22 7-22 7-7 22-7-22-22-7 22-7 7-22Z" fill="#ef314d"><animate attributeName="opacity" values=".2;1;.2" dur="1s" repeatCount="indefinite"/></path></g></svg>`
    },
    {
      id: 'floating-letter',
      title: 'Floating Letter',
      tags: ['letter', 'mail', 'romance', 'float'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><rect width="260" height="180" fill="none"/><g><animateTransform attributeName="transform" type="translate" values="0 6;0 -8;0 6" dur="1.8s" repeatCount="indefinite"/><rect x="39" y="43" width="182" height="105" rx="14" fill="#09060d"/><rect x="52" y="55" width="156" height="81" rx="8" fill="#fffafb"/><path d="M54 58l76 54 76-54" fill="none" stroke="#7b1238" stroke-width="9" stroke-linejoin="round"/><path d="M102 108c13 9 43 9 56 0" stroke="#ef314d" stroke-width="7" stroke-linecap="round"/></g></svg>`
    },
    {
      id: 'red-aura',
      title: 'Red Aura',
      tags: ['red', 'aura', 'glow', 'gothic'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="none"/><circle cx="120" cy="120" r="70" fill="#5a0719"><animate attributeName="r" values="48;83;48" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.25;.9" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="120" cy="120" r="38" fill="#ef314d"><animate attributeName="r" values="30;46;30" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="120" cy="120" r="12" fill="#fffafb"/></svg>`
    },
    {
      id: 'lock-beat',
      title: 'Lock Beat',
      tags: ['lock', 'heart', 'pulse', 'red'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="none"/><g transform-origin="120 124"><animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="1s" repeatCount="indefinite"/><path d="M72 100V76c0-27 21-48 48-48s48 21 48 48v24h-20V76c0-16-12-28-28-28S92 60 92 76v24H72Z" fill="#09060d"/><rect x="58" y="91" width="124" height="108" rx="22" fill="#09060d"/><path d="M120 174c-23-18-37-32-37-49 0-12 9-21 21-21 7 0 13 4 16 10 3-6 9-10 16-10 12 0 21 9 21 21 0 17-14 31-37 49Z" fill="#ef314d"/></g></svg>`
    },
    {
      id: 'chain-shimmer',
      title: 'Chain Shimmer',
      tags: ['chain', 'sparkle', 'red', 'gothic'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 150"><rect width="280" height="150" fill="none"/><g fill="none" stroke="#09060d" stroke-width="15" stroke-linecap="round"><path d="M24 75c0-22 15-38 37-38h32c22 0 37 16 37 38s-15 38-37 38H61c-22 0-37-16-37-38Z"/><path d="M150 75c0-22 15-38 37-38h32c22 0 37 16 37 38s-15 38-37 38h-32c-22 0-37-16-37-38Z"/><path d="M92 75h96"/></g><path d="M57 32l8 24 24 8-24 8-8 24-8-24-24-8 24-8 8-24Z" fill="#f4edf5"><animate attributeName="opacity" values=".15;1;.15" dur="1.1s" repeatCount="indefinite"/></path><path d="M213 52l6 18 18 6-18 6-6 18-6-18-18-6 18-6 6-18Z" fill="#ef314d"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></path></svg>`
    },
    {
      id: 'candle-flicker',
      title: 'Candle Flicker',
      tags: ['candle', 'flame', 'flicker', 'dark'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240"><rect width="180" height="240" fill="none"/><path d="M66 98h48v114c0 10-8 18-18 18H84c-10 0-18-8-18-18V98Z" fill="#f4edf5"/><path d="M66 98h48v28c-16-10-32 10-48 0V98Z" fill="#09060d"/><g transform-origin="90 75"><animateTransform attributeName="transform" type="skewX" values="-4;6;-3;-4" dur=".8s" repeatCount="indefinite"/><path d="M92 17c22 28 26 48 11 66-13 16-39 10-42-10-3-19 20-30 20-56 5 12 8 18 11 0Z" fill="#ef314d"/><path d="M90 48c10 13 12 23 4 32-7 8-19 5-21-5-1-9 10-15 10-28 3 6 5 9 7 1Z" fill="#ffc857"/></g></svg>`
    },
    {
      id: 'moon-orbit',
      title: 'Moon Orbit',
      tags: ['moon', 'orbit', 'purple', 'night'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="none"/><circle cx="120" cy="120" r="74" fill="none" stroke="#09060d" stroke-width="8" stroke-dasharray="12 13"/><path d="M122 53c-31 9-53 38-53 72 0 41 34 75 75 75 24 0 45-11 59-29-54 8-93-45-81-118Z" fill="#f4edf5"/><circle cx="120" cy="120" r="78" fill="none" stroke="#7d38ff" stroke-width="4"><animateTransform attributeName="transform" type="rotate" from="0 120 120" to="360 120 120" dur="3.2s" repeatCount="indefinite"/></circle><circle cx="198" cy="120" r="10" fill="#ef314d"><animateTransform attributeName="transform" type="rotate" from="0 120 120" to="360 120 120" dur="3.2s" repeatCount="indefinite"/></circle></svg>`
    },
    {
      id: 'velvet-rain',
      title: 'Velvet Rain',
      tags: ['rain', 'red', 'purple', 'falling'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><rect width="240" height="240" fill="none"/><g stroke-linecap="round" stroke-width="10"><path d="M55 16v48" stroke="#ef314d"><animate attributeName="transform" values="translate(0 0);translate(0 176)" dur="1.3s" repeatCount="indefinite"/></path><path d="M118 -34v58" stroke="#7d38ff"><animate attributeName="transform" values="translate(0 0);translate(0 230)" dur="1.7s" repeatCount="indefinite"/></path><path d="M185 4v52" stroke="#f4edf5"><animate attributeName="transform" values="translate(0 0);translate(0 190)" dur="1.1s" repeatCount="indefinite"/></path><path d="M90 -70v46" stroke="#a90f2e"><animate attributeName="transform" values="translate(0 0);translate(0 280)" dur="1.9s" repeatCount="indefinite"/></path></g><path d="M120 210c-33-27-54-49-54-76 0-16 12-28 28-28 11 0 20 7 26 19 6-12 15-19 26-19 16 0 28 12 28 28 0 27-21 49-54 76Z" fill="#09060d"/></svg>`
    },
    {
      id: 'lace-pulse',
      title: 'Lace Pulse',
      tags: ['lace', 'frame', 'pulse', 'white'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><rect width="260" height="260" fill="none"/><g transform-origin="130 130"><animateTransform attributeName="transform" type="scale" values="1;.93;1" dur="1.5s" repeatCount="indefinite"/><rect x="38" y="38" width="184" height="184" rx="18" fill="none" stroke="#09060d" stroke-width="16"/><path d="M130 13l13 28h-26l13-28ZM130 247l-13-28h26l-13 28ZM13 130l28-13v26l-28-13ZM247 130l-28 13v-26l28 13Z" fill="#f4edf5"/><path d="M75 75h110v110H75z" fill="none" stroke="#7d38ff" stroke-width="7" stroke-dasharray="10 9"/></g></svg>`
    },
    {
      id: 'key-spin',
      title: 'Key Spin',
      tags: ['key', 'spin', 'red', 'lock'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 160"><rect width="260" height="160" fill="none"/><g transform-origin="130 80"><animateTransform attributeName="transform" type="rotate" values="-6;6;-6" dur="1.2s" repeatCount="indefinite"/><path d="M47 80a38 38 0 1 0 76 0 38 38 0 0 0-76 0Zm25 0a13 13 0 1 1 26 0 13 13 0 0 1-26 0Z" fill="#09060d"/><path d="M118 72h112v20h-20v22h-25V92h-19v27h-25V92h-23Z" fill="#a90f2e"/></g></svg>`
    },
    {
      id: 'halo-blink',
      title: 'Halo Blink',
      tags: ['halo', 'blink', 'ring', 'white'],
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180"><rect width="260" height="180" fill="none"/><path d="M58 88c0-30 32-54 72-54s74 24 74 54-33 54-74 54-72-24-72-54Z" fill="none" stroke="#09060d" stroke-width="18"/><path d="M66 88c0-25 29-45 64-45s66 20 66 45-30 45-66 45-64-20-64-45Z" fill="none" stroke="#f4edf5" stroke-width="8"><animate attributeName="opacity" values=".35;1;.35" dur="1.05s" repeatCount="indefinite"/></path><path d="M178 31l-18 36h29l-17 38 49-58h-30l16-31-29 15Z" fill="#ef314d"><animate attributeName="opacity" values="1;.25;1" dur="1.05s" repeatCount="indefinite"/></path></svg>`
    }
  ]
};

function localAssetResults(type, term) {
  const query = term.toLowerCase();
  const catalog = type === 'sticker'
    ? [
        ...recommendedAssets.sticker.map((item) => ({ ...item, assetType: 'sticker' })),
        ...recommendedAssets.gif.map((item) => ({ ...item, assetType: 'gif' }))
      ]
    : (recommendedAssets[type] || []).map((item) => ({ ...item, assetType: type }));
  const filtered = query
    ? catalog.filter((item) => [item.title, ...(item.tags || [])].join(' ').toLowerCase().includes(query))
    : catalog;

  return filtered.map((item) => ({
    id: item.id,
    type,
    assetType: item.assetType,
    title: item.title,
    previewUrl: svgDataUri(item.svg),
    url: svgDataUri(item.svg),
    source: 'Cara Mia'
  }));
}

async function giphyAssetResults(type, term) {
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) return null;

  const query = term.trim();
  const action = query.length >= 2 ? 'search' : 'trending';
  const endpoints = type === 'sticker'
    ? [
        { endpoint: 'stickers', assetType: 'sticker' },
        { endpoint: 'gifs', assetType: 'gif' }
      ]
    : [{ endpoint: type === 'gif' ? 'gifs' : 'stickers', assetType: type }];

  const searches = endpoints.map(async ({ endpoint, assetType }) => {
    const url = new URL(`https://api.giphy.com/v1/${endpoint}/${action}`);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('limit', type === 'sticker' ? '12' : '24');
    url.searchParams.set('rating', 'g');
    if (action === 'search') {
      url.searchParams.set('q', query);
      url.searchParams.set('lang', 'en');
    }

    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];

    const payload = await response.json();
    return (payload.data || []).map((item) => ({
      id: String(item.id),
      type,
      assetType,
      title: item.title || `${assetType} result`,
      previewUrl: item.images?.fixed_width_small?.url || item.images?.downsized?.url || item.images?.original?.url,
      url: item.images?.original?.url || item.images?.downsized?.url,
      source: 'GIPHY'
    })).filter((item) => item.url);
  });

  const results = (await Promise.all(searches)).flat();
  return results.length ? results.slice(0, 24) : null;
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
    const exhibit = await ensureDefaultExhibit(userId);
    const savedUser = await get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!savedUser || !exhibit) {
      const error = new Error('Account could not be saved. Please try again.');
      error.statusCode = 500;
      throw error;
    }
    scheduleDatabaseExport();

    res.status(201).json({ ok: true, user: publicUser(savedUser) });
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
    scheduleDatabaseExport();
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

app.get('/api/exhibits/:id/events', requireAuth, async (req, res, next) => {
  try {
    const access = await getAccess(req.params.id, req.user.id);
    if (!access) {
      return res.status(404).json({ error: 'This exhibit is not available.' });
    }

    res.set({
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'X-Accel-Buffering': 'no'
    });
    res.flushHeaders?.();
    res.write(': connected\n\n');

    const client = {
      id: cleanClientId(req.query.clientId),
      res
    };
    addExhibitStream(req.params.id, client);
    writeLiveEvent(res, 'ready', { exhibitId: req.params.id });

    const heartbeat = setInterval(() => {
      res.write(': heartbeat\n\n');
    }, 25000);

    req.on('close', () => {
      clearInterval(heartbeat);
      removeExhibitStream(req.params.id, client);
    });
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
    if (!['canvas', 'wordbox', 'music', 'sticker', 'gif'].includes(type)) {
      return res.status(400).json({ error: 'Choose a valid widget.' });
    }

    const maxRow = await get('SELECT MAX(z_index) AS max_z FROM widgets WHERE exhibit_id = ?', [exhibitId]);
    const widget = {
      id: randomUUID(),
      exhibitId,
      type,
      x: clampNumber(req.body.x, 120, -10000, 10000),
      y: clampNumber(req.body.y, 120, -10000, 10000),
      width: clampNumber(req.body.width, ['music', 'sticker', 'gif'].includes(type) ? 300 : 260, 40, 3000),
      height: clampNumber(req.body.height, type === 'music' ? 120 : ['sticker', 'gif'].includes(type) ? 240 : 180, 40, 3000),
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
    scheduleDatabaseExport();
    const normalized = normalizeWidget(saved);
    broadcastExhibitEvent(exhibitId, 'widget-created', {
      sourceClientId: cleanClientId(req.get('x-cara-mia-client-id')),
      widget: normalized
    });
    res.status(201).json({ widget: normalized });
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
    scheduleDatabaseExport();
    const normalized = normalizeWidget(saved);
    broadcastExhibitEvent(existing.exhibit_id, 'widget-updated', {
      sourceClientId: cleanClientId(req.get('x-cara-mia-client-id')),
      widget: normalized
    });
    res.json({ widget: normalized });
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
    scheduleDatabaseExport();
    broadcastExhibitEvent(existing.exhibit_id, 'widget-deleted', {
      sourceClientId: cleanClientId(req.get('x-cara-mia-client-id')),
      widgetId: req.params.id
    });
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

    scheduleDatabaseExport();
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

app.get('/api/assets/search', requireAuth, async (req, res, next) => {
  try {
    const type = String(req.query.type || '').trim().toLowerCase();
    const term = String(req.query.q || '').trim();
    if (!['sticker', 'gif'].includes(type)) {
      return res.status(400).json({ error: 'Choose sticker or GIF.' });
    }

    const remoteResults = await giphyAssetResults(type, term);
    const results = remoteResults?.length ? remoteResults : localAssetResults(type, term);
    res.json({ results });
  } catch (error) {
    if (error.name === 'TimeoutError') {
      return res.status(504).json({ error: 'Asset search took too long.' });
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
