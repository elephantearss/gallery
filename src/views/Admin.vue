<template>
  <div class="admin-container">
    <h1>⚙️ Admin Panel</h1>
    <h2>👥 User Management</h2>
    
    <div v-if="users.length === 0" class="no-users">\n      <p>No users found</p>\n    </div>\n    \n    <div v-else class="users-table\">\n      <div class="table-header\">\n        <div class=\"col-username\">Username</div>\n        <div class=\"col-email\">Email</div>\n        <div class=\"col-storage\">Storage Limit (MB)</div>\n        <div class=\"col-status\">Status</div>\n        <div class=\"col-actions\">Actions</div>\n      </div>\n      <div v-for=\"u in users\" :key=\"u.id\" class=\"table-row\">\n        <div class=\"col-username\">{{ u.username }}</div>\n        <div class=\"col-email\">{{ u.email }}</div>\n        <div class=\"col-storage\">\n          <input v-model.number=\"u.storageLimit\" @change=\"updateLimit(u.id, u.storageLimit)\" type=\"number\" class=\"storage-input\" />\n        </div>\n        <div class=\"col-status\">\n          <span :class=\"u.suspended ? 'status-suspended' : 'status-active'\">\n            {{ u.suspended ? 'Suspended' : 'Active' }}\n          </span>\n        </div>\n        <div class=\"col-actions\">\n          <button @click=\"toggleSuspend(u.id, !u.suspended)\" :class=\"u.suspended ? 'btn-unsuspend' : 'btn-suspend'\">\n            {{ u.suspended ? 'Unsuspend' : 'Suspend' }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>

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