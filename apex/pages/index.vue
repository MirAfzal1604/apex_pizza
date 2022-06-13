<template>
  <div>
    <div class="centerLoading" v-if="pending">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>

    <div v-for="group in products" :key="group.name">
      <h1>{{ group.name }}</h1>
      <div class="items">
        <NuxtLink :to="`/${group.name}/${item.id}`" v-for="item in group.items">
          <img :src="`http://a7gsoft.for.uz/riverside/backend/web/uploads/${group.name}/${item.id}.jpg`"
               :alt="`${group.name}`">
          <h1>{{ item.name }}</h1>
          <p>{{ item.description }}</p>
          <h3>{{ item.price }} so'm</h3>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {Product} from "~/models/Products";
import {ProductGroupModel} from "~/models/ProductGroupModel";
import {useProducts} from "#imports";

const products = useProducts();

const {pending, error} = useFetch('http://a7gsoft.for.uz/riverside/backend/web/api/get-products', {
  key: "server",
  method: "POST",
  body: {
    "token": "eyJr389hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  },
  transform: (res: any) => {
    let data: ProductGroupModel[] = [];

    for (let group in res) {
      const items = [];
      for (let key in res[group]) {
        const item = res[group][key];
        items[key] = new Product(item['id'], item['name'], item['description'], item['price']);
      }

      data.push({"name": group, items: items});
    }

    products.value = data;
    return data;
  }
})
</script>

<style scoped>
.items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.items > * {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  text-decoration: none;
}

.items img {
  width: 200px;
}

.items h1 {
  font-size: 18px;
}

.items p {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.items h3 {
  font-size: 16px;
}
</style>