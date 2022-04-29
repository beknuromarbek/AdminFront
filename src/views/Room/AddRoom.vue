<template>
  <div>
    <div
        class="form"
    >
      <h1>Add Room</h1>
      <form class="login-form" @submit.prevent="save_room">

        <input
            type="text"
            placeholder="Name"
            name="name"
            v-model="name"
            required
        />
        <input
            type="number"
            placeholder="Number of Places"
            name="number"
            v-model="numberOfPlaces"
            required
        />

        <button type="submit">Save</button>

      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat";

export default {
  name: "AddRoom",
  props: {
    infos: Object,
  },
  data() {
    return {
      numberOfPlaces: 0,
      name: '',
    }
  },
  methods: {
    save_room() {
      const room = this.create_room_with_places()

      const path = `${this.infos.branch_id}-${this.infos.type_id}-${this.infos.subtype_id}`

      this.is_path_exist(path).then(r => {
        if (r) {
          firebase.database().ref(path).push().set(room);
        } else {
          let service_rooms = []
          service_rooms.push(room)
          firebase.database().ref(path).set(service_rooms);
        }

        this.$router.push({name: 'ComputerClub'})
      })

    },
    is_path_exist(path) {
      return new Promise(res => {
        firebase.database().ref(path).on('value', snap => {
          res(snap.exists())
        })
      })
    },
    create_room_with_places() {
      let room = [this.name, []]

      for (let i = 0; i < this.numberOfPlaces; i++) {
        let place = {
          place_code: i,
          available: true,
        }
        room[1].push(place)
      }

      return room
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>