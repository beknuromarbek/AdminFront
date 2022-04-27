<template>
  <div class="login-page">

    <div class="form">
      <form class="login-form" @submit.prevent="submit">
        <span v-if="error">{{ error }}</span>
        <input
            type="email"
            placeholder="email"
            name="email"
            v-model="form.email"
            required
        />
        <input
            type="password"
            placeholder="password"
            name="password"
            v-model="form.password"
            required
        />
        <button>login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebase from "firebase/compat";

import Spinner from '@/components/Spinner'

export default {
  name: "Login",
  components: { Spinner },
  computed: {
    ...mapGetters([
        'GET_USER'
    ])
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
    }
  },
  methods: {
    ...mapActions([
        'LOGIN',
    ]),
    async submit() {
      try {
        console.log('login in')
        await this.LOGIN(this.form)
        if (firebase.auth().currentUser != undefined) {
          await this.$router.push({name: 'Home'})
        }
      } catch(err) {
        this.error = err
      }
    },
  },
}
</script>

<style scoped>

</style>