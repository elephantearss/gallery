import { getAuthUser } from '../utils/auth.js'

export async function onRequestGet({ request, env }) {
  const user = await getAuthUser(request, env)
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const photos = await env.DB.prepare('SELECT * FROM photos WHERE userId = ?')
    .bind(user.id)
    .all()

  const storageUsed = await env.DB.prepare('SELECT SUM(size) as total FROM photos WHERE userId = ?')
    .bind(user.id)
    .first()

  return new Response(JSON.stringify({
    ...user,
    photos: photos.results,
    storageUsed: Math.round((storageUsed?.total || 0) / 1024 / 1024 * 100) / 100
  }), { status: 200 })
}