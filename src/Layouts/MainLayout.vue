<template>
  <div class="wrapper">
    <Header/>
    <div class="main-container">
      <router-view :key="$route.fullPath"/>
    </div>
  </div>

</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: "MainLayout",
  components: {
    Header
  },
}
</script>

