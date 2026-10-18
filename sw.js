const CACHE='toeic-650-lab-v2.0.0';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data.js','./parts.js','./scenes.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('toeic-650-lab-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const saved=await cache.match(event.request);
    if(saved)return saved;
    try{return await fetch(event.request)}catch(error){
      if(event.request.mode==='navigate'){const page=await cache.match('./index.html');if(page)return page}
      throw error;
    }
  }));
});
