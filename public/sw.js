const CACHE_NAME = "klinlist-v1";
const OFFLINE_FALLBACK_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_FALLBACK_URL))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Стратегия: сначала сеть (чтобы всегда видеть свежую версию, если
// есть связь), при неудаче — из кэша, при отсутствии в кэше —
// последняя открытая страница/главная.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseCopy = response.clone();

        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(request, responseCopy))
          .catch(() => {});

        return response;
      })
      .catch(() =>
        caches
          .match(request)
          .then(
            (cached) =>
              cached || caches.match(OFFLINE_FALLBACK_URL)
          )
      )
  );
});
