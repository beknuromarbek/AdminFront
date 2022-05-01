<template>
<div style="text-align: center;">
  <h2>Services</h2>

  <ul>
    <li
        v-for="service of services_filtered_by_type_and_subtype"
        :key="service.id"
    >

      <router-link
          tag="a"
          :to="{name: 'DetailService', params: {id: service.id}}"
      >
        {{ service.name }}
      </router-link>

    </li>
  </ul>

  <router-link
      tag="button"
      class="button-17 bottom-button"
      :to="{name: 'AddService', params: {type_with_subtype: {type: 0, subtype: 0}}}"
  >
    Add Service</router-link>

</div>
</template>

<script>
import {subtype_mixin} from "@/mixins/SubtypeLogic";

import { mapGetters } from 'vuex'
import firebase from 'firebase/compat'

export default {
  name: "GeneralCompClub",
  mixins: [subtype_mixin],
  data() {
    return {
      rooms: null
    }
  },
  computed: {
    ...mapGetters([
        'GET_SERVICES',
        'GET_USER'
    ])
  },
  mounted() {
    this.have_this_service_or_not(0, 0)
  }
}
</script>
