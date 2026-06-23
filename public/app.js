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

const state = {
  user: null,
  exhibits: [],
  exhibit: null,
  selectedTool: null,
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
  drawingFrame: null,
  pendingDrawPoint: null,
  liveEvents: null,
  liveExhibitId: null,
  liveRetryTimer: null,
  cursorProfile: loadCursorProfile(),
  cursorPeers: new Map(),
  cursorSendTimer: null,
  pendingCursorPoint: null,
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
const dragPreview = $('#dragPreview');
const exhibitPicker = $('#exhibitPicker');
const cursorSettingsButton = $('#cursorSettingsButton');
const rolePill = $('#rolePill');
const shareButton = $('#shareButton');
const logoutButton = $('#logoutButton');
const brushPanel = $('#brushPanel');
const brushSize = $('#brushSize');
const colorRail = $('#colorRail');
const toast = $('#toast');
const shareDialog = $('#shareDialog');
const shareForm = $('#shareForm');
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
    const backgroundTheme = backgroundPresets.some((preset) => preset.id === saved.backgroundTheme)
      ? saved.backgroundTheme
      : 'default';
    return {
      color: /^#[0-9a-fA-F]{6}$/.test(saved.color) ? saved.color : randomCursorColor,
      cursorImage: typeof saved.cursorImage === 'string' ? saved.cursorImage : '',
      backgroundTheme
    };
  } catch {
    return { color: randomCursorColor, cursorImage: '', backgroundTheme: 'default' };
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
  return backgroundPresets.some((preset) => preset.id === state.cursorProfile.backgroundTheme)
    ? state.cursorProfile.backgroundTheme
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

function renderRemoteCursors() {
  $$('.remote-cursor', board).forEach((cursor) => cursor.remove());
  state.cursorPeers.forEach((peer, id) => {
    if (!state.exhibit || peer.exhibitId !== state.exhibit.id) return;
    if (Date.now() - peer.updatedAt > 12000) {
      state.cursorPeers.delete(id);
      return;
    }

    const cursor = document.createElement('div');
    cursor.className = `remote-cursor ${peer.cursorKind === 'image' ? 'image-cursor' : 'arrow-cursor'}`;
    cursor.style.left = `${peer.x}px`;
    cursor.style.top = `${peer.y}px`;
    cursor.style.setProperty('--cursor-color', peer.color || '#7d38ff');
    cursor.innerHTML = `${remoteCursorMarkup(peer)}<strong>${peer.accountId || 'guest'}</strong>`;
    board.appendChild(cursor);
  });
}

function removeRemoteCursors() {
  state.cursorPeers.clear();
  $$('.remote-cursor', board).forEach((cursor) => cursor.remove());
}

function handleCursorUpdate(payload) {
  if (!state.exhibit || payload.sourceClientId === clientId) return;
  state.cursorPeers.set(payload.sourceClientId, {
    ...payload,
    exhibitId: state.exhibit.id,
    updatedAt: Date.now()
  });
  renderRemoteCursors();
}

function handleCursorLeft(payload) {
  state.cursorPeers.delete(payload.sourceClientId);
  renderRemoteCursors();
}

function sendCursorPresence(point) {
  if (!state.exhibit) return;
  api(`/api/exhibits/${state.exhibit.id}/presence`, {
    method: 'POST',
    body: JSON.stringify(cursorPayload(point))
  }).catch(() => {});
}

function queueCursorPresence(point) {
  if (!state.exhibit) return;
  state.pendingCursorPoint = point;
  if (state.cursorSendTimer) return;

  state.cursorSendTimer = window.setTimeout(() => {
    state.cursorSendTimer = null;
    if (state.pendingCursorPoint) {
      sendCursorPresence(state.pendingCursorPoint);
      state.pendingCursorPoint = null;
    }
  }, 90);
}

function setLocalCursorImage() {
  if (state.cursorProfile.cursorImage) {
    board.style.cursor = `url("${state.cursorProfile.cursorImage}") 4 4, auto`;
  } else {
    board.style.cursor = '';
  }
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
      : '<span class="remote-cursor-arrow"></span>';
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
    button.addEventListener('click', () => {
      state.cursorProfile.backgroundTheme = preset.id;
      saveCursorProfile();
      applyBackgroundTheme();
      renderBackgroundPresets();
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
        const maxSize = 96;
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

  for (let index = 0; index < 30; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.zIndex = String(30 - index);
    heart.style.setProperty('--duration', `${22 + (index % 6) * 1.6}s`);
    heart.style.setProperty('--delay', `${index * -0.92}s`);
    heart.style.setProperty('--start-scale', `${0.06 + (index % 4) * 0.015}`);
    heart.style.setProperty('--end-scale', `${4.6 + (index % 8) * 0.42}`);
    heart.style.setProperty('--blur', `${index % 9 === 8 ? 1.4 : 0}px`);
    heart.style.setProperty('--heart-opacity', `${0.32 + (index % 5) * 0.045}`);
    heart.style.setProperty('--heart-size', `${48 + (index % 10) * 18}px`);
    heart.style.setProperty('--heart-color', gothicColors[index % gothicColors.length]);
    field.appendChild(heart);
  }
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
  return Boolean(state.exhibit?.canEdit);
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
  rolePill.textContent = (state.exhibit?.role || 'viewer').toUpperCase();
  if (!editable) {
    selectTool(null);
  }
}

function widgetData(widget) {
  return widget.data && typeof widget.data === 'object' ? widget.data : {};
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
  const rect = board.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
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
    const nextData = { ...widgetData(widget), fontFamily: fontSelect.value };
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
      const nextData = { ...widgetData(widget), [key]: !widgetData(widget)[key] };
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
    const nextData = { ...widgetData(widget), fontSize: Number(sizeInput.value) };
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
    swatch.style.background = color;
    swatch.addEventListener('click', (event) => {
      event.stopPropagation();
      const nextData = { ...widgetData(widget), color };
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWordVisualVars(element, nextData);
    });
    colorRow.appendChild(swatch);
  });
  menu.appendChild(colorRow);
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
      palette.forEach((color) => {
        const swatch = document.createElement('button');
        swatch.className = 'mini-swatch';
        swatch.type = 'button';
        swatch.title = 'Color';
        swatch.style.background = color;
        swatch.addEventListener('click', (event) => {
          event.stopPropagation();
          const key = widget.type === 'music' ? 'playerColor' : 'background';
          const nextData = { ...widgetData(widget), [key]: color };
          scheduleWidgetSave(widget, { data: nextData }, 120);
          if (widget.type === 'music') {
            applyMusicVisuals(element, nextData);
          } else {
            element.style.setProperty('--widget-bg', color);
          }
        });
        menu.appendChild(swatch);
      });

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
          const nextData = { ...widgetData(widget), playerAlpha: Number(opacityInput.value) / 100 };
          scheduleWidgetSave(widget, { data: nextData }, 120);
          applyMusicVisuals(element, nextData);
        });
        opacityControl.appendChild(opacityInput);
        menu.appendChild(opacityControl);
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
      await api(`/api/widgets/${widget.id}`, { method: 'DELETE' });
      state.exhibit.widgets = state.exhibit.widgets.filter((item) => item.id !== widget.id);
      renderBoard();
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
  let width = Math.max(minWidth, originalWidth + event.clientX - startX);
  let height = Math.max(minHeight, originalHeight + event.clientY - startY);

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
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(point.x * (canvas.width / rect.width));
  const y = Math.floor(point.y * (canvas.height / rect.height));
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
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
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
    const nextData = { ...widgetData(widget), image: canvas.toDataURL('image/png') };
    scheduleWidgetSave(widget, { data: nextData }, 80);
  };

  canvas.addEventListener('pointerdown', (event) => {
    if (state.selectedTool !== 'brush') return;
    event.preventDefault();
    event.stopPropagation();
    const point = pointFor(event);

    if (state.brush.utensil === 'fill') {
      if (floodFill(canvas, context, point)) {
        const nextData = { ...widgetData(widget), image: canvas.toDataURL('image/png') };
        scheduleWidgetSave(widget, { data: nextData }, 80);
      }
      return;
    }

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
    const nextData = { ...widgetData(widget), text: content.textContent };
    scheduleWidgetSave(widget, { data: nextData });
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
  state.exhibit.widgets.forEach((widget) => {
    let element;
    if (widget.type === 'canvas') element = renderCanvasWidget(widget);
    if (widget.type === 'wordbox') element = renderWordboxWidget(widget);
    if (widget.type === 'music') element = renderMusicWidget(widget);
    if (widget.type === 'sticker' || widget.type === 'gif') element = renderAssetWidget(widget);
    if (element) board.appendChild(element);
  });

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

  ['widget-created', 'widget-updated', 'widget-deleted', 'cursor-updated', 'cursor-left'].forEach((eventName) => {
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
  localStorage.setItem('caraMiaExhibitId', id);
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
  const rect = {
    x: Math.round(Math.max(120, board.clientWidth / 2 - width / 2)),
    y: Math.round(Math.max(100, board.clientHeight / 2 - height / 2)),
    width,
    height
  };

  await createWidget(type, rect, {
    title: asset.title || assetLabel(type),
    url: asset.url,
    previewUrl: asset.previewUrl || asset.url,
    source: asset.source || 'Recommended'
  });
  assetDialog.close();
  assetResults.innerHTML = '';
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
  queueCursorPresence(boardPoint(event));
  if (!state.draft) return;
  const rect = normalizeRect(state.draft.start, boardPoint(event));
  updateDragPreview(rect);
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
  const rect = {
    x: Math.round(Math.max(120, board.clientWidth / 2 - (presentation === 'cover' ? 150 : 260))),
    y: Math.round(Math.max(100, board.clientHeight / 2 - (presentation === 'cover' ? 175 : 110))),
    width: presentation === 'cover' ? 300 : 520,
    height: presentation === 'cover' ? 350 : 220
  };

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
  if (state.exhibit) renderBoard();
});

createHearts();
buildCursorPresets();
applyBackgroundTheme();
renderBackgroundPresets();
setMusicPresentation('cover');
refreshIcons();
checkSession();
