// Connection scaffold only. No paid upstream requests are made.
// Add AeroAPI normalization and shared storage after deciding query scope/budget.
// AEROAPI_KEY must be stored as a Cloudflare secret, never in vars or site/.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Vary': 'Origin' };
    if (request.headers.get('Origin') === env.ALLOWED_ORIGIN) {
      headers['Access-Control-Allow-Origin'] = env.ALLOWED_ORIGIN;
    }
    if (request.method !== 'GET') return new Response(JSON.stringify({error:'method_not_allowed'}), {status:405, headers:{...headers,Allow:'GET'}});
    if (url.pathname === '/health') return new Response(JSON.stringify({status:'ok',mode:'not_connected'}),{headers});
    if (url.pathname === '/aircraft') return new Response(JSON.stringify({error:'not_configured',message:'AeroAPI adapter is not configured.'}),{status:503,headers});
    return new Response(JSON.stringify({error:'not_found'}),{status:404,headers});
  }
};
