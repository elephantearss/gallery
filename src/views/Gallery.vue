<template>
  <div>
    <h1>Photo Gallery</h1>
    <div class="gallery">
      <div v-for="photo in photos" :key="photo.id" class="photo">
        <img :src="photo.url" :alt="photo.name" />
        <p>{{ photo.name }}</p>
      </div>
    </div>
    <div class="donation">
      <h2>Support Us</h2>
      <p>Enjoy free storage up to 1GB. Donate to help us grow!</p>
      <button>Donate</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../utils/api.js'

export default {
  setup() {
    const photos = ref([])

    const fetchPhotos = async () => {
      try {
        const response = await api.get('/photos')
        photos.value = response.data
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    }

    onMounted(fetchPhotos)

    return { photos }
  }
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.photo img {
  width: 100%;
  height: auto;
}

.donation {
  margin: 40px 0;
  padding: 20px;
  background: #f0f0f0;
}
</style>