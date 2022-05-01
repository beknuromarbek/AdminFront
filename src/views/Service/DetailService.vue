<template>
  <div>
    <h1>Here is service room</h1>

    <i
        style="font-size:24px"
        class="fa plus-place"
        @click="add_place"
    >&#xf067;</i>

    <table id="table">
      <tr>
        <th>Name</th>
        <th>Available</th>
        <th>Current Price</th>
        <th>Change Place</th>
        <th>Delete Place</th>
      </tr>
      <tr
          v-for="(place, id) of service_room"
          v-if="place"
      >
        <td>{{ place.name }}</td>
        <td
            :class="place.available ? 'free' : 'not'"
            @click="change_availability(id)"
        >
          {{ place.available ? 'Available' : 'Not available' }}
        </td>
        <td>
          {{ place.price }}
        </td>
        <td>
          <i
              class='fas'
              style='font-size:24px; cursor: pointer;'
              @click="change_place(id)"
          >&#xf303;</i>
        </td>
        <td>
          <i
              class='fas'
              style='font-size:22px; cursor: pointer'
              @click="delete_place(id)"
          >&#xf1f8;</i>
        </td>
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
    ...mapGetters(['GET_SERVICES']),
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

      if (!name || name === '') {
        alert('Empty name')
      } else {
        firebase.database().ref(this.$route.params.id)
            .child(place_id).child('name').set(name)
      }
    },
    delete_place(place_id) {
      console.log('deleting')
      firebase.database().ref(this.$route.params.id).child(place_id).remove()
    },
    add_place() {
      let name = prompt('Name your place')

      if (!name || name === '') {
        alert('Empty name')
      } else {
        let place = {
          name: name,
          available: true,
          price: 0
        }

        firebase.database().ref(this.$route.params.id).push(place)
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
  background-color: #f55e5e;
  color: #FFFFFF;
}

.free {
  cursor: pointer;
  background-color: #3fb781 !important;
  color: #FFFFFF;
}

.button-17 {
  border-radius: 0;
}

.plus-place {
  position: absolute;
  bottom: 40px;
  right: 40px;

  cursor: pointer;
}

</style>