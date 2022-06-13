<template>
  <div>
    <Head>
      <Title>{{ item.name }}</Title>
    </Head>

    <div class="centerLoading" v-if="isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="alert alert-danger" role="alert" v-if="hasError">
      ERROR
    </div>

    <div class="items" v-if="item != null">
      <img :src="`http://a7gsoft.for.uz/riverside/backend/web/uploads/${group}/${id}.jpg`"
           :alt="`${group}`">
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
      <h3>{{ item.price }} so'm</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, useProducts} from "#imports";
import {Product} from "~/models/Products";
import {ProductGroupModel} from "~/models/ProductGroupModel";
import {Ref} from "@vue/reactivity";
import {useMeta} from "#head";

const hasError = ref(false)
const isLoading = ref(false)

const route = useRoute()
const group = route.params.group
const id = route.params.id

const products = useProducts();

const item: Ref<Product> | null = ref(null);

if (products.value.length > 0) {
  findItem();
} else {
  isLoading.value = true
  useFetch('http://a7gsoft.for.uz/riverside/backend/web/api/get-products', {
    key: "server2",
    method: "POST",
    body: {
      "token": "eyJr389hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    },
    transform: (res: any) => {
      isLoading.value = false
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
      findItem();

      return data;
    }
  })
}

function findItem() {
  try {
    const groupIndex = products.value.findIndex(p => p.name == group)
    const itemIndex = products.value[groupIndex].items.findIndex(i => i.id == id)
    item.value = products.value[groupIndex].items[itemIndex];
  } catch (e) {
    hasError.value = true;
  }

  useHead({
    title: 'My App',
  })
}
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
  width: 500px;
}

.items h1 {
  font-size: 18px;
}

.items h3 {
  font-size: 16px;
}
</style>