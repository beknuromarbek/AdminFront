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
import firebase from 'firebase/compat'

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    submit() {
      firebase.auth().signInWithPhoneNumber()
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(user => {
          console.log(user)
          this.$router.replace('Home')
        })
        .catch(err => {
          this.error = err.message
        })
    }
  }
}
</script>

<style scoped>

</style>