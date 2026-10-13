// Cloudflare Worker: proxy mínimo solo para lacuerda.net
export default {
  async fetch(request) {
    const cors = { 'Access-Control-Allow-Origin': 'https://droide13.github.io' };
    const objetivo = new URL(request.url).searchParams.get('url');
    if (!objetivo) return new Response('Falta ?url=', { status: 400, headers: cors });
    let u;
    try { u = new URL(objetivo); } catch { return new Response('URL no válida', { status: 400, headers: cors }); }
    if (!/(^|\.)lacuerda\.net$/.test(u.hostname)) return new Response('Solo lacuerda.net', { status: 403, headers: cors });
    const r = await fetch(u.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LaCuerdaLaTeX/1.0)', 'Accept-Language': 'es' }
    });
    return new Response(r.body, {
      status: r.status,
      headers: { ...cors, 'Content-Type': r.headers.get('Content-Type') || 'text/html; charset=utf-8' }
    });
  }
};
