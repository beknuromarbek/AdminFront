<template>
<div>
  <h1>Room</h1>
  <table id="table">
    <tr>
      <th>Name</th>
      <th>Available</th>
      <th>Action</th>
    </tr>
    <tr
        v-for="place of room[1]"
    >
      <th>{{ place.place_code }}</th>
      <th
          :class="place.available ? 'free' : 'not'"
          @click="change_availability(place)"
      >
          {{ place.available ? 'Available' : 'Not available' }}
      </th>
      <th>
        <button @click="edit_place(place)">Edit</button>
      </th>
    </tr>
  </table>
</div>
</template>

<script>
import firebase from 'firebase/compat'

export default {
  name: "DetailRoom",
  props: {
    room: Array,
  },
  methods: {
    edit_place(place) {
      console.log(place)
    },
    change_availability(place) {
      console.log(this.room)
      console.log(place)
    }
  }
}
</script>

<style scoped>

.not {
  cursor: pointer;
  background-color: #EF3B3A!important;
}

.free {
  cursor: pointer;
  background-color: #42b983!important;
}

.button-17 {
  border-radius: 0;
}

</style>