const CACHE_NAME = 'meherah-os-v1-offline-mesh';
const OFFLINE_ASSETS = [
  '/',
  '/index.html',
  '/src/App.tsx',
  '/src/components/views/KnowledgeCenterView.tsx',
  '/src/components/views/FileManagerView.tsx'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_ASSETS);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  // Network-first falling back to cache strategy handles spotty cellular connectivity
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        // Return standard offline fallback state asset if not matched directly inside cache engine
        return caches.match('/index.html');
      });
    })
  );
});
