<template>
<div class="main-container">
  <Header/>
  <router-view/>
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