const CACHE_NAME = 'iwaffle-v13';
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
  const { request } = event;

  // For non-GET requests, we don't need to do anything with the cache.
  // This will correctly bypass POST requests to the API endpoint.
  if (request.method !== 'GET') {
    return;
  }

  // For all GET requests, use a "Stale-While-Revalidate" strategy.
  // This will cache app assets, CDN scripts, images, and fonts.
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          // If we get a valid response, update the cache for next time
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Return the cached response immediately if it exists, 
        // otherwise, wait for the network response.
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