const CACHE_NAME = 'iwaffle-v10';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://i.imgur.com/d3TFFJr.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Ignore non-GET requests and API calls to Google
  if (event.request.method !== 'GET' || requestUrl.hostname.endsWith('googleapis.com')) {
    // Let the browser handle it, which means a standard network request
    return;
  }

  // Use a "Stale-While-Revalidate" strategy for all other assets
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // If we get a valid response, update the cache for next time
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Return the cached response immediately if it exists, 
        // otherwise, wait for the network response.
        // The network fetch is already running in the background to update the cache.
        return cachedResponse || fetchPromise;
      });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
