<template>
<div class="login-layout">
  <router-view/>
</div>
</template>

<script>
export default {
  name: "EmptyLayout"
}
</script>

<style scoped>

.login-layout {
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #877aff;
}

</style>