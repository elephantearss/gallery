export async function onRequest(context) {
  // If the request is for an API route, don't intercept it
  if (context.request.url.includes('/api/')) {
    return context.next()
  }

  // For all other requests, try to serve static assets first
  const response = await context.next()
  
  // If a static asset was found, return it
  if (response.status !== 404) {
    return response
  }

  // If no static asset found, serve index.html for SPA routing
  return context.env.ASSETS.fetch(new URL('/index.html', context.request.url))
}
