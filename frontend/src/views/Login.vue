<script setup>
  import { useRouter, RouterLink } from 'vue-router'
  import { ref } from 'vue'
  import axios from 'axios'
  import { useAuthStore } from "@/stores/auth"

  const authStore = useAuthStore();
  const { setToken } = authStore

  const router = useRouter()
  const identifier = ref('')
  const password = ref('')
  function Login() {
    if (identifier.value && password.value) {
      axios.post('auth/local/', {
        identifier: identifier.value,
        password: password.value
      })
        .then(response => {
          const token = response.data.jwt
          setToken(token)
          console.log('User profile', response.data.user);
          console.log('User token', token);
          router.push('/profile')
        })
        .catch(error => {
          console.log(error.response.data.error.message)
          alert("Invaild email or password")
        })
    }
  }
</script>

<template>
  <div class="d-flex justify-content-center align-items-center mt-5">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card bg-white">

            <div class="card-body p-5">

              <form @submit.prevent="Login" class="mb-3 mt-md-4">
                <h2 class="fw-bold mb-2 text-uppercase ">Login</h2>
                <p class=" mb-4">Please enter your email and password!</p>
                <div class="mb-3">
                  <label for="email" class="form-label ">Email address</label>
                  <input v-model="identifier" type="email" class="form-control" id="email" placeholder="name@example.com" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label ">Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="*******" required>
                </div>
                <div class="d-grid">
                  <button class="btn btn-outline-dark" type="submit">Login</button>
                </div>
              </form>

              <div>
                <p class="mb-0  text-center">Don't have an account?
                  <RouterLink to="/signup" class="text-primary fw-bold">Sign Up</RouterLink>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>