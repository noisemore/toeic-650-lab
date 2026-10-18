const CACHE='toeic-650-lab-v2.0.2';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data.js','./parts.js','./scenes.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./audio-p1-001.mp3','./audio-p1-002.mp3','./audio-p1-003.mp3','./audio-p1-004.mp3','./audio-p1-005.mp3','./audio-p1-006.mp3','./audio-p2-001.mp3','./audio-p2-002.mp3','./audio-p2-003.mp3','./audio-p2-004.mp3','./audio-p2-005.mp3','./audio-p2-006.mp3','./audio-p2-007.mp3','./audio-p2-008.mp3','./audio-p2-009.mp3','./audio-p2-010.mp3','./audio-p2-011.mp3','./audio-p2-012.mp3','./audio-p3-g1.mp3','./audio-p3-g2.mp3','./audio-p3-g3.mp3','./audio-p3-g4.mp3','./audio-p4-g1.mp3','./audio-p4-g2.mp3','./audio-p4-g3.mp3','./audio-p4-g4.mp3'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(path=>new Request(new URL(path,self.registration.scope),{cache:'reload'})))).then(()=>self.skipWaiting())));
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
