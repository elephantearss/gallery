<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>🔐 Login</h1>
      <form @submit.prevent="login" class="auth-form">
        <input v-model="username" placeholder="Username" required class="input" />
        <input v-model="password" type="password" placeholder="Password" required class="input" />
        <button type="submit" class="btn">Login</button>
      </form>
      <p v-if="message" class="error">{{ message }}</p>
      <p class="link">Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api.js'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const message = ref('')
    const router = useRouter()

    const login = async () => {
      try {
        const response = await api.post('/login', { username: username.value, password: password.value })
        const user = response.data?.user
        if (!user || !user.id) {
          message.value = 'Login failed: Invalid response from server'
          return
        }
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', user.id)
        router.push('/')
      } catch (error) {
        const errorMsg = error.response?.data?.error || error.message || 'Login failed'
        message.value = 'Login failed: ' + errorMsg
        console.error('Login error:', error)
      }
    }

    return { username, password, message, login }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 10px;
}

.btn:hover {
  transform: scale(1.02);
}

.error {
  color: #e74c3c;
  background: #fadbd8;
  padding: 12px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.link a {
  color: #667eea;
  font-weight: bold;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 10px;
}

.btn:hover {
  transform: scale(1.02);
}

.error {
  color: #e74c3c;
  background: #fadbd8;
  padding: 12px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.link a {
  color: #667eea;
  font-weight: bold;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>