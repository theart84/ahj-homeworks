// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  console.log('Установлен');
  event.waitUntil(
    caches
      .open('v1')
      .then((cache) => cache.addAll(['./', './index.html', './main.js', './main.css']))
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', () => {
  console.log('Активирован');
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
