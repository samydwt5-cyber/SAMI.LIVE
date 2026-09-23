const V='sami-life-v7',CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus()}return self.clients.openWindow('./')}))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  const put=(k,x)=>{if(x&&(x.ok||x.type==='opaque')){const c=x.clone();caches.open(V).then(h=>h.put(k,c))}return x};
  if(r.mode==='navigate'){e.respondWith(caches.match('index.html').then(h=>{const n=fetch(r).then(x=>put('index.html',x)).catch(()=>h);return h||n}));return}
  if(!(u.origin===location.origin||/(^|\.)(googleapis|gstatic)\.com$/.test(u.hostname)))return;
  e.respondWith(caches.match(r).then(h=>{const n=fetch(r).then(x=>put(r,x)).catch(()=>h);return h||n}));
});