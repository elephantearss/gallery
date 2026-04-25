import { getAuthUser } from '../utils/auth.js'

export async function onRequestPost({ request, env }) {
  const user = await getAuthUser(request, env)
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })

  const formData = await request.formData()
  const file = formData.get('photo')

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 })
  }

  // Check storage limit
  const storageUsed = await env.DB.prepare('SELECT SUM(size) as total FROM photos WHERE userId = ?')
    .bind(user.id)
    .first()

  if ((storageUsed?.total || 0) + file.size > user.storageLimit * 1024 * 1024) {
    return new Response(JSON.stringify({ error: 'Storage limit exceeded' }), { status: 413 })
  }

  // Upload to R2
  const key = `${user.id}/${Date.now()}-${file.name}`
  await env.R2.put(key, file.stream(), {
    httpMetadata: { contentType: file.type }
  })

  // Save to DB
  await env.DB.prepare('INSERT INTO photos (userId, name, url, size) VALUES (?, ?, ?, ?)')
    .bind(user.id, file.name, `https://${env.R2_DOMAIN}/${key}`, file.size)
    .run()

  return new Response(JSON.stringify({ message: 'Upload successful' }), { status: 200 })
}