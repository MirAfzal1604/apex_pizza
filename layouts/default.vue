<template>
    <div>
      <div class="header">
        <div class="container">
          <NuxtLink :to="{name: 'index'}">
            <img src="@/assets/img/logo.jpg">
          </NuxtLink>
        </div>
      </div>

      <div class="container">
        <slot/>
      </div>

      <div class="footer">
        <div class="container">
          <img src="@/assets/img/logo.jpg">
        </div>
      </div>
    </div>
</template>

<script>
</script>

<style scoped>

</style>