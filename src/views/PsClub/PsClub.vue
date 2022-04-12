<template>
  <div>
    <div v-if="have_access">
      <h1>PsClub</h1>

      <div class="main-links">
        <router-link to="/ps_club/daily">Ежедневно</router-link>
        <router-link to="/ps_club/packet">Пакет</router-link>
        <router-link to="/ps_club/private">Приватный</router-link>
      </div>

      <router-view />
    </div>

    <Spinner v-else />
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import { service_mixin } from '@/mixins/GetServiceOfUser'

export default {
  name: "PsClub",
  mixins: [service_mixin],
  components: { Spinner },
  mounted() {
    this.is_admin_have_service_or_redirect(1)
  }
}
</script>

<style scoped>

</style>