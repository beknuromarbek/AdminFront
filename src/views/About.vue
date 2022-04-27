<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script>
import { db } from '@/main';
import firebase from 'firebase/compat'


export default {
  methods: {
    realtime_snap() {
      console.log(firebase.auth().currentUser.uid)
    }
  },
  mounted() {
    this.realtime_snap()
  }
}
</script>
