<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
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
        router.push('/login')
      } catch (error) {
        message.value = 'Registration failed: ' + error.response?.data?.error || error.message
      }
    }

    return { username, email, password, message, register }
  }
}
</script>