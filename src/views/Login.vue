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
import firebase from 'firebase/compat';
import { mapActions, mapGetters } from 'vuex'

import Spinner from '@/components/Spinner'
import { db } from '@/main.js';

export default {
  name: "Login",
  components: { Spinner },
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
        await this.LOGIN(this.form)
        await this.$router.replace('home')
      } catch(err) {
        console.error(err)
      }
    },
  },
}
</script>

<style scoped>

</style>