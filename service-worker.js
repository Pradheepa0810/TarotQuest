const CACHE_PREFIX = 'tarot-quest-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-v24`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-v24`;

const APP_SHELL = [
  './',
  './index.html',
  './tarot-quest.html',
  './manifest.webmanifest',
  './deck-data.js',
  './assets/css/main.css',
  './assets/js/pwa.js',
  './assets/js/app.js',
  './assets/js/modules/achievement-service.js',
  './assets/js/modules/quiz-engine.js',
  './assets/js/modules/state-manager.js',
  './assets/js/modules/storage-service.js',
  './assets/js/modules/renderers/chest-renderer.js',
  './assets/js/modules/renderers/home-renderer.js',
  './assets/js/modules/renderers/library-renderer.js',
  './assets/js/modules/renderers/quiz-renderer.js',
  './assets/js/modules/renderers/results-renderer.js',
  './assets/images/tarotquest-logo-badge.svg',
  './assets/images/tarotquest-favicon.svg',
  './assets/images/og-preview.jpg',
  './assets/images/Cottage-fallback.jpg',
  './assets/images/Cottage.webp',
  './assets/images/letter.jpg',
  './assets/images/letter.webp',
  './assets/images/Treasure_room.JPEG',
  './assets/images/achievement_first_five.jpeg',
  './assets/images/achievement_major_arcana.jpeg',
  './assets/images/achievement_master.jpg',
  './assets/images/achievement_pentacles.jpg',
  './assets/images/achievement_quiz.jpg',
  './assets/images/achievement_speed.jpg',
  './assets/images/achievement_swords.jpg',
  './assets/images/achievement_wands.jpeg',
  './assets/images/whimsical-cottage.jpeg'
];

const CACHEABLE_EXTERNAL_HOSTS = new Set([
  'commons.wikimedia.org',
  'upload.wikimedia.org',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'unpkg.com'
]);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function putInCache(cacheName, request, response) {
  if (response && (response.ok || response.type === 'opaque')) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    return await putInCache(RUNTIME_CACHE, request, await fetch(request));
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    const shell = await caches.open(SHELL_CACHE);
    return (await shell.match('./index.html')) || (await shell.match('./tarot-quest.html'));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    return await putInCache(RUNTIME_CACHE, request, await fetch(request));
  } catch {
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (CACHEABLE_EXTERNAL_HOSTS.has(url.hostname)) {
    event.respondWith(cacheFirst(request));
  }
});
