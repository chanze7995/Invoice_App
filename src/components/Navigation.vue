<template>
  <header class="navContainer">
    <router-link class="brandingImg" :to="{ name: 'Home' }">
      <img src="@/assets/images/invoice-dollar.png" alt="">
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/_navigation.scss";
</style>
