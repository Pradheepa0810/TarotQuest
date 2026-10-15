(() => {
  if (!('serviceWorker' in navigator) || window.top !== window.self || location.protocol === 'file:') return;

  const currentScript = document.currentScript;
  if (!currentScript) return;

  const appRoot = new URL('../../', currentScript.src);
  const workerUrl = new URL('service-worker.js', appRoot);
  const status = document.createElement('div');
  status.className = 'connection-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;
  document.body.appendChild(status);

  const style = document.createElement('style');
  style.textContent = `
    .connection-status {
      position: fixed;
      z-index: 10000;
      right: 14px;
      bottom: calc(14px + env(safe-area-inset-bottom));
      max-width: min(360px, calc(100vw - 28px));
      padding: 9px 13px;
      border: 1px solid rgba(220, 185, 119, .45);
      border-radius: 999px;
      background: rgba(15, 22, 18, .96);
      color: #ecf3e9;
      box-shadow: 0 4px 20px rgba(0, 0, 0, .32);
      font: 500 12px/1.4 system-ui, sans-serif;
      letter-spacing: .02em;
      pointer-events: none;
    }
    .connection-status:not([hidden]) { display: block; }
    @media (max-width: 900px) {
      .connection-status { bottom: calc(82px + env(safe-area-inset-bottom)); }
    }
  `;
  document.head.appendChild(style);

  let hideTimer;
  const showStatus = (message, autoHide = false) => {
    status.textContent = message;
    status.hidden = false;
    window.clearTimeout(hideTimer);
    if (autoHide) hideTimer = window.setTimeout(() => { status.hidden = true; }, 4000);
  };

  window.addEventListener('offline', () => {
    showStatus('Offline mode · cached app and viewed card art are available');
  });
  window.addEventListener('online', () => showStatus('Back online', true));

  if (!navigator.onLine) {
    showStatus('Offline mode · cached app and viewed card art are available');
  }

  navigator.serviceWorker.register(workerUrl, { scope: appRoot.pathname })
    .catch((error) => console.warn('Tarot Quest offline support could not be enabled:', error));
})();
