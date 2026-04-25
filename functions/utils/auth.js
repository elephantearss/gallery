export async function getAuthUser(request, env) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  const token = authHeader.slice(7)
  // Simple token - in real app, verify JWT
  const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?')
    .bind(token)
    .first()

  return user
}