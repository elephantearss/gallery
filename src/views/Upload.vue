<template>
  <div>
    <h1>Upload Photo</h1>
    <form @submit.prevent="uploadPhoto">
      <input type="file" @change="onFileChange" accept="image/*" required />
      <button type="submit" :disabled="!file">Upload</button>
    </form>
    <p v-if="message">{{ message }}</p>
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