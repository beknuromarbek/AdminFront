<template>
<div>
  <h1>Антикафе</h1>
  <router-link to="/anticafe/daily">Ежедневно</router-link>
  <router-link to="/anticafe/night">Ночь</router-link>
  <router-link to="/anticafe/hourly">Почасова</router-link>
  <router-view />
</div>
</template>

<script>
export default {
  name: "Anticafe"
}
</script>

<style scoped>

</style>