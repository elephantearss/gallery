import { getAuthUser } from '../../utils/auth.js'

export async function onRequestGet({ request, env }) {
  const user = await getAuthUser(request, env)
  if (!user || user.role !== 'admin') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const users = await env.DB.prepare('SELECT id, username, email, suspended, storageLimit FROM users')
    .all()

  return new Response(JSON.stringify(users.results), { status: 200 })
}