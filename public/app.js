const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const colors = [
  '#050406',
  '#ffffff',
  '#d8d2d7',
  '#8d8a94',
  '#7d38ff',
  '#b06cff',
  '#4f178f',
  '#24103d',
  '#ef314d',
  '#a90f2e',
  '#5a0719',
  '#ff95ac',
  '#ff6b2d',
  '#ffc857',
  '#2de2e6',
  '#5dff9b',
  '#2f80ed',
  '#111827',
  '#7a4a2e',
  '#f7e7ce',
  '#ff4fd8',
  '#7f1d1d',
  '#334155',
  '#000000'
];
const widgetColors = [
  'rgba(255,255,255,0.88)',
  'rgba(245,241,246,0.76)',
  'rgba(216,210,215,0.72)',
  'rgba(140,134,148,0.76)',
  'rgba(5,4,6,0.9)',
  'rgba(24,12,35,0.9)',
  'rgba(38,16,64,0.82)',
  'rgba(79,23,143,0.78)',
  'rgba(125,56,255,0.72)',
  'rgba(176,108,255,0.66)',
  'rgba(90,7,25,0.84)',
  'rgba(169,15,46,0.76)',
  'rgba(239,49,77,0.7)',
  'rgba(255,149,172,0.66)',
  'rgba(47,128,237,0.68)',
  'rgba(45,226,230,0.62)',
  'rgba(93,255,155,0.56)',
  'rgba(255,200,87,0.64)',
  'rgba(127,29,29,0.78)',
  'rgba(51,65,85,0.78)'
];
const musicPlayerColors = [
  '#f6e8f1',
  '#efd6e4',
  '#d7cbd3',
  '#b7a7b7',
  '#8e8191',
  '#ffffff',
  '#1b1b1d',
  '#2a2a2a',
  '#050406',
  '#f1bfd4',
  '#ce8fab',
  '#7b4c69',
  '#5a0719',
  '#7b1238',
  '#a90f2e',
  '#421062',
  '#1f1230',
  '#24103d',
  '#2f80ed'
];
const borderColors = ['transparent', '#050406', '#ffffff', '#d8d2d7', '#7d38ff', '#ef314d', '#ffc857', '#2de2e6'];
const widgetShapes = [
  { id: 'rect', label: 'Square', radius: '8px' },
  { id: 'round', label: 'Round', radius: '24px' },
  { id: 'circle', label: 'Circle', radius: '999px' },
  { id: 'arch', label: 'Arch', radius: '999px 999px 18px 18px' },
  { id: 'diamond', label: 'Diamond', radius: '8px', clip: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' },
  { id: 'ticket', label: 'Ticket', radius: '34px 8px 34px 8px' },
  { id: 'heart', label: 'Heart', radius: '14px', clip: 'polygon(50% 92%, 14% 58%, 6% 36%, 12% 18%, 27% 8%, 42% 14%, 50% 28%, 58% 14%, 73% 8%, 88% 18%, 94% 36%, 86% 58%)' },
  { id: 'star', label: 'Star', radius: '8px', clip: 'polygon(50% 3%, 61% 35%, 95% 35%, 67% 54%, 78% 90%, 50% 68%, 22% 90%, 33% 54%, 5% 35%, 39% 35%)' },
  { id: 'hex', label: 'Hexagon', radius: '8px', clip: 'polygon(25% 5%, 75% 5%, 98% 50%, 75% 95%, 25% 95%, 2% 50%)' },
  { id: 'gem', label: 'Gem', radius: '8px', clip: 'polygon(50% 0, 92% 24%, 80% 100%, 20% 100%, 8% 24%)' }
];
const gothicFlowPath = [
  { x: 7, y: 11 },
  { x: 21, y: 12 },
  { x: 39, y: 8 },
  { x: 56, y: 9 },
  { x: 73, y: 7 },
  { x: 83, y: 24 },
  { x: 78, y: 43 },
  { x: 72, y: 59 },
  { x: 80, y: 82 },
  { x: 55, y: 94 },
  { x: 29, y: 94 },
  { x: 9, y: 83 }
];
const wordFonts = [
  { label: 'Bricolage', value: '"Bricolage Grotesque", Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Garamond', value: 'Garamond, "Times New Roman", serif' },
  { label: 'Times', value: '"Times New Roman", serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Trebuchet', value: '"Trebuchet MS", sans-serif' },
  { label: 'Courier', value: '"Courier New", monospace' },
  { label: 'Impact', value: 'Impact, Haettenschweiler, sans-serif' }
];
const clientId = window.crypto?.randomUUID?.() || `cm-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const cursorPresets = [
  { id: 'arrow', label: 'Arrow', url: '' },
  { id: 'preset-1', label: 'Preset 1', url: '/cursors/preset-1.png' },
  { id: 'preset-2', label: 'Preset 2', url: '/cursors/preset-2.png' },
  { id: 'preset-3', label: 'Preset 3', url: '/cursors/preset-3.png' },
  { id: 'preset-4', label: 'Preset 4', url: '/cursors/preset-4.png' },
  { id: 'preset-5', label: 'Preset 5', url: '/cursors/preset-5.png' }
];
const backgroundPresets = [
  { id: 'default', label: 'Hearts', url: '' },
  { id: 'goth', label: 'Goth', url: '/backgrounds/goth.jpg' },
  { id: 'starry', label: 'Starry', url: '/backgrounds/starry.jpg' },
  { id: 'office', label: 'Office', url: '/backgrounds/office.jpg' },
  { id: 'dream', label: 'Dream', url: '/backgrounds/dream.jpg' }
];
const cursorColors = ['#7d38ff', '#ef314d', '#f1bfd4', '#2de2e6', '#5dff9b', '#ffc857', '#ffffff', '#050406'];
const randomCursorColor = cursorColors[Math.floor(Math.random() * cursorColors.length)];
const boardSize = { width: 5200, height: 3600 };
const zoomLimits = { min: 0.35, max: 2.25, step: 0.1 };
const cursorPresenceInterval = 150;
const cursorPresenceMinDistance = 6;
const gothicFlowFrameMs = 42;
const canvasUndoLimit = 24;
const appUndoLimit = 40;

const state = {
  user: null,
  exhibits: [],
  exhibit: null,
  selectedTool: null,
  activePageId: null,
  viewMode: 'edit',
  viewport: {
    zoom: 1,
    panning: null
  },
  brush: {
    utensil: 'brush',
    color: '#050406',
    size: 8
  },
  draft: null,
  moveCandidate: null,
  moving: null,
  resizing: null,
  pendingMusic: null,
  pendingPresentation: 'cover',
  pendingAssetType: 'sticker',
  pendingPageAction: null,
  drawingFrame: null,
  pendingDrawPoint: null,
  activeDrawingCanvas: null,
  canvasHistories: new WeakMap(),
  liveEvents: null,
  liveExhibitId: null,
  liveRetryTimer: null,
  cursorProfile: loadCursorProfile(),
  cursorPeers: new Map(),
  cursorNodes: new Map(),
  cursorSendTimer: null,
  pendingCursorPoint: null,
  cursorLastSentPoint: null,
  cursorLastSentAt: 0,
  pendingLocalCursorPoint: null,
  localCursorFrame: null,
  localCursorKey: '',
  appUndoStack: [],
  lastUndoDomain: null,
  boardRect: null,
  gothicLastFrame: 0,
  saveTimers: new Map(),
  controlTimers: new WeakMap()
};

const authView = $('#authView');
const studioView = $('#studioView');
const loginPanel = $('#loginPanel');
const signupPanel = $('#signupPanel');
const loginForm = $('#loginForm');
const signupForm = $('#signupForm');
const showSignupButton = $('#showSignupButton');
const showLoginButton = $('#showLoginButton');
const board = $('#board');
const boardViewport = $('#boardViewport');
const dragPreview = $('#dragPreview');
const localCursor = $('#localCursor');
const themeField = $('#themeField');
const exhibitPicker = $('#exhibitPicker');
const cursorSettingsButton = $('#cursorSettingsButton');
const readModeButton = $('#readModeButton');
const editModeButton = $('#editModeButton');
const downloadShotButton = $('#downloadShotButton');
const rolePill = $('#rolePill');
const shareButton = $('#shareButton');
const logoutButton = $('#logoutButton');
const pagePicker = $('#pagePicker');
const addPageButton = $('#addPageButton');
const renamePageButton = $('#renamePageButton');
const zoomOutButton = $('#zoomOutButton');
const zoomInButton = $('#zoomInButton');
const zoomValue = $('#zoomValue');
const brushPanel = $('#brushPanel');
const brushSize = $('#brushSize');
const colorRail = $('#colorRail');
const toast = $('#toast');
const shareDialog = $('#shareDialog');
const shareForm = $('#shareForm');
const pageDialog = $('#pageDialog');
const pageForm = $('#pageForm');
const pageDialogTitle = $('#pageDialogTitle');
const pageNameInput = $('#pageNameInput');
const cursorDialog = $('#cursorDialog');
const cursorPreview = $('#cursorPreview');
const cursorColorInput = $('#cursorColorInput');
const cursorPresetGrid = $('#cursorPresetGrid');
const cursorUploadInput = $('#cursorUploadInput');
const backgroundPresetGrid = $('#backgroundPresetGrid');
const musicDialog = $('#musicDialog');
const musicSearchForm = $('#musicSearchForm');
const musicSearchInput = $('#musicSearchInput');
const musicResults = $('#musicResults');
const musicChoice = $('#musicChoice');
const applyMusicButton = $('#applyMusicButton');
const assetDialog = $('#assetDialog');
const assetDialogTitle = $('#assetDialogTitle');
const assetSearchForm = $('#assetSearchForm');
const assetSearchInput = $('#assetSearchInput');
const assetResults = $('#assetResults');

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      'X-Cara-Mia-Client-Id': clientId,
      ...(options.headers || {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Something went wrong.');
  }
  return payload;
}

function loadCursorProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem('caraMiaCursorProfile') || '{}');
    return {
      color: /^#[0-9a-fA-F]{6}$/.test(saved.color) ? saved.color : randomCursorColor,
      cursorImage: typeof saved.cursorImage === 'string' ? saved.cursorImage : ''
    };
  } catch {
    return { color: randomCursorColor, cursorImage: '' };
  }
}

function saveCursorProfile() {
  localStorage.setItem('caraMiaCursorProfile', JSON.stringify(state.cursorProfile));
}

function activeCursorPreset() {
  return cursorPresets.find((preset) => preset.url && preset.url === state.cursorProfile.cursorImage)?.id
    || (state.cursorProfile.cursorImage ? 'custom' : 'arrow');
}

function activeBackgroundPreset() {
  const pageTheme = activePage()?.backgroundTheme || 'default';
  return backgroundPresets.some((preset) => preset.id === pageTheme)
    ? pageTheme
    : 'default';
}

function cursorPayload(point) {
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
    color: state.cursorProfile.color,
    cursorImage: state.cursorProfile.cursorImage
  };
}

function remoteCursorMarkup(peer) {
  if (peer.cursorKind === 'image' && peer.cursorImage) {
    return `<img src="${peer.cursorImage}" alt="">`;
  }
  return '<span class="remote-cursor-arrow"></span>';
}

function localCursorMarkup() {
  return state.cursorProfile.cursorImage
    ? `<img src="${state.cursorProfile.cursorImage}" alt="">`
    : '<span class="remote-cursor-arrow"></span>';
}

function localCursorKey() {
  return [
    state.cursorProfile.color,
    state.cursorProfile.cursorImage,
    state.user?.accountId || 'you'
  ].join('|');
}

function ensureLocalCursorContents() {
  if (!localCursor) return;
  if (!state.cursorProfile.cursorImage) {
    state.localCursorKey = 'default';
    localCursor.classList.add('hidden');
    localCursor.innerHTML = '';
    return;
  }
  const nextKey = localCursorKey();
  if (state.localCursorKey === nextKey) return;
  state.localCursorKey = nextKey;
  localCursor.style.setProperty('--cursor-color', state.cursorProfile.color);
  localCursor.classList.toggle('image-cursor', Boolean(state.cursorProfile.cursorImage));
  localCursor.classList.toggle('arrow-cursor', !state.cursorProfile.cursorImage);
  localCursor.innerHTML = `${localCursorMarkup()}<strong>${state.user?.accountId || 'you'}</strong>`;
}

function moveLocalCursor(point) {
  if (!localCursor) return;
  if (!state.cursorProfile.cursorImage) {
    localCursor.classList.add('hidden');
    return;
  }
  localCursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
  localCursor.classList.remove('hidden');
}

function renderLocalCursor(point = null) {
  if (!localCursor) return;
  ensureLocalCursorContents();
  if (!point) return;

  state.pendingLocalCursorPoint = point;
  if (state.localCursorFrame) return;
  state.localCursorFrame = window.requestAnimationFrame(() => {
    state.localCursorFrame = null;
    if (state.pendingLocalCursorPoint) {
      moveLocalCursor(state.pendingLocalCursorPoint);
      state.pendingLocalCursorPoint = null;
    }
  });
}

function cursorNodeKey(peer) {
  return [
    peer.cursorKind || '',
    peer.cursorImage || '',
    peer.color || '',
    peer.accountId || ''
  ].join('|');
}

function renderRemoteCursor(id, peer) {
  if (!state.exhibit || peer.exhibitId !== state.exhibit.id) return;
  let cursor = state.cursorNodes.get(id);
  if (!cursor) {
    cursor = document.createElement('div');
    state.cursorNodes.set(id, cursor);
    board.appendChild(cursor);
  }

  const nextKey = cursorNodeKey(peer);
  if (cursor.dataset.cursorKey !== nextKey) {
    cursor.dataset.cursorKey = nextKey;
    cursor.className = `remote-cursor ${peer.cursorKind === 'image' ? 'image-cursor' : 'arrow-cursor'}`;
    cursor.style.setProperty('--cursor-color', peer.color || '#7d38ff');
    cursor.innerHTML = `${remoteCursorMarkup(peer)}<strong>${peer.accountId || 'guest'}</strong>`;
  }
  cursor.style.transform = `translate3d(${peer.x}px, ${peer.y}px, 0)`;
}

function renderRemoteCursors() {
  state.cursorPeers.forEach((peer, id) => {
    if (!state.exhibit || peer.exhibitId !== state.exhibit.id) return;
    if (Date.now() - peer.updatedAt > 12000) {
      state.cursorPeers.delete(id);
      state.cursorNodes.get(id)?.remove();
      state.cursorNodes.delete(id);
      return;
    }
    renderRemoteCursor(id, peer);
  });
  state.cursorNodes.forEach((cursor, id) => {
    if (!state.cursorPeers.has(id)) {
      cursor.remove();
      state.cursorNodes.delete(id);
    }
  });
}

function removeRemoteCursors() {
  state.cursorPeers.clear();
  state.cursorNodes.forEach((cursor) => cursor.remove());
  state.cursorNodes.clear();
}

function handleCursorUpdate(payload) {
  if (!state.exhibit || payload.sourceClientId === clientId) return;
  const peer = {
    ...payload,
    exhibitId: state.exhibit.id,
    updatedAt: Date.now()
  };
  state.cursorPeers.set(payload.sourceClientId, peer);
  renderRemoteCursor(payload.sourceClientId, peer);
}

function handleCursorLeft(payload) {
  state.cursorPeers.delete(payload.sourceClientId);
  state.cursorNodes.get(payload.sourceClientId)?.remove();
  state.cursorNodes.delete(payload.sourceClientId);
}

function sendCursorPresence(point) {
  if (!state.exhibit) return;
  state.cursorLastSentPoint = point;
  state.cursorLastSentAt = Date.now();
  api(`/api/exhibits/${state.exhibit.id}/presence`, {
    method: 'POST',
    body: JSON.stringify(cursorPayload(point))
  }).catch(() => {});
}

function shouldSendCursorPresence(point) {
  if (!state.cursorLastSentPoint) return true;
  const dx = point.x - state.cursorLastSentPoint.x;
  const dy = point.y - state.cursorLastSentPoint.y;
  const movedEnough = Math.hypot(dx, dy) >= cursorPresenceMinDistance;
  const waitedEnough = Date.now() - state.cursorLastSentAt > 700;
  return movedEnough || waitedEnough;
}

function queueCursorPresence(point) {
  if (!state.exhibit) return;
  state.pendingCursorPoint = point;
  if (state.cursorSendTimer) return;

  state.cursorSendTimer = window.setTimeout(() => {
    state.cursorSendTimer = null;
    if (state.pendingCursorPoint && shouldSendCursorPresence(state.pendingCursorPoint)) {
      sendCursorPresence(state.pendingCursorPoint);
    }
    state.pendingCursorPoint = null;
  }, cursorPresenceInterval);
}

function setLocalCursorImage() {
  board.classList.toggle('custom-cursor-active', Boolean(state.cursorProfile.cursorImage));
  renderLocalCursor();
}

function renderCursorPreview() {
  cursorColorInput.value = state.cursorProfile.color;
  cursorPreview.style.setProperty('--cursor-color', state.cursorProfile.color);
  cursorPreview.innerHTML = state.cursorProfile.cursorImage
    ? `<img src="${state.cursorProfile.cursorImage}" alt="">`
    : '<span class="remote-cursor-arrow"></span>';

  $$('.cursor-preset').forEach((button) => {
    button.classList.toggle('active', button.dataset.preset === activeCursorPreset());
  });
  setLocalCursorImage();
}

function buildCursorPresets() {
  cursorPresetGrid.innerHTML = '';
  cursorPresets.forEach((preset) => {
    const button = document.createElement('button');
    button.className = 'cursor-preset';
    button.type = 'button';
    button.dataset.preset = preset.id;
    button.title = preset.label;
    button.innerHTML = preset.url
      ? `<img src="${preset.url}" alt="">`
      : '<span class="default-cursor-mark"><span class="remote-cursor-arrow"></span><strong>Default</strong></span>';
    button.addEventListener('click', () => {
      state.cursorProfile.cursorImage = preset.url;
      saveCursorProfile();
      renderCursorPreview();
      if (state.pendingCursorPoint) sendCursorPresence(state.pendingCursorPoint);
    });
    cursorPresetGrid.appendChild(button);
  });
  renderCursorPreview();
}

function applyBackgroundTheme() {
  document.body.dataset.backgroundTheme = activeBackgroundPreset();
}

function renderBackgroundPresets() {
  if (!backgroundPresetGrid) return;
  backgroundPresetGrid.innerHTML = '';
  backgroundPresets.forEach((preset) => {
    const button = document.createElement('button');
    button.className = 'background-preset';
    button.type = 'button';
    button.dataset.background = preset.id;
    button.title = preset.label;
    button.innerHTML = preset.url
      ? `<span class="background-preset-thumb" style="background-image: url('${preset.url}')"></span><strong>${preset.label}</strong>`
      : '<span class="background-preset-thumb default-thumb"></span><strong>Hearts</strong>';
    button.classList.toggle('active', preset.id === activeBackgroundPreset());
    button.addEventListener('click', async () => {
      if (!state.exhibit || !state.activePageId) return;
      try {
        const { pages } = await api(`/api/exhibits/${state.exhibit.id}/pages/${state.activePageId}`, {
          method: 'PATCH',
          body: JSON.stringify({ backgroundTheme: preset.id })
        });
        state.exhibit.pages = pages;
        applyBackgroundTheme();
        renderBackgroundPresets();
      } catch (error) {
        showToast(error.message);
      }
    });
    backgroundPresetGrid.appendChild(button);
  });
}

function resizeCursorUpload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 220;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function createHearts() {
  const field = $('#heartField');
  field.innerHTML = '';
  const gothicColors = [
    'rgba(0, 0, 0, 0.98)',
    'rgba(5, 4, 7, 0.96)',
    'rgba(15, 13, 18, 0.9)',
    'rgba(42, 38, 48, 0.62)',
    'rgba(20, 6, 34, 0.66)',
    'rgba(56, 12, 88, 0.45)',
    'rgba(50, 2, 17, 0.7)',
    'rgba(112, 8, 34, 0.4)',
    'rgba(205, 196, 210, 0.1)'
  ];

  for (let index = 0; index < 18; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.zIndex = String(30 - index);
    heart.style.setProperty('--duration', `${30 + (index % 6) * 2.2}s`);
    heart.style.setProperty('--delay', `${index * -1.4}s`);
    heart.style.setProperty('--start-scale', `${0.06 + (index % 4) * 0.015}`);
    heart.style.setProperty('--end-scale', `${4.6 + (index % 8) * 0.42}`);
    heart.style.setProperty('--blur', `${index % 9 === 8 ? 1.4 : 0}px`);
    heart.style.setProperty('--heart-opacity', `${0.32 + (index % 5) * 0.045}`);
    heart.style.setProperty('--heart-size', `${48 + (index % 10) * 18}px`);
    heart.style.setProperty('--heart-color', gothicColors[index % gothicColors.length]);
    field.appendChild(heart);
  }
}

function gothicPathPoint(time, offset = 0) {
  const duration = 11800;
  const normalized = ((((time + offset) % duration) + duration) % duration) / duration;
  const pathPosition = normalized * gothicFlowPath.length;
  const index = Math.floor(pathPosition);
  const nextIndex = (index + 1) % gothicFlowPath.length;
  const rawProgress = pathPosition - index;
  const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
  const current = gothicFlowPath[index];
  const next = gothicFlowPath[nextIndex];

  return {
    x: current.x + (next.x - current.x) * progress,
    y: current.y + (next.y - current.y) * progress
  };
}

function setGothicFlowVars(prefix, point) {
  themeField.style.setProperty(`--${prefix}-x`, `${point.x}%`);
  themeField.style.setProperty(`--${prefix}-y`, `${point.y}%`);
}

function animateGothicFlowLight(time = 0) {
  const shouldAnimate = themeField
    && document.body.dataset.backgroundTheme === 'goth'
    && !document.hidden;
  if (shouldAnimate && time - state.gothicLastFrame >= gothicFlowFrameMs) {
    state.gothicLastFrame = time;
    setGothicFlowVars('gothic-flow', gothicPathPoint(time));
    setGothicFlowVars('gothic-flow-mid', gothicPathPoint(time, -960));
    setGothicFlowVars('gothic-flow-tail', gothicPathPoint(time, -1900));
  }
  window.requestAnimationFrame(animateGothicFlowLight);
}

function setView(view) {
  authView.classList.toggle('hidden', view !== 'auth');
  studioView.classList.toggle('hidden', view !== 'studio');
}

function showLogin() {
  signupPanel.classList.add('hidden');
  loginPanel.classList.remove('hidden');
}

function showSignup() {
  loginPanel.classList.add('hidden');
  signupPanel.classList.remove('hidden');
}

function canEdit() {
  return state.viewMode === 'edit' && Boolean(state.exhibit?.canEdit);
}

function activePage() {
  return state.exhibit?.pages?.find((page) => page.id === state.activePageId) || state.exhibit?.pages?.[0] || null;
}

function setViewMode(mode) {
  state.viewMode = mode === 'read' ? 'read' : 'edit';
  document.body.classList.toggle('read-mode', state.viewMode === 'read');
  readModeButton.classList.toggle('hidden', state.viewMode === 'read');
  editModeButton.classList.toggle('hidden', state.viewMode !== 'read');
  downloadShotButton.classList.toggle('hidden', state.viewMode !== 'read');
  if (state.viewMode === 'read') {
    selectTool(null);
    clearWidgetSelection();
  }
  setControlsForRole();
  renderBoard();
}

function renderPagePicker() {
  pagePicker.innerHTML = '';
  const pages = state.exhibit?.pages?.length ? state.exhibit.pages : [];
  pages.forEach((page) => {
    const option = document.createElement('option');
    option.value = page.id;
    option.textContent = page.name;
    pagePicker.appendChild(option);
  });

  if (!pages.some((page) => page.id === state.activePageId)) {
    state.activePageId = pages[0]?.id || null;
  }
  if (state.activePageId) pagePicker.value = state.activePageId;
  pagePicker.disabled = !pages.length;
  addPageButton.disabled = !canEdit();
  renamePageButton.disabled = !canEdit() || !state.activePageId;
}

function setActivePage(pageId) {
  if (!state.exhibit?.pages?.some((page) => page.id === pageId)) return;
  state.activePageId = pageId;
  localStorage.setItem(`caraMiaPage:${state.exhibit.id}`, pageId);
  renderPagePicker();
  applyBackgroundTheme();
  renderBackgroundPresets();
  clearWidgetSelection();
  renderBoard();
}

function applyZoom(anchor = null) {
  const zoom = state.viewport.zoom;
  board.style.width = `${boardSize.width}px`;
  board.style.height = `${boardSize.height}px`;
  board.style.transform = `scale(${zoom})`;
  state.boardRect = null;
  zoomValue.textContent = `${Math.round(zoom * 100)}%`;

  if (anchor) {
    const beforeX = (boardViewport.scrollLeft + anchor.x) / anchor.previousZoom;
    const beforeY = (boardViewport.scrollTop + anchor.y) / anchor.previousZoom;
    boardViewport.scrollLeft = beforeX * zoom - anchor.x;
    boardViewport.scrollTop = beforeY * zoom - anchor.y;
  }
}

function setZoom(nextZoom, anchorPoint = null) {
  const previousZoom = state.viewport.zoom;
  state.viewport.zoom = Math.round(clamp(nextZoom, zoomLimits.min, zoomLimits.max) * 100) / 100;
  applyZoom(anchorPoint ? { ...anchorPoint, previousZoom } : null);
}

function selectTool(tool) {
  if (!canEdit() && tool !== null) {
    showToast('This exhibit is view only.');
    return;
  }

  state.selectedTool = state.selectedTool === tool ? null : tool;
  $$('.tool-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.tool === state.selectedTool);
  });
  brushPanel.classList.toggle('hidden', state.selectedTool !== 'brush');
}

function setControlsForRole() {
  const editable = canEdit();
  $$('.tool-button').forEach((button) => {
    button.disabled = !editable;
  });
  shareButton.disabled = !state.exhibit?.canShare;
  pagePicker.disabled = !state.exhibit?.pages?.length;
  addPageButton.disabled = !editable;
  renamePageButton.disabled = !editable || !state.activePageId;
  rolePill.textContent = (state.exhibit?.role || 'viewer').toUpperCase();
  if (!editable) {
    selectTool(null);
  }
}

function widgetData(widget) {
  return widget.data && typeof widget.data === 'object' ? widget.data : {};
}

function cloneWidget(widget) {
  return JSON.parse(JSON.stringify(widget));
}

function pushAppUndo(action) {
  state.appUndoStack.push(action);
  state.lastUndoDomain = 'app';
  if (state.appUndoStack.length > appUndoLimit) {
    state.appUndoStack.splice(0, state.appUndoStack.length - appUndoLimit);
  }
}

async function restoreDeletedWidget(action) {
  if (!canEdit() || !state.exhibit || !action?.widget) return false;

  const original = action.widget;
  const { widget } = await api('/api/widgets', {
    method: 'POST',
    body: JSON.stringify({
      exhibitId: state.exhibit.id,
      pageId: original.page_id || state.activePageId || activePage()?.id,
      type: original.type,
      x: original.x,
      y: original.y,
      width: original.width,
      height: original.height,
      data: widgetData(original)
    })
  });

  const { widget: saved } = await api(`/api/widgets/${widget.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      x: original.x,
      y: original.y,
      width: original.width,
      height: original.height,
      zIndex: original.z_index,
      pageId: original.page_id || state.activePageId,
      data: widgetData(original)
    })
  });

  const insertAt = clamp(Number(action.index), 0, state.exhibit.widgets.length);
  state.exhibit.widgets.splice(insertAt, 0, saved);
  state.exhibit.widgets.sort((a, b) => (a.z_index - b.z_index) || String(a.created_at).localeCompare(String(b.created_at)));
  if (saved.page_id) {
    state.activePageId = saved.page_id;
    localStorage.setItem(`caraMiaPage:${state.exhibit.id}`, saved.page_id);
  }
  applyBackgroundTheme();
  renderBackgroundPresets();
  renderBoard();
  showToast('Deleted item restored.');
  return true;
}

async function undoLastAppAction() {
  while (state.appUndoStack.length) {
    const action = state.appUndoStack.pop();
    if (action.type !== 'restore-widget') continue;
    const restored = await restoreDeletedWidget(action);
    if (restored && !state.appUndoStack.length) {
      state.lastUndoDomain = null;
    }
    return restored;
  }
  state.lastUndoDomain = null;
  return false;
}

function isTextEditingTarget(target) {
  return Boolean(target?.closest?.('input, textarea, select, [contenteditable="true"]'));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseHexColor(color) {
  if (!color || !color.startsWith('#')) return { r: 27, g: 27, b: 29 };
  const hex = color.slice(1);
  const normalized = hex.length === 3
    ? hex.split('').map((char) => `${char}${char}`).join('')
    : hex;

  if (normalized.length !== 6) return { r: 27, g: 27, b: 29 };
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
}

function colorIsDark({ r, g, b }) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.46;
}

function musicAlpha(data) {
  const alpha = Number(data.playerAlpha);
  return Number.isFinite(alpha) ? clamp(alpha, 0.35, 1) : 0.88;
}

function setMusicVisualVars(target, data) {
  const color = data.playerColor || '#f6e8f1';
  const rgb = parseHexColor(color);
  const dark = colorIsDark(rgb);
  target.style.setProperty('--player-color', color);
  target.style.setProperty('--player-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  target.style.setProperty('--player-alpha', `${musicAlpha(data)}`);
  target.style.setProperty('--player-ink', dark ? '#f8f4f8' : '#111016');
  target.style.setProperty('--player-muted', dark ? 'rgba(255,255,255,0.68)' : 'rgba(17,16,22,0.58)');
  target.style.setProperty('--player-track', dark ? 'rgba(255,255,255,0.22)' : 'rgba(17,16,22,0.14)');
  target.style.setProperty('--player-fill', dark ? 'rgba(255,255,255,0.74)' : 'rgba(17,16,22,0.42)');
}

function applyMusicVisuals(element, data) {
  setMusicVisualVars(element, data);
  const music = $('.music-widget', element);
  if (music) setMusicVisualVars(music, data);
}

function wordFont(data = {}) {
  return wordFonts.some((font) => font.value === data.fontFamily)
    ? data.fontFamily
    : wordFonts[0].value;
}

function wordFontSize(data = {}) {
  return clamp(Number(data.fontSize) || 18, 10, 72);
}

function setWordVisualVars(target, data = {}) {
  target.style.setProperty('--word-color', data.color || '#050406');
  target.style.setProperty('--word-font', wordFont(data));
  target.style.setProperty('--word-size', `${wordFontSize(data)}px`);
  target.style.setProperty('--word-weight', data.bold ? '800' : '500');
  target.style.setProperty('--word-style', data.italic ? 'italic' : 'normal');
}

function shapeConfig(data = {}) {
  return widgetShapes.find((shape) => shape.id === data.shape) || widgetShapes[0];
}

function setWidgetVisualVars(target, data = {}) {
  const shape = shapeConfig(data);
  target.style.setProperty('--widget-radius', shape.radius);
  target.style.setProperty('--widget-clip', shape.clip || 'none');
  target.style.setProperty('--widget-border-color', data.borderColor || 'rgba(255,255,255,0.16)');
  target.style.setProperty('--widget-border-width', `${Number(data.borderWidth ?? 1)}px`);
}

function updateSwatchSelection(container, activeValue) {
  $$('.mini-swatch, .color-swatch', container).forEach((swatch) => {
    swatch.classList.toggle('active', swatch.dataset.color === String(activeValue));
  });
}

function setWidgetData(widget, data) {
  widget.data = data;
  return data;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remaining}`;
}

function showWidgetControls(element, hold = false) {
  element.classList.add('controls-open');

  if (!hold) return;

  window.clearTimeout(state.controlTimers.get(element));
  const timer = window.setTimeout(() => {
    if (!element.matches(':hover')) {
      element.classList.remove('controls-open');
    }
    state.controlTimers.delete(element);
  }, 4000);
  state.controlTimers.set(element, timer);
}

function hideWidgetControls(element) {
  if (state.controlTimers.has(element)) return;
  element.classList.remove('controls-open');
}

function clearWidgetSelection() {
  $$('.art-widget').forEach((element) => {
    element.classList.remove('selected', 'controls-open');
    if (state.controlTimers.has(element)) {
      window.clearTimeout(state.controlTimers.get(element));
      state.controlTimers.delete(element);
    }
  });
}

function isPassiveWidgetTarget(event, widget) {
  const target = event.target;
  if (target.closest('.widget-menu, .move-handle, .resize-handle, button, input, select, textarea, audio')) {
    return false;
  }
  if (widget.type === 'canvas' && state.selectedTool === 'brush' && target.closest('canvas')) {
    return false;
  }
  return true;
}

function setMusicPresentation(presentation) {
  state.pendingPresentation = presentation;
  $$('[data-presentation]').forEach((button) => {
    button.classList.toggle('active', button.dataset.presentation === presentation);
  });
}

function boardPoint(event) {
  const rect = state.boardRect || board.getBoundingClientRect();
  state.boardRect = rect;
  return {
    x: (event.clientX - rect.left) / state.viewport.zoom,
    y: (event.clientY - rect.top) / state.viewport.zoom
  };
}

function normalizeRect(start, current) {
  return {
    x: Math.min(start.x, current.x),
    y: Math.min(start.y, current.y),
    width: Math.abs(current.x - start.x),
    height: Math.abs(current.y - start.y)
  };
}

function updateDragPreview(rect) {
  dragPreview.style.left = `${rect.x}px`;
  dragPreview.style.top = `${rect.y}px`;
  dragPreview.style.width = `${rect.width}px`;
  dragPreview.style.height = `${rect.height}px`;
  dragPreview.classList.remove('hidden');
}

function clearDragPreview() {
  dragPreview.classList.add('hidden');
  state.draft = null;
}

async function createWidget(type, rect, data = {}) {
  const payload = {
    exhibitId: state.exhibit.id,
    pageId: state.activePageId || activePage()?.id,
    type,
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    data
  };
  const { widget } = await api('/api/widgets', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  state.exhibit.widgets.push(widget);
  renderBoard();
  return widget;
}

function scheduleWidgetSave(widget, patch = {}, delay = 450) {
  if (!canEdit()) return;
  const next = {
    ...widget,
    ...patch,
    data: patch.data || widget.data
  };
  Object.assign(widget, next);

  window.clearTimeout(state.saveTimers.get(widget.id));
  state.saveTimers.set(
    widget.id,
    window.setTimeout(async () => {
      try {
        const { widget: saved } = await api(`/api/widgets/${widget.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            x: widget.x,
            y: widget.y,
            width: widget.width,
            height: widget.height,
            zIndex: widget.z_index,
            pageId: widget.page_id || state.activePageId,
            data: widget.data
          })
        });
        Object.assign(widget, saved);
      } catch (error) {
        showToast(error.message);
      } finally {
        state.saveTimers.delete(widget.id);
      }
    }, delay)
  );
}

function appendWordboxControls(menu, widget, element, data) {
  const fontSelect = document.createElement('select');
  fontSelect.className = 'word-font-select';
  fontSelect.title = 'Font';
  fontSelect.setAttribute('aria-label', 'Font');
  wordFonts.forEach((font) => {
    const option = document.createElement('option');
    option.value = font.value;
    option.textContent = font.label;
    option.selected = font.value === wordFont(data);
    fontSelect.appendChild(option);
  });
  fontSelect.addEventListener('change', (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, { ...widgetData(widget), fontFamily: fontSelect.value });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    setWordVisualVars(element, nextData);
  });
  menu.appendChild(fontSelect);

  const formatRow = document.createElement('div');
  formatRow.className = 'word-format-row';

  const makeFormatButton = (label, key, className = '') => {
    const button = document.createElement('button');
    button.className = `mini-button word-format-button ${className}`.trim();
    button.type = 'button';
    button.title = label;
    button.textContent = label[0];
    button.classList.toggle('active', Boolean(data[key]));
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, { ...widgetData(widget), [key]: !widgetData(widget)[key] });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWordVisualVars(element, nextData);
      button.classList.toggle('active', Boolean(nextData[key]));
    });
    return button;
  };

  formatRow.appendChild(makeFormatButton('Bold', 'bold'));
  formatRow.appendChild(makeFormatButton('Italic', 'italic', 'italic'));

  const sizeControl = document.createElement('label');
  sizeControl.className = 'word-size-control';
  sizeControl.title = 'Text size';
  sizeControl.innerHTML = '<i data-lucide="type"></i>';

  const sizeInput = document.createElement('input');
  sizeInput.type = 'range';
  sizeInput.min = '10';
  sizeInput.max = '72';
  sizeInput.value = String(wordFontSize(data));
  sizeInput.setAttribute('aria-label', 'Text size');
  sizeInput.addEventListener('input', (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, { ...widgetData(widget), fontSize: Number(sizeInput.value) });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    setWordVisualVars(element, nextData);
  });
  sizeControl.appendChild(sizeInput);
  formatRow.appendChild(sizeControl);
  menu.appendChild(formatRow);

  const colorRow = document.createElement('div');
  colorRow.className = 'word-color-row';
  colors.forEach((color) => {
    const swatch = document.createElement('button');
    swatch.className = 'mini-swatch word-color-swatch';
    swatch.type = 'button';
    swatch.title = 'Text color';
    swatch.dataset.color = color;
    swatch.style.background = color;
    swatch.classList.toggle('active', color === (data.color || '#050406'));
    swatch.addEventListener('click', (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, { ...widgetData(widget), color });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWordVisualVars(element, nextData);
      updateSwatchSelection(colorRow, color);
    });
    colorRow.appendChild(swatch);
  });
  menu.appendChild(colorRow);
}

function appendBorderControls(menu, widget, element) {
  const borderRow = document.createElement('div');
  borderRow.className = 'border-control-row';
  borderColors.forEach((color) => {
    const swatch = document.createElement('button');
    swatch.className = `mini-swatch border-swatch ${color === 'transparent' ? 'transparent-swatch' : ''}`.trim();
    swatch.type = 'button';
    swatch.title = color === 'transparent' ? 'No border' : 'Border color';
    swatch.dataset.color = color;
    swatch.style.background = color;
    swatch.classList.toggle('active', color === (widgetData(widget).borderColor || 'rgba(255,255,255,0.16)'));
    swatch.addEventListener('click', (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, { ...widgetData(widget), borderColor: color, borderWidth: color === 'transparent' ? 0 : (widgetData(widget).borderWidth || 2) });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWidgetVisualVars(element, nextData);
      updateSwatchSelection(borderRow, color);
    });
    borderRow.appendChild(swatch);
  });
  menu.appendChild(borderRow);

  const widthControl = document.createElement('label');
  widthControl.className = 'border-width-control';
  widthControl.title = 'Border width';
  widthControl.innerHTML = '<i data-lucide="panel-top"></i>';
  const widthInput = document.createElement('input');
  widthInput.type = 'range';
  widthInput.min = '0';
  widthInput.max = '14';
  widthInput.value = String(Number(widgetData(widget).borderWidth ?? 1));
  widthInput.setAttribute('aria-label', 'Border width');
  widthInput.addEventListener('input', (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, { ...widgetData(widget), borderWidth: Number(widthInput.value) });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    setWidgetVisualVars(element, nextData);
  });
  widthControl.appendChild(widthInput);
  menu.appendChild(widthControl);
}

function appendShapeControls(menu, widget, element) {
  const shapeRow = document.createElement('div');
  shapeRow.className = 'shape-control-row';
  widgetShapes.forEach((shape) => {
    const button = document.createElement('button');
    button.className = `shape-button shape-${shape.id}`;
    button.type = 'button';
    button.title = shape.label;
    button.classList.toggle('active', shapeConfig(widgetData(widget)).id === shape.id);
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, { ...widgetData(widget), shape: shape.id });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWidgetVisualVars(element, nextData);
      $$('.shape-button', shapeRow).forEach((item) => item.classList.toggle('active', item === button));
    });
    shapeRow.appendChild(button);
  });
  menu.appendChild(shapeRow);
}

function widgetShell(widget) {
  const data = widgetData(widget);
  const element = document.createElement('article');
  element.className = `art-widget ${widget.type}-shell external-controls`;
  if (widget.x + widget.width > board.clientWidth - 176) {
    element.classList.add('controls-left');
  }
  element.dataset.widgetId = widget.id;
  element.style.left = `${widget.x}px`;
  element.style.top = `${widget.y}px`;
  element.style.width = `${widget.width}px`;
  element.style.height = `${widget.height}px`;
  element.style.zIndex = widget.z_index;
  element.style.setProperty('--widget-bg', data.background || 'rgba(255,255,255,0.84)');
  setWidgetVisualVars(element, data);
  setWordVisualVars(element, data);
  setMusicVisualVars(element, data);

  element.addEventListener('pointerdown', (event) => {
    $$('.art-widget').forEach((item) => item.classList.remove('selected'));
    element.classList.add('selected');
    showWidgetControls(element, true);
    if (canEdit() && isPassiveWidgetTarget(event, widget)) {
      queueWidgetMove(event, widget, element);
    }
  });
  element.addEventListener('pointerenter', () => {
    showWidgetControls(element);
  });
  element.addEventListener('pointerleave', () => {
    hideWidgetControls(element);
  });
  element.addEventListener('focusin', () => {
    showWidgetControls(element);
  });
  element.addEventListener('focusout', () => {
    hideWidgetControls(element);
  });

  if (canEdit()) {
    const handle = document.createElement('button');
    handle.className = 'move-handle';
    handle.type = 'button';
    handle.title = 'Move';
    handle.innerHTML = '<span class="drag-dots" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>';
    handle.addEventListener('pointerdown', (event) => startMove(event, widget, element));
    element.appendChild(handle);

    const menu = document.createElement('div');
    const deleteOnly = !(widget.type === 'canvas' || widget.type === 'wordbox' || widget.type === 'music');
    const menuType = widget.type === 'music'
      ? 'music-widget-menu'
      : widget.type === 'wordbox'
        ? 'wordbox-widget-menu'
        : 'color-widget-menu';
    menu.className = `widget-menu ${deleteOnly ? 'delete-widget-menu' : menuType}`;

    if (widget.type === 'canvas' || widget.type === 'wordbox' || widget.type === 'music') {
      const palette = widget.type === 'music' ? musicPlayerColors : widgetColors;
      const paletteRow = document.createElement('div');
      paletteRow.className = 'widget-color-row';
      palette.forEach((color) => {
        const swatch = document.createElement('button');
        swatch.className = 'mini-swatch';
        swatch.type = 'button';
        swatch.title = 'Color';
        swatch.dataset.color = color;
        swatch.style.background = color;
        const activeColor = widget.type === 'music'
          ? (data.playerColor || '#f6e8f1')
          : (data.background || 'rgba(255,255,255,0.84)');
        swatch.classList.toggle('active', color === activeColor);
        swatch.addEventListener('click', (event) => {
          event.stopPropagation();
          const key = widget.type === 'music' ? 'playerColor' : 'background';
          const previousBackground = canvasBackgroundColor(widget);
          const nextData = setWidgetData(widget, { ...widgetData(widget), [key]: color });
          if (widget.type === 'music') {
            applyMusicVisuals(element, nextData);
          } else {
            element.style.setProperty('--widget-bg', color);
            if (widget.type === 'canvas') {
              updateCanvasBackground(widget, element, nextData, previousBackground);
            }
          }
          scheduleWidgetSave(widget, { data: nextData }, 120);
          updateSwatchSelection(paletteRow, color);
        });
        paletteRow.appendChild(swatch);
      });
      menu.appendChild(paletteRow);

      if (widget.type === 'music') {
        const opacityControl = document.createElement('label');
        opacityControl.className = 'music-opacity-control';
        opacityControl.title = 'Transparency';
        opacityControl.innerHTML = '<i data-lucide="blend"></i>';

        const opacityInput = document.createElement('input');
        opacityInput.type = 'range';
        opacityInput.min = '35';
        opacityInput.max = '100';
        opacityInput.value = Math.round(musicAlpha(data) * 100);
        opacityInput.setAttribute('aria-label', 'Transparency');
        opacityInput.addEventListener('input', (event) => {
          event.stopPropagation();
          const nextData = setWidgetData(widget, { ...widgetData(widget), playerAlpha: Number(opacityInput.value) / 100 });
          scheduleWidgetSave(widget, { data: nextData }, 120);
          applyMusicVisuals(element, nextData);
        });
        opacityControl.appendChild(opacityInput);
        menu.appendChild(opacityControl);
      }

      appendBorderControls(menu, widget, element);
      if (widget.type === 'canvas' || widget.type === 'wordbox') {
        appendShapeControls(menu, widget, element);
      }

      if (widget.type === 'wordbox') {
        appendWordboxControls(menu, widget, element, data);
      }
    }

    const remove = document.createElement('button');
    remove.className = 'mini-button';
    remove.type = 'button';
    remove.title = 'Delete';
    remove.innerHTML = '<i data-lucide="trash-2"></i>';
    remove.addEventListener('click', async (event) => {
      event.stopPropagation();
      const deletedWidget = cloneWidget(widget);
      const deletedIndex = state.exhibit.widgets.findIndex((item) => item.id === widget.id);
      window.clearTimeout(state.saveTimers.get(widget.id));
      state.saveTimers.delete(widget.id);
      await api(`/api/widgets/${widget.id}`, { method: 'DELETE' });
      state.exhibit.widgets = state.exhibit.widgets.filter((item) => item.id !== widget.id);
      pushAppUndo({ type: 'restore-widget', widget: deletedWidget, index: deletedIndex });
      renderBoard();
      showToast('Deleted. Press Ctrl+Z to undo.');
    });
    menu.appendChild(remove);
    element.appendChild(menu);

    const resize = document.createElement('button');
    resize.className = 'resize-handle';
    resize.type = 'button';
    resize.title = 'Resize';
    resize.innerHTML = '<i data-lucide="move-diagonal-2"></i>';
    resize.addEventListener('pointerdown', (event) => startResize(event, widget, element));
    element.appendChild(resize);
  }

  return element;
}

function startMove(event, widget, element) {
  event.preventDefault();
  event.stopPropagation();

  const start = boardPoint(event);
  state.moving = {
    widget,
    element,
    start,
    originalX: widget.x,
    originalY: widget.y
  };
  event.currentTarget.setPointerCapture?.(event.pointerId);
  window.addEventListener('pointermove', moveWidget);
  window.addEventListener('pointerup', stopMove, { once: true });
  window.addEventListener('pointercancel', stopMove, { once: true });
}

function queueWidgetMove(event, widget, element) {
  if (event.button !== 0) return;

  state.moveCandidate = {
    widget,
    element,
    start: boardPoint(event),
    originalX: widget.x,
    originalY: widget.y,
    active: false
  };

  window.addEventListener('pointermove', promoteWidgetMove);
  window.addEventListener('pointerup', stopQueuedMove, { once: true });
  window.addEventListener('pointercancel', stopQueuedMove, { once: true });
}

function promoteWidgetMove(event) {
  if (!state.moveCandidate) return;

  const point = boardPoint(event);
  const dx = point.x - state.moveCandidate.start.x;
  const dy = point.y - state.moveCandidate.start.y;
  if (!state.moveCandidate.active && Math.hypot(dx, dy) < 4) return;

  event.preventDefault();
  state.moveCandidate.active = true;
  state.moving = state.moveCandidate;
  moveWidget(event);
}

function stopQueuedMove() {
  window.removeEventListener('pointermove', promoteWidgetMove);
  if (state.moveCandidate?.active) {
    scheduleWidgetSave(
      state.moveCandidate.widget,
      { x: state.moveCandidate.widget.x, y: state.moveCandidate.widget.y },
      80
    );
  }
  state.moving = null;
  state.moveCandidate = null;
}

function moveWidget(event) {
  if (!state.moving) return;
  const point = boardPoint(event);
  const dx = point.x - state.moving.start.x;
  const dy = point.y - state.moving.start.y;
  const x = Math.round(state.moving.originalX + dx);
  const y = Math.round(state.moving.originalY + dy);
  state.moving.element.style.left = `${x}px`;
  state.moving.element.style.top = `${y}px`;
  state.moving.widget.x = x;
  state.moving.widget.y = y;
}

function stopMove() {
  if (!state.moving) return;
  window.removeEventListener('pointermove', moveWidget);
  scheduleWidgetSave(state.moving.widget, { x: state.moving.widget.x, y: state.moving.widget.y }, 80);
  state.moving = null;
}

function startResize(event, widget, element) {
  event.preventDefault();
  event.stopPropagation();

  state.resizing = {
    widget,
    element,
    startX: event.clientX,
    startY: event.clientY,
    originalWidth: widget.width,
    originalHeight: widget.height,
    aspectRatio: widget.width / widget.height,
    keepRatio: ['music', 'sticker', 'gif'].includes(widget.type)
  };

  event.currentTarget.setPointerCapture?.(event.pointerId);
  window.addEventListener('pointermove', resizeWidget);
  window.addEventListener('pointerup', stopResize, { once: true });
  window.addEventListener('pointercancel', stopResize, { once: true });
}

function resizeWidget(event) {
  if (!state.resizing) return;
  event.preventDefault();

  const { widget, element, startX, startY, originalWidth, originalHeight, aspectRatio, keepRatio } = state.resizing;
  const minWidth = ['music', 'sticker', 'gif'].includes(widget.type) ? 84 : 48;
  const minHeight = widget.type === 'music' ? 84 : ['sticker', 'gif'].includes(widget.type) ? 72 : 48;
  let width = Math.max(minWidth, originalWidth + (event.clientX - startX) / state.viewport.zoom);
  let height = Math.max(minHeight, originalHeight + (event.clientY - startY) / state.viewport.zoom);

  if (keepRatio) {
    if (Math.abs(event.clientY - startY) > Math.abs(event.clientX - startX)) {
      width = height * aspectRatio;
    } else {
      height = width / aspectRatio;
    }
  }

  widget.width = Math.round(width);
  widget.height = Math.round(height);
  element.style.width = `${widget.width}px`;
  element.style.height = `${widget.height}px`;
}

function syncCanvasBackingStore(widget, element) {
  if (widget.type !== 'canvas') return widgetData(widget);

  const canvas = $('canvas', element);
  if (!canvas) return widgetData(widget);

  const dpr = window.devicePixelRatio || 1;
  const nextWidth = Math.max(1, Math.floor(widget.width * dpr));
  const nextHeight = Math.max(1, Math.floor(widget.height * dpr));

  if (canvas.width === nextWidth && canvas.height === nextHeight) {
    return widgetData(widget);
  }

  const snapshot = document.createElement('canvas');
  snapshot.width = canvas.width;
  snapshot.height = canvas.height;
  const snapshotContext = snapshot.getContext('2d');
  snapshotContext.drawImage(canvas, 0, 0);

  canvas.width = nextWidth;
  canvas.height = nextHeight;
  canvas.dataset.logicalWidth = String(widget.width);
  canvas.dataset.logicalHeight = String(widget.height);

  const context = canvas.getContext('2d');
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.fillStyle = canvasBackgroundColor(widget);
  context.fillRect(0, 0, widget.width, widget.height);
  context.drawImage(
    snapshot,
    0,
    0,
    snapshot.width,
    snapshot.height,
    0,
    0,
    widget.width,
    widget.height
  );

  return { ...widgetData(widget), image: canvas.toDataURL('image/png') };
}

function stopResize() {
  if (!state.resizing) return;
  window.removeEventListener('pointermove', resizeWidget);
  const { widget, element } = state.resizing;
  const patch = { width: widget.width, height: widget.height };
  if (widget.type === 'canvas') {
    patch.data = syncCanvasBackingStore(widget, element);
  }
  scheduleWidgetSave(widget, patch, 80);
  state.resizing = null;
}

function renderCanvasWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const canvas = document.createElement('canvas');
  canvas.dataset.logicalWidth = String(widget.width);
  canvas.dataset.logicalHeight = String(widget.height);
  element.appendChild(canvas);

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(widget.width * dpr));
  canvas.height = Math.max(1, Math.floor(widget.height * dpr));
  const context = canvas.getContext('2d');
  context.scale(dpr, dpr);
  context.fillStyle = data.background || 'rgba(255,255,255,0.84)';
  context.fillRect(0, 0, widget.width, widget.height);

  if (data.image) {
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0, widget.width, widget.height);
    image.src = data.image;
  }

  if (canEdit()) {
    wireDrawing(canvas, context, widget);
  }

  return element;
}

function brushWidth() {
  const base = Number(state.brush.size) || 8;
  if (state.brush.utensil === 'fill') return base;
  if (state.brush.utensil === 'pen') return Math.max(2, base * 0.58);
  if (state.brush.utensil === 'eraser') return Math.max(8, base * 1.35);
  return base;
}

function canvasBackgroundColor(widget) {
  return widgetData(widget).background || 'rgba(255,255,255,0.84)';
}

function cssColorToRgba(color) {
  const canvas = cssColorToRgba.canvas || document.createElement('canvas');
  cssColorToRgba.canvas = canvas;
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = color || 'rgba(255,255,255,0.84)';
  context.fillRect(0, 0, 1, 1);
  return [...context.getImageData(0, 0, 1, 1).data];
}

function replaceCanvasColor(canvas, context, fromColor, toColor, tolerance = 36) {
  const from = cssColorToRgba(fromColor);
  const to = cssColorToRgba(toColor);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = image;

  for (let index = 0; index < data.length; index += 4) {
    if (
      Math.abs(data[index] - from[0]) <= tolerance &&
      Math.abs(data[index + 1] - from[1]) <= tolerance &&
      Math.abs(data[index + 2] - from[2]) <= tolerance &&
      Math.abs(data[index + 3] - from[3]) <= tolerance
    ) {
      data[index] = to[0];
      data[index + 1] = to[1];
      data[index + 2] = to[2];
      data[index + 3] = to[3];
    }
  }

  context.putImageData(image, 0, 0);
  context.save();
  context.globalCompositeOperation = 'destination-over';
  context.fillStyle = toColor;
  context.fillRect(0, 0, Number(canvas.dataset.logicalWidth || canvas.width), Number(canvas.dataset.logicalHeight || canvas.height));
  context.restore();
}

function updateCanvasBackground(widget, element, nextData, previousBackground) {
  const canvas = $('canvas', element);
  if (!canvas) return;
  const context = canvas.getContext('2d');
  replaceCanvasColor(canvas, context, previousBackground, nextData.background || 'rgba(255,255,255,0.84)');
  nextData.image = canvas.toDataURL('image/png');
}

function canvasHistory(canvas) {
  if (!state.canvasHistories.has(canvas)) {
    state.canvasHistories.set(canvas, []);
  }
  return state.canvasHistories.get(canvas);
}

function pushCanvasUndo(canvas) {
  const history = canvasHistory(canvas);
  const snapshot = canvas.toDataURL('image/png');
  if (history[history.length - 1] === snapshot) return;
  history.push(snapshot);
  state.lastUndoDomain = 'canvas';
  if (history.length > canvasUndoLimit) history.shift();
}

function restoreCanvasSnapshot(canvas, context, widget, snapshot) {
  const image = new Image();
  image.onload = () => {
    context.clearRect(0, 0, widget.width, widget.height);
    context.drawImage(image, 0, 0, widget.width, widget.height);
    const nextData = setWidgetData(widget, { ...widgetData(widget), image: canvas.toDataURL('image/png') });
    scheduleWidgetSave(widget, { data: nextData }, 80);
  };
  image.src = snapshot;
}

function brushRgba() {
  const { r, g, b } = parseHexColor(state.brush.color);
  return [r, g, b, 255];
}

function colorsMatch(data, index, target, tolerance = 22) {
  return (
    Math.abs(data[index] - target[0]) <= tolerance &&
    Math.abs(data[index + 1] - target[1]) <= tolerance &&
    Math.abs(data[index + 2] - target[2]) <= tolerance &&
    Math.abs(data[index + 3] - target[3]) <= tolerance
  );
}

function floodFill(canvas, context, point) {
  const x = Math.floor(point.x * (canvas.width / Number(canvas.dataset.logicalWidth || canvas.width)));
  const y = Math.floor(point.y * (canvas.height / Number(canvas.dataset.logicalHeight || canvas.height)));
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = image;
  const startIndex = (y * width + x) * 4;
  const target = [
    data[startIndex],
    data[startIndex + 1],
    data[startIndex + 2],
    data[startIndex + 3]
  ];
  const fill = brushRgba();
  if (colorsMatch(fill, 0, target, 2)) return false;

  const stack = [[x, y]];
  const visited = new Uint8Array(width * height);

  while (stack.length) {
    const [currentX, currentY] = stack.pop();
    if (currentX < 0 || currentY < 0 || currentX >= width || currentY >= height) continue;

    const pixel = currentY * width + currentX;
    if (visited[pixel]) continue;
    visited[pixel] = 1;

    const index = pixel * 4;
    if (!colorsMatch(data, index, target)) continue;

    data[index] = fill[0];
    data[index + 1] = fill[1];
    data[index + 2] = fill[2];
    data[index + 3] = fill[3];

    stack.push([currentX + 1, currentY]);
    stack.push([currentX - 1, currentY]);
    stack.push([currentX, currentY + 1]);
    stack.push([currentX, currentY - 1]);
  }

  context.putImageData(image, 0, 0);
  return true;
}

function drawSoftBrush(context, from, to, width) {
  context.save();
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = width;
  context.globalAlpha = 0.56;
  context.strokeStyle = state.brush.color;
  context.shadowColor = state.brush.color;
  context.shadowBlur = Math.max(2, width * 0.35);
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
  context.restore();

  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const steps = Math.max(1, Math.ceil(distance / Math.max(2, width * 0.4)));
  context.save();
  context.fillStyle = state.brush.color;
  context.globalAlpha = 0.2;
  for (let index = 0; index <= steps; index += 1) {
    const ratio = index / steps;
    const jitter = Math.sin((from.x + from.y + index * 17) * 0.7) * width * 0.18;
    const x = from.x + (to.x - from.x) * ratio + jitter;
    const y = from.y + (to.y - from.y) * ratio - jitter * 0.55;
    context.beginPath();
    context.arc(x, y, Math.max(1.2, width * (0.16 + (index % 3) * 0.035)), 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function strokeToolPath(context, from, to, width) {
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = width;
  context.beginPath();
  if (from.x === to.x && from.y === to.y) {
    context.arc(from.x, from.y, Math.max(1, width / 2), 0, Math.PI * 2);
    return 'fill';
  }

  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  return 'stroke';
}

function eraseToolSegment(context, widget, from, to, width) {
  context.save();
  const drawMode = strokeToolPath(context, from, to, width);
  context.globalCompositeOperation = 'destination-out';
  context.fillStyle = '#000';
  context.strokeStyle = '#000';
  if (drawMode === 'fill') {
    context.fill();
  } else {
    context.stroke();
  }
  context.restore();

  context.save();
  context.globalCompositeOperation = 'destination-over';
  context.fillStyle = canvasBackgroundColor(widget);
  context.fillRect(0, 0, widget.width, widget.height);
  context.restore();
}

function drawToolSegment(context, widget, from, to) {
  const width = brushWidth();
  if (state.brush.utensil === 'brush') {
    drawSoftBrush(context, from, to, width);
    return;
  }
  if (state.brush.utensil === 'eraser') {
    eraseToolSegment(context, widget, from, to, width);
    return;
  }

  context.save();
  const drawMode = strokeToolPath(context, from, to, width);
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = state.brush.utensil === 'pen' ? 0.96 : 1;
  context.strokeStyle = state.brush.color;
  context.fillStyle = context.strokeStyle;
  if (drawMode === 'fill') {
    context.fill();
  } else {
    context.stroke();
  }
  context.restore();
}

function wireDrawing(canvas, context, widget) {
  let drawing = false;
  let last = null;

  const pointFor = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (widget.width / rect.width),
      y: (event.clientY - rect.top) * (widget.height / rect.height)
    };
  };

  const drawTo = (event) => {
    if (!drawing || state.selectedTool !== 'brush') return;
    event.preventDefault();
    state.pendingDrawPoint = pointFor(event);
    if (state.drawingFrame) return;

    state.drawingFrame = window.requestAnimationFrame(() => {
      state.drawingFrame = null;
      if (!drawing || !state.pendingDrawPoint) return;
      drawToolSegment(context, widget, last, state.pendingDrawPoint);
      last = state.pendingDrawPoint;
      state.pendingDrawPoint = null;
    });
  };

  const finishDrawing = () => {
    if (!drawing) return;
    if (state.drawingFrame) {
      window.cancelAnimationFrame(state.drawingFrame);
      state.drawingFrame = null;
    }
    if (state.pendingDrawPoint) {
      drawToolSegment(context, widget, last, state.pendingDrawPoint);
      last = state.pendingDrawPoint;
      state.pendingDrawPoint = null;
    }
    drawing = false;
    const nextData = setWidgetData(widget, { ...widgetData(widget), image: canvas.toDataURL('image/png') });
    scheduleWidgetSave(widget, { data: nextData }, 80);
  };

  canvas.addEventListener('pointerdown', (event) => {
    if (state.selectedTool !== 'brush') return;
    event.preventDefault();
    event.stopPropagation();
    state.activeDrawingCanvas = { canvas, context, widget };
    const point = pointFor(event);

    if (state.brush.utensil === 'fill') {
      pushCanvasUndo(canvas);
      if (floodFill(canvas, context, point)) {
        const nextData = setWidgetData(widget, { ...widgetData(widget), image: canvas.toDataURL('image/png') });
        scheduleWidgetSave(widget, { data: nextData }, 80);
      }
      return;
    }

    pushCanvasUndo(canvas);
    drawing = true;
    last = point;
    state.pendingDrawPoint = null;
    if (state.brush.utensil !== 'eraser') {
      drawToolSegment(context, widget, last, last);
    }
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener('pointermove', drawTo);
  canvas.addEventListener('pointerup', finishDrawing);
  canvas.addEventListener('pointercancel', () => {
    if (state.drawingFrame) {
      window.cancelAnimationFrame(state.drawingFrame);
      state.drawingFrame = null;
    }
    state.pendingDrawPoint = null;
    drawing = false;
  });
}

function renderWordboxWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const content = document.createElement('div');
  content.className = 'wordbox-content';
  content.contentEditable = String(canEdit());
  content.spellcheck = true;
  content.textContent = data.text || '';
  content.addEventListener('input', () => {
    const nextData = setWidgetData(widget, { ...widgetData(widget), text: content.innerText.replace(/\r\n/g, '\n') });
    scheduleWidgetSave(widget, { data: nextData });
  });
  content.addEventListener('paste', (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData('text/plain') || '';
    document.execCommand('insertText', false, text);
  });
  element.appendChild(content);
  return element;
}

function renderAssetWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const asset = document.createElement('figure');
  asset.className = `media-widget ${widget.type}-widget`;

  const image = document.createElement('img');
  image.alt = data.title || widget.type;
  image.src = data.url || '';
  image.draggable = false;
  image.title = data.title || widget.type;
  asset.appendChild(image);

  element.appendChild(asset);
  return element;
}

function iconButton(className, label, icon) {
  const button = document.createElement('button');
  button.className = className;
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.innerHTML = `<i data-lucide="${icon}"></i>`;
  return button;
}

function setPlayButtons(music, playing) {
  $$('.music-preview-button', music).forEach((button) => {
    button.classList.toggle('playing', playing);
    button.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
    button.innerHTML = `<i data-lucide="${playing ? 'pause' : 'play'}"></i>`;
  });
  refreshIcons();
}

function musicDuration(audio) {
  return Number.isFinite(audio.duration) ? audio.duration : 0;
}

function createMusicProgress(audio, className = '') {
  const progress = document.createElement('div');
  progress.className = `music-progress ${className}`.trim();

  const current = document.createElement('span');
  current.className = 'music-progress-time';
  current.textContent = '0:00';

  const track = document.createElement('button');
  track.className = 'music-progress-track';
  track.type = 'button';
  track.setAttribute('aria-label', 'Seek preview');

  const fill = document.createElement('span');
  fill.className = 'music-progress-fill';
  track.appendChild(fill);

  const remaining = document.createElement('span');
  remaining.className = 'music-progress-time';
  remaining.textContent = '-0:00';

  const update = () => {
    const duration = musicDuration(audio);
    const currentTime = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    const percent = duration ? clamp(currentTime / duration, 0, 1) * 100 : 0;
    fill.style.width = `${percent}%`;
    current.textContent = formatTime(currentTime);
    remaining.textContent = duration ? `-${formatTime(Math.max(duration - currentTime, 0))}` : '-0:00';
  };

  track.addEventListener('click', (event) => {
    event.stopPropagation();
    const duration = musicDuration(audio);
    if (!duration) return;
    const rect = track.getBoundingClientRect();
    audio.currentTime = clamp((event.clientX - rect.left) / rect.width, 0, 1) * duration;
    update();
  });

  ['loadedmetadata', 'durationchange', 'timeupdate', 'play', 'pause', 'ended'].forEach((eventName) => {
    audio.addEventListener(eventName, update);
  });
  window.setTimeout(update, 0);

  progress.appendChild(current);
  progress.appendChild(track);
  progress.appendChild(remaining);
  return progress;
}

function renderMusicWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const music = document.createElement('div');
  const presentation = data.presentation === 'player' ? 'player' : 'cover';
  music.className = `music-widget ${presentation}`;
  setMusicVisualVars(music, data);

  const audio = document.createElement('audio');
  audio.className = 'music-audio';
  audio.preload = 'metadata';
  audio.src = data.previewUrl || '';

  const makeImage = () => {
    const image = document.createElement('img');
    image.alt = '';
    image.src = data.artwork || '';
    return image;
  };

  const makeTitle = () => {
    const title = document.createElement('div');
    title.className = 'music-title';
    title.textContent = data.title || 'Untitled';
    return title;
  };

  const makeArtist = () => {
    const artist = document.createElement('div');
    artist.className = 'music-artist';
    artist.textContent = data.artist || '';
    return artist;
  };

  if (presentation === 'player') {
    const top = document.createElement('div');
    top.className = 'player-top';

    const art = makeImage();
    art.className = 'player-art';

    const meta = document.createElement('div');
    meta.className = 'music-meta player-meta';
    meta.appendChild(makeTitle());
    meta.appendChild(makeArtist());

    const signal = document.createElement('span');
    signal.className = 'player-signal';
    signal.innerHTML = '<i data-lucide="audio-lines"></i>';

    top.appendChild(art);
    top.appendChild(meta);
    top.appendChild(signal);

    const controls = document.createElement('div');
    controls.className = 'player-control-row';
    const back = iconButton('player-control music-skip-button', 'Back 10 seconds', 'rewind');
    back.dataset.skip = '-10';
    const play = iconButton('player-control player-play music-preview-button', 'Play preview', 'play');
    const forward = iconButton('player-control music-skip-button', 'Forward 10 seconds', 'fast-forward');
    forward.dataset.skip = '10';
    const cast = iconButton('player-control player-cast', 'Cast', 'cast');
    controls.appendChild(back);
    controls.appendChild(play);
    controls.appendChild(forward);
    controls.appendChild(cast);

    music.appendChild(top);
    music.appendChild(createMusicProgress(audio, 'player-progress'));
    music.appendChild(controls);
  } else {
    const frame = document.createElement('div');
    frame.className = 'cover-art-frame';
    frame.appendChild(makeImage());

    const meta = document.createElement('div');
    meta.className = 'music-meta cover-meta';
    meta.appendChild(makeTitle());
    meta.appendChild(makeArtist());
    meta.appendChild(iconButton('music-inline-play music-preview-button', 'Play preview', 'play'));

    music.appendChild(frame);
    music.appendChild(meta);
    music.appendChild(createMusicProgress(audio, 'cover-progress'));
  }

  music.appendChild(audio);

  $$('.music-preview-button', music).forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      if (audio.paused) {
        try {
          await audio.play();
        } catch {
          showToast('Preview is not available for this song.');
        }
      } else {
        audio.pause();
      }
    });
  });

  $$('.music-skip-button', music).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const duration = musicDuration(audio);
      const currentTime = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
      const nextTime = currentTime + Number(button.dataset.skip || 0);
      audio.currentTime = clamp(nextTime, 0, duration || currentTime);
    });
  });

  audio.addEventListener('play', () => setPlayButtons(music, true));
  audio.addEventListener('pause', () => setPlayButtons(music, false));
  audio.addEventListener('ended', () => setPlayButtons(music, false));

  element.appendChild(music);
  return element;
}

function renderBoard() {
  $$('.art-widget', board).forEach((widget) => widget.remove());

  if (!state.exhibit) return;
  state.boardRect = null;
  renderPagePicker();
  const pageId = state.activePageId || activePage()?.id;
  const fragment = document.createDocumentFragment();
  state.exhibit.widgets
    .filter((widget) => (widget.page_id || pageId) === pageId)
    .forEach((widget) => {
    let element;
    if (widget.type === 'canvas') element = renderCanvasWidget(widget);
    if (widget.type === 'wordbox') element = renderWordboxWidget(widget);
    if (widget.type === 'music') element = renderMusicWidget(widget);
    if (widget.type === 'sticker' || widget.type === 'gif') element = renderAssetWidget(widget);
    if (element) fragment.appendChild(element);
  });
  board.appendChild(fragment);

  setControlsForRole();
  refreshIcons();
  renderRemoteCursors();
}

function applyRemoteWidget(widget) {
  if (!state.exhibit || widget.exhibit_id !== state.exhibit.id) return;

  const index = state.exhibit.widgets.findIndex((item) => item.id === widget.id);
  if (index >= 0) {
    state.exhibit.widgets[index] = widget;
  } else {
    state.exhibit.widgets.push(widget);
  }
  state.exhibit.widgets.sort((a, b) => (a.z_index - b.z_index) || String(a.created_at).localeCompare(String(b.created_at)));
  renderBoard();
}

function removeRemoteWidget(widgetId) {
  if (!state.exhibit) return;
  const nextWidgets = state.exhibit.widgets.filter((widget) => widget.id !== widgetId);
  if (nextWidgets.length === state.exhibit.widgets.length) return;
  state.exhibit.widgets = nextWidgets;
  renderBoard();
}

function applyRemotePages(pages = []) {
  if (!state.exhibit) return;
  state.exhibit.pages = pages;
  if (!pages.some((page) => page.id === state.activePageId)) {
    state.activePageId = pages[0]?.id || null;
  }
  applyBackgroundTheme();
  renderBackgroundPresets();
  renderPagePicker();
  renderBoard();
}

function closeLiveEvents() {
  if (state.liveRetryTimer) {
    window.clearTimeout(state.liveRetryTimer);
    state.liveRetryTimer = null;
  }
  if (state.liveEvents) {
    state.liveEvents.close();
    state.liveEvents = null;
  }
  state.liveExhibitId = null;
  removeRemoteCursors();
}

function handleLiveMessage(event) {
  try {
    const payload = JSON.parse(event.data || '{}');
    if (payload.sourceClientId === clientId) return;

    if (event.type === 'widget-created' || event.type === 'widget-updated') {
      applyRemoteWidget(payload.widget);
    }
    if (event.type === 'widget-deleted') {
      removeRemoteWidget(payload.widgetId);
    }
    if (event.type === 'pages-updated') {
      applyRemotePages(payload.pages);
    }
    if (event.type === 'cursor-updated') {
      handleCursorUpdate(payload);
    }
    if (event.type === 'cursor-left') {
      handleCursorLeft(payload);
    }
  } catch {
    // Ignore malformed live collaboration events.
  }
}

function openLiveEvents(exhibitId) {
  if (!window.EventSource || !exhibitId) return;
  if (state.liveExhibitId === exhibitId && state.liveEvents) return;

  closeLiveEvents();
  state.liveExhibitId = exhibitId;
  const events = new EventSource(`/api/exhibits/${encodeURIComponent(exhibitId)}/events?clientId=${encodeURIComponent(clientId)}`);
  state.liveEvents = events;

  ['widget-created', 'widget-updated', 'widget-deleted', 'pages-updated', 'cursor-updated', 'cursor-left'].forEach((eventName) => {
    events.addEventListener(eventName, handleLiveMessage);
  });

  events.onerror = () => {
    if (state.liveEvents !== events) return;
    events.close();
    state.liveEvents = null;
    window.clearTimeout(state.liveRetryTimer);
    state.liveRetryTimer = window.setTimeout(() => {
      if (state.exhibit?.id === exhibitId) {
        openLiveEvents(exhibitId);
      }
    }, 2200);
  };
}

async function loadExhibits(preferredId) {
  const { exhibits } = await api('/api/exhibits');
  state.exhibits = exhibits;
  exhibitPicker.innerHTML = '';

  exhibits.forEach((exhibit) => {
    const option = document.createElement('option');
    option.value = exhibit.id;
    option.textContent =
      exhibit.role === 'owner'
        ? 'My Cara Mia'
        : `${exhibit.ownerAccountId} (${exhibit.role})`;
    exhibitPicker.appendChild(option);
  });

  const savedId = preferredId || localStorage.getItem('caraMiaExhibitId');
  const chosen = exhibits.find((exhibit) => exhibit.id === savedId) || exhibits[0];
  if (chosen) {
    exhibitPicker.value = chosen.id;
    await loadExhibit(chosen.id);
  }
}

async function loadExhibit(id) {
  const { exhibit } = await api(`/api/exhibits/${id}`);
  removeRemoteCursors();
  state.exhibit = exhibit;
  const savedPageId = localStorage.getItem(`caraMiaPage:${id}`);
  state.activePageId = exhibit.pages?.some((page) => page.id === savedPageId)
    ? savedPageId
    : exhibit.pages?.[0]?.id || null;
  localStorage.setItem('caraMiaExhibitId', id);
  applyZoom();
  applyBackgroundTheme();
  renderBoard();
  openLiveEvents(id);
}

async function enterStudio() {
  setView('studio');
  await loadExhibits();
}

async function checkSession() {
  try {
    const { user } = await api('/api/me');
    state.user = user;
    await enterStudio();
  } catch {
    closeLiveEvents();
    setView('auth');
  }
}

function assetLabel(type = state.pendingAssetType) {
  return 'Sticker';
}

async function loadAssetResults(term = '') {
  const type = 'sticker';
  assetResults.innerHTML = '<div class="asset-loading">Loading...</div>';

  try {
    const { results } = await api(`/api/assets/search?type=${encodeURIComponent(type)}&q=${encodeURIComponent(term)}`);
    assetResults.innerHTML = '';
    if (!results.length) {
      assetResults.textContent = `No ${assetLabel(type).toLowerCase()} results`;
      return;
    }

    results.forEach((asset) => {
      const button = document.createElement('button');
      button.className = 'asset-result';
      button.type = 'button';
      button.innerHTML = `
        <img alt="">
        <span>
          <strong></strong>
          <small></small>
        </span>
      `;
      $('img', button).src = asset.previewUrl || asset.url;
      $('strong', button).textContent = asset.title || assetLabel(type);
      $('small', button).textContent = asset.source || 'Recommended';
      button.addEventListener('click', () => createAssetWidget(asset).catch((error) => showToast(error.message)));
      assetResults.appendChild(button);
    });
  } catch (error) {
    assetResults.textContent = '';
    showToast(error.message);
  }
}

function openAssetDialog(type) {
  state.pendingAssetType = 'sticker';
  assetDialogTitle.textContent = assetLabel();
  assetSearchInput.value = '';
  assetSearchInput.placeholder = 'Search stickers';
  assetDialog.showModal();
  loadAssetResults('').catch((error) => showToast(error.message));
}

async function createAssetWidget(asset) {
  const type = 'sticker';
  const width = asset.assetType === 'gif' ? 230 : 180;
  const height = asset.assetType === 'gif' ? 180 : 180;
  const rect = centeredRect(width, height);

  await createWidget(type, rect, {
    title: asset.title || assetLabel(type),
    url: asset.url,
    previewUrl: asset.previewUrl || asset.url,
    source: asset.source || 'Recommended'
  });
  assetDialog.close();
  assetResults.innerHTML = '';
}

function centeredRect(width, height) {
  return {
    x: Math.round(Math.max(40, (boardViewport.scrollLeft + boardViewport.clientWidth / 2) / state.viewport.zoom - width / 2)),
    y: Math.round(Math.max(40, (boardViewport.scrollTop + boardViewport.clientHeight / 2) / state.viewport.zoom - height / 2)),
    width,
    height
  };
}

function updateReadModeButtons() {
  readModeButton.classList.toggle('hidden', state.viewMode === 'read');
  editModeButton.classList.toggle('hidden', state.viewMode !== 'read');
  downloadShotButton.classList.toggle('hidden', state.viewMode !== 'read');
}

function loadScreenshotLibrary() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-html2canvas]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.html2canvas), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.async = true;
    script.dataset.html2canvas = 'true';
    script.onload = () => resolve(window.html2canvas);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function undoActiveCanvas() {
  if (!state.activeDrawingCanvas) return false;
  const { canvas, context, widget } = state.activeDrawingCanvas;
  const history = canvasHistory(canvas);
  const snapshot = history.pop();
  if (!snapshot) {
    state.lastUndoDomain = state.appUndoStack.length ? 'app' : null;
    return false;
  }
  restoreCanvasSnapshot(canvas, context, widget, snapshot);
  if (!history.length && state.lastUndoDomain === 'canvas') {
    state.lastUndoDomain = state.appUndoStack.length ? 'app' : null;
  }
  return true;
}

function prepareScreenshotClone(clonedDocument) {
  const clonedViewport = clonedDocument.querySelector('#boardViewport');
  if (!clonedViewport) return;

  const background = clonedDocument.createElement('div');
  background.className = 'screenshot-background';
  ['gradientField', 'heartField', 'themeField'].forEach((id) => {
    const layer = clonedDocument.getElementById(id);
    if (!layer) return;
    const clone = layer.cloneNode(true);
    clone.removeAttribute('id');
    clone.classList.add('screenshot-background-layer');
    background.appendChild(clone);
  });
  clonedViewport.prepend(background);
  clonedViewport.classList.add('screenshot-viewport');
  clonedDocument.querySelector('#board')?.classList.add('screenshot-board');
}

async function downloadScreenshot() {
  const previousMode = state.viewMode;
  setViewMode('read');
  await new Promise((resolve) => requestAnimationFrame(resolve));
  try {
    const html2canvas = await loadScreenshotLibrary();
    const canvas = await html2canvas(boardViewport, {
      backgroundColor: null,
      scale: Math.min(2, window.devicePixelRatio || 1),
      useCORS: true,
      onclone: prepareScreenshotClone,
      ignoreElements: (element) => element.classList?.contains('remote-cursor') || element.classList?.contains('local-cursor')
    });
    const link = document.createElement('a');
    link.download = `${activePage()?.name || 'cara-mia'}-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch {
    showToast('Screenshot could not be downloaded.');
  } finally {
    if (previousMode !== 'read') setViewMode(previousMode);
  }
}

function openPageDialog(action) {
  if (!canEdit() || !state.exhibit) return;
  state.pendingPageAction = action;
  const current = activePage();
  pageDialogTitle.textContent = action === 'rename' ? 'Rename page' : 'Add page';
  pageNameInput.value = action === 'rename'
    ? current?.name || 'Untitled'
    : `Page ${(state.exhibit.pages?.length || 0) + 1}`;
  pageDialog.showModal();
  pageNameInput.focus();
  pageNameInput.select();
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(loginForm);
  try {
    const { user } = await api('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        accountId: form.get('accountId'),
        password: form.get('password')
      })
    });
    state.user = user;
    await enterStudio();
  } catch (error) {
    showToast(error.message);
  }
});

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(signupForm);
  try {
    await api('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: form.get('email'),
        accountId: form.get('accountId'),
        password: form.get('password')
      })
    });
    loginForm.elements.accountId.value = form.get('accountId');
    signupForm.reset();
    showLogin();
    showToast('Account created.');
  } catch (error) {
    showToast(error.message);
  }
});

showSignupButton.addEventListener('click', showSignup);
showLoginButton.addEventListener('click', showLogin);

logoutButton.addEventListener('click', async () => {
  await api('/api/logout', { method: 'POST' });
  closeLiveEvents();
  state.user = null;
  state.exhibit = null;
  setView('auth');
  showLogin();
});

exhibitPicker.addEventListener('change', () => {
  loadExhibit(exhibitPicker.value).catch((error) => showToast(error.message));
});

cursorSettingsButton.addEventListener('click', () => {
  renderCursorPreview();
  renderBackgroundPresets();
  cursorDialog.showModal();
});

readModeButton.addEventListener('click', () => setViewMode('read'));
editModeButton.addEventListener('click', () => setViewMode('edit'));
downloadShotButton.addEventListener('click', () => downloadScreenshot());

pagePicker.addEventListener('change', () => setActivePage(pagePicker.value));
addPageButton.addEventListener('click', () => openPageDialog('add'));
renamePageButton.addEventListener('click', () => openPageDialog('rename'));

zoomOutButton.addEventListener('click', () => setZoom(state.viewport.zoom - zoomLimits.step, {
  x: boardViewport.clientWidth / 2,
  y: boardViewport.clientHeight / 2
}));
zoomInButton.addEventListener('click', () => setZoom(state.viewport.zoom + zoomLimits.step, {
  x: boardViewport.clientWidth / 2,
  y: boardViewport.clientHeight / 2
}));

cursorColorInput.addEventListener('input', () => {
  state.cursorProfile.color = cursorColorInput.value;
  saveCursorProfile();
  renderCursorPreview();
  if (state.pendingCursorPoint) sendCursorPresence(state.pendingCursorPoint);
});

cursorUploadInput.addEventListener('change', async () => {
  const [file] = cursorUploadInput.files || [];
  if (!file) return;
  try {
    state.cursorProfile.cursorImage = await resizeCursorUpload(file);
    saveCursorProfile();
    renderCursorPreview();
    if (state.pendingCursorPoint) sendCursorPresence(state.pendingCursorPoint);
  } catch {
    showToast('Cursor image could not be loaded.');
  } finally {
    cursorUploadInput.value = '';
  }
});

$$('.tool-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.tool === 'music') {
      selectTool(null);
      if (canEdit()) {
        setMusicPresentation(state.pendingPresentation || 'cover');
        musicDialog.showModal();
      }
      return;
    }
    if (button.dataset.tool === 'sticker') {
      selectTool(null);
      if (canEdit()) {
        openAssetDialog();
      }
      return;
    }
    selectTool(button.dataset.tool);
  });
});

$$('.utensil').forEach((button) => {
  button.addEventListener('click', () => {
    state.brush.utensil = button.dataset.brush;
    $$('.utensil').forEach((item) => item.classList.toggle('active', item === button));
  });
});

colors.forEach((color) => {
  const swatch = document.createElement('button');
  swatch.type = 'button';
  swatch.className = 'color-swatch';
  swatch.title = color;
  swatch.style.background = color;
  swatch.addEventListener('click', () => {
    state.brush.color = color;
    $$('.color-swatch').forEach((item) => item.classList.toggle('active', item === swatch));
  });
  colorRail.appendChild(swatch);
});
$('.color-swatch', colorRail)?.classList.add('active');

brushSize.addEventListener('input', () => {
  state.brush.size = Number(brushSize.value);
});

window.addEventListener('keydown', async (event) => {
  if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== 'z') return;
  if (isTextEditingTarget(event.target)) return;
  const appUndoFirst = state.lastUndoDomain === 'app';
  if (appUndoFirst) {
    try {
      if (await undoLastAppAction()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } catch (error) {
      showToast(error.message);
      return;
    }
  }

  if (undoActiveCanvas()) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  try {
    if (!appUndoFirst && await undoLastAppAction()) {
      event.preventDefault();
      event.stopPropagation();
    }
  } catch (error) {
    showToast(error.message);
  }
});

boardViewport.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || event.target !== board || ['canvas', 'wordbox'].includes(state.selectedTool)) return;
  clearWidgetSelection();
  state.viewport.panning = {
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: boardViewport.scrollLeft,
    scrollTop: boardViewport.scrollTop
  };
  boardViewport.classList.add('panning');
  boardViewport.setPointerCapture(event.pointerId);
});

boardViewport.addEventListener('pointermove', (event) => {
  if (!state.viewport.panning) return;
  event.preventDefault();
  const dx = event.clientX - state.viewport.panning.startX;
  const dy = event.clientY - state.viewport.panning.startY;
  boardViewport.scrollLeft = state.viewport.panning.scrollLeft - dx;
  boardViewport.scrollTop = state.viewport.panning.scrollTop - dy;
  state.boardRect = null;
});

function stopBoardPan() {
  state.viewport.panning = null;
  boardViewport.classList.remove('panning');
}

boardViewport.addEventListener('pointerup', stopBoardPan);
boardViewport.addEventListener('pointercancel', stopBoardPan);
boardViewport.addEventListener('scroll', () => {
  state.boardRect = null;
}, { passive: true });

board.addEventListener('pointerdown', (event) => {
  if (!canEdit()) return;
  if (!event.target.closest('.art-widget')) {
    clearWidgetSelection();
  }
  if (!['canvas', 'wordbox'].includes(state.selectedTool)) return;
  if (event.target !== board) return;

  const start = boardPoint(event);
  state.draft = { start, type: state.selectedTool };
  updateDragPreview({ x: start.x, y: start.y, width: 1, height: 1 });
  board.setPointerCapture(event.pointerId);
});

board.addEventListener('pointermove', (event) => {
  const point = boardPoint(event);
  renderLocalCursor(point);
  queueCursorPresence(point);
  if (!state.draft) return;
  const rect = normalizeRect(state.draft.start, point);
  updateDragPreview(rect);
});

board.addEventListener('pointerleave', () => {
  localCursor?.classList.add('hidden');
});

board.addEventListener('pointerup', async (event) => {
  if (!state.draft) return;
  const draft = state.draft;
  const rect = normalizeRect(draft.start, boardPoint(event));
  clearDragPreview();

  if (rect.width < 36 || rect.height < 36) return;
  try {
    await createWidget(draft.type, rect, draft.type === 'wordbox' ? { text: '', background: 'rgba(255,255,255,0.84)' } : { background: 'rgba(255,255,255,0.84)' });
  } catch (error) {
    showToast(error.message);
  }
});

shareButton.addEventListener('click', () => {
  if (!state.exhibit?.canShare) return;
  shareDialog.showModal();
});

$$('.modal-close').forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog')?.close());
});

shareForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(shareForm);
  try {
    await api('/api/share', {
      method: 'POST',
      body: JSON.stringify({
        exhibitId: state.exhibit.id,
        email: form.get('email'),
        role: form.get('role')
      })
    });
    shareForm.reset();
    shareDialog.close();
    showToast('Shared.');
  } catch (error) {
    showToast(error.message);
  }
});

pageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!canEdit() || !state.exhibit) return;
  const name = pageNameInput.value.trim();
  try {
    if (state.pendingPageAction === 'rename' && state.activePageId) {
      const { pages } = await api(`/api/exhibits/${state.exhibit.id}/pages/${state.activePageId}`, {
        method: 'PATCH',
        body: JSON.stringify({ name })
      });
      state.exhibit.pages = pages;
      renderPagePicker();
    } else {
      const { page, pages } = await api(`/api/exhibits/${state.exhibit.id}/pages`, {
        method: 'POST',
        body: JSON.stringify({ name })
      });
      state.exhibit.pages = pages;
      setActivePage(page.id);
    }
    state.pendingPageAction = null;
    pageForm.reset();
    pageDialog.close();
  } catch (error) {
    showToast(error.message);
  }
});

musicSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  musicResults.innerHTML = '';
  musicChoice.classList.add('hidden');
  state.pendingMusic = null;

  try {
    const { results } = await api(`/api/music/search?q=${encodeURIComponent(musicSearchInput.value)}`);
    if (!results.length) {
      musicResults.textContent = 'No results';
      return;
    }

    results.forEach((track) => {
      const button = document.createElement('button');
      button.className = 'music-result';
      button.type = 'button';
      button.innerHTML = `
        <img alt="" src="${track.artwork}">
        <span>
          <strong></strong>
          <small></small>
        </span>
      `;
      $('strong', button).textContent = track.title;
      $('small', button).textContent = `${track.artist} - ${track.album || ''}`;
      button.addEventListener('click', () => {
        state.pendingMusic = track;
        $$('.music-result').forEach((item) => item.classList.toggle('active', item === button));
        musicChoice.classList.remove('hidden');
      });
      musicResults.appendChild(button);
    });
  } catch (error) {
    showToast(error.message);
  }
});

assetSearchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await loadAssetResults(assetSearchInput.value.trim());
});

$$('[data-presentation]').forEach((button) => {
  button.addEventListener('click', () => {
    setMusicPresentation(button.dataset.presentation);
  });
});

applyMusicButton.addEventListener('click', async () => {
  if (!state.pendingMusic) {
    showToast('Choose a song.');
    return;
  }

  const presentation = state.pendingPresentation;
  const rect = centeredRect(presentation === 'cover' ? 300 : 520, presentation === 'cover' ? 350 : 220);

  try {
    await createWidget('music', rect, {
      ...state.pendingMusic,
      presentation,
      playerColor: '#f6e8f1',
      playerAlpha: 0.9
    });
    musicDialog.close();
    musicResults.innerHTML = '';
    musicSearchInput.value = '';
    musicChoice.classList.add('hidden');
    state.pendingMusic = null;
  } catch (error) {
    showToast(error.message);
  }
});

window.addEventListener('resize', () => {
  state.boardRect = null;
  if (state.exhibit) renderBoard();
});

createHearts();
animateGothicFlowLight();
buildCursorPresets();
applyBackgroundTheme();
renderBackgroundPresets();
setMusicPresentation('cover');
refreshIcons();
checkSession();
