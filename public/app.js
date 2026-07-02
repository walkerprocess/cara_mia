const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const colors = [
  "#050406",
  "#ffffff",
  "#d8d2d7",
  "#8d8a94",
  "#7d38ff",
  "#b06cff",
  "#4f178f",
  "#24103d",
  "#ef314d",
  "#a90f2e",
  "#5a0719",
  "#ff95ac",
  "#ff6b2d",
  "#ffc857",
  "#2de2e6",
  "#5dff9b",
  "#2f80ed",
  "#111827",
  "#7a4a2e",
  "#f7e7ce",
  "#ff4fd8",
  "#7f1d1d",
  "#334155",
  "#000000",
];
const widgetColors = [
  "rgba(255,255,255,0.88)",
  "rgba(245,241,246,0.76)",
  "rgba(216,210,215,0.72)",
  "rgba(140,134,148,0.76)",
  "rgba(5,4,6,0.9)",
  "rgba(24,12,35,0.9)",
  "rgba(38,16,64,0.82)",
  "rgba(79,23,143,0.78)",
  "rgba(125,56,255,0.72)",
  "rgba(176,108,255,0.66)",
  "rgba(90,7,25,0.84)",
  "rgba(169,15,46,0.76)",
  "rgba(239,49,77,0.7)",
  "rgba(255,149,172,0.66)",
  "rgba(47,128,237,0.68)",
  "rgba(45,226,230,0.62)",
  "rgba(93,255,155,0.56)",
  "rgba(255,200,87,0.64)",
  "rgba(127,29,29,0.78)",
  "rgba(51,65,85,0.78)",
];
const musicPlayerColors = [
  "#f6e8f1",
  "#efd6e4",
  "#d7cbd3",
  "#b7a7b7",
  "#8e8191",
  "#ffffff",
  "#1b1b1d",
  "#2a2a2a",
  "#050406",
  "#f1bfd4",
  "#ce8fab",
  "#7b4c69",
  "#5a0719",
  "#7b1238",
  "#a90f2e",
  "#421062",
  "#1f1230",
  "#24103d",
  "#2f80ed",
];
const borderColors = [
  "transparent",
  "#050406",
  "#ffffff",
  "#d8d2d7",
  "#7d38ff",
  "#ef314d",
  "#ffc857",
  "#2de2e6",
];
const widgetShapes = [
  { id: "rect", label: "Square", radius: "8px" },
  { id: "round", label: "Round", radius: "24px" },
  { id: "circle", label: "Circle", radius: "999px" },
  { id: "arch", label: "Arch", radius: "999px 999px 18px 18px" },
  { id: "ticket", label: "Ticket", radius: "34px 8px 34px 8px" },
];
const defaultWidgetShapeId = "round";
const clippedWidgetShapeIds = new Set([
  "diamond",
  "heart",
  "star",
  "hex",
  "gem",
]);
const pictureFrames = [
  { id: "clean", label: "Clean" },
  { id: "classic", label: "Classic" },
  { id: "polaroid", label: "Polaroid" },
  { id: "film", label: "Film" },
  { id: "heart", label: "Heart" },
];
const questionPresets = {
  romantic: [
    "What tiny thing made you feel loved today?",
    "What is one memory with us that still makes you smile?",
    "What is the biggest reason that you chose me",
    "What do you miss most about being near me?",
    "What song feels like us right now?",
    "What is our song",
    "What is one date you want us to have someday?",
    "What is a small promise you want us to keep?",
    "What part of our future are you most excited about?",
    "When did you feel closest to me this week?",
    "What is one thing I do that makes you feel safe?",
    "What should we celebrate about us today?",
    "What would our future garden look like",
    "If I am a show, what show would I be?",
    "Would you stil love me if I was a worm?🤣",
    "What do you wish to do on our next date?",
    "Would you burn the world for me?",
  ],
  goofy: [
    "If we had a silly couple mascot, what would it be?",
    "What food would describe your mood today?",
    "What ridiculous superpower would make long distance easier?",
    "What inside joke deserves a comeback?",
    "What would our relationship sitcom episode be called today?",
    "If I were a snack, what snack would I be?",
    "What is the funniest thing you wanted to tell me today?",
    "What would our pets say about us if they could talk?",
    "What weird tradition should we start?",
    "What emoji is our relationship today?",
    "If you are an instrument, what instrument would you be?",
    "What is your favorite meme?",
    "What character from game or a show do you like the most?",
    "I'm sorry if these questions sucks... I'm not feeling too creative rn...",
    "What color of a cat or dog are you?",
    "If you could be one, would you be a werewolf or a vampire?",
  ],
  life: [
    "What has been weighing on your mind lately?",
    "What is one thing you need more support with?",
    "What are you trying to become better at?",
    "What is something you are proud of but have not said out loud?",
    "What would make this week feel lighter?",
    "What boundary would help you feel healthier?",
    "What decision are you avoiding?",
    "What is one dream you want us to protect?",
    "What are you learning about yourself right now?",
    "What would future us thank us for doing today?",
    "Do you ever feel lost? WEll I DO AS I AM WRITING THIS QUESTION....",
    "Don't worry. Everything is going to be okay. Especially since you're there. Right Diz?",
    "What career path would you have chosen if you go back 10 years ago?",
    "What do you do when you feel like you're behind everyone?",
  ],
};
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
  { x: 9, y: 83 },
];
const wordFonts = [
  { label: "Bricolage", value: '"Bricolage Grotesque", Arial, sans-serif' },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Garamond", value: 'Garamond, "Times New Roman", serif' },
  { label: "Times", value: '"Times New Roman", serif' },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Trebuchet", value: '"Trebuchet MS", sans-serif' },
  { label: "Courier", value: '"Courier New", monospace' },
  { label: "Impact", value: "Impact, Haettenschweiler, sans-serif" },
];
const clientId =
  window.crypto?.randomUUID?.() ||
  `cm-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const cursorPresets = [
  { id: "system", label: "PC cursor", url: "" },
  { id: "preset-1", label: "Preset 1", url: "/cursors/preset-1.png" },
  { id: "preset-2", label: "Preset 2", url: "/cursors/preset-2.png" },
  { id: "preset-3", label: "Preset 3", url: "/cursors/preset-3.png" },
  { id: "preset-4", label: "Preset 4", url: "/cursors/preset-4.png" },
  { id: "preset-5", label: "Preset 5", url: "/cursors/preset-5.png" },
];
const backgroundPresets = [
  { id: "default", label: "Hearts", url: "" },
  { id: "goth", label: "Goth", url: "/backgrounds/goth.jpg" },
  { id: "starry", label: "Starry", url: "/backgrounds/starry.jpg" },
  { id: "office", label: "Office", url: "/backgrounds/office.jpg" },
  { id: "dream", label: "Dream", url: "/backgrounds/dream.jpg" },
];
const cursorColors = [
  "#7d38ff",
  "#ef314d",
  "#f1bfd4",
  "#2de2e6",
  "#5dff9b",
  "#ffc857",
  "#ffffff",
  "#050406",
];
const randomCursorColor =
  cursorColors[Math.floor(Math.random() * cursorColors.length)];
const boardSize = { width: 5200, height: 3600 };
const zoomLimits = { min: 0.35, max: 2.25, step: 0.1 };
const cursorPresenceInterval = 150;
const cursorPresenceMinDistance = 6;
const cursorBumpDistance = 54;
const cursorBumpCooldownMs = 900;
const cursorDragDistance = 58;
const cursorDragStartDistance = 10;
const cursorDragSendInterval = 180;
const cursorBumpEffects = ["hearts", "black-cat", "orange-cat"];
const cursorEffectAssets = {
  hearts: "/cursor-effects/pixel-heart.png",
  "black-cat": "/cursor-effects/black-cat.png",
  "orange-cat": "/cursor-effects/orange-cat.png",
};
const gothicFlowFrameMs = 42;
const appUndoLimit = 40;

const state = {
  user: null,
  exhibits: [],
  exhibit: null,
  selectedTool: null,
  activePageId: null,
  viewMode: "edit",
  viewport: {
    zoom: 1,
    panning: null,
  },
  brush: {
    utensil: "brush",
    color: "#050406",
    size: 8,
  },
  draft: null,
  moveCandidate: null,
  moving: null,
  resizing: null,
  pendingMusic: null,
  pendingPresentation: "cover",
  pendingAssetType: "sticker",
  pendingPageAction: null,
  pendingSignup: null,
  pendingPasswordReset: null,
  drawingFrame: null,
  pendingDrawPoint: null,
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
  lastCursorBumpAt: 0,
  cursorDrag: null,
  pendingLocalCursorPoint: null,
  localCursorFrame: null,
  localCursorKey: "",
  appUndoStack: [],
  appRedoStack: [],
  lastUndoDomain: null,
  isApplyingHistory: false,
  widgetHistoryBaselines: new Map(),
  boardRect: null,
  gothicLastFrame: 0,
  saveTimers: new Map(),
  controlTimers: new WeakMap(),
};

const authView = $("#authView");
const studioView = $("#studioView");
const loginPanel = $("#loginPanel");
const signupPanel = $("#signupPanel");
const loginForm = $("#loginForm");
const signupForm = $("#signupForm");
const signupVerifyNote = $("#signupVerifyNote");
const forgotPasswordButton = $("#forgotPasswordButton");
const signupEmailField = $("#signupEmailField");
const signupEmailStatus = $("#signupEmailStatus");
const sendSignupCodeButton = $("#sendSignupCodeButton");
const signupCodeRow = $("#signupCodeRow");
const signupCodeField = $("#signupCodeField");
const signupCodeInput = $("#signupCodeInput");
const verifySignupCodeButton = $("#verifySignupCodeButton");
const signupAccountField = $("#signupAccountField");
const signupPasswordField = $("#signupPasswordField");
const signupPasswordConfirmField = $("#signupPasswordConfirmField");
const showSignupButton = $("#showSignupButton");
const showLoginButton = $("#showLoginButton");
const board = $("#board");
const boardViewport = $("#boardViewport");
const dragPreview = $("#dragPreview");
const localCursor = $("#localCursor");
const themeField = $("#themeField");
const exhibitPicker = $("#exhibitPicker");
const cursorSettingsButton = $("#cursorSettingsButton");
const readModeButton = $("#readModeButton");
const editModeButton = $("#editModeButton");
const downloadShotButton = $("#downloadShotButton");
const rolePill = $("#rolePill");
const shareButton = $("#shareButton");
const logoutButton = $("#logoutButton");
const pagePicker = $("#pagePicker");
const addPageButton = $("#addPageButton");
const renamePageButton = $("#renamePageButton");
const zoomOutButton = $("#zoomOutButton");
const zoomInButton = $("#zoomInButton");
const zoomValue = $("#zoomValue");
const brushPanel = $("#brushPanel");
const brushSize = $("#brushSize");
const colorRail = $("#colorRail");
const toast = $("#toast");
const shareDialog = $("#shareDialog");
const shareForm = $("#shareForm");
const shareList = $("#shareList");
const pageDialog = $("#pageDialog");
const pageForm = $("#pageForm");
const pageDialogTitle = $("#pageDialogTitle");
const pageNameInput = $("#pageNameInput");
const cursorDialog = $("#cursorDialog");
const settingsNavButtons = $$("[data-settings-section]");
const settingsPages = $$("[data-settings-panel]");
const accountUsername = $("#accountUsername");
const accountEmail = $("#accountEmail");
const changeUsernameForm = $("#changeUsernameForm");
const changeUsernameField = $("#changeUsernameField");
const changeUsernameNote = $("#changeUsernameNote");
const changePasswordForm = $("#changePasswordForm");
const changeCurrentPasswordField = $("#changeCurrentPasswordField");
const changeNewPasswordField = $("#changeNewPasswordField");
const changeNewPasswordConfirmField = $("#changeNewPasswordConfirmField");
const changePasswordNote = $("#changePasswordNote");
const settingsForgotPasswordButton = $("#settingsForgotPasswordButton");
const cursorPreview = $("#cursorPreview");
const cursorColorInput = $("#cursorColorInput");
const cursorPresetGrid = $("#cursorPresetGrid");
const cursorUploadInput = $("#cursorUploadInput");
const backgroundPresetGrid = $("#backgroundPresetGrid");
const musicDialog = $("#musicDialog");
const musicSearchForm = $("#musicSearchForm");
const musicSearchInput = $("#musicSearchInput");
const musicResults = $("#musicResults");
const musicChoice = $("#musicChoice");
const applyMusicButton = $("#applyMusicButton");
const assetDialog = $("#assetDialog");
const assetDialogTitle = $("#assetDialogTitle");
const assetSearchForm = $("#assetSearchForm");
const assetSearchInput = $("#assetSearchInput");
const assetResults = $("#assetResults");
const pictureUploadInput = $("#pictureUploadInput");
const passwordResetDialog = $("#passwordResetDialog");
const forgotPasswordForm = $("#forgotPasswordForm");
const resetPasswordForm = $("#resetPasswordForm");
const resetPasswordNote = $("#resetPasswordNote");
const resetCodeField = $("#resetCodeField");
const resetCodeStatus = $("#resetCodeStatus");
const verifyResetCodeButton = $("#verifyResetCodeButton");
const resetNewPasswordField = $("#resetNewPasswordField");
const resetNewPasswordConfirmField = $("#resetNewPasswordConfirmField");
const applyResetPasswordButton = $("#applyResetPasswordButton");
const resetPasswordBackButton = $("#resetPasswordBackButton");

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(
    () => toast.classList.remove("show"),
    2600,
  );
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      "X-Cara-Mia-Client-Id": clientId,
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Something went wrong.");
  }
  return payload;
}

function loadCursorProfile() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("caraMiaCursorProfile") || "{}",
    );
    return {
      color: /^#[0-9a-fA-F]{6}$/.test(saved.color)
        ? saved.color
        : randomCursorColor,
      cursorImage:
        typeof saved.cursorImage === "string" ? saved.cursorImage : "",
    };
  } catch {
    return { color: randomCursorColor, cursorImage: "" };
  }
}

function saveCursorProfile() {
  localStorage.setItem(
    "caraMiaCursorProfile",
    JSON.stringify(state.cursorProfile),
  );
}

function activeCursorPreset() {
  return (
    cursorPresets.find(
      (preset) => preset.url && preset.url === state.cursorProfile.cursorImage,
    )?.id || (state.cursorProfile.cursorImage ? "custom" : "system")
  );
}

function activeBackgroundPreset() {
  const pageTheme = activePage()?.backgroundTheme || "default";
  return backgroundPresets.some((preset) => preset.id === pageTheme)
    ? pageTheme
    : "default";
}

function cursorPayload(point) {
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
    color: state.cursorProfile.color,
    cursorImage: state.cursorProfile.cursorImage,
  };
}

function appendCursorGraphic(target, imageUrl) {
  if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "";
    target.appendChild(image);
    return;
  }
  const arrow = document.createElement("span");
  arrow.className = "remote-cursor-arrow";
  target.appendChild(arrow);
}

function renderCursorContents(target, imageUrl, label) {
  target.replaceChildren();
  appendCursorGraphic(target, imageUrl);
  const name = document.createElement("strong");
  name.textContent = label;
  target.appendChild(name);
}

function localCursorKey() {
  return [
    state.cursorProfile.color,
    state.cursorProfile.cursorImage,
    state.user?.accountId || "you",
  ].join("|");
}

function ensureLocalCursorContents() {
  if (!localCursor) return;
  if (!state.cursorProfile.cursorImage) {
    state.localCursorKey = "default";
    localCursor.classList.add("hidden");
    localCursor.innerHTML = "";
    return;
  }
  const nextKey = localCursorKey();
  if (state.localCursorKey === nextKey) return;
  state.localCursorKey = nextKey;
  localCursor.style.setProperty("--cursor-color", state.cursorProfile.color);
  localCursor.classList.toggle(
    "image-cursor",
    Boolean(state.cursorProfile.cursorImage),
  );
  localCursor.classList.toggle(
    "arrow-cursor",
    !state.cursorProfile.cursorImage,
  );
  renderCursorContents(
    localCursor,
    state.cursorProfile.cursorImage,
    state.user?.accountId || "you",
  );
}

function moveLocalCursor(point) {
  if (!localCursor) return;
  if (!state.cursorProfile.cursorImage) {
    localCursor.classList.add("hidden");
    return;
  }
  localCursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
  localCursor.classList.remove("hidden");
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
    peer.cursorKind || "",
    peer.cursorImage || "",
    peer.color || "",
    peer.accountId || "",
  ].join("|");
}

function renderRemoteCursor(id, peer) {
  if (!state.exhibit || peer.exhibitId !== state.exhibit.id) return;
  let cursor = state.cursorNodes.get(id);
  if (!cursor) {
    cursor = document.createElement("div");
    state.cursorNodes.set(id, cursor);
    board.appendChild(cursor);
  }

  const nextKey = cursorNodeKey(peer);
  if (cursor.dataset.cursorKey !== nextKey) {
    cursor.dataset.cursorKey = nextKey;
    cursor.className = `remote-cursor ${peer.cursorKind === "image" ? "image-cursor" : "arrow-cursor"}`;
    cursor.style.setProperty("--cursor-color", peer.color || "#7d38ff");
    renderCursorContents(
      cursor,
      peer.cursorKind === "image" ? peer.cursorImage : "",
      peer.accountId || "guest",
    );
  }
  cursor.style.transform = `translate3d(${peer.x}px, ${peer.y}px, 0)`;
  if (peer.bumpEffect) {
    const effect = peer.bumpEffect;
    delete peer.bumpEffect;
    try {
      playCursorBumpEffect(
        {
          x: 0,
          y: 0,
        },
        effect,
        cursor,
      );
    } catch {
      // Live cursor effects should never interrupt cursor presence rendering.
    }
  } else {
    delete cursor.dataset.bumpEffect;
  }
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
    updatedAt: Date.now(),
  };
  state.cursorPeers.set(payload.sourceClientId, peer);
  renderRemoteCursor(payload.sourceClientId, peer);
}

function handleCursorLeft(payload) {
  state.cursorPeers.delete(payload.sourceClientId);
  state.cursorNodes.get(payload.sourceClientId)?.remove();
  state.cursorNodes.delete(payload.sourceClientId);
}

function cursorBumpEffect() {
  return cursorBumpEffects[
    Math.floor(Math.random() * cursorBumpEffects.length)
  ];
}

function removeAfterAnimation(element, fallbackMs = 1200) {
  window.setTimeout(() => element.remove(), fallbackMs);
}

function playCursorBumpEffect(point, effect = "hearts", target = board) {
  const effectLayer = target || board || document.querySelector("#board");
  if (
    !effectLayer ||
    !Number.isFinite(point?.x) ||
    !Number.isFinite(point?.y)
  ) {
    return false;
  }
  const safeEffect = cursorBumpEffects.includes(effect) ? effect : "hearts";
  if (safeEffect === "hearts") {
    const burst = document.createElement("div");
    burst.className = "cursor-burst cursor-burst-hearts";
    burst.style.left = `${point.x}px`;
    burst.style.top = `${point.y}px`;
    const offsets = [
      [-34, -56, -18, 0.62],
      [-12, -78, 10, 0.78],
      [18, -62, 22, 0.66],
      [38, -36, -8, 0.56],
      [-44, -26, 18, 0.52],
      [4, -42, -24, 0.48],
    ];
    offsets.forEach(([x, y, rotation, scale], index) => {
      const heart = document.createElement("img");
      heart.className = "cursor-burst-heart";
      heart.src = cursorEffectAssets.hearts;
      heart.alt = "";
      heart.style.setProperty("--burst-x", `${x}px`);
      heart.style.setProperty("--burst-y", `${y}px`);
      heart.style.setProperty("--burst-rotation", `${rotation}deg`);
      heart.style.setProperty("--burst-scale", String(scale));
      heart.style.animationDelay = `${index * 28}ms`;
      burst.appendChild(heart);
    });
    effectLayer.appendChild(burst);
    removeAfterAnimation(burst, 1800);
    return true;
  }

  const cat = document.createElement("img");
  const isBlackCat = safeEffect === "black-cat";
  cat.className = `cursor-burst cursor-burst-cat ${isBlackCat ? "black-cat" : "orange-cat"}`;
  cat.src = cursorEffectAssets[safeEffect];
  cat.alt = "";
  cat.style.left = `${point.x}px`;
  cat.style.top = `${point.y}px`;
  cat.style.setProperty("--jump-x", isBlackCat ? "-92px" : "92px");
  cat.style.setProperty("--jump-rotation", isBlackCat ? "-18deg" : "18deg");
  effectLayer.appendChild(cat);
  removeAfterAnimation(cat, 1800);
  return true;
}

function cursorPeerAtPoint(point, maxDistance = cursorBumpDistance) {
  const now = Date.now();
  let match = null;
  state.cursorPeers.forEach((peer, id) => {
    if (!peer || peer.exhibitId !== state.exhibit?.id) return;
    if (now - Number(peer.updatedAt || 0) > 12000) return;
    const x = Number(peer.x);
    const y = Number(peer.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const distance = Math.hypot(point.x - x, point.y - y);
    if (distance > maxDistance) return;
    if (!match || distance < match.distance) {
      match = { ...peer, id, distance };
    }
  });
  return match;
}

function triggerCursorBumpAtPoint(point, peer = cursorPeerAtPoint(point)) {
  if (!state.exhibit || !peer) return false;
  const now = Date.now();
  if (now - state.lastCursorBumpAt < cursorBumpCooldownMs) return false;
  const effect = cursorBumpEffect();
  state.lastCursorBumpAt = now;
  playCursorBumpEffect(point, effect);
  api(`/api/exhibits/${state.exhibit.id}/cursor-bump`, {
    method: "POST",
    body: JSON.stringify({
      targetClientId: peer.id,
      x: Math.round(point.x),
      y: Math.round(point.y),
      color: state.cursorProfile.color,
      effect,
    }),
  }).catch(() => {});
  return true;
}

function beginCursorPeerDrag(event) {
  if (!state.exhibit || event.button !== 0 || event.target !== board) {
    return false;
  }
  const point = boardPoint(event);
  const peer = cursorPeerAtPoint(point, cursorDragDistance);
  if (!peer) return false;
  state.cursorDrag = {
    pointerId: event.pointerId,
    peerId: peer.id,
    peer,
    start: point,
    dragging: false,
    lastSentAt: 0,
  };
  board.classList.add("cursor-peer-dragging");
  board.setPointerCapture(event.pointerId);
  event.preventDefault();
  event.stopPropagation();
  return true;
}

function draggedCursorPayload(peer, point) {
  const cursorImage = peer.cursorKind === "image" ? peer.cursorImage || "" : "";
  return {
    targetClientId: peer.id,
    accountId: peer.accountId || "",
    x: Math.round(point.x),
    y: Math.round(point.y),
    color: peer.color || "#7d38ff",
    cursorImage,
  };
}

function sendCursorDrag(point, peer, final = false) {
  if (!state.exhibit || !peer?.id) return;
  const now = Date.now();
  if (!final && now - state.cursorDrag.lastSentAt < cursorDragSendInterval) {
    return;
  }
  state.cursorDrag.lastSentAt = now;
  api(`/api/exhibits/${state.exhibit.id}/cursor-drag`, {
    method: "POST",
    body: JSON.stringify(draggedCursorPayload(peer, point)),
  }).catch(() => {});
}

function updateCursorPeerDrag(event, final = false) {
  const drag = state.cursorDrag;
  if (!drag || drag.pointerId !== event.pointerId) return false;
  const point = boardPoint(event);
  const moved = Math.hypot(point.x - drag.start.x, point.y - drag.start.y);
  if (!drag.dragging && moved < cursorDragStartDistance && !final) {
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
  if (!drag.dragging && moved >= cursorDragStartDistance) {
    drag.dragging = true;
  }
  if (drag.dragging) {
    const basePeer = state.cursorPeers.get(drag.peerId) || drag.peer;
    const peer = {
      ...basePeer,
      id: drag.peerId,
      x: point.x,
      y: point.y,
      exhibitId: state.exhibit.id,
      updatedAt: Date.now(),
    };
    delete peer.bumpEffect;
    state.cursorPeers.set(drag.peerId, peer);
    renderRemoteCursor(drag.peerId, peer);
    sendCursorDrag(point, peer, final);
  }
  event.preventDefault();
  event.stopPropagation();
  return true;
}

function endCursorPeerDrag(event) {
  const drag = state.cursorDrag;
  if (!drag || drag.pointerId !== event.pointerId) return false;
  if (drag.dragging) {
    updateCursorPeerDrag(event, true);
  } else {
    triggerCursorBumpAtPoint(boardPoint(event), drag.peer);
  }
  clearCursorPeerDrag(event.pointerId);
  event.preventDefault();
  event.stopPropagation();
  return true;
}

function clearCursorPeerDrag(pointerId) {
  try {
    if (board.hasPointerCapture?.(pointerId)) {
      board.releasePointerCapture(pointerId);
    }
  } catch {
    // Pointer capture can already be gone after browser-level cancellation.
  }
  state.cursorDrag = null;
  board.classList.remove("cursor-peer-dragging");
}

function sendCursorPresence(point) {
  if (!state.exhibit) return;
  state.cursorLastSentPoint = point;
  state.cursorLastSentAt = Date.now();
  api(`/api/exhibits/${state.exhibit.id}/presence`, {
    method: "POST",
    body: JSON.stringify(cursorPayload(point)),
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
    if (
      state.pendingCursorPoint &&
      shouldSendCursorPresence(state.pendingCursorPoint)
    ) {
      sendCursorPresence(state.pendingCursorPoint);
    }
    state.pendingCursorPoint = null;
  }, cursorPresenceInterval);
}

function setLocalCursorImage() {
  board.classList.toggle(
    "custom-cursor-active",
    Boolean(state.cursorProfile.cursorImage),
  );
  renderLocalCursor();
}

function renderCursorPreview() {
  cursorColorInput.value = state.cursorProfile.color;
  cursorPreview.style.setProperty("--cursor-color", state.cursorProfile.color);
  cursorPreview.replaceChildren();
  appendCursorGraphic(cursorPreview, state.cursorProfile.cursorImage);

  $$(".cursor-preset").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.preset === activeCursorPreset(),
    );
  });
  setLocalCursorImage();
}

function buildCursorPresets() {
  cursorPresetGrid.innerHTML = "";
  cursorPresets.forEach((preset) => {
    const button = document.createElement("button");
    button.className = "cursor-preset";
    button.type = "button";
    button.dataset.preset = preset.id;
    button.title = preset.label;
    button.innerHTML = preset.url
      ? `<img src="${preset.url}" alt="">`
      : '<span class="default-cursor-mark"><span class="remote-cursor-arrow"></span><strong>PC cursor</strong></span>';
    button.addEventListener("click", () => {
      state.cursorProfile.cursorImage = preset.url;
      saveCursorProfile();
      renderCursorPreview();
      if (state.pendingCursorPoint)
        sendCursorPresence(state.pendingCursorPoint);
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
  backgroundPresetGrid.innerHTML = "";
  backgroundPresets.forEach((preset) => {
    const button = document.createElement("button");
    button.className = "background-preset";
    button.type = "button";
    button.dataset.background = preset.id;
    button.title = preset.label;
    button.innerHTML = preset.url
      ? `<span class="background-preset-thumb" style="background-image: url('${preset.url}')"></span><strong>${preset.label}</strong>`
      : '<span class="background-preset-thumb default-thumb"></span><strong>Hearts</strong>';
    button.classList.toggle("active", preset.id === activeBackgroundPreset());
    button.addEventListener("click", async () => {
      if (!state.exhibit || !state.activePageId) return;
      const previousTheme = activeBackgroundPreset();
      if (previousTheme === preset.id) return;
      try {
        const { pages } = await api(
          `/api/exhibits/${state.exhibit.id}/pages/${state.activePageId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ backgroundTheme: preset.id }),
          },
        );
        state.exhibit.pages = pages;
        pushAppUndo({
          type: "restore-page-background",
          pageId: state.activePageId,
          backgroundTheme: previousTheme,
        });
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
        const canvas = document.createElement("canvas");
        const maxSize = 220;
        const scale = Math.min(
          1,
          maxSize / Math.max(image.width, image.height),
        );
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizePictureUpload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 1400;
        const scale = Math.min(
          1,
          maxSize / Math.max(image.width, image.height),
        );
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve({
          url: canvas.toDataURL("image/jpeg", 0.88),
          width: canvas.width,
          height: canvas.height,
          title: file.name?.replace(/\.[^.]+$/, "") || "Picture",
        });
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function pictureFrameConfig(data = {}) {
  return (
    pictureFrames.find((frame) => frame.id === data.frame) || pictureFrames[1]
  );
}

function questionCategory(data = {}) {
  return questionPresets[data.questionType] ? data.questionType : "romantic";
}

function activeQuestionText(data = {}) {
  const category = questionCategory(data);
  const questions = questionPresets[category];
  const index = Math.abs(Number(data.questionIndex) || 0) % questions.length;
  return questions[index];
}

function questionStyle(data = {}, target = "question") {
  const prefix = target === "answer" ? "answer" : "question";
  const defaultSize = target === "answer" ? 17 : 20;
  const defaultWeight = target === "answer" ? "500" : "800";
  return {
    color: data[`${prefix}Color`] || "#050406",
    font: wordFont({ fontFamily: data[`${prefix}FontFamily`] }),
    size: clamp(Number(data[`${prefix}FontSize`]) || defaultSize, 10, 72),
    weight: data[`${prefix}Bold`] ? "800" : defaultWeight,
    style: data[`${prefix}Italic`] ? "italic" : "normal",
  };
}

function createHearts() {
  const field = $("#heartField");
  field.innerHTML = "";
  const gothicColors = [
    "rgba(0, 0, 0, 0.98)",
    "rgba(5, 4, 7, 0.96)",
    "rgba(55, 45, 70, 0.9)",
    "rgba(42, 38, 48, 0.62)",
    "rgba(41, 14, 69, 0.66)",
    "rgba(56, 12, 88, 0.45)",
    "rgba(50, 2, 17, 0.7)",
    "rgba(104, 15, 37, 0.4)",
    "rgba(146, 120, 160, 0.1)",
  ];

  for (let index = 0; index < 18; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.zIndex = String(30 - index);
    heart.style.setProperty("--duration", `${30 + (index % 6) * 2.2}s`);
    heart.style.setProperty("--delay", `${index * -1.4}s`);
    heart.style.setProperty("--start-scale", `${0.06 + (index % 4) * 0.015}`);
    heart.style.setProperty("--end-scale", `${4.6 + (index % 8) * 0.42}`);
    heart.style.setProperty("--blur", `${index % 9 === 8 ? 1.4 : 0}px`);
    heart.style.setProperty("--heart-opacity", `${0.32 + (index % 5) * 0.045}`);
    heart.style.setProperty("--heart-size", `${48 + (index % 10) * 18}px`);
    heart.style.setProperty(
      "--heart-color",
      gothicColors[index % gothicColors.length],
    );
    field.appendChild(heart);
  }
}

function gothicPathPoint(time, offset = 0) {
  const duration = 11800;
  const normalized =
    ((((time + offset) % duration) + duration) % duration) / duration;
  const pathPosition = normalized * gothicFlowPath.length;
  const index = Math.floor(pathPosition);
  const nextIndex = (index + 1) % gothicFlowPath.length;
  const rawProgress = pathPosition - index;
  const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
  const current = gothicFlowPath[index];
  const next = gothicFlowPath[nextIndex];

  return {
    x: current.x + (next.x - current.x) * progress,
    y: current.y + (next.y - current.y) * progress,
  };
}

function setGothicFlowVars(prefix, point) {
  themeField.style.setProperty(`--${prefix}-x`, `${point.x}%`);
  themeField.style.setProperty(`--${prefix}-y`, `${point.y}%`);
}

function animateGothicFlowLight(time = 0) {
  const shouldAnimate =
    themeField &&
    document.body.dataset.backgroundTheme === "goth" &&
    !document.hidden;
  if (shouldAnimate && time - state.gothicLastFrame >= gothicFlowFrameMs) {
    state.gothicLastFrame = time;
    setGothicFlowVars("gothic-flow", gothicPathPoint(time));
    setGothicFlowVars("gothic-flow-mid", gothicPathPoint(time, -960));
    setGothicFlowVars("gothic-flow-tail", gothicPathPoint(time, -1900));
  }
  window.requestAnimationFrame(animateGothicFlowLight);
}

function setView(view) {
  authView.classList.toggle("hidden", view !== "auth");
  studioView.classList.toggle("hidden", view !== "studio");
}

function clearFieldError(field) {
  field?.classList.remove("field-error");
}

function markFieldError(field) {
  field?.classList.add("field-error");
}

function setInlineError(element, message = "") {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("show", Boolean(message));
}

function setVerifyStatus(element, status) {
  element.classList.remove("verified", "invalid");
  if (status === "verified") {
    element.textContent = "";
    element.classList.add("verified");
    return;
  }
  if (status === "invalid") {
    element.textContent = "";
    element.classList.add("invalid");
    return;
  }
  element.textContent = "";
}

function signupEmail() {
  return String(signupForm.elements.email.value || "")
    .trim()
    .toLowerCase();
}

function validEmailValue(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function validAccountIdValue(accountId) {
  return /^[a-z0-9_.-]{3,32}$/.test(
    String(accountId || "")
      .trim()
      .toLowerCase(),
  );
}

function validPasswordValue(password) {
  return String(password || "").length >= 8;
}

function resetSignupVerification() {
  state.pendingSignup = null;
  signupCodeRow.classList.remove("hidden");
  signupCodeInput.value = "";
  signupVerifyNote.textContent = "";
  setVerifyStatus(signupEmailStatus, null);
  clearFieldError(signupEmailField);
  clearFieldError(signupCodeField);
}

function showSignupDetails() {
  signupForm.classList.remove("hidden");
  resetSignupVerification();
}

function showSignupVerification(email) {
  state.pendingSignup = { email, verified: false };
  signupCodeRow.classList.remove("hidden");
  signupVerifyNote.textContent = `Enter the 6-character code sent to ${email}.`;
  signupCodeInput.value = "";
  setVerifyStatus(signupEmailStatus, null);
  signupCodeInput.focus();
}

function showLogin() {
  signupPanel.classList.add("hidden");
  loginPanel.classList.remove("hidden");
  showSignupDetails();
}

function showSignup() {
  loginPanel.classList.add("hidden");
  signupPanel.classList.remove("hidden");
  showSignupDetails();
}

function renderAccountSettings() {
  accountUsername.textContent = state.user?.accountId || "-";
  accountEmail.textContent = state.user?.email || "-";
  if (changeUsernameForm) {
    changeUsernameForm.elements.accountId.value = state.user?.accountId || "";
  }
}

function setSettingsSection(sectionId = "account") {
  settingsNavButtons.forEach((button) => {
    const active = button.dataset.settingsSection === sectionId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  settingsPages.forEach((page) => {
    const active = page.dataset.settingsPanel === sectionId;
    page.hidden = !active;
    page.classList.toggle("active", active);
  });
}

function openPasswordResetDialog(email = "") {
  state.pendingPasswordReset = null;
  forgotPasswordForm.reset();
  resetPasswordForm.reset();
  forgotPasswordForm.classList.remove("hidden");
  resetPasswordForm.classList.remove("hidden");
  resetPasswordForm.elements.email.value = String(email || "")
    .trim()
    .toLowerCase();
  resetPasswordNote.textContent = "";
  resetNewPasswordField.classList.add("hidden");
  resetNewPasswordConfirmField.classList.add("hidden");
  applyResetPasswordButton.classList.add("hidden");
  setVerifyStatus(resetCodeStatus, null);
  clearFieldError(resetCodeField);
  clearFieldError(resetNewPasswordField);
  clearFieldError(resetNewPasswordConfirmField);
  if (email) {
    forgotPasswordForm.elements.email.value = email;
  }
  passwordResetDialog.showModal();
  forgotPasswordForm.elements.email.focus();
}

function showResetPasswordStep(email) {
  state.pendingPasswordReset = { email, resetToken: null };
  forgotPasswordForm.classList.add("hidden");
  resetPasswordForm.classList.remove("hidden");
  resetPasswordForm.elements.email.value = email;
  resetPasswordNote.textContent = `Enter the code sent to ${email}.`;
  resetPasswordForm.elements.code.value = "";
  resetPasswordForm.elements.newPassword.value = "";
  resetPasswordForm.elements.newPasswordConfirm.value = "";
  resetNewPasswordField.classList.add("hidden");
  resetNewPasswordConfirmField.classList.add("hidden");
  applyResetPasswordButton.classList.add("hidden");
  setVerifyStatus(resetCodeStatus, null);
  clearFieldError(resetCodeField);
  clearFieldError(resetNewPasswordField);
  resetPasswordForm.elements.code.focus();
}

function resetDialogEmailValue() {
  return String(
    resetPasswordForm.elements.email.value ||
      forgotPasswordForm.elements.email.value ||
      "",
  )
    .trim()
    .toLowerCase();
}

function canEdit() {
  return state.viewMode === "edit" && Boolean(state.exhibit?.canEdit);
}

function activePage() {
  return (
    state.exhibit?.pages?.find((page) => page.id === state.activePageId) ||
    state.exhibit?.pages?.[0] ||
    null
  );
}

function setViewMode(mode) {
  state.viewMode = mode === "read" ? "read" : "edit";
  document.body.classList.toggle("read-mode", state.viewMode === "read");
  readModeButton.classList.toggle("hidden", state.viewMode === "read");
  editModeButton.classList.toggle("hidden", state.viewMode !== "read");
  downloadShotButton.classList.toggle("hidden", state.viewMode !== "read");
  if (state.viewMode === "read") {
    selectTool(null);
    clearWidgetSelection();
  }
  setControlsForRole();
  renderBoard();
}

function renderPagePicker() {
  pagePicker.innerHTML = "";
  const pages = state.exhibit?.pages?.length ? state.exhibit.pages : [];
  pages.forEach((page) => {
    const option = document.createElement("option");
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
  state.viewport.zoom =
    Math.round(clamp(nextZoom, zoomLimits.min, zoomLimits.max) * 100) / 100;
  applyZoom(anchorPoint ? { ...anchorPoint, previousZoom } : null);
}

function selectTool(tool) {
  if (!canEdit() && tool !== null) {
    showToast("This exhibit is view only.");
    return;
  }

  state.selectedTool = state.selectedTool === tool ? null : tool;
  $$(".tool-button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.tool === state.selectedTool,
    );
  });
  brushPanel.classList.toggle("hidden", state.selectedTool !== "brush");
}

function setControlsForRole() {
  const editable = canEdit();
  $$(".tool-button").forEach((button) => {
    button.disabled = !editable;
  });
  shareButton.disabled = !state.exhibit?.canShare;
  pagePicker.disabled = !state.exhibit?.pages?.length;
  addPageButton.disabled = !editable;
  renamePageButton.disabled = !editable || !state.activePageId;
  rolePill.textContent = (state.exhibit?.role || "viewer").toUpperCase();
  if (!editable) {
    selectTool(null);
  }
}

function shareRoleLabel(role) {
  return role === "collaborator" ? "Collaborator" : "Spectator";
}

function renderShareList(shares = []) {
  shareList.innerHTML = "";
  if (!shares.length) {
    shareList.innerHTML =
      '<p class="empty-people">No one has been added yet.</p>';
    return;
  }

  shares.forEach((share) => {
    const row = document.createElement("article");
    row.className = "person-row";
    row.innerHTML = `
      <div class="person-meta">
        <strong></strong>
        <small></small>
      </div>
      <span class="person-role"></span>
      <button class="secondary-button compact person-role-button" type="button"></button>
      <button class="icon-button person-remove-button" type="button" title="Remove" aria-label="Remove"><i data-lucide="x"></i></button>
    `;
    $("strong", row).textContent = share.user?.accountId || "Unknown";
    $("small", row).textContent = share.user?.email || "";
    $(".person-role", row).textContent = shareRoleLabel(share.role);

    const roleButton = $(".person-role-button", row);
    const nextRole = share.role === "collaborator" ? "viewer" : "collaborator";
    roleButton.textContent =
      share.role === "collaborator"
        ? "Demote to spectator"
        : "Promote to collaborator";
    roleButton.addEventListener("click", async () => {
      try {
        await api(`/api/exhibits/${state.exhibit.id}/shares/${share.id}`, {
          method: "PATCH",
          body: JSON.stringify({ role: nextRole }),
        });
        await loadShareList();
        showToast("Permission updated.");
      } catch (error) {
        showToast(error.message);
      }
    });

    $(".person-remove-button", row).addEventListener("click", async () => {
      try {
        await api(`/api/exhibits/${state.exhibit.id}/shares/${share.id}`, {
          method: "DELETE",
        });
        await loadShareList();
        showToast("Person removed.");
      } catch (error) {
        showToast(error.message);
      }
    });

    shareList.appendChild(row);
  });
  refreshIcons();
}

async function loadShareList() {
  if (!state.exhibit?.canShare) {
    shareList.innerHTML =
      '<p class="empty-people">Only the owner can manage people.</p>';
    return;
  }
  shareList.innerHTML = '<p class="empty-people">Loading...</p>';
  const { shares } = await api(`/api/exhibits/${state.exhibit.id}/shares`);
  renderShareList(shares);
}

function widgetData(widget) {
  const data =
    widget?.data && typeof widget.data === "object" ? widget.data : {};
  if (clippedWidgetShapeIds.has(data.shape)) {
    data.shape = defaultWidgetShapeId;
  }
  return data;
}

function cloneWidget(widget) {
  return JSON.parse(JSON.stringify(widget));
}

function snapshotWidget(widget) {
  const snapshot = cloneWidget(widget);
  snapshot.data = { ...widgetData(snapshot) };
  return snapshot;
}

function widgetHistoryView(widget) {
  const data = widgetData(widget);
  return {
    id: widget.id,
    page_id: widget.page_id,
    type: widget.type,
    x: widget.x,
    y: widget.y,
    width: widget.width,
    height: widget.height,
    z_index: widget.z_index,
    data,
  };
}

function widgetsMatchForHistory(left, right) {
  if (!left || !right) return false;
  return (
    JSON.stringify(widgetHistoryView(left)) ===
    JSON.stringify(widgetHistoryView(right))
  );
}

function setWidgetBaseline(widget) {
  if (widget?.id) {
    state.widgetHistoryBaselines.set(widget.id, snapshotWidget(widget));
  }
}

function removeWidgetBaseline(widgetId) {
  state.widgetHistoryBaselines.delete(widgetId);
}

function clearAppHistory() {
  state.appUndoStack = [];
  state.appRedoStack = [];
  state.lastUndoDomain = null;
  state.widgetHistoryBaselines.clear();
}

function trimHistoryStack(stack) {
  if (stack.length > appUndoLimit) {
    stack.splice(0, stack.length - appUndoLimit);
  }
}

function pushHistory(stack, action) {
  if (!action) return;
  stack.push(action);
  trimHistoryStack(stack);
}

function pushAppUndo(action) {
  if (!action || state.isApplyingHistory) return;
  pushHistory(state.appUndoStack, action);
  state.appRedoStack = [];
  state.lastUndoDomain = "app";
}

function updateActionWidgetId(action, oldId, newId) {
  if (action?.widget?.id === oldId) {
    action.widget.id = newId;
  }
}

function remapHistoryWidgetId(oldId, newId) {
  if (!oldId || !newId || oldId === newId) return;
  state.appUndoStack.forEach((action) =>
    updateActionWidgetId(action, oldId, newId),
  );
  state.appRedoStack.forEach((action) =>
    updateActionWidgetId(action, oldId, newId),
  );
}

function widgetPatchPayload(widget) {
  return {
    x: widget.x,
    y: widget.y,
    width: widget.width,
    height: widget.height,
    zIndex: widget.z_index,
    pageId: widget.page_id || state.activePageId,
    data: widgetData(widget),
  };
}

async function restoreWidgetSnapshot(action) {
  if (!canEdit() || !state.exhibit || !action?.widget) return null;

  const original = snapshotWidget(action.widget);
  const { widget } = await api("/api/widgets", {
    method: "POST",
    body: JSON.stringify({
      exhibitId: state.exhibit.id,
      pageId: original.page_id || state.activePageId || activePage()?.id,
      type: original.type,
      x: original.x,
      y: original.y,
      width: original.width,
      height: original.height,
      data: widgetData(original),
    }),
  });

  const { widget: saved } = await api(`/api/widgets/${widget.id}`, {
    method: "PATCH",
    body: JSON.stringify(widgetPatchPayload({ ...original, id: widget.id })),
  });

  const insertAt = clamp(Number(action.index), 0, state.exhibit.widgets.length);
  state.exhibit.widgets.splice(insertAt, 0, saved);
  state.exhibit.widgets.sort(
    (a, b) =>
      a.z_index - b.z_index ||
      String(a.created_at).localeCompare(String(b.created_at)),
  );
  setWidgetBaseline(saved);
  remapHistoryWidgetId(original.id, saved.id);
  if (saved.page_id) {
    state.activePageId = saved.page_id;
    localStorage.setItem(`caraMiaPage:${state.exhibit.id}`, saved.page_id);
  }
  applyBackgroundTheme();
  renderBackgroundPresets();
  renderBoard();
  return { type: "delete-widget", widget: snapshotWidget(saved) };
}

async function deleteWidgetSnapshot(action) {
  if (!canEdit() || !state.exhibit || !action?.widget?.id) return null;

  const deletedIndex = state.exhibit.widgets.findIndex(
    (item) => item.id === action.widget.id,
  );
  if (deletedIndex < 0) return null;

  const deletedWidget = snapshotWidget(state.exhibit.widgets[deletedIndex]);
  window.clearTimeout(state.saveTimers.get(deletedWidget.id));
  state.saveTimers.delete(deletedWidget.id);
  await api(`/api/widgets/${deletedWidget.id}`, { method: "DELETE" });
  state.exhibit.widgets.splice(deletedIndex, 1);
  removeWidgetBaseline(deletedWidget.id);
  renderBoard();
  return { type: "restore-widget", widget: deletedWidget, index: deletedIndex };
}

async function restoreWidgetState(action) {
  if (!canEdit() || !state.exhibit || !action?.widget?.id) return null;

  const index = state.exhibit.widgets.findIndex(
    (item) => item.id === action.widget.id,
  );
  if (index < 0) return null;

  const current = snapshotWidget(state.exhibit.widgets[index]);
  const target = snapshotWidget(action.widget);
  if (widgetsMatchForHistory(current, target)) return null;

  window.clearTimeout(state.saveTimers.get(target.id));
  state.saveTimers.delete(target.id);
  const { widget: saved } = await api(`/api/widgets/${target.id}`, {
    method: "PATCH",
    body: JSON.stringify(widgetPatchPayload(target)),
  });
  state.exhibit.widgets[index] = saved;
  setWidgetBaseline(saved);
  if (saved.page_id) {
    state.activePageId = saved.page_id;
    localStorage.setItem(`caraMiaPage:${state.exhibit.id}`, saved.page_id);
  }
  renderBoard();
  return { type: "restore-widget-state", widget: current };
}

async function restorePageBackground(action) {
  if (!canEdit() || !state.exhibit || !action?.pageId) return null;

  const page = state.exhibit.pages?.find((item) => item.id === action.pageId);
  if (!page) return null;

  const currentTheme = backgroundPresets.some(
    (preset) => preset.id === page.backgroundTheme,
  )
    ? page.backgroundTheme
    : "default";
  const targetTheme = backgroundPresets.some(
    (preset) => preset.id === action.backgroundTheme,
  )
    ? action.backgroundTheme
    : "default";
  if (currentTheme === targetTheme) return null;

  const { pages } = await api(
    `/api/exhibits/${state.exhibit.id}/pages/${action.pageId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ backgroundTheme: targetTheme }),
    },
  );
  state.exhibit.pages = pages;
  state.activePageId = action.pageId;
  localStorage.setItem(`caraMiaPage:${state.exhibit.id}`, action.pageId);
  applyBackgroundTheme();
  renderBackgroundPresets();
  return {
    type: "restore-page-background",
    pageId: action.pageId,
    backgroundTheme: currentTheme,
  };
}

async function applyHistoryAction(action) {
  if (action?.type === "restore-widget") return restoreWidgetSnapshot(action);
  if (action?.type === "delete-widget") return deleteWidgetSnapshot(action);
  if (action?.type === "restore-widget-state")
    return restoreWidgetState(action);
  if (action?.type === "restore-page-background")
    return restorePageBackground(action);
  return null;
}

async function useHistoryStack(sourceStack, targetStack, message) {
  while (sourceStack.length) {
    const action = sourceStack.pop();
    state.isApplyingHistory = true;
    try {
      const reverseAction = await applyHistoryAction(action);
      if (reverseAction) {
        pushHistory(targetStack, reverseAction);
        state.lastUndoDomain = state.appUndoStack.length ? "app" : null;
        showToast(message);
        return true;
      }
    } finally {
      state.isApplyingHistory = false;
    }
  }
  state.lastUndoDomain = null;
  return false;
}

async function undoLastAppAction() {
  return useHistoryStack(state.appUndoStack, state.appRedoStack, "Undone.");
}

async function redoLastAppAction() {
  return useHistoryStack(state.appRedoStack, state.appUndoStack, "Redone.");
}

function isTextEditingTarget(target) {
  return Boolean(
    target?.closest?.('input, textarea, select, [contenteditable="true"]'),
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseHexColor(color) {
  if (!color || !color.startsWith("#")) return { r: 27, g: 27, b: 29 };
  const hex = color.slice(1);
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : hex;

  if (normalized.length !== 6) return { r: 27, g: 27, b: 29 };
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
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
  const color = data.playerColor || "#f6e8f1";
  const rgb = parseHexColor(color);
  const dark = colorIsDark(rgb);
  target.style.setProperty("--player-color", color);
  target.style.setProperty("--player-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  target.style.setProperty("--player-alpha", `${musicAlpha(data)}`);
  target.style.setProperty("--player-ink", dark ? "#f8f4f8" : "#111016");
  target.style.setProperty(
    "--player-muted",
    dark ? "rgba(255,255,255,0.68)" : "rgba(17,16,22,0.58)",
  );
  target.style.setProperty(
    "--player-track",
    dark ? "rgba(255,255,255,0.22)" : "rgba(17,16,22,0.14)",
  );
  target.style.setProperty(
    "--player-fill",
    dark ? "rgba(255,255,255,0.74)" : "rgba(17,16,22,0.42)",
  );
}

function applyMusicVisuals(element, data) {
  setMusicVisualVars(element, data);
  const music = $(".music-widget", element);
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
  target.style.setProperty("--word-color", data.color || "#050406");
  target.style.setProperty("--word-font", wordFont(data));
  target.style.setProperty("--word-size", `${wordFontSize(data)}px`);
  target.style.setProperty("--word-weight", data.bold ? "800" : "500");
  target.style.setProperty("--word-style", data.italic ? "italic" : "normal");
}

function setQuestionVisualVars(target, data = {}) {
  const prompt = questionStyle(data, "question");
  const answer = questionStyle(data, "answer");
  target.style.setProperty("--question-color", prompt.color);
  target.style.setProperty("--question-font", prompt.font);
  target.style.setProperty("--question-size", `${prompt.size}px`);
  target.style.setProperty("--question-weight", prompt.weight);
  target.style.setProperty("--question-style", prompt.style);
  target.style.setProperty("--answer-color", answer.color);
  target.style.setProperty("--answer-font", answer.font);
  target.style.setProperty("--answer-size", `${answer.size}px`);
  target.style.setProperty("--answer-weight", answer.weight);
  target.style.setProperty("--answer-style", answer.style);
}

function shapeConfig(data = {}) {
  const shapeId = clippedWidgetShapeIds.has(data.shape)
    ? defaultWidgetShapeId
    : data.shape;
  return (
    widgetShapes.find((shape) => shape.id === shapeId) ||
    widgetShapes.find((shape) => shape.id === defaultWidgetShapeId) ||
    widgetShapes[0]
  );
}

function setWidgetVisualVars(target, data = {}) {
  const shape = shapeConfig(data);
  target.style.setProperty("--widget-radius", shape.radius);
  target.style.setProperty("--widget-clip", shape.clip || "none");
  target.style.setProperty(
    "--widget-border-color",
    data.borderColor || "rgba(255,255,255,0.16)",
  );
  target.style.setProperty(
    "--widget-border-width",
    `${Number(data.borderWidth ?? 1)}px`,
  );
}

function updateSwatchSelection(container, activeValue) {
  $$(".mini-swatch, .color-swatch", container).forEach((swatch) => {
    swatch.classList.toggle(
      "active",
      swatch.dataset.color === String(activeValue),
    );
  });
}

function setWidgetData(widget, data) {
  widget.data = data;
  return data;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function showWidgetControls(element, hold = false) {
  element.classList.add("controls-open");

  if (!hold) return;

  window.clearTimeout(state.controlTimers.get(element));
  const timer = window.setTimeout(() => {
    if (!element.matches(":hover")) {
      element.classList.remove("controls-open");
    }
    state.controlTimers.delete(element);
  }, 4000);
  state.controlTimers.set(element, timer);
}

function hideWidgetControls(element) {
  if (state.controlTimers.has(element)) return;
  element.classList.remove("controls-open");
}

function clearWidgetSelection() {
  $$(".art-widget").forEach((element) => {
    element.classList.remove("selected", "controls-open");
    if (state.controlTimers.has(element)) {
      window.clearTimeout(state.controlTimers.get(element));
      state.controlTimers.delete(element);
    }
  });
}

function selectedWidgetElement() {
  return $(".art-widget.selected", board);
}

function selectedWidget() {
  const widgetId = selectedWidgetElement()?.dataset.widgetId;
  if (!widgetId || !state.exhibit) return null;
  return state.exhibit.widgets.find((widget) => widget.id === widgetId) || null;
}

async function deleteWidget(widget) {
  if (!canEdit() || !state.exhibit || !widget?.id) return false;
  const deletedIndex = state.exhibit.widgets.findIndex(
    (item) => item.id === widget.id,
  );
  if (deletedIndex < 0) return false;

  const deletedWidget = snapshotWidget(state.exhibit.widgets[deletedIndex]);
  window.clearTimeout(state.saveTimers.get(widget.id));
  state.saveTimers.delete(widget.id);
  await api(`/api/widgets/${widget.id}`, { method: "DELETE" });
  state.exhibit.widgets.splice(deletedIndex, 1);
  removeWidgetBaseline(widget.id);
  pushAppUndo({
    type: "restore-widget",
    widget: deletedWidget,
    index: deletedIndex,
  });
  renderBoard();
  showToast("Deleted. Press Ctrl+Z to undo or Ctrl+Y to redo.");
  return true;
}

function isPassiveWidgetTarget(event, widget) {
  const target = event.target;
  if (
    target.closest(
      '.widget-menu, .move-handle, .resize-handle, button, input, select, textarea, audio, [contenteditable="true"]',
    )
  ) {
    return false;
  }
  if (
    widget.type === "canvas" &&
    state.selectedTool === "brush" &&
    target.closest("canvas")
  ) {
    return false;
  }
  return true;
}

function setMusicPresentation(presentation) {
  state.pendingPresentation = presentation;
  $$("[data-presentation]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.presentation === presentation,
    );
  });
}

function boardPoint(event) {
  const rect = state.boardRect || board.getBoundingClientRect();
  state.boardRect = rect;
  return {
    x: (event.clientX - rect.left) / state.viewport.zoom,
    y: (event.clientY - rect.top) / state.viewport.zoom,
  };
}

function normalizeRect(start, current) {
  return {
    x: Math.min(start.x, current.x),
    y: Math.min(start.y, current.y),
    width: Math.abs(current.x - start.x),
    height: Math.abs(current.y - start.y),
  };
}

function updateDragPreview(rect) {
  dragPreview.style.left = `${rect.x}px`;
  dragPreview.style.top = `${rect.y}px`;
  dragPreview.style.width = `${rect.width}px`;
  dragPreview.style.height = `${rect.height}px`;
  dragPreview.classList.remove("hidden");
}

function clearDragPreview() {
  dragPreview.classList.add("hidden");
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
    data,
  };
  const { widget } = await api("/api/widgets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  state.exhibit.widgets.push(widget);
  setWidgetBaseline(widget);
  pushAppUndo({ type: "delete-widget", widget: snapshotWidget(widget) });
  renderBoard();
  return widget;
}

function scheduleWidgetSave(widget, patch = {}, delay = 450) {
  if (!canEdit()) return;
  const before = state.widgetHistoryBaselines.get(widget.id);
  const next = {
    ...widget,
    ...patch,
    data: patch.data || widget.data,
  };
  Object.assign(widget, next);
  if (!state.isApplyingHistory) {
    const after = snapshotWidget(widget);
    if (before && !widgetsMatchForHistory(before, after)) {
      pushAppUndo({ type: "restore-widget-state", widget: before });
    }
    setWidgetBaseline(widget);
  }

  window.clearTimeout(state.saveTimers.get(widget.id));
  state.saveTimers.set(
    widget.id,
    window.setTimeout(async () => {
      try {
        const { widget: saved } = await api(`/api/widgets/${widget.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            x: widget.x,
            y: widget.y,
            width: widget.width,
            height: widget.height,
            zIndex: widget.z_index,
            pageId: widget.page_id || state.activePageId,
            data: widget.data,
          }),
        });
        Object.assign(widget, saved);
        setWidgetBaseline(widget);
      } catch (error) {
        showToast(error.message);
      } finally {
        state.saveTimers.delete(widget.id);
      }
    }, delay),
  );
}

function appendWordboxControls(menu, widget, element, data) {
  const fontSelect = document.createElement("select");
  fontSelect.className = "word-font-select";
  fontSelect.title = "Font";
  fontSelect.setAttribute("aria-label", "Font");
  wordFonts.forEach((font) => {
    const option = document.createElement("option");
    option.value = font.value;
    option.textContent = font.label;
    option.selected = font.value === wordFont(data);
    fontSelect.appendChild(option);
  });
  fontSelect.addEventListener("change", (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      fontFamily: fontSelect.value,
    });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    setWordVisualVars(element, nextData);
  });
  menu.appendChild(fontSelect);

  const formatRow = document.createElement("div");
  formatRow.className = "word-format-row";

  const makeFormatButton = (label, key, className = "") => {
    const button = document.createElement("button");
    button.className = `mini-button word-format-button ${className}`.trim();
    button.type = "button";
    button.title = label;
    button.textContent = label[0];
    button.classList.toggle("active", Boolean(data[key]));
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        [key]: !widgetData(widget)[key],
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWordVisualVars(element, nextData);
      button.classList.toggle("active", Boolean(nextData[key]));
    });
    return button;
  };

  formatRow.appendChild(makeFormatButton("Bold", "bold"));
  formatRow.appendChild(makeFormatButton("Italic", "italic", "italic"));

  const sizeControl = document.createElement("label");
  sizeControl.className = "word-size-control";
  sizeControl.title = "Text size";
  sizeControl.innerHTML = '<i data-lucide="type"></i>';

  const sizeInput = document.createElement("input");
  sizeInput.type = "range";
  sizeInput.min = "10";
  sizeInput.max = "72";
  sizeInput.value = String(wordFontSize(data));
  sizeInput.setAttribute("aria-label", "Text size");
  sizeInput.addEventListener("input", (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      fontSize: Number(sizeInput.value),
    });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    setWordVisualVars(element, nextData);
  });
  sizeControl.appendChild(sizeInput);
  formatRow.appendChild(sizeControl);
  menu.appendChild(formatRow);

  const colorRow = document.createElement("div");
  colorRow.className = "word-color-row";
  colors.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.className = "mini-swatch word-color-swatch";
    swatch.type = "button";
    swatch.title = "Text color";
    swatch.dataset.color = color;
    swatch.style.background = color;
    swatch.classList.toggle("active", color === (data.color || "#050406"));
    swatch.addEventListener("click", (event) => {
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
  const borderRow = document.createElement("div");
  borderRow.className = "border-control-row";
  borderColors.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.className =
      `mini-swatch border-swatch ${color === "transparent" ? "transparent-swatch" : ""}`.trim();
    swatch.type = "button";
    swatch.title = color === "transparent" ? "No border" : "Border color";
    swatch.dataset.color = color;
    swatch.style.background = color;
    swatch.classList.toggle(
      "active",
      color === (widgetData(widget).borderColor || "rgba(255,255,255,0.16)"),
    );
    swatch.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        borderColor: color,
        borderWidth:
          color === "transparent" ? 0 : widgetData(widget).borderWidth || 2,
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWidgetVisualVars(element, nextData);
      updateSwatchSelection(borderRow, color);
    });
    borderRow.appendChild(swatch);
  });
  menu.appendChild(borderRow);

  const widthControl = document.createElement("label");
  widthControl.className = "border-width-control";
  widthControl.title = "Border width";
  widthControl.innerHTML = '<i data-lucide="panel-top"></i>';
  const widthInput = document.createElement("input");
  widthInput.type = "range";
  widthInput.min = "0";
  widthInput.max = "14";
  widthInput.value = String(Number(widgetData(widget).borderWidth ?? 1));
  widthInput.setAttribute("aria-label", "Border width");
  widthInput.addEventListener("input", (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      borderWidth: Number(widthInput.value),
    });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    setWidgetVisualVars(element, nextData);
  });
  widthControl.appendChild(widthInput);
  menu.appendChild(widthControl);
}

function appendShapeControls(menu, widget, element) {
  const shapeRow = document.createElement("div");
  shapeRow.className = "shape-control-row";
  widgetShapes.forEach((shape) => {
    const button = document.createElement("button");
    button.className = `shape-button shape-${shape.id}`;
    button.type = "button";
    button.title = shape.label;
    button.classList.toggle(
      "active",
      shapeConfig(widgetData(widget)).id === shape.id,
    );
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        shape: shape.id,
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      setWidgetVisualVars(element, nextData);
      $$(".shape-button", shapeRow).forEach((item) =>
        item.classList.toggle("active", item === button),
      );
    });
    shapeRow.appendChild(button);
  });
  menu.appendChild(shapeRow);
}

function applyPictureFrame(element, data = {}) {
  const picture = $(".picture-widget", element);
  if (!picture) return;
  const frame = pictureFrameConfig(data);
  pictureFrames.forEach((item) =>
    picture.classList.remove(`picture-frame-${item.id}`),
  );
  picture.classList.add(`picture-frame-${frame.id}`);
}

function appendPictureFrameControls(menu, widget, element) {
  const frameRow = document.createElement("div");
  frameRow.className = "frame-control-row";
  pictureFrames.forEach((frame) => {
    const button = document.createElement("button");
    button.className = `frame-button frame-${frame.id}`;
    button.type = "button";
    button.title = frame.label;
    button.setAttribute("aria-label", frame.label);
    button.classList.toggle(
      "active",
      pictureFrameConfig(widgetData(widget)).id === frame.id,
    );
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        frame: frame.id,
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      applyPictureFrame(element, nextData);
      $$(".frame-button", frameRow).forEach((item) =>
        item.classList.toggle("active", item === button),
      );
    });
    frameRow.appendChild(button);
  });
  menu.appendChild(frameRow);
}

function applyQuestionContent(element, data = {}) {
  setQuestionVisualVars(element, data);
  const prompt = $(".question-prompt", element);
  if (prompt) prompt.textContent = activeQuestionText(data);
}

function appendQuestionTypeControls(menu, widget, element) {
  const typeRow = document.createElement("div");
  typeRow.className = "question-type-row";
  const typeMeta = [
    { id: "romantic", label: "Romantic", icon: "heart" },
    { id: "goofy", label: "Goofy", icon: "laugh" },
    { id: "life", label: "Life", icon: "sparkles" },
  ];

  typeMeta.forEach((type) => {
    const button = document.createElement("button");
    button.className = "question-type-button";
    button.type = "button";
    button.title = type.label;
    button.dataset.questionType = type.id;
    button.innerHTML = `<i data-lucide="${type.icon}"></i><span>${type.label}</span>`;
    button.classList.toggle(
      "active",
      questionCategory(widgetData(widget)) === type.id,
    );
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        questionType: type.id,
        questionIndex: 0,
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      applyQuestionContent(element, nextData);
      $$(".question-type-button", typeRow).forEach((item) =>
        item.classList.toggle("active", item === button),
      );
    });
    typeRow.appendChild(button);
  });

  const nextButton = document.createElement("button");
  nextButton.className = "mini-button question-next-button";
  nextButton.type = "button";
  nextButton.title = "Next question";
  nextButton.innerHTML = '<i data-lucide="shuffle"></i>';
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const current = widgetData(widget);
    const category = questionCategory(current);
    const count = questionPresets[category].length;
    const nextData = setWidgetData(widget, {
      ...current,
      questionType: category,
      questionIndex: ((Number(current.questionIndex) || 0) + 1) % count,
    });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    applyQuestionContent(element, nextData);
  });
  typeRow.appendChild(nextButton);
  menu.appendChild(typeRow);
}

function appendQuestionTextControls(menu, widget, element, data, target) {
  const prefix = target === "answer" ? "answer" : "question";
  const defaults = questionStyle(data, target);
  const styleRow = document.createElement("div");
  styleRow.className = `question-style-row ${prefix}-style-row`;

  const fontSelect = document.createElement("select");
  fontSelect.className = "word-font-select question-font-select";
  fontSelect.title = target === "answer" ? "Comment font" : "Question font";
  fontSelect.setAttribute("aria-label", fontSelect.title);
  wordFonts.forEach((font) => {
    const option = document.createElement("option");
    option.value = font.value;
    option.textContent = font.label;
    option.selected = font.value === defaults.font;
    fontSelect.appendChild(option);
  });
  fontSelect.addEventListener("change", (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      [`${prefix}FontFamily`]: fontSelect.value,
    });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    applyQuestionContent(element, nextData);
  });
  styleRow.appendChild(fontSelect);

  ["Bold", "Italic"].forEach((label) => {
    const key = `${prefix}${label}`;
    const button = document.createElement("button");
    button.className =
      `mini-button word-format-button ${label === "Italic" ? "italic" : ""}`.trim();
    button.type = "button";
    button.title = `${target === "answer" ? "Comment" : "Question"} ${label.toLowerCase()}`;
    button.textContent = label[0];
    button.classList.toggle("active", Boolean(data[key]));
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        [key]: !widgetData(widget)[key],
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      applyQuestionContent(element, nextData);
      button.classList.toggle("active", Boolean(nextData[key]));
    });
    styleRow.appendChild(button);
  });

  const sizeControl = document.createElement("label");
  sizeControl.className = "word-size-control question-size-control";
  sizeControl.title =
    target === "answer" ? "Comment text size" : "Question text size";
  sizeControl.innerHTML = '<i data-lucide="type"></i>';
  const sizeInput = document.createElement("input");
  sizeInput.type = "range";
  sizeInput.min = "10";
  sizeInput.max = "72";
  sizeInput.value = String(defaults.size);
  sizeInput.setAttribute("aria-label", sizeControl.title);
  sizeInput.addEventListener("input", (event) => {
    event.stopPropagation();
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      [`${prefix}FontSize`]: Number(sizeInput.value),
    });
    scheduleWidgetSave(widget, { data: nextData }, 120);
    applyQuestionContent(element, nextData);
  });
  sizeControl.appendChild(sizeInput);
  styleRow.appendChild(sizeControl);
  menu.appendChild(styleRow);

  const colorRow = document.createElement("div");
  colorRow.className = `word-color-row question-color-row ${prefix}-color-row`;
  colors.forEach((color) => {
    const swatch = document.createElement("button");
    swatch.className = "mini-swatch word-color-swatch";
    swatch.type = "button";
    swatch.title = target === "answer" ? "Comment color" : "Question color";
    swatch.dataset.color = color;
    swatch.style.background = color;
    swatch.classList.toggle("active", color === defaults.color);
    swatch.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextData = setWidgetData(widget, {
        ...widgetData(widget),
        [`${prefix}Color`]: color,
      });
      scheduleWidgetSave(widget, { data: nextData }, 120);
      applyQuestionContent(element, nextData);
      updateSwatchSelection(colorRow, color);
    });
    colorRow.appendChild(swatch);
  });
  menu.appendChild(colorRow);
}

function appendQuestionControls(menu, widget, element, data) {
  appendQuestionTypeControls(menu, widget, element);
  appendQuestionTextControls(menu, widget, element, data, "question");
  appendQuestionTextControls(menu, widget, element, data, "answer");
}

function widgetShell(widget) {
  const data = widgetData(widget);
  const element = document.createElement("article");
  element.className = `art-widget ${widget.type}-shell external-controls`;
  if (widget.x + widget.width > board.clientWidth - 176) {
    element.classList.add("controls-left");
  }
  element.dataset.widgetId = widget.id;
  element.style.left = `${widget.x}px`;
  element.style.top = `${widget.y}px`;
  element.style.width = `${widget.width}px`;
  element.style.height = `${widget.height}px`;
  element.style.zIndex = widget.z_index;
  element.style.setProperty(
    "--widget-bg",
    data.background || "rgba(255,255,255,0.84)",
  );
  setWidgetVisualVars(element, data);
  setWordVisualVars(element, data);
  setQuestionVisualVars(element, data);
  setMusicVisualVars(element, data);

  element.addEventListener("pointerdown", (event) => {
    $$(".art-widget").forEach((item) => item.classList.remove("selected"));
    element.classList.add("selected");
    showWidgetControls(element, true);
    if (canEdit() && isPassiveWidgetTarget(event, widget)) {
      queueWidgetMove(event, widget, element);
    }
  });
  element.addEventListener("pointerenter", () => {
    showWidgetControls(element);
  });
  element.addEventListener("pointerleave", () => {
    hideWidgetControls(element);
  });
  element.addEventListener("focusin", () => {
    showWidgetControls(element);
  });
  element.addEventListener("focusout", () => {
    hideWidgetControls(element);
  });

  if (canEdit()) {
    const handle = document.createElement("button");
    handle.className = "move-handle";
    handle.type = "button";
    handle.title = "Move";
    handle.innerHTML =
      '<span class="drag-dots" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>';
    handle.addEventListener("pointerdown", (event) =>
      startMove(event, widget, element),
    );
    element.appendChild(handle);

    const menu = document.createElement("div");
    const deleteOnly = ![
      "canvas",
      "wordbox",
      "question",
      "music",
      "picture",
    ].includes(widget.type);
    const menuType =
      widget.type === "music"
        ? "music-widget-menu"
        : widget.type === "wordbox" || widget.type === "question"
          ? "wordbox-widget-menu"
          : widget.type === "picture"
            ? "picture-widget-menu"
            : "color-widget-menu";
    menu.className = `widget-menu ${deleteOnly ? "delete-widget-menu" : menuType}`;

    if (
      widget.type === "canvas" ||
      widget.type === "wordbox" ||
      widget.type === "question" ||
      widget.type === "music"
    ) {
      const palette =
        widget.type === "music" ? musicPlayerColors : widgetColors;
      const paletteRow = document.createElement("div");
      paletteRow.className = "widget-color-row";
      palette.forEach((color) => {
        const swatch = document.createElement("button");
        swatch.className = "mini-swatch";
        swatch.type = "button";
        swatch.title = "Color";
        swatch.dataset.color = color;
        swatch.style.background = color;
        const activeColor =
          widget.type === "music"
            ? data.playerColor || "#f6e8f1"
            : data.background || "rgba(255,255,255,0.84)";
        swatch.classList.toggle("active", color === activeColor);
        swatch.addEventListener("click", (event) => {
          event.stopPropagation();
          const key = widget.type === "music" ? "playerColor" : "background";
          const previousBackground = canvasBackgroundColor(widget);
          const nextData = setWidgetData(widget, {
            ...widgetData(widget),
            [key]: color,
          });
          if (widget.type === "music") {
            applyMusicVisuals(element, nextData);
          } else {
            element.style.setProperty("--widget-bg", color);
            if (widget.type === "canvas") {
              updateCanvasBackground(
                widget,
                element,
                nextData,
                previousBackground,
              );
            }
          }
          scheduleWidgetSave(widget, { data: nextData }, 120);
          updateSwatchSelection(paletteRow, color);
        });
        paletteRow.appendChild(swatch);
      });
      menu.appendChild(paletteRow);

      if (widget.type === "music") {
        const opacityControl = document.createElement("label");
        opacityControl.className = "music-opacity-control";
        opacityControl.title = "Transparency";
        opacityControl.innerHTML = '<i data-lucide="blend"></i>';

        const opacityInput = document.createElement("input");
        opacityInput.type = "range";
        opacityInput.min = "35";
        opacityInput.max = "100";
        opacityInput.value = Math.round(musicAlpha(data) * 100);
        opacityInput.setAttribute("aria-label", "Transparency");
        opacityInput.addEventListener("input", (event) => {
          event.stopPropagation();
          const nextData = setWidgetData(widget, {
            ...widgetData(widget),
            playerAlpha: Number(opacityInput.value) / 100,
          });
          scheduleWidgetSave(widget, { data: nextData }, 120);
          applyMusicVisuals(element, nextData);
        });
        opacityControl.appendChild(opacityInput);
        menu.appendChild(opacityControl);
      }

      appendBorderControls(menu, widget, element);
      if (widget.type === "canvas" || widget.type === "wordbox") {
        appendShapeControls(menu, widget, element);
      }
      if (widget.type === "question") {
        appendShapeControls(menu, widget, element);
      }

      if (widget.type === "wordbox") {
        appendWordboxControls(menu, widget, element, data);
      }
      if (widget.type === "question") {
        appendQuestionControls(menu, widget, element, data);
      }
    }

    if (widget.type === "picture") {
      appendPictureFrameControls(menu, widget, element);
    }

    const remove = document.createElement("button");
    remove.className = "mini-button";
    remove.type = "button";
    remove.title = "Delete";
    remove.innerHTML = '<i data-lucide="trash-2"></i>';
    remove.addEventListener("click", async (event) => {
      event.stopPropagation();
      try {
        await deleteWidget(widget);
      } catch (error) {
        showToast(error.message);
      }
    });
    menu.appendChild(remove);
    element.appendChild(menu);

    const resize = document.createElement("button");
    resize.className = "resize-handle";
    resize.type = "button";
    resize.title = "Resize";
    resize.innerHTML = '<i data-lucide="move-diagonal-2"></i>';
    resize.addEventListener("pointerdown", (event) =>
      startResize(event, widget, element),
    );
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
    originalY: widget.y,
  };
  event.currentTarget.setPointerCapture?.(event.pointerId);
  window.addEventListener("pointermove", moveWidget);
  window.addEventListener("pointerup", stopMove, { once: true });
  window.addEventListener("pointercancel", stopMove, { once: true });
}

function queueWidgetMove(event, widget, element) {
  if (event.button !== 0) return;

  state.moveCandidate = {
    widget,
    element,
    start: boardPoint(event),
    originalX: widget.x,
    originalY: widget.y,
    active: false,
  };

  window.addEventListener("pointermove", promoteWidgetMove);
  window.addEventListener("pointerup", stopQueuedMove, { once: true });
  window.addEventListener("pointercancel", stopQueuedMove, { once: true });
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
  window.removeEventListener("pointermove", promoteWidgetMove);
  if (state.moveCandidate?.active) {
    scheduleWidgetSave(
      state.moveCandidate.widget,
      { x: state.moveCandidate.widget.x, y: state.moveCandidate.widget.y },
      80,
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
  window.removeEventListener("pointermove", moveWidget);
  scheduleWidgetSave(
    state.moving.widget,
    { x: state.moving.widget.x, y: state.moving.widget.y },
    80,
  );
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
    keepRatio: ["music", "sticker", "picture", "gif"].includes(widget.type),
  };

  event.currentTarget.setPointerCapture?.(event.pointerId);
  window.addEventListener("pointermove", resizeWidget);
  window.addEventListener("pointerup", stopResize, { once: true });
  window.addEventListener("pointercancel", stopResize, { once: true });
}

function resizeWidget(event) {
  if (!state.resizing) return;
  event.preventDefault();

  const {
    widget,
    element,
    startX,
    startY,
    originalWidth,
    originalHeight,
    aspectRatio,
    keepRatio,
  } = state.resizing;
  const minWidth = ["music", "sticker", "picture", "gif"].includes(widget.type)
    ? 84
    : 48;
  const minHeight =
    widget.type === "music"
      ? 84
      : ["sticker", "picture", "gif"].includes(widget.type)
        ? 72
        : 48;
  let width = Math.max(
    minWidth,
    originalWidth + (event.clientX - startX) / state.viewport.zoom,
  );
  let height = Math.max(
    minHeight,
    originalHeight + (event.clientY - startY) / state.viewport.zoom,
  );

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
  if (widget.type !== "canvas") return widgetData(widget);

  const canvas = $("canvas", element);
  if (!canvas) return widgetData(widget);

  const dpr = window.devicePixelRatio || 1;
  const nextWidth = Math.max(1, Math.floor(widget.width * dpr));
  const nextHeight = Math.max(1, Math.floor(widget.height * dpr));

  if (canvas.width === nextWidth && canvas.height === nextHeight) {
    return widgetData(widget);
  }

  const snapshot = document.createElement("canvas");
  snapshot.width = canvas.width;
  snapshot.height = canvas.height;
  const snapshotContext = snapshot.getContext("2d");
  snapshotContext.drawImage(canvas, 0, 0);

  canvas.width = nextWidth;
  canvas.height = nextHeight;
  canvas.dataset.logicalWidth = String(widget.width);
  canvas.dataset.logicalHeight = String(widget.height);

  const context = canvas.getContext("2d");
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
    widget.height,
  );

  return { ...widgetData(widget), image: canvas.toDataURL("image/png") };
}

function stopResize() {
  if (!state.resizing) return;
  window.removeEventListener("pointermove", resizeWidget);
  const { widget, element } = state.resizing;
  const patch = { width: widget.width, height: widget.height };
  if (widget.type === "canvas") {
    patch.data = syncCanvasBackingStore(widget, element);
  }
  scheduleWidgetSave(widget, patch, 80);
  state.resizing = null;
}

function renderCanvasWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const canvas = document.createElement("canvas");
  canvas.dataset.logicalWidth = String(widget.width);
  canvas.dataset.logicalHeight = String(widget.height);
  element.appendChild(canvas);

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(widget.width * dpr));
  canvas.height = Math.max(1, Math.floor(widget.height * dpr));
  const context = canvas.getContext("2d");
  context.scale(dpr, dpr);
  context.fillStyle = data.background || "rgba(255,255,255,0.84)";
  context.fillRect(0, 0, widget.width, widget.height);

  if (data.image) {
    const image = new Image();
    image.onload = () =>
      context.drawImage(image, 0, 0, widget.width, widget.height);
    image.src = data.image;
  }

  if (canEdit()) {
    wireDrawing(canvas, context, widget);
  }

  return element;
}

function brushWidth() {
  const base = Number(state.brush.size) || 8;
  if (state.brush.utensil === "fill") return base;
  if (state.brush.utensil === "pen") return Math.max(2, base * 0.58);
  if (state.brush.utensil === "eraser") return Math.max(8, base * 1.35);
  return base;
}

function canvasBackgroundColor(widget) {
  return widgetData(widget).background || "rgba(255,255,255,0.84)";
}

function cssColorToRgba(color) {
  const canvas = cssColorToRgba.canvas || document.createElement("canvas");
  cssColorToRgba.canvas = canvas;
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = color || "rgba(255,255,255,0.84)";
  context.fillRect(0, 0, 1, 1);
  return [...context.getImageData(0, 0, 1, 1).data];
}

function replaceCanvasColor(
  canvas,
  context,
  fromColor,
  toColor,
  tolerance = 36,
) {
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
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = toColor;
  context.fillRect(
    0,
    0,
    Number(canvas.dataset.logicalWidth || canvas.width),
    Number(canvas.dataset.logicalHeight || canvas.height),
  );
  context.restore();
}

function updateCanvasBackground(widget, element, nextData, previousBackground) {
  const canvas = $("canvas", element);
  if (!canvas) return;
  const context = canvas.getContext("2d");
  replaceCanvasColor(
    canvas,
    context,
    previousBackground,
    nextData.background || "rgba(255,255,255,0.84)",
  );
  nextData.image = canvas.toDataURL("image/png");
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
  const x = Math.floor(
    point.x *
      (canvas.width / Number(canvas.dataset.logicalWidth || canvas.width)),
  );
  const y = Math.floor(
    point.y *
      (canvas.height / Number(canvas.dataset.logicalHeight || canvas.height)),
  );
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = image;
  const startIndex = (y * width + x) * 4;
  const target = [
    data[startIndex],
    data[startIndex + 1],
    data[startIndex + 2],
    data[startIndex + 3],
  ];
  const fill = brushRgba();
  if (colorsMatch(fill, 0, target, 2)) return false;

  const stack = [[x, y]];
  const visited = new Uint8Array(width * height);

  while (stack.length) {
    const [currentX, currentY] = stack.pop();
    if (currentX < 0 || currentY < 0 || currentX >= width || currentY >= height)
      continue;

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
  context.lineCap = "round";
  context.lineJoin = "round";
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
    const jitter =
      Math.sin((from.x + from.y + index * 17) * 0.7) * width * 0.18;
    const x = from.x + (to.x - from.x) * ratio + jitter;
    const y = from.y + (to.y - from.y) * ratio - jitter * 0.55;
    context.beginPath();
    context.arc(
      x,
      y,
      Math.max(1.2, width * (0.16 + (index % 3) * 0.035)),
      0,
      Math.PI * 2,
    );
    context.fill();
  }
  context.restore();
}

function strokeToolPath(context, from, to, width) {
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = width;
  context.beginPath();
  if (from.x === to.x && from.y === to.y) {
    context.arc(from.x, from.y, Math.max(1, width / 2), 0, Math.PI * 2);
    return "fill";
  }

  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  return "stroke";
}

function eraseToolSegment(context, widget, from, to, width) {
  context.save();
  const drawMode = strokeToolPath(context, from, to, width);
  context.globalCompositeOperation = "destination-out";
  context.fillStyle = "#000";
  context.strokeStyle = "#000";
  if (drawMode === "fill") {
    context.fill();
  } else {
    context.stroke();
  }
  context.restore();

  context.save();
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = canvasBackgroundColor(widget);
  context.fillRect(0, 0, widget.width, widget.height);
  context.restore();
}

function drawToolSegment(context, widget, from, to) {
  const width = brushWidth();
  if (state.brush.utensil === "brush") {
    drawSoftBrush(context, from, to, width);
    return;
  }
  if (state.brush.utensil === "eraser") {
    eraseToolSegment(context, widget, from, to, width);
    return;
  }

  context.save();
  const drawMode = strokeToolPath(context, from, to, width);
  context.globalCompositeOperation = "source-over";
  context.globalAlpha = state.brush.utensil === "pen" ? 0.96 : 1;
  context.strokeStyle = state.brush.color;
  context.fillStyle = context.strokeStyle;
  if (drawMode === "fill") {
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
      y: (event.clientY - rect.top) * (widget.height / rect.height),
    };
  };

  const drawTo = (event) => {
    if (!drawing || state.selectedTool !== "brush") return;
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
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      image: canvas.toDataURL("image/png"),
    });
    scheduleWidgetSave(widget, { data: nextData }, 80);
  };

  canvas.addEventListener("pointerdown", (event) => {
    if (state.selectedTool !== "brush") return;
    event.preventDefault();
    event.stopPropagation();
    const point = pointFor(event);

    if (state.brush.utensil === "fill") {
      if (floodFill(canvas, context, point)) {
        const nextData = setWidgetData(widget, {
          ...widgetData(widget),
          image: canvas.toDataURL("image/png"),
        });
        scheduleWidgetSave(widget, { data: nextData }, 80);
      }
      return;
    }

    drawing = true;
    last = point;
    state.pendingDrawPoint = null;
    if (state.brush.utensil !== "eraser") {
      drawToolSegment(context, widget, last, last);
    }
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", drawTo);
  canvas.addEventListener("pointerup", finishDrawing);
  canvas.addEventListener("pointercancel", () => {
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
  const content = document.createElement("div");
  content.className = "wordbox-content";
  content.contentEditable = String(canEdit());
  content.spellcheck = true;
  content.textContent = data.text || "";
  content.addEventListener("input", () => {
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      text: content.innerText.replace(/\r\n/g, "\n"),
    });
    scheduleWidgetSave(widget, { data: nextData });
  });
  content.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = event.clipboardData?.getData("text/plain") || "";
    document.execCommand("insertText", false, text);
  });
  element.appendChild(content);
  return element;
}

function plainTextPaste(event) {
  event.preventDefault();
  const text = event.clipboardData?.getData("text/plain") || "";
  document.execCommand("insertText", false, text);
}

function renderQuestionWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const question = document.createElement("section");
  question.className = "question-widget";

  const prompt = document.createElement("div");
  prompt.className = "question-prompt";
  prompt.textContent = activeQuestionText(data);

  const comment = document.createElement("div");
  comment.className = "question-comment";
  comment.contentEditable = String(canEdit());
  comment.spellcheck = true;
  comment.textContent = data.commentText || "";
  comment.addEventListener("input", () => {
    const nextData = setWidgetData(widget, {
      ...widgetData(widget),
      commentText: comment.innerText.replace(/\r\n/g, "\n"),
    });
    scheduleWidgetSave(widget, { data: nextData });
  });
  comment.addEventListener("paste", plainTextPaste);

  question.appendChild(prompt);
  question.appendChild(comment);
  element.appendChild(question);
  return element;
}

function renderPictureWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const picture = document.createElement("figure");
  picture.className = "picture-widget";
  applyPictureFrame(element, data);

  const image = document.createElement("img");
  image.alt = data.title || "Uploaded picture";
  image.src = data.url || "";
  image.draggable = false;
  image.title = data.title || "Picture";
  picture.appendChild(image);

  element.appendChild(picture);
  applyPictureFrame(element, data);
  return element;
}

function renderAssetWidget(widget) {
  const data = widgetData(widget);
  const element = widgetShell(widget);
  const asset = document.createElement("figure");
  asset.className = `media-widget ${widget.type}-widget`;

  const image = document.createElement("img");
  image.alt = data.title || widget.type;
  image.src = data.url || "";
  image.draggable = false;
  image.title = data.title || widget.type;
  asset.appendChild(image);

  element.appendChild(asset);
  return element;
}

function iconButton(className, label, icon) {
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.setAttribute("aria-label", label);
  button.innerHTML = `<i data-lucide="${icon}"></i>`;
  return button;
}

function setPlayButtons(music, playing) {
  $$(".music-preview-button", music).forEach((button) => {
    button.classList.toggle("playing", playing);
    button.setAttribute(
      "aria-label",
      playing ? "Pause preview" : "Play preview",
    );
    button.innerHTML = `<i data-lucide="${playing ? "pause" : "play"}"></i>`;
  });
  refreshIcons();
}

function musicDuration(audio) {
  return Number.isFinite(audio.duration) ? audio.duration : 0;
}

function createMusicProgress(audio, className = "") {
  const progress = document.createElement("div");
  progress.className = `music-progress ${className}`.trim();

  const current = document.createElement("span");
  current.className = "music-progress-time";
  current.textContent = "0:00";

  const track = document.createElement("button");
  track.className = "music-progress-track";
  track.type = "button";
  track.setAttribute("aria-label", "Seek preview");

  const fill = document.createElement("span");
  fill.className = "music-progress-fill";
  track.appendChild(fill);

  const remaining = document.createElement("span");
  remaining.className = "music-progress-time";
  remaining.textContent = "-0:00";

  const update = () => {
    const duration = musicDuration(audio);
    const currentTime = Number.isFinite(audio.currentTime)
      ? audio.currentTime
      : 0;
    const percent = duration ? clamp(currentTime / duration, 0, 1) * 100 : 0;
    fill.style.width = `${percent}%`;
    current.textContent = formatTime(currentTime);
    remaining.textContent = duration
      ? `-${formatTime(Math.max(duration - currentTime, 0))}`
      : "-0:00";
  };

  track.addEventListener("click", (event) => {
    event.stopPropagation();
    const duration = musicDuration(audio);
    if (!duration) return;
    const rect = track.getBoundingClientRect();
    audio.currentTime =
      clamp((event.clientX - rect.left) / rect.width, 0, 1) * duration;
    update();
  });

  [
    "loadedmetadata",
    "durationchange",
    "timeupdate",
    "play",
    "pause",
    "ended",
  ].forEach((eventName) => {
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
  const music = document.createElement("div");
  const presentation = data.presentation === "player" ? "player" : "cover";
  music.className = `music-widget ${presentation}`;
  setMusicVisualVars(music, data);

  const audio = document.createElement("audio");
  audio.className = "music-audio";
  audio.preload = "metadata";
  audio.src = data.previewUrl || "";

  const makeImage = () => {
    const image = document.createElement("img");
    image.alt = "";
    image.src = data.artwork || "";
    return image;
  };

  const makeTitle = () => {
    const title = document.createElement("div");
    title.className = "music-title";
    title.textContent = data.title || "Untitled";
    return title;
  };

  const makeArtist = () => {
    const artist = document.createElement("div");
    artist.className = "music-artist";
    artist.textContent = data.artist || "";
    return artist;
  };

  if (presentation === "player") {
    const top = document.createElement("div");
    top.className = "player-top";

    const art = makeImage();
    art.className = "player-art";

    const meta = document.createElement("div");
    meta.className = "music-meta player-meta";
    meta.appendChild(makeTitle());
    meta.appendChild(makeArtist());

    const signal = document.createElement("span");
    signal.className = "player-signal";
    signal.innerHTML = '<i data-lucide="audio-lines"></i>';

    top.appendChild(art);
    top.appendChild(meta);
    top.appendChild(signal);

    const controls = document.createElement("div");
    controls.className = "player-control-row";
    const back = iconButton(
      "player-control music-skip-button",
      "Back 10 seconds",
      "rewind",
    );
    back.dataset.skip = "-10";
    const play = iconButton(
      "player-control player-play music-preview-button",
      "Play preview",
      "play",
    );
    const forward = iconButton(
      "player-control music-skip-button",
      "Forward 10 seconds",
      "fast-forward",
    );
    forward.dataset.skip = "10";
    const cast = iconButton("player-control player-cast", "Cast", "cast");
    controls.appendChild(back);
    controls.appendChild(play);
    controls.appendChild(forward);
    controls.appendChild(cast);

    music.appendChild(top);
    music.appendChild(createMusicProgress(audio, "player-progress"));
    music.appendChild(controls);
  } else {
    const frame = document.createElement("div");
    frame.className = "cover-art-frame";
    frame.appendChild(makeImage());

    const meta = document.createElement("div");
    meta.className = "music-meta cover-meta";
    meta.appendChild(makeTitle());
    meta.appendChild(makeArtist());
    meta.appendChild(
      iconButton(
        "music-inline-play music-preview-button",
        "Play preview",
        "play",
      ),
    );

    music.appendChild(frame);
    music.appendChild(meta);
    music.appendChild(createMusicProgress(audio, "cover-progress"));
  }

  music.appendChild(audio);

  $$(".music-preview-button", music).forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      if (audio.paused) {
        try {
          await audio.play();
        } catch {
          showToast("Preview is not available for this song.");
        }
      } else {
        audio.pause();
      }
    });
  });

  $$(".music-skip-button", music).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const duration = musicDuration(audio);
      const currentTime = Number.isFinite(audio.currentTime)
        ? audio.currentTime
        : 0;
      const nextTime = currentTime + Number(button.dataset.skip || 0);
      audio.currentTime = clamp(nextTime, 0, duration || currentTime);
    });
  });

  audio.addEventListener("play", () => setPlayButtons(music, true));
  audio.addEventListener("pause", () => setPlayButtons(music, false));
  audio.addEventListener("ended", () => setPlayButtons(music, false));

  element.appendChild(music);
  return element;
}

function renderBoard() {
  $$(".art-widget", board).forEach((widget) => widget.remove());

  if (!state.exhibit) return;
  state.boardRect = null;
  renderPagePicker();
  const pageId = state.activePageId || activePage()?.id;
  const fragment = document.createDocumentFragment();
  state.exhibit.widgets
    .filter((widget) => (widget.page_id || pageId) === pageId)
    .forEach((widget) => {
      setWidgetBaseline(widget);
      let element;
      if (widget.type === "canvas") element = renderCanvasWidget(widget);
      if (widget.type === "wordbox") element = renderWordboxWidget(widget);
      if (widget.type === "question") element = renderQuestionWidget(widget);
      if (widget.type === "music") element = renderMusicWidget(widget);
      if (widget.type === "picture") element = renderPictureWidget(widget);
      if (widget.type === "sticker" || widget.type === "gif")
        element = renderAssetWidget(widget);
      if (element) fragment.appendChild(element);
    });
  board.appendChild(fragment);

  setControlsForRole();
  refreshIcons();
  renderRemoteCursors();
}

function applyRemoteWidget(widget) {
  if (!state.exhibit || widget.exhibit_id !== state.exhibit.id) return;

  const index = state.exhibit.widgets.findIndex(
    (item) => item.id === widget.id,
  );
  if (index >= 0) {
    state.exhibit.widgets[index] = widget;
  } else {
    state.exhibit.widgets.push(widget);
  }
  state.exhibit.widgets.sort(
    (a, b) =>
      a.z_index - b.z_index ||
      String(a.created_at).localeCompare(String(b.created_at)),
  );
  renderBoard();
}

function removeRemoteWidget(widgetId) {
  if (!state.exhibit) return;
  const nextWidgets = state.exhibit.widgets.filter(
    (widget) => widget.id !== widgetId,
  );
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
    const payload = JSON.parse(event.data || "{}");
    if (payload.sourceClientId === clientId) return;

    if (event.type === "widget-created" || event.type === "widget-updated") {
      applyRemoteWidget(payload.widget);
    }
    if (event.type === "widget-deleted") {
      removeRemoteWidget(payload.widgetId);
    }
    if (event.type === "pages-updated") {
      applyRemotePages(payload.pages);
    }
    if (event.type === "cursor-updated") {
      handleCursorUpdate(payload);
    }
    if (event.type === "cursor-left") {
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
  const events = new EventSource(
    `/api/exhibits/${encodeURIComponent(exhibitId)}/events?clientId=${encodeURIComponent(clientId)}`,
  );
  state.liveEvents = events;

  [
    "widget-created",
    "widget-updated",
    "widget-deleted",
    "pages-updated",
    "cursor-updated",
    "cursor-left",
  ].forEach((eventName) => {
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
  const { exhibits } = await api("/api/exhibits");
  state.exhibits = exhibits;
  exhibitPicker.innerHTML = "";

  exhibits.forEach((exhibit) => {
    const option = document.createElement("option");
    option.value = exhibit.id;
    option.textContent =
      exhibit.role === "owner"
        ? "My Cara Mia"
        : `${exhibit.ownerAccountId} (${exhibit.role})`;
    exhibitPicker.appendChild(option);
  });

  const savedId = preferredId || localStorage.getItem("caraMiaExhibitId");
  const chosen =
    exhibits.find((exhibit) => exhibit.id === savedId) || exhibits[0];
  if (chosen) {
    exhibitPicker.value = chosen.id;
    await loadExhibit(chosen.id);
  }
}

async function loadExhibit(id) {
  const { exhibit } = await api(`/api/exhibits/${id}`);
  removeRemoteCursors();
  state.exhibit = exhibit;
  clearAppHistory();
  const savedPageId = localStorage.getItem(`caraMiaPage:${id}`);
  state.activePageId = exhibit.pages?.some((page) => page.id === savedPageId)
    ? savedPageId
    : exhibit.pages?.[0]?.id || null;
  localStorage.setItem("caraMiaExhibitId", id);
  applyZoom();
  applyBackgroundTheme();
  renderBoard();
  openLiveEvents(id);
}

async function enterStudio() {
  setView("studio");
  await loadExhibits();
}

async function checkSession() {
  try {
    const { user } = await api("/api/me");
    state.user = user;
    await enterStudio();
  } catch {
    closeLiveEvents();
    setView("auth");
  }
}

function assetLabel(type = state.pendingAssetType) {
  return "Sticker";
}

async function loadAssetResults(term = "") {
  const type = "sticker";
  assetResults.innerHTML = '<div class="asset-loading">Loading...</div>';

  try {
    const { results } = await api(
      `/api/assets/search?type=${encodeURIComponent(type)}&q=${encodeURIComponent(term)}`,
    );
    assetResults.innerHTML = "";
    if (!results.length) {
      assetResults.textContent = `No ${assetLabel(type).toLowerCase()} results`;
      return;
    }

    results.forEach((asset) => {
      const button = document.createElement("button");
      button.className = "asset-result";
      button.type = "button";
      button.innerHTML = `
        <img alt="">
        <span>
          <strong></strong>
          <small></small>
        </span>
      `;
      $("img", button).src = asset.previewUrl || asset.url;
      $("strong", button).textContent = asset.title || assetLabel(type);
      $("small", button).textContent = asset.source || "Recommended";
      button.addEventListener("click", () =>
        createAssetWidget(asset).catch((error) => showToast(error.message)),
      );
      assetResults.appendChild(button);
    });
  } catch (error) {
    assetResults.textContent = "";
    showToast(error.message);
  }
}

function openAssetDialog(type) {
  state.pendingAssetType = "sticker";
  assetDialogTitle.textContent = assetLabel();
  assetSearchInput.value = "";
  assetSearchInput.placeholder = "Search stickers";
  assetDialog.showModal();
  loadAssetResults("").catch((error) => showToast(error.message));
}

async function createAssetWidget(asset) {
  const type = "sticker";
  const width = asset.assetType === "gif" ? 230 : 180;
  const height = asset.assetType === "gif" ? 180 : 180;
  const rect = centeredRect(width, height);

  await createWidget(type, rect, {
    title: asset.title || assetLabel(type),
    url: asset.url,
    previewUrl: asset.previewUrl || asset.url,
    source: asset.source || "Recommended",
  });
  assetDialog.close();
  assetResults.innerHTML = "";
}

function pictureRectForUpload(picture) {
  const maxWidth = 390;
  const maxHeight = 310;
  const scale = Math.min(
    maxWidth / picture.width,
    maxHeight / picture.height,
    1,
  );
  let width = Math.max(160, Math.round(picture.width * scale));
  let height = Math.max(120, Math.round(picture.height * scale));
  const ratio = picture.width / picture.height;

  if (width / height > ratio) {
    width = Math.round(height * ratio);
  } else {
    height = Math.round(width / ratio);
  }
  return centeredRect(width, height);
}

async function createPictureWidgetFromFile(file) {
  if (!canEdit()) return;
  const picture = await resizePictureUpload(file);
  await createWidget("picture", pictureRectForUpload(picture), {
    title: picture.title,
    url: picture.url,
    frame: "classic",
    naturalWidth: picture.width,
    naturalHeight: picture.height,
  });
}

function defaultQuestionData() {
  return {
    questionType: "romantic",
    questionIndex: Math.floor(Math.random() * questionPresets.romantic.length),
    commentText: "",
    background: "rgba(255,255,255,0.88)",
    questionColor: "#050406",
    questionFontSize: 21,
    questionBold: true,
    answerColor: "#24103d",
    answerFontSize: 17,
  };
}

function centeredRect(width, height) {
  return {
    x: Math.round(
      Math.max(
        40,
        (boardViewport.scrollLeft + boardViewport.clientWidth / 2) /
          state.viewport.zoom -
          width / 2,
      ),
    ),
    y: Math.round(
      Math.max(
        40,
        (boardViewport.scrollTop + boardViewport.clientHeight / 2) /
          state.viewport.zoom -
          height / 2,
      ),
    ),
    width,
    height,
  };
}

function updateReadModeButtons() {
  readModeButton.classList.toggle("hidden", state.viewMode === "read");
  editModeButton.classList.toggle("hidden", state.viewMode !== "read");
  downloadShotButton.classList.toggle("hidden", state.viewMode !== "read");
}

function loadScreenshotLibrary() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-html2canvas]");
    if (existing) {
      existing.addEventListener("load", () => resolve(window.html2canvas), {
        once: true,
      });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    script.async = true;
    script.dataset.html2canvas = "true";
    script.onload = () => resolve(window.html2canvas);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function prepareScreenshotClone(clonedDocument) {
  const clonedViewport = clonedDocument.querySelector("#boardViewport");
  if (!clonedViewport) return;

  const background = clonedDocument.createElement("div");
  background.className = "screenshot-background";
  ["gradientField", "heartField", "themeField"].forEach((id) => {
    const layer = clonedDocument.getElementById(id);
    if (!layer) return;
    const clone = layer.cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.add("screenshot-background-layer");
    background.appendChild(clone);
  });
  clonedViewport.prepend(background);
  clonedViewport.classList.add("screenshot-viewport");
  clonedDocument.querySelector("#board")?.classList.add("screenshot-board");
}

async function downloadScreenshot() {
  const previousMode = state.viewMode;
  setViewMode("read");
  await new Promise((resolve) => requestAnimationFrame(resolve));
  try {
    const html2canvas = await loadScreenshotLibrary();
    const canvas = await html2canvas(boardViewport, {
      backgroundColor: null,
      scale: Math.min(2, window.devicePixelRatio || 1),
      useCORS: true,
      onclone: prepareScreenshotClone,
      ignoreElements: (element) =>
        element.classList?.contains("remote-cursor") ||
        element.classList?.contains("local-cursor"),
    });
    const link = document.createElement("a");
    link.download = `${activePage()?.name || "cara-mia"}-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch {
    showToast("Screenshot could not be downloaded.");
  } finally {
    if (previousMode !== "read") setViewMode(previousMode);
  }
}

function openPageDialog(action) {
  if (!canEdit() || !state.exhibit) return;
  state.pendingPageAction = action;
  const current = activePage();
  pageDialogTitle.textContent =
    action === "rename" ? "Rename page" : "Add page";
  pageNameInput.value =
    action === "rename"
      ? current?.name || "Untitled"
      : `Page ${(state.exhibit.pages?.length || 0) + 1}`;
  pageDialog.showModal();
  pageNameInput.focus();
  pageNameInput.select();
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(loginForm);
  try {
    const { user } = await api("/api/login", {
      method: "POST",
      body: JSON.stringify({
        accountId: form.get("accountId"),
        password: form.get("password"),
      }),
    });
    state.user = user;
    await enterStudio();
  } catch (error) {
    showToast(error.message);
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(signupForm);
  const email = signupEmail();
  const accountId = String(form.get("accountId") || "")
    .trim()
    .toLowerCase();
  const password = String(form.get("password") || "");
  const passwordConfirm = String(form.get("passwordConfirm") || "");
  [
    signupEmailField,
    signupCodeField,
    signupAccountField,
    signupPasswordField,
    signupPasswordConfirmField,
  ].forEach(clearFieldError);

  if (!validEmailValue(email)) {
    markFieldError(signupEmailField);
    setVerifyStatus(signupEmailStatus, "invalid");
    showToast("Enter a valid email address.");
    return;
  }
  if (!state.pendingSignup?.verified || state.pendingSignup.email !== email) {
    markFieldError(signupEmailField);
    markFieldError(signupCodeField);
    setVerifyStatus(signupEmailStatus, "invalid");
    showToast("Verify your email before creating the account.");
    return;
  }
  if (!validAccountIdValue(accountId)) {
    markFieldError(signupAccountField);
    showToast(
      "Use 3-32 letters, numbers, dots, dashes, or underscores for the account id.",
    );
    return;
  }
  if (!validPasswordValue(password)) {
    markFieldError(signupPasswordField);
    showToast("Use a password with at least 8 characters.");
    return;
  }
  if (password !== passwordConfirm) {
    markFieldError(signupPasswordField);
    markFieldError(signupPasswordConfirmField);
    showToast("Passwords do not match.");
    return;
  }

  try {
    const { user } = await api("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        accountId,
        password,
        passwordConfirm,
        verificationToken: state.pendingSignup.verificationToken,
      }),
    });
    state.user = user;
    state.pendingSignup = null;
    signupForm.reset();
    resetSignupVerification();
    await enterStudio();
    showToast("Account created.");
  } catch (error) {
    const message = error.message.toLowerCase();
    if (message.includes("email")) markFieldError(signupEmailField);
    if (message.includes("account")) markFieldError(signupAccountField);
    if (message.includes("password")) markFieldError(signupPasswordField);
    if (message.includes("match")) markFieldError(signupPasswordConfirmField);
    showToast(error.message);
  }
});

sendSignupCodeButton.addEventListener("click", async () => {
  const email = signupEmail();
  [signupEmailField, signupCodeField].forEach(clearFieldError);
  if (!validEmailValue(email)) {
    markFieldError(signupEmailField);
    setVerifyStatus(signupEmailStatus, "invalid");
    showToast("Enter a valid email address.");
    return;
  }

  showSignupVerification(email);
  signupVerifyNote.textContent = `Sending a verification code to ${email}...`;
  try {
    await api("/api/signup/code", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    signupVerifyNote.textContent = `Enter the 6-character code sent to ${email}.`;
    showToast("Verification code sent.");
  } catch (error) {
    markFieldError(signupEmailField);
    setVerifyStatus(signupEmailStatus, "invalid");
    signupVerifyNote.textContent = `Email did not send. ${error.message}`;
    showToast(error.message);
  }
});

verifySignupCodeButton.addEventListener("click", async () => {
  const email = signupEmail();
  const code = signupCodeInput.value;
  clearFieldError(signupCodeField);
  if (!validEmailValue(email) || !code) {
    markFieldError(signupCodeField);
    setVerifyStatus(signupEmailStatus, "invalid");
    showToast("Enter the code from your email.");
    return;
  }

  try {
    const { verificationToken } = await api("/api/signup/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    state.pendingSignup = { email, verified: true, verificationToken };
    setVerifyStatus(signupEmailStatus, "verified");
    signupVerifyNote.textContent =
      "Email verified. Finish the account details and create the account.";
    showToast("Email verified.");
  } catch (error) {
    markFieldError(signupCodeField);
    setVerifyStatus(signupEmailStatus, "invalid");
    showToast(error.message);
  }
});

signupForm.elements.email.addEventListener("input", () => {
  resetSignupVerification();
});

signupCodeInput.addEventListener("input", () => {
  clearFieldError(signupCodeField);
  setVerifyStatus(signupEmailStatus, null);
});

showSignupButton.addEventListener("click", showSignup);
showLoginButton.addEventListener("click", showLogin);

forgotPasswordButton.addEventListener("click", () => openPasswordResetDialog());

forgotPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = String(new FormData(forgotPasswordForm).get("email") || "")
    .trim()
    .toLowerCase();
  if (!validEmailValue(email)) {
    showToast("Enter a valid email address.");
    return;
  }
  showResetPasswordStep(email);
  resetPasswordNote.textContent = `Sending a reset code to ${email}...`;
  try {
    await api("/api/password/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    resetPasswordNote.textContent = `Enter the code sent to ${email}.`;
    showToast("Reset code sent.");
  } catch (error) {
    resetPasswordNote.textContent = `Email did not send. ${error.message}`;
    showToast(error.message);
  }
});

resetPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(resetPasswordForm);
  clearFieldError(resetNewPasswordField);
  clearFieldError(resetNewPasswordConfirmField);
  if (!state.pendingPasswordReset?.resetToken) {
    markFieldError(resetCodeField);
    showToast("Verify the reset code first.");
    return;
  }
  if (!validPasswordValue(form.get("newPassword"))) {
    markFieldError(resetNewPasswordField);
    showToast("Use a password with at least 8 characters.");
    return;
  }
  if (
    String(form.get("newPassword") || "") !==
    String(form.get("newPasswordConfirm") || "")
  ) {
    markFieldError(resetNewPasswordField);
    markFieldError(resetNewPasswordConfirmField);
    resetPasswordNote.textContent = "Passwords do not match.";
    return;
  }

  try {
    const resetEmail = String(form.get("email") || "")
      .trim()
      .toLowerCase();
    const { accountId } = await api("/api/password/reset", {
      method: "POST",
      body: JSON.stringify({
        email: resetEmail,
        resetToken: state.pendingPasswordReset.resetToken,
        newPassword: form.get("newPassword"),
        newPasswordConfirm: form.get("newPasswordConfirm"),
      }),
    });
    state.pendingPasswordReset = null;
    passwordResetDialog.close();
    forgotPasswordForm.reset();
    resetPasswordForm.reset();
    closeLiveEvents();
    state.user = null;
    state.exhibit = null;
    setView("auth");
    showLogin();
    loginForm.elements.accountId.value = accountId || resetEmail;
    loginForm.elements.accountId.focus();
    showToast("Password reset. Log in with your new password.");
  } catch (error) {
    showToast(error.message);
  }
});

verifyResetCodeButton.addEventListener("click", async () => {
  const email = resetDialogEmailValue();
  const code = resetPasswordForm.elements.code.value;
  clearFieldError(resetCodeField);
  if (!validEmailValue(email) || !code) {
    markFieldError(resetCodeField);
    setVerifyStatus(resetCodeStatus, "invalid");
    showToast("Enter the email and reset code.");
    return;
  }
  resetPasswordForm.elements.email.value = email;
  try {
    const { resetToken } = await api("/api/password/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    state.pendingPasswordReset = { email, resetToken };
    setVerifyStatus(resetCodeStatus, "verified");
    resetPasswordNote.textContent = "Code verified. Choose a new password.";
    resetNewPasswordField.classList.remove("hidden");
    resetNewPasswordConfirmField.classList.remove("hidden");
    applyResetPasswordButton.classList.remove("hidden");
    resetPasswordForm.elements.newPassword.focus();
    showToast("Reset code verified.");
  } catch (error) {
    state.pendingPasswordReset = { email, resetToken: null };
    setVerifyStatus(resetCodeStatus, "invalid");
    markFieldError(resetCodeField);
    showToast(error.message);
  }
});

resetPasswordForm.elements.code.addEventListener("input", () => {
  if (!state.pendingPasswordReset?.resetToken) return;
  state.pendingPasswordReset.resetToken = null;
  setVerifyStatus(resetCodeStatus, null);
  resetNewPasswordField.classList.add("hidden");
  resetNewPasswordConfirmField.classList.add("hidden");
  applyResetPasswordButton.classList.add("hidden");
});

forgotPasswordForm.elements.email.addEventListener("input", () => {
  resetPasswordForm.elements.email.value = String(
    forgotPasswordForm.elements.email.value || "",
  )
    .trim()
    .toLowerCase();
  state.pendingPasswordReset = null;
  setVerifyStatus(resetCodeStatus, null);
  resetNewPasswordField.classList.add("hidden");
  resetNewPasswordConfirmField.classList.add("hidden");
  applyResetPasswordButton.classList.add("hidden");
});

resetPasswordBackButton.addEventListener("click", () => {
  state.pendingPasswordReset = null;
  forgotPasswordForm.classList.remove("hidden");
  resetPasswordForm.classList.remove("hidden");
  resetPasswordForm.reset();
  resetPasswordNote.textContent = "";
  resetNewPasswordField.classList.add("hidden");
  resetNewPasswordConfirmField.classList.add("hidden");
  applyResetPasswordButton.classList.add("hidden");
  setVerifyStatus(resetCodeStatus, null);
  forgotPasswordForm.elements.email.focus();
});

logoutButton.addEventListener("click", async () => {
  await api("/api/logout", { method: "POST" });
  closeLiveEvents();
  state.user = null;
  state.exhibit = null;
  setView("auth");
  showLogin();
});

exhibitPicker.addEventListener("change", () => {
  loadExhibit(exhibitPicker.value).catch((error) => showToast(error.message));
});

cursorSettingsButton.addEventListener("click", () => {
  renderAccountSettings();
  clearFieldError(changeUsernameField);
  setInlineError(changeUsernameNote);
  changePasswordForm.reset();
  [
    changeCurrentPasswordField,
    changeNewPasswordField,
    changeNewPasswordConfirmField,
  ].forEach(clearFieldError);
  setInlineError(changePasswordNote);
  setSettingsSection("account");
  renderCursorPreview();
  renderBackgroundPresets();
  cursorDialog.showModal();
});

cursorDialog.addEventListener("click", (event) => {
  if (event.target === cursorDialog) {
    cursorDialog.close();
  }
});

settingsNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSettingsSection(button.dataset.settingsSection || "account");
  });
});

changeUsernameForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(changeUsernameForm);
  const accountId = String(form.get("accountId") || "")
    .trim()
    .toLowerCase();
  clearFieldError(changeUsernameField);
  setInlineError(changeUsernameNote);

  if (!validAccountIdValue(accountId)) {
    markFieldError(changeUsernameField);
    setInlineError(
      changeUsernameNote,
      "Use 3-32 letters, numbers, dots, dashes, or underscores.",
    );
    return;
  }

  try {
    const { user } = await api("/api/account/username", {
      method: "POST",
      body: JSON.stringify({ accountId }),
    });
    state.user = user;
    renderAccountSettings();
    showToast("Username changed.");
  } catch (error) {
    markFieldError(changeUsernameField);
    setInlineError(
      changeUsernameNote,
      error.message || "Username could not be changed.",
    );
  }
});

changePasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(changePasswordForm);
  [
    changeCurrentPasswordField,
    changeNewPasswordField,
    changeNewPasswordConfirmField,
  ].forEach(clearFieldError);
  setInlineError(changePasswordNote);
  if (
    String(form.get("newPassword") || "") !==
    String(form.get("newPasswordConfirm") || "")
  ) {
    markFieldError(changeNewPasswordConfirmField);
    setInlineError(changePasswordNote, "Passwords don't match.");
    return;
  }
  try {
    const { user } = await api("/api/account/password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: form.get("currentPassword"),
        newPassword: form.get("newPassword"),
        newPasswordConfirm: form.get("newPasswordConfirm"),
      }),
    });
    state.user = user;
    changePasswordForm.reset();
    renderAccountSettings();
    showToast("Password changed.");
  } catch (error) {
    const message = error.message || "Password could not be changed.";
    if (message.toLowerCase().includes("current")) {
      markFieldError(changeCurrentPasswordField);
    } else if (message.toLowerCase().includes("match")) {
      markFieldError(changeNewPasswordConfirmField);
      setInlineError(changePasswordNote, "Passwords don't match.");
      return;
    } else {
      markFieldError(changeNewPasswordField);
      markFieldError(changeNewPasswordConfirmField);
    }
    setInlineError(changePasswordNote, message);
  }
});

[changeNewPasswordField, changeNewPasswordConfirmField].forEach((field) => {
  $("input", field)?.addEventListener("input", () => {
    clearFieldError(changeNewPasswordField);
    clearFieldError(changeNewPasswordConfirmField);
    if (changePasswordNote.textContent === "Passwords don't match.") {
      setInlineError(changePasswordNote);
    }
  });
});

settingsForgotPasswordButton.addEventListener("click", () => {
  cursorDialog.close();
  openPasswordResetDialog(state.user?.email || "");
});

readModeButton.addEventListener("click", () => setViewMode("read"));
editModeButton.addEventListener("click", () => setViewMode("edit"));
downloadShotButton.addEventListener("click", () => downloadScreenshot());

pagePicker.addEventListener("change", () => setActivePage(pagePicker.value));
addPageButton.addEventListener("click", () => openPageDialog("add"));
renamePageButton.addEventListener("click", () => openPageDialog("rename"));

zoomOutButton.addEventListener("click", () =>
  setZoom(state.viewport.zoom - zoomLimits.step, {
    x: boardViewport.clientWidth / 2,
    y: boardViewport.clientHeight / 2,
  }),
);
zoomInButton.addEventListener("click", () =>
  setZoom(state.viewport.zoom + zoomLimits.step, {
    x: boardViewport.clientWidth / 2,
    y: boardViewport.clientHeight / 2,
  }),
);

cursorColorInput.addEventListener("input", () => {
  state.cursorProfile.color = cursorColorInput.value;
  saveCursorProfile();
  renderCursorPreview();
  if (state.pendingCursorPoint) sendCursorPresence(state.pendingCursorPoint);
});

cursorUploadInput.addEventListener("change", async () => {
  const [file] = cursorUploadInput.files || [];
  if (!file) return;
  try {
    state.cursorProfile.cursorImage = await resizeCursorUpload(file);
    saveCursorProfile();
    renderCursorPreview();
    if (state.pendingCursorPoint) sendCursorPresence(state.pendingCursorPoint);
  } catch {
    showToast("Cursor image could not be loaded.");
  } finally {
    cursorUploadInput.value = "";
  }
});

pictureUploadInput.addEventListener("change", async () => {
  const [file] = pictureUploadInput.files || [];
  if (!file) return;
  try {
    await createPictureWidgetFromFile(file);
  } catch {
    showToast("Picture could not be uploaded.");
  } finally {
    pictureUploadInput.value = "";
  }
});

$$(".tool-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.tool === "music") {
      selectTool(null);
      if (canEdit()) {
        setMusicPresentation(state.pendingPresentation || "cover");
        musicDialog.showModal();
      }
      return;
    }
    if (button.dataset.tool === "sticker") {
      selectTool(null);
      if (canEdit()) {
        openAssetDialog();
      }
      return;
    }
    if (button.dataset.tool === "picture") {
      selectTool(null);
      if (canEdit()) {
        pictureUploadInput.click();
      }
      return;
    }
    selectTool(button.dataset.tool);
  });
});

$$(".utensil").forEach((button) => {
  button.addEventListener("click", () => {
    state.brush.utensil = button.dataset.brush;
    $$(".utensil").forEach((item) =>
      item.classList.toggle("active", item === button),
    );
  });
});

colors.forEach((color) => {
  const swatch = document.createElement("button");
  swatch.type = "button";
  swatch.className = "color-swatch";
  swatch.title = color;
  swatch.style.background = color;
  swatch.addEventListener("click", () => {
    state.brush.color = color;
    $$(".color-swatch").forEach((item) =>
      item.classList.toggle("active", item === swatch),
    );
  });
  colorRail.appendChild(swatch);
});
$(".color-swatch", colorRail)?.classList.add("active");

brushSize.addEventListener("input", () => {
  state.brush.size = Number(brushSize.value);
});

window.addEventListener("keydown", async (event) => {
  const widget = selectedWidget();
  const isFormEditingTarget = Boolean(
    event.target?.closest?.("input, textarea, select"),
  );
  if (
    (event.key === "Backspace" || event.key === "Delete") &&
    !(event.ctrlKey || event.metaKey || event.altKey) &&
    !isFormEditingTarget &&
    !document.querySelector("dialog[open]")
  ) {
    if (widget && canEdit()) {
      event.preventDefault();
      event.stopPropagation();
      try {
        await deleteWidget(widget);
      } catch (error) {
        showToast(error.message);
      }
      return;
    }
  }

  if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
  const key = event.key.toLowerCase();
  const wantsUndo = key === "z" && !event.shiftKey;
  const wantsRedo = key === "y" || (key === "z" && event.shiftKey);
  if (!wantsUndo && !wantsRedo) return;
  if (isTextEditingTarget(event.target)) return;

  event.preventDefault();
  event.stopPropagation();
  try {
    const handled = wantsRedo
      ? await redoLastAppAction()
      : await undoLastAppAction();
    if (!handled)
      showToast(wantsRedo ? "Nothing to redo." : "Nothing to undo.");
  } catch (error) {
    showToast(error.message);
  }
});

boardViewport.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target !== board ||
    ["canvas", "wordbox", "question"].includes(state.selectedTool)
  )
    return;
  clearWidgetSelection();
  state.viewport.panning = {
    startX: event.clientX,
    startY: event.clientY,
    scrollLeft: boardViewport.scrollLeft,
    scrollTop: boardViewport.scrollTop,
  };
  boardViewport.classList.add("panning");
  boardViewport.setPointerCapture(event.pointerId);
});

boardViewport.addEventListener("pointermove", (event) => {
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
  boardViewport.classList.remove("panning");
}

boardViewport.addEventListener("pointerup", stopBoardPan);
boardViewport.addEventListener("pointercancel", stopBoardPan);
boardViewport.addEventListener(
  "scroll",
  () => {
    state.boardRect = null;
  },
  { passive: true },
);

board.addEventListener("pointerdown", (event) => {
  if (beginCursorPeerDrag(event)) return;
  if (!canEdit()) return;
  if (!event.target.closest(".art-widget")) {
    clearWidgetSelection();
  }
  if (!["canvas", "wordbox", "question"].includes(state.selectedTool)) return;
  if (event.target !== board) return;

  const start = boardPoint(event);
  state.draft = { start, type: state.selectedTool };
  updateDragPreview({ x: start.x, y: start.y, width: 1, height: 1 });
  board.setPointerCapture(event.pointerId);
});

board.addEventListener("pointermove", (event) => {
  const point = boardPoint(event);
  renderLocalCursor(point);
  queueCursorPresence(point);
  if (updateCursorPeerDrag(event)) return;
  if (!state.draft) return;
  const rect = normalizeRect(state.draft.start, point);
  updateDragPreview(rect);
});

board.addEventListener("pointerleave", () => {
  localCursor?.classList.add("hidden");
});

board.addEventListener("pointerup", async (event) => {
  if (endCursorPeerDrag(event)) return;
  if (!state.draft) return;
  const draft = state.draft;
  const rect = normalizeRect(draft.start, boardPoint(event));
  clearDragPreview();

  if (rect.width < 36 || rect.height < 36) return;
  try {
    const data =
      draft.type === "wordbox"
        ? { text: "", background: "rgba(255,255,255,0.84)" }
        : draft.type === "question"
          ? defaultQuestionData()
          : { background: "rgba(255,255,255,0.84)" };
    await createWidget(draft.type, rect, data);
  } catch (error) {
    showToast(error.message);
  }
});

board.addEventListener("pointercancel", (event) => {
  if (state.cursorDrag?.pointerId === event.pointerId) {
    clearCursorPeerDrag(event.pointerId);
  }
});

shareButton.addEventListener("click", async () => {
  if (!state.exhibit?.canShare) return;
  shareDialog.showModal();
  try {
    await loadShareList();
  } catch (error) {
    showToast(error.message);
  }
});

$$(".modal-close").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

shareForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(shareForm);
  try {
    await api("/api/share", {
      method: "POST",
      body: JSON.stringify({
        exhibitId: state.exhibit.id,
        email: form.get("email"),
        role: form.get("role"),
      }),
    });
    shareForm.reset();
    await loadShareList();
    showToast("People updated.");
  } catch (error) {
    showToast(error.message);
  }
});

pageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canEdit() || !state.exhibit) return;
  const name = pageNameInput.value.trim();
  try {
    if (state.pendingPageAction === "rename" && state.activePageId) {
      const { pages } = await api(
        `/api/exhibits/${state.exhibit.id}/pages/${state.activePageId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name }),
        },
      );
      state.exhibit.pages = pages;
      renderPagePicker();
    } else {
      const { page, pages } = await api(
        `/api/exhibits/${state.exhibit.id}/pages`,
        {
          method: "POST",
          body: JSON.stringify({ name }),
        },
      );
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

musicSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  musicResults.innerHTML = "";
  musicChoice.classList.add("hidden");
  state.pendingMusic = null;

  try {
    const { results } = await api(
      `/api/music/search?q=${encodeURIComponent(musicSearchInput.value)}`,
    );
    if (!results.length) {
      musicResults.textContent = "No results";
      return;
    }

    results.forEach((track) => {
      const button = document.createElement("button");
      button.className = "music-result";
      button.type = "button";
      const artwork = document.createElement("img");
      artwork.alt = "";
      artwork.src = track.artwork || "";
      const meta = document.createElement("span");
      const title = document.createElement("strong");
      const artist = document.createElement("small");
      title.textContent = track.title;
      artist.textContent = `${track.artist} - ${track.album || ""}`;
      meta.appendChild(title);
      meta.appendChild(artist);
      button.appendChild(artwork);
      button.appendChild(meta);
      button.addEventListener("click", () => {
        state.pendingMusic = track;
        $$(".music-result").forEach((item) =>
          item.classList.toggle("active", item === button),
        );
        musicChoice.classList.remove("hidden");
      });
      musicResults.appendChild(button);
    });
  } catch (error) {
    showToast(error.message);
  }
});

assetSearchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loadAssetResults(assetSearchInput.value.trim());
});

$$("[data-presentation]").forEach((button) => {
  button.addEventListener("click", () => {
    setMusicPresentation(button.dataset.presentation);
  });
});

applyMusicButton.addEventListener("click", async () => {
  if (!state.pendingMusic) {
    showToast("Choose a song.");
    return;
  }

  const presentation = state.pendingPresentation;
  const rect = centeredRect(
    presentation === "cover" ? 300 : 520,
    presentation === "cover" ? 350 : 220,
  );

  try {
    await createWidget("music", rect, {
      ...state.pendingMusic,
      presentation,
      playerColor: "#f6e8f1",
      playerAlpha: 0.9,
    });
    musicDialog.close();
    musicResults.innerHTML = "";
    musicSearchInput.value = "";
    musicChoice.classList.add("hidden");
    state.pendingMusic = null;
  } catch (error) {
    showToast(error.message);
  }
});

window.addEventListener("resize", () => {
  state.boardRect = null;
  if (state.exhibit) renderBoard();
});

createHearts();
animateGothicFlowLight();
buildCursorPresets();
applyBackgroundTheme();
renderBackgroundPresets();
setMusicPresentation("cover");
refreshIcons();
checkSession();
