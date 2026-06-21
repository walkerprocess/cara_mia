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
  moving: null,
  pendingMusic: null,
  pendingPresentation: 'cover',
  saveTimers: new Map()
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
const rolePill = $('#rolePill');
const shareButton = $('#shareButton');
const logoutButton = $('#logoutButton');
const brushPanel = $('#brushPanel');
const brushSize = $('#brushSize');
const colorRail = $('#colorRail');
const toast = $('#toast');
const shareDialog = $('#shareDialog');
const shareForm = $('#shareForm');
const musicDialog = $('#musicDialog');
const musicSearchForm = $('#musicSearchForm');
const musicSearchInput = $('#musicSearchInput');
const musicResults = $('#musicResults');
const musicChoice = $('#musicChoice');
const applyMusicButton = $('#applyMusicButton');

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
      ...(options.headers || {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Something went wrong.');
  }
  return payload;
}

function createHearts() {
  const field = $('#heartField');
  field.innerHTML = '';
  const gothicColors = [
    'rgba(2, 1, 4, 0.94)',
    'rgba(16, 13, 21, 0.9)',
    'rgba(50, 45, 58, 0.72)',
    'rgba(115, 105, 127, 0.5)',
    'rgba(33, 9, 56, 0.72)',
    'rgba(91, 19, 143, 0.52)',
    'rgba(72, 3, 24, 0.7)',
    'rgba(150, 13, 47, 0.48)',
    'rgba(235, 225, 238, 0.14)'
  ];

  for (let index = 0; index < 30; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.zIndex = String(30 - index);
    heart.style.setProperty('--duration', `${10 + (index % 6) * 0.9}s`);
    heart.style.setProperty('--delay', `${index * -0.46}s`);
    heart.style.setProperty('--start-scale', `${0.06 + (index % 4) * 0.015}`);
    heart.style.setProperty('--end-scale', `${4.6 + (index % 8) * 0.42}`);
    heart.style.setProperty('--blur', `${index % 9 === 8 ? 1.4 : 0}px`);
    heart.style.setProperty('--heart-opacity', `${0.42 + (index % 5) * 0.055}`);
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
      }
    }, delay)
  );
}

function widgetShell(widget) {
  const data = widgetData(widget);
  const element = document.createElement('article');
  element.className = `art-widget ${widget.type}-shell`;
  if ((widget.type === 'canvas' || widget.type === 'wordbox') && (widget.width < 164 || widget.height < 96)) {
    element.classList.add('external-controls');
    if (widget.x + widget.width > board.clientWidth - 176) {
      element.classList.add('controls-left');
    }
  }
  element.dataset.widgetId = widget.id;
  element.style.left = `${widget.x}px`;
  element.style.top = `${widget.y}px`;
  element.style.width = `${widget.width}px`;
  element.style.height = `${widget.height}px`;
  element.style.zIndex = widget.z_index;
  element.style.setProperty('--widget-bg', data.background || 'rgba(255,255,255,0.84)');
  element.style.setProperty('--word-color', data.color || '#050406');

  element.addEventListener('pointerdown', () => {
    $$('.art-widget').forEach((item) => item.classList.remove('selected'));
    element.classList.add('selected');
  });

  if (canEdit()) {
    const handle = document.createElement('button');
    handle.className = 'move-handle';
    handle.type = 'button';
    handle.title = 'Move';
    handle.innerHTML = '<i data-lucide="grip"></i>';
    handle.addEventListener('pointerdown', (event) => startMove(event, widget, element));
    element.appendChild(handle);

    const menu = document.createElement('div');
    menu.className = 'widget-menu';

    if (widget.type === 'canvas' || widget.type === 'wordbox') {
      widgetColors.forEach((color) => {
        const swatch = document.createElement('button');
        swatch.className = 'mini-swatch';
        swatch.type = 'button';
        swatch.title = 'Color';
        swatch.style.background = color;
        swatch.addEventListener('click', (event) => {
          event.stopPropagation();
          const nextData = { ...widgetData(widget), background: color };
          scheduleWidgetSave(widget, { data: nextData }, 120);
          element.style.setProperty('--widget-bg', color);
        });
        menu.appendChild(swatch);
      });
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
  element.setPointerCapture(event.pointerId);
  element.addEventListener('pointermove', moveWidget);
  element.addEventListener('pointerup', stopMove, { once: true });
  element.addEventListener('pointercancel', stopMove, { once: true });
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
  scheduleWidgetSave(state.moving.widget, { x: state.moving.widget.x, y: state.moving.widget.y }, 80);
  state.moving = null;
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
  if (state.brush.utensil === 'pencil') return Math.max(1, base * 0.38);
  if (state.brush.utensil === 'pen') return Math.max(2, base * 0.58);
  if (state.brush.utensil === 'eraser') return Math.max(8, base * 1.35);
  return base;
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
    const point = pointFor(event);
    context.save();
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = brushWidth();
    context.globalCompositeOperation = state.brush.utensil === 'eraser' ? 'destination-out' : 'source-over';
    context.strokeStyle = state.brush.color;
    context.beginPath();
    context.moveTo(last.x, last.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    context.restore();
    last = point;
  };

  canvas.addEventListener('pointerdown', (event) => {
    if (state.selectedTool !== 'brush') return;
    event.preventDefault();
    drawing = true;
    last = pointFor(event);
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener('pointermove', drawTo);
  canvas.addEventListener('pointerup', () => {
    if (!drawing) return;
    drawing = false;
    const nextData = { ...widgetData(widget), image: canvas.toDataURL('image/png') };
    scheduleWidgetSave(widget, { data: nextData }, 80);
  });
  canvas.addEventListener('pointercancel', () => {
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

function renderMusicWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const music = document.createElement('div');
  music.className = `music-widget ${data.presentation === 'player' ? 'player' : 'cover'}`;

  const art = document.createElement('img');
  art.alt = '';
  art.src = data.artwork || '';
  music.appendChild(art);

  const meta = document.createElement('div');
  meta.className = 'music-meta';
  meta.innerHTML = `
    <div class="music-title"></div>
    <div class="music-artist"></div>
    <audio controls src="${data.previewUrl || ''}"></audio>
  `;
  $('.music-title', meta).textContent = data.title || 'Untitled';
  $('.music-artist', meta).textContent = data.artist || '';
  music.appendChild(meta);

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
    if (element) board.appendChild(element);
  });

  setControlsForRole();
  refreshIcons();
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
  state.exhibit = exhibit;
  localStorage.setItem('caraMiaExhibitId', id);
  renderBoard();
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
    setView('auth');
  }
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
    loginForm.accountId.value = form.get('accountId');
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
  state.user = null;
  state.exhibit = null;
  setView('auth');
  showLogin();
});

exhibitPicker.addEventListener('change', () => {
  loadExhibit(exhibitPicker.value).catch((error) => showToast(error.message));
});

$$('.tool-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.tool === 'music') {
      selectTool(null);
      if (canEdit()) musicDialog.showModal();
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
  if (!['canvas', 'wordbox'].includes(state.selectedTool)) return;
  if (event.target !== board) return;

  const start = boardPoint(event);
  state.draft = { start, type: state.selectedTool };
  updateDragPreview({ x: start.x, y: start.y, width: 1, height: 1 });
  board.setPointerCapture(event.pointerId);
});

board.addEventListener('pointermove', (event) => {
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

$$('[data-presentation]').forEach((button) => {
  button.addEventListener('click', () => {
    state.pendingPresentation = button.dataset.presentation;
    $$('[data-presentation]').forEach((item) => item.classList.toggle('active', item === button));
  });
});

applyMusicButton.addEventListener('click', async () => {
  if (!state.pendingMusic) {
    showToast('Choose a song.');
    return;
  }

  const presentation = state.pendingPresentation;
  const rect = {
    x: Math.round(Math.max(120, board.clientWidth / 2 - (presentation === 'cover' ? 140 : 180))),
    y: Math.round(Math.max(100, board.clientHeight / 2 - (presentation === 'cover' ? 160 : 60))),
    width: presentation === 'cover' ? 280 : 360,
    height: presentation === 'cover' ? 330 : 100
  };

  try {
    await createWidget('music', rect, { ...state.pendingMusic, presentation });
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
refreshIcons();
checkSession();
