<template>
<div>
  <h1>PsClub</h1>
  <router-link to="/ps_club/daily">Ежедневно</router-link>
  <router-link to="/ps_club/packet">Пакет</router-link>
  <router-link to="/ps_club/private">Приватный</router-link>
  <router-view />
</div>
</template>

<script>
export default {
  name: "PsClub"
}
</script>

<style scoped>

</style>