<template>
<div>
  <div v-if="have_access">
    <h1>Антикафе</h1>

    <div class="main-links">
      <router-link to="/anticafe/daily">Ежедневно</router-link>
      <router-link to="/anticafe/night">Ночь</router-link>
      <router-link to="/anticafe/hourly">Почасова</router-link>
    </div>

    <router-view />
  </div>

  <Spinner v-else />

</div>
</template>

<script>
import Spinner from '@/components/Spinner'
import {service_mixin} from "@/mixins/GetServiceOfUser";

export default {
  name: "Anticafe",
  components: { Spinner },
  mixins: [service_mixin],
  mounted() {
    this.is_admin_have_service_or_redirect(2)
  }
}
</script>

<style scoped>

</style>