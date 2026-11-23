// 見本サイトの間は API レスポンスも検索エンジンに載せない（本番公開時に外す）
const NOINDEX_HEADERS = { 'X-Robots-Tag': 'noindex, nofollow' }

export default {
  fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return Response.json({ ok: true }, { headers: NOINDEX_HEADERS })
    }

    return Response.json({ error: 'Not Found' }, { status: 404, headers: NOINDEX_HEADERS })
  },
} satisfies ExportedHandler<Env>
