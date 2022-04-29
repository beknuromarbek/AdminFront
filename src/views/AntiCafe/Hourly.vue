<template>
  <div>
    <div v-if="have_service">
      <p>{{ service.name }}</p>
      <p>Price: <span><strong>{{ service.price }}</strong></span></p>

      <p v-if="service.addInformation">{{ service.addInformation }}</p>

    </div>
    <p v-else>You doesn't have subtype!
      <br> If you want add click ->
      <router-link :to="{ name: 'AddService', params: { type_with_subtype: { type: 2, subtype: 0 }}}">Me
      </router-link>
    </p>
  </div>
</template>

<script>
import {subtype_mixin} from "@/mixins/SubtypeLogic";

export default {
  name: "Hourly",
  mixins: [subtype_mixin],
  mounted() {
    this.have_this_service_or_not(2, 0)
    console.log(this.$route.path)
  }
}
</script>
