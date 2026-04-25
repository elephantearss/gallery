export async function onRequestGet({ env }) {
  const photos = await env.DB.prepare('SELECT * FROM photos ORDER BY createdAt DESC')
    .all()

  return new Response(JSON.stringify(photos.results), { status: 200 })
}