// HFQ Truck Onboarding Service Worker
// Version: 1.0.26
const CACHE='hfq-truck-onboarding-delete-unsynced-queue-v1.0.28';
const ASSETS=['./','./index.html','./manifest.json','./service-worker.js','./icons/hfq-logo.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>null))) });
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('hfq-truck-onboarding-fixed-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>null);return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))))});
