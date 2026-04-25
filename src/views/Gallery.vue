<template>
  <div class="gallery-container">
    <div class="gallery-header">
      <h1>📸 My Photos</h1>
      <p class="subtitle" v-if="isLoggedIn">You have {{ photos.length }} photos</p>
      <p class="subtitle" v-else>Login to upload and view your photos</p>
    </div>
    
    <div v-if="!isLoggedIn" class="login-prompt">
      <p>Please <router-link to="/login">login</router-link> or <router-link to="/register">register</router-link> to view your photos</p>
    </div>
    
    <div v-else>
      <div v-if="photos.length === 0" class="no-photos">
        <p>No photos yet! <router-link to="/upload">Upload your first photo</router-link></p>
      </div>
      
      <div v-else class="gallery">
        <div v-for="photo in photos" :key="photo.id" class="photo-card">
          <img :src="photo.url" :alt="photo.name" class="photo-img" />
          <div class="photo-info">
            <p class="photo-name">{{ photo.name }}</p>
            <button @click="deletePhoto(photo.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="donation-section">
      <h2>💝 Support Us</h2>
      <p>Enjoy free storage up to 1GB. Help us improve by donating!</p>
      <button class="donate-btn">Donate</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { ref, computed, onMounted } from 'vue'
import api from '../utils/api.js'

export default {
  setup() {
    const photos = ref([])
    const user = computed(() => JSON.parse(localStorage.getItem('user') || 'null'))
    const isLoggedIn = computed(() => !!user.value)

    const fetchPhotos = async () => {
      if (!isLoggedIn.value) {
        photos.value = []
        return
      }
      try {
        const response = await api.get('/user')
        photos.value = response.data?.photos || []
      } catch (error) {
        console.error('Error fetching photos:', error)
        photos.value = []
      }
    }

    const deletePhoto = async (id) => {
      if (!confirm('Delete this photo?')) return
      try {
        await api.delete(`/photos/${id}`)
        await fetchPhotos()
      } catch (error) {
        alert('Delete failed: ' + error.response?.data?.error || error.message)
      }
    }

    onMounted(fetchPhotos)

    return { photos, isLoggedIn, deletePhoto }
  }
}
</script>

<style scoped>
.gallery-container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-header {
  text-align: center;
  margin-bottom: 40px;
}

.gallery-header h1 {
  font-size: 3em;
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.subtitle {
  color: #666;
  font-size: 1.1em;
  margin: 0;
}

.login-prompt {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
  font-size: 1.1em;
}

.login-prompt a {
  color: #fff;
  text-decoration: underline;
  font-weight: bold;
}

.no-photos {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1.1em;
}

.no-photos a {
  color: #667eea;
  font-weight: bold;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.photo-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.photo-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.photo-info {
  padding: 15px;
}

.photo-name {
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.3s;
  width: 100%;
}

.delete-btn:hover {
  background: #c0392b;
}

.donation-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 50px;
  border-radius: 10px;
  text-align: center;
}

.donation-section h2 {
  font-size: 2em;
  margin: 0 0 15px 0;
}

.donate-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 15px;
}

.donate-btn:hover {
  transform: scale(1.05);
}
</style>