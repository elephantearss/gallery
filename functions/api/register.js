export async function onRequestPost({ request, env }) {
  const { username, email, password } = await request.json()

  // Check if user exists
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ? OR email = ?')
    .bind(username, email)
    .first()

  if (existing) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 })
  }

  // Insert user
  await env.DB.prepare('INSERT INTO users (username, email, password, storageLimit) VALUES (?, ?, ?, ?)')
    .bind(username, email, password, 1024) // 1GB default
    .run()

  return new Response(JSON.stringify({ message: 'User registered' }), { status: 201 })
}