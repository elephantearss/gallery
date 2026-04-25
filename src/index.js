import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Routes starting with /api/ should be handled by Functions
    if (url.pathname.startsWith('/api/')) {
      // This will be handled by the /functions/api/* routes
      // For now, return a not found since we're in the main worker
      return new Response(JSON.stringify({ error: 'API route not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    try {
      // Try to get the requested asset
      const asset = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
        }
      )
      return asset
    } catch (e) {
      // If the asset doesn't exist (404), serve index.html for Vue Router
      if (e.status === 404) {
        const indexAsset = await getAssetFromKV(
          {
            request: new Request(new URL('/index.html', request.url)),
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
          }
        )
        return new Response(indexAsset.body, {
          ...indexAsset,
          status: 200,
        })
      }
      throw e
    }
  },
}
