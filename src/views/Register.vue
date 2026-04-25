<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>📝 Register</h1>
      <form @submit.prevent="register" class="auth-form">
        <input v-model="username" placeholder="Username" required class="input" />
        <input v-model="email" type="email" placeholder="Email" required class="input" />
        <input v-model="password" type="password" placeholder="Password" required class="input" />
        <button type="submit" class="btn">Register</button>
      </form>
      <p v-if="message" :class="message.includes('successful') ? 'success' : 'error'">{{ message }}</p>
      <p class="link">Already have an account? <router-link to="/login">Login</router-link></p>
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
    const email = ref('')
    const password = ref('')
    const message = ref('')
    const router = useRouter()

    const register = async () => {
      try {
        await api.post('/register', { username: username.value, email: email.value, password: password.value })
        message.value = 'Registration successful! Please login.'
        setTimeout(() => router.push('/login'), 2000)
      } catch (error) {
        message.value = 'Registration failed: ' + (error.response?.data?.error || error.message)
      }
    }

    return { username, email, password, message, register }
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

.success {
  color: #27ae60;
  background: #d5f4e6;
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