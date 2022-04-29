<template>
<div style="text-align: center;">
  <h2>Services</h2>


  <router-link
      tag="button"
      v-if="have_service"
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
  name: "General",
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
    firebase.database().ref(`${this.GET_USER.branchId}-0-0`).on('value', snap => {
      console.log(snap.val())
      this.rooms = snap.val()
    })
  }
}
</script>
