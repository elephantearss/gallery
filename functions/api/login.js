export async function onRequestPost({ request, env }) {
  const { username, password } = await request.json()

  // Simple auth - in real app, hash passwords
  const user = await env.DB.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
    .bind(username, password)
    .first()

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
  }

  if (user.suspended) {
    return new Response(JSON.stringify({ error: 'Account suspended' }), { status: 403 })
  }

  const { password: _, ...userWithoutPassword } = user
  return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 200 })
}