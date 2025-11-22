self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());

function jsonResponse(obj, status=200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApi(url, event.request));
  }
});

async function handleApi(url, req) {
  const [_, api, store, id] = url.pathname.split('/'); // /api/store/id
  const method = req.method;

  const db = await new Promise((resolve, reject) => {
    const r = indexedDB.open('tuktuk-drive', 1);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
  const tx = db.transaction(store, method === 'GET' ? 'readonly' : 'readwrite');
  const os = tx.objectStore(store);

  if (method === 'GET') {
    if (id) {
      return new Promise((res, rej) => {
        const r = os.get(id);
        r.onsuccess = () => res(jsonResponse(r.result || {}));
        r.onerror = () => rej(jsonResponse({error:'not found'}, 404));
      });
    }
    return new Promise((res, rej) => {
      const r = os.getAll();
      r.onsuccess = () => res(jsonResponse(r.result || []));
      r.onerror = () => rej(jsonResponse({error:'failed'}, 500));
    });
  }

  if (method === 'POST') {
    const body = await req.json();
    return new Promise((res, rej) => {
      const r = os.put(body);
      r.onsuccess = () => res(jsonResponse({ok:true}));
      r.onerror = () => rej(jsonResponse({error:'write failed'}, 500));
    });
  }

  if (method === 'DELETE' && id) {
    return new Promise((res, rej) => {
      const r = os.delete(id);
      r.onsuccess = () => res(jsonResponse({ok:true}));
      r.onerror = () => rej(jsonResponse({error:'delete failed'}, 500));
    });
  }

  return jsonResponse({error:'method not supported'}, 405);
}
