<script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  import { storeToRefs } from 'pinia';
  import { useAuthStore } from "@/stores/auth"

  const { isAuthenticated } = storeToRefs(useAuthStore())
  const authStore = useAuthStore();

  const id = ref()
  const name = ref()
  const price = ref()
  const description = ref()
  const stripe_link = ref()
  const pictures = ref([])
  const reviews = ref([])
  const route = useRoute();
  onMounted(() => {
    const product_detail = route.params.product_detail
    axios.get(`products/${product_detail}`)
      .then(response => {
        id.value = response.data.id
        name.value = response.data.name
        price.value = response.data.price
        description.value = response.data.description
        stripe_link.value = response.data.stripe_link
        pictures.value = response.data.pictures
        reviews.value = response.data.reviews
        console.log(response.data)
        document.name = 'Ecommerce | ' + name.value
      })
      .catch(error => {
        console.log(error)
      })
  })

  const review = ref('')
  function addReview() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
    axios.post(`products/${id.value}/review`, {
      data: {
        review: review.value
      }
    })
      .then(response => {
        review.value = ''
        location.reload();
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
</script>

<template>
  <div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col" style="max-width: 600px;">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="false">
          <div class="carousel-indicators" style="bottom: -40px">
            <button v-for="(picture, index) in pictures" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index" :class="[' ', { 'active': index === 0 }]" aria-current="true" :aria-label="'Slide ' + index">
              <img :src="url + picture.url" class="d-block w-100" alt="...">
            </button>
          </div>
          <div class="carousel-inner">
            <div v-for="(picture, index) in pictures" :class="['carousel-item', { 'active': index === 0 }]">
              <img :src="url + picture.url" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col d-none d-md-block">
        <h1>{{ name }}</h1>
        <div class="fs-4 fw-semibold">${{ price }}</div>
        <a :href="stripe_link" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg mt-2" type="button">Buy Now</a>
      </div>
      <div class="col mt-5 d-block d-md-none">
        <h1 class="mt-2">{{ name }}</h1>
        <div class="fs-4 fw-semibold">${{ price }}</div>
        <a :href="stripe_link" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg mt-2" type="button">Buy Now</a>
      </div>
    </div>
    <div style="margin-top: 10%;">
      <h3>Description</h3>
      <p v-html="description"></p>
      <div>
        <div v-for="picture in pictures">
          <img :src="url + picture.url" class="w-100 mb-3" alt="...">
        </div>
      </div>
    </div>
    <h3>Reviews</h3>
    <form v-if="isAuthenticated" v-on:submit.prevent="addReview">
      <div class="input-group mb-3">
        <input v-model="review" class="form-control" type="text" placeholder="Add Review">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
    <div v-for="review in reviews">
      <div class="card mb-2">
        <div class="card-body">
          <div>by {{ review.author.username }}</div>
          <div>{{ review.review }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
