<template>
  <div id="nav">
    <div class="nav-links">
      <router-link to="/home" tag="a">Домой</router-link> |
      <router-link to="/anticafe" tag="a">Антикафе</router-link> |
      <router-link to="/computer_club" tag="a">Компьютерный клуб</router-link> |
      <router-link to="/ps_club" tag="a">Ps клуб</router-link>
    </div>
    <button
        class="button-17"
        role="button"
        @click="logout"
    >Выйти</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat'
import { mapActions } from 'vuex'

export default {
  name: "Header",
  methods: {
    ...mapActions(
        ['RESET_VUEX_DATA']
    ),
    logout() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.RESET_VUEX_DATA()
            this.$router.push({name: 'Login'})
          })
    }
  }
}
</script>
