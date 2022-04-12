<template>
  <div class="home">

    <h1 v-if="GET_USER"
    >You welcome to admin part {{ GET_USER.first_name }}</h1>

    <Spinner v-else />
  </div>
</template>

<script>
import firebase from 'firebase/compat';
import { db } from '@/main.js'
import { mapActions, mapGetters } from 'vuex'

import Spinner from '@/components/Spinner'

export default {
  name: 'Home',
  components: {
    Spinner
  },
  data() {
    return {
      cities: []
    }
  },
  computed: {
    ...mapGetters([
        'GET_USER',
    ])
  },
  methods: {
    ...mapActions([
        'GET_FIRESTORE_INFORMATION_OF_AUTH_USER',
        'GET_SERVICES_FROM_FIRESTORE'
    ])
  },
  async mounted() {
    try {
      const user = await firebase.auth().currentUser
      await this.GET_FIRESTORE_INFORMATION_OF_AUTH_USER(user)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
