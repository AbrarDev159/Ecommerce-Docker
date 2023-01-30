<script setup>
  import { RouterLink } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import axios from 'axios'

  const products = ref([])
  onMounted(() => {
    axios.get('products')
      .then(response => {
        products.value = (response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-2 m-2">

    <div v-for="product in products" :key="product.id">
      <div class="col">
        <div class="card">
          <RouterLink :to="`${product.id}`">
            <img :src="url + product.thumbnail.url" class="img-fluid">
          </RouterLink>
          <div class="card-body border-top">
            <RouterLink :to="`${product.id}`" class="text-dark text-decoration-none">
              <h5 class="card-title">{{ product.name }}</h5>
            </RouterLink>
            <RouterLink :to="`${product.id}`" class="text-dark text-decoration-none">
              <h5 class="card-title">{{ product.price }}</h5>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>