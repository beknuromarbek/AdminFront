<template>
  <div>
    <h1>Here is service room</h1>
    <table id="table">
      <tr>
        <th>Name</th>
        <th>Available</th>
        <th>Current Price</th>
        <th>Change Place</th>
      </tr>
      <tr
          v-for="(place, id) of service_room"
      >
        <th>{{ place.name }}</th>
        <th
            :class="place.available ? 'free' : 'not'"
            @click="change_availability(id)"
        >
          {{ place.available ? 'Available' : 'Not available' }}
        </th>
        <th>
          {{ place.price }}
        </th>
        <th>
          <i
              class='fas'
              style='font-size:24px; cursor: pointer;'
              @click="change_place(id)"
          >&#xf303;</i>
        </th>
      </tr>
    </table>

  </div>
</template>

<script>
import firebase from 'firebase/compat'
import { mapGetters } from 'vuex'

export default {
  name: "DetailService",
  computed: {
    ...mapGetters(['GET_SERVICES'])
  },
  data() {
    return {
      service_room: null,
    }
  },
  methods: {
    async get_service_with_id() {
      const ref = await firebase.database().ref(this.$route.params.id)
      ref.on('value', snap => {
        this.service_room = snap.val()
      }, err => {
        console.log('Not have this object')
      })
    },
    change_availability(place_id) {
      let price = null

      if (this.service_room[place_id].available) {
        price = prompt('Price for this one')
        if (price === '' || price === '0') {
          price = 0
        }
      } else {
        price = 0
      }

      this.service_room[place_id].available = !this.service_room[place_id].available

      firebase.database().ref(this.$route.params.id).child(place_id).set({
        name: this.service_room[place_id].name,
        available: this.service_room[place_id].available,
        price
      })
      console.log('changed ', place_id)
    },
    change_place(place_id) {
      let name = prompt('Name your place')

      if (name || name === '') {
        alert('Empty name')
      } else {
        firebase.database().ref(this.$route.params.id)
            .child(place_id).child('name').set(name)
      }
    }
  },
  mounted() {
    this.get_service_with_id()
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