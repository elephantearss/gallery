import { getAuthUser } from '../../utils/auth.js'

export async function onRequestDelete({ request, env, params }) {
  const user = await getAuthUser(request, env)
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const photo = await env.DB.prepare('SELECT * FROM photos WHERE id = ? AND userId = ?')
    .bind(params.id, user.id)
    .first()

  if (!photo) {
    return new Response(JSON.stringify({ error: 'Photo not found' }), { status: 404 })
  }

  // Delete from R2
  const key = photo.url.split('/').pop()
  await env.R2.delete(`${user.id}/${key}`)

  // Delete from DB
  await env.DB.prepare('DELETE FROM photos WHERE id = ?')
    .bind(params.id)
    .run()

  return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 })
}