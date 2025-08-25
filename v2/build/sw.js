// Service Worker FunRevis V2
const CACHE_NAME = 'funrevis-v2-2.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/pages/mathematiques/index.html',
    '/components/ModuleLoader.js',
    '/components/CourseRenderer.js',
    '/components/NavigationManager.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});