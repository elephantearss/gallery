<template>
  <div>
    <h1>Profile</h1>
    <p>Username: {{ user?.username }}</p>
    <p>Email: {{ user?.email }}</p>
    <p>Storage Used: {{ user?.storageUsed }} MB</p>
    <p>Storage Limit: {{ user?.storageLimit }} MB</p>
    <div v-if="user?.photos">
      <h2>Your Photos</h2>
      <div class="photos">
        <div v-for="photo in user.photos" :key="photo.id" class="photo">
          <img :src="photo.url" :alt="photo.name" />
          <button @click="deletePhoto(photo.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import api from '../utils/api.js'

export default {
  setup() {
    const user = computed(() => JSON.parse(localStorage.getItem('user') || 'null'))

    const deletePhoto = async (id) => {
      try {
        await api.delete(`/photos/${id}`)
        // Refresh user data
        const response = await api.get('/user')
        localStorage.setItem('user', JSON.stringify(response.data))
        location.reload()
      } catch (error) {
        alert('Delete failed: ' + error.response?.data?.error || error.message)
      }
    }

    return { user, deletePhoto }
  }
}
</script>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.photo img {
  width: 100%;
  height: auto;
}
</style>