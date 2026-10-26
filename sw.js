/* Service worker: abre mais rápido e guarda a app. Sempre tenta a internet primeiro, para as atualizações chegarem. */
const V='rede-cabinda-v2';
const ARQ=['./','./index.html','./extra.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>Promise.all(ARQ.map(a=>c.add(a).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return; // Firebase, Cloudflare e fotos nunca passam por aqui
  e.respondWith(
    fetch(e.request,{cache:'no-cache'}).then(r=>{
      if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));}
      return r;
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html')))
  );
});
