<script setup>
  import Profile from '@/components/ProfileIcon.vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from "@/stores/auth"
  import { storeToRefs } from 'pinia';
  const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<template>
  <!-- Medium and Bigger Screen Navbar -->
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Ecommerce</RouterLink>
      <div class="navbar-nav">
        <RouterLink v-if="!isAuthenticated" class="nav-link" to="/login">Login</RouterLink>
        <RouterLink v-if="!isAuthenticated" class="nav-link" to="/signup">Register</RouterLink>
        <RouterLink v-if="isAuthenticated" class="nav-link" to="/profile">
          <Profile />
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>