<template>
<div class="block-content">
  <div v-if="have_access">
    <h1>Антикафе</h1>

    <div class="main-links">
      <router-link to="/anticafe/daily">Ежедневно</router-link>
      <router-link to="/anticafe/night">Ночь</router-link>
      <router-link to="/anticafe/hourly">Почасова</router-link>
    </div>

    <div v-if="is_root">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dignissimos dolores ducimus eaque esse
      et fuga fugit illo laborum molestias mollitia neque odio odit porro quas quidem, quis quos vero?
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
  computed: {
    is_root() {
      return this.$route.path === '/anticafe'
    }
  },
  mounted() {
    this.is_admin_have_service_or_redirect()
    console.log(this.$route.path)
  }
}
</script>

<style scoped>

</style>