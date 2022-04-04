<template>
  <div id="nav">
    <router-link to="/home" tag="a">Домой</router-link> |
    <router-link to="/anticafe" tag="a">Антикафе</router-link> |
    <router-link to="/computer_club" tag="a">Компьютерный клуб</router-link> |
    <router-link to="/ps_club" tag="a">Ps клуб</router-link>
    <button
        class="button-17"
        role="button"
    >Выйти</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat'

export default {
  name: "Header",
  methods: {
    logout() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace('Login')
          })
    }
  }
}
</script>
