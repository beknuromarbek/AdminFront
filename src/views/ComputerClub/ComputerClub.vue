<template>
<div class="block-content">
  <div v-if="have_access">
    <h1>Компьютерный клуб</h1>

    <div class="main-links">
      <router-link to="/computer_club/general">Общий</router-link>
      <router-link to="/computer_club/vip">Вип</router-link>
      <router-link to="/computer_club/private">Приватный</router-link>
    </div>

    <router-view />
  </div>
  <Spinner v-else />
</div>
</template>

<script>
import Spinner from '@/components/Spinner'
import { service_mixin } from "@/mixins/GetServiceOfUser";

export default {
  name: "ComputerClub",
  mixins: [service_mixin],
  components: { Spinner },
  mounted() {
    this.is_admin_have_service_or_redirect(0)
  }
}
</script>
