import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)
app.config.globalProperties.url = import.meta.env.VITE_API_IMAGE_URL

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router, axios)

app.mount('#app')

import 'bootstrap/js/dist/carousel';