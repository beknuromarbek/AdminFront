<template>
  <div class="wrapper">
    <Header/>
    <div class="main-container">
      <router-view/>
    </div>
  </div>

</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: "MainLayout",
  components: {
    Header
  }
}
</script>

<style scoped>

</style>