<template>
  <div class="upload-container">
    <h1>📤 Upload Photo</h1>
    <div class="upload-box">
      <form @submit.prevent="uploadPhoto" class="upload-form">
        <label for="file-input" class="file-label">
          <div class="upload-icon">📁</div>
          <p>Click to select a photo or drag and drop</p>
          <p v-if="file" class="file-name">{{ file.name }}</p>
        </label>
        <input id="file-input" type="file" @change="onFileChange" accept="image/*" required class="file-input" />
        <button type="submit" :disabled="!file" class="upload-btn">Upload Photo</button>
      </form>
      <p v-if="message" :class="message.includes('successful') ? 'success' : 'error'">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '../utils/api.js'

export default {
  setup() {
    const file = ref(null)
    const message = ref('')

    const onFileChange = (event) => {
      file.value = event.target.files[0]
    }

    const uploadPhoto = async () => {
      if (!file.value) return

      const formData = new FormData()
      formData.append('photo', file.value)

      try {
        const response = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        message.value = 'Upload successful!'
        file.value = null
      } catch (error) {
        message.value = 'Upload failed: ' + error.response?.data?.error || error.message
      }
    }

    return { file, message, onFileChange, uploadPhoto }
  }
}
</script>