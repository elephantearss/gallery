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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f8f9fa;
  min-height: 100vh;
}

nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

nav a, nav button {
  font-weight: 600;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s;
  border: 2px solid transparent;
  background: none;
  cursor: pointer;
  font-size: 1em;
}

nav a:hover {
  background: rgba(255,255,255,0.2);
  border-color: white;
}

nav a.router-link-exact-active {
  background: white;
  color: #667eea;
  border-color: white;
}

nav button {
  background: rgba(255,255,255,0.2);
  border: 2px solid white;
  padding: 8px 15px;
  font-size: 0.95em;
}

nav button:hover {
  background: rgba(255,255,255,0.3);
}
</style>