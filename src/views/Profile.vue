<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1>👤 Profile</h1>
      <div v-if="user" class="user-info">
        <div class="info-row">
          <label>Username:</label>
          <span>{{ user?.username }}</span>
        </div>
        <div class="info-row">
          <label>Email:</label>
          <span>{{ user?.email }}</span>
        </div>
        <div class="info-row">
          <label>Storage Used:</label>
          <span>{{ user?.storageUsed || 0 }} MB / {{ user?.storageLimit }} MB</span>
        </div>
        <div class="storage-bar">
          <div class="storage-used" :style="{ width: storagePercent + '%' }"></div>
        </div>
      </div>
    </div>

    <div v-if="user?.photos && user.photos.length > 0">
      <h2>📸 Your Photos</h2>
      <div class="photos-grid">
        <div v-for="photo in user.photos" :key="photo.id" class="photo-card">
          <img :src="photo.url" :alt="photo.name" class="photo-img" />
          <div class="photo-info">
            <p class="photo-name">{{ photo.name }}</p>
            <button @click="deletePhoto(photo.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-photos">
      <p>No photos yet! <router-link to="/upload">Upload your first photo</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '../utils/api.js'

export default {
  setup() {
    const user = ref(null)

    const storagePercent = computed(() => {
      if (!user.value) return 0
      return Math.round((user.value.storageUsed / user.value.storageLimit) * 100)
    })

    const fetchUser = async () => {
      try {
        const response = await api.get('/user')
        user.value = response.data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    const deletePhoto = async (id) => {
      if (!confirm('Delete this photo?')) return
      try {
        await api.delete(`/photos/${id}`)
        await fetchUser()
      } catch (error) {
        alert('Delete failed: ' + (error.response?.data?.error || error.message))
      }
    }

    onMounted(fetchUser)

    return { user, storagePercent, deletePhoto }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.profile-card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  color: #2c3e50;
  margin: 40px 0 20px 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-row label {
  font-weight: bold;
  color: #2c3e50;
}

.info-row span {
  color: #666;
}

.storage-bar {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 15px;
}

.storage-used {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.photo-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.photo-card:hover {
  transform: translateY(-5px);
}

.photo-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.photo-info {
  padding: 12px;
}

.photo-name {
  margin: 0 0 10px 0;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2c3e50;
}

.delete-btn {
  width: 100%;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-photos {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 10px;
  color: #666;
}

.no-photos a {
  color: #667eea;
  font-weight: bold;
}
</style>