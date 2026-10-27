const C='fp-v2',P=['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all([...P.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{})),c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png']).catch(()=>{})])))});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname.includes('openstreetmap'))return;
if(u.origin===location.origin)e.respondWith(fetch(r).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(r,k));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
else e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(u.hostname==='www.gstatic.com'&&x.ok){const k=x.clone();caches.open(C).then(c=>c.put(r,k))}return x})))});
