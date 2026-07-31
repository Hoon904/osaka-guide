const CACHE = "osaka-guide-v4";
const ASSETS = [
  "./",
  "./오사카_모바일가이드.html",
  "./오사카_모바일가이드.webmanifest",
  "./오사카_모바일가이드-icon.svg",
  "./travel-data.js",
  "./travel-guide-ui.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match("./오사카_모바일가이드.html"))));
});
