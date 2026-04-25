<template>
  <div id="app">
    <nav>
      <router-link to="/">Gallery</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link> |
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link> |
      <router-link v-if="isLoggedIn" to="/profile">Profile</router-link> |
      <router-link v-if="isAdmin" to="/admin">Admin</router-link> |
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
    const isLoggedIn = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    const logout = () => {
      localStorage.removeItem('user')
      location.reload()
    }

    return { isLoggedIn, isAdmin, logout }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b883;
}
</style>