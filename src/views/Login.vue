<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
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
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.user.id) // Simple token
        router.push('/')
      } catch (error) {
        message.value = 'Login failed: ' + error.response?.data?.error || error.message
      }
    }

    return { username, password, message, login }
  }
}
</script>