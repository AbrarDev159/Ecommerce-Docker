<script setup>
  import { useRouter, RouterLink } from 'vue-router'
  import { ref } from 'vue'
  import axios from 'axios'

  const router = useRouter()
  const username = ref('')
  const email = ref('')
  const password = ref('')
  function SignUp() {
    if (username.value && email.value && password.value) {
      axios.post('auth/local/register', {
        username: username.value,
        email: email.value,
        password: password.value
      })
        .then(response => {
          const token = response.data.jwt
          console.log('User profile', response.data.user);
          console.log('User token', token);
          router.push('/login')
        })
        .catch(error => {
          console.log(error.response.data.error.message)
          alert(error.response.data.error.message)
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

              <form @submit.prevent="SignUp" class="mb-3 mt-md-4">
                <h2 class="fw-bold mb-2 text-uppercase ">Sign Up</h2>
                <p class="mb-4">Please enter a username, email, and password!</p>
                <div class="mb-3">
                  <label for="username" class="form-label ">Username</label>
                  <input v-model="username" type="username" class="form-control" id="username" placeholder="name" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label ">Email address</label>
                  <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label ">Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="*******" required>
                </div>
                <div class="d-grid">
                  <button class="btn btn-outline-dark" type="submit">Sign Up</button>
                </div>
              </form>

              <div>
                <p class="mb-0  text-center">Don't have an account?
                  <RouterLink to="/login" class="text-primary fw-bold">Login</RouterLink>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>