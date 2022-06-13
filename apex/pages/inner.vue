<template>
  <div class="alert alert-danger" role="alert" v-if="error">
    <div>{{ error }}</div>
  </div>

  <button @click="--pageId; refresh()" class="btn btn-danger">-</button>
  <button @click="++pageId; refresh()" class="btn btn-primary">+</button>

  <div class="centerLoading" v-if="isLoading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <table class="table table-striped" v-if="!isLoading">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">userID</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="page != null">
      <th scope="row">{{ page.id }}</th>
      <td>{{ page.userId }}</td>
      <td>{{ page.title }}</td>
      <td>{{ page.description }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import { Placeholder } from '@/models/Placeholder';
import {ref} from "#imports";

const pageId = ref(1)
const {
  data: page,
  pending: isLoading,
  refresh,
  error
} = useFetch(() => `https://jsonplaceholder.typicode.com/posts/${pageId.value}/`, {
  transform: (item: any) => {
    return new Placeholder(item["id"], item["userId"], item["title"], item["body"])
  }
})
</script>

<style scoped>
</style>