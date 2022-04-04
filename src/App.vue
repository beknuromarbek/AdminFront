<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import MainLayout from "@/Layouts/MainLayout";
import EmptyLayout from "@/Layouts/EmptyLayout";

export default {
  name: 'App',
  components: {
    MainLayout,
    EmptyLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + 'Layout'
    }
  }
}

</script>

<style>
@import './assets/style/main.css';
</style>
