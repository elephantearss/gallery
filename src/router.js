import { createRouter, createWebHistory } from 'vue-router'
import Gallery from './views/Gallery.vue'
import Upload from './views/Upload.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import Admin from './views/Admin.vue'

const routes = [
  { path: '/', component: Gallery },
  { path: '/upload', component: Upload },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
  { path: '/admin', component: Admin }
]

export default createRouter({
  history: createWebHistory(),
  routes
})