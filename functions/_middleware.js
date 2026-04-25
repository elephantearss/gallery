export async function onRequest(context) {
  const url = new URL(context.request.url)
  const pathname = url.pathname
  
  // API routes go to functions
  if (pathname.startsWith('/api/')) {
    return context.next()
  }
  
  // Try to get static file
  let response = await context.next()
  
  // If asset is found, return it
  if (response.status !== 404) {
    return response
  }
  
  // For 404s (routes that don't exist), check if it could be a page route
  // Serve index.html for Vue SPA routing
  if (!pathname.includes('.')) {
    try {
      const assets = context.env.ASSETS
      const indexFile = new Request(new URL('/index.html', context.request.url))
      const indexResponse = await assets.fetch(indexFile)
      return indexResponse
    } catch (e) {
      return response
    }
  }
  
  return response
}
