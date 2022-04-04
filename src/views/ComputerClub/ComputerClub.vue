<template>
<div>
  <h1>Компьютерный клуб</h1>
  <router-link to="/computer_club/general">Общий</router-link>
  <router-link to="/computer_club/vip">Вип</router-link>
  <router-link to="/computer_club/private">Приватный</router-link>
  <router-view />
</div>
</template>

<script>
export default {
  name: "ComputerClub"
}
</script>

<style scoped>

</style>