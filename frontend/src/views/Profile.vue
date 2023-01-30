<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from "@/stores/auth"
  import axios from 'axios'

  const authStore = useAuthStore();
  const { removeToken } = authStore

  const router = useRouter()
  const profile = ref('')
  onMounted(() => {
    axios.get('users/me', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
      .then(response => {
        profile.value = (response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  function Logout() {
    removeToken()
    router.push('login')
  }
</script>

<template>
  <div>
    <h1 class="text-center mt-3">Profile</h1>
    <p class="text-center">Username: {{ profile.username }}</p>
    <p class="text-center">Email: {{ profile.email }}</p>
    <div class="d-grid gap-2 col-1 mx-auto">
      <button class="btn btn-danger" @click="Logout()">Logout</button>
    </div>
  </div>
</template>