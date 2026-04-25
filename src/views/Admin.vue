<template>
  <div>
    <h1>Admin Panel</h1>
    <h2>Users</h2>
    <div v-for="u in users" :key="u.id" class="user">
      <p>{{ u.username }} - {{ u.email }} - Status: {{ u.suspended ? 'Suspended' : 'Active' }}</p>
      <button @click="toggleSuspend(u.id, !u.suspended)">{{ u.suspended ? 'Unsuspend' : 'Suspend' }}</button>
      <input v-model="u.storageLimit" @change="updateLimit(u.id, u.storageLimit)" type="number" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../utils/api.js'

export default {
  setup() {
    const users = ref([])

    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users')
        users.value = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    const toggleSuspend = async (id, suspend) => {
      try {
        await api.post(`/admin/users/${id}/suspend`, { suspended: suspend })
        fetchUsers()
      } catch (error) {
        alert('Action failed: ' + error.response?.data?.error || error.message)
      }
    }

    const updateLimit = async (id, limit) => {
      try {
        await api.post(`/admin/users/${id}/limit`, { limit })
        fetchUsers()
      } catch (error) {
        alert('Update failed: ' + error.response?.data?.error || error.message)
      }
    }

    onMounted(fetchUsers)

    return { users, toggleSuspend, updateLimit }
  }
}
</script>

<style scoped>
.user {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
</style>