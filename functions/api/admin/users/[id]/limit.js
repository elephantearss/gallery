import { getAuthUser } from '../../../../utils/auth.js'

export async function onRequestPost({ request, env, params }) {
  const admin = await getAuthUser(request, env)
  if (!admin || admin.role !== 'admin') return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const { limit } = await request.json()

  await env.DB.prepare('UPDATE users SET storageLimit = ? WHERE id = ?')
    .bind(limit, params.id)
    .run()

  return new Response(JSON.stringify({ message: 'Updated' }), { status: 200 })
}