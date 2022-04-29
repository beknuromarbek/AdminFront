<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ $route.params.id }}</h1>
    <button @click="create_room">Create room</button>
    <button @click="read_room">Show room</button>
    <button @click="update_room">Update room</button>
    <button @click="create_service_rooms">Create ServiceRooms</button>
    <ul>
      <li
          v-for="(value, key) of rooms"
          :key="key"
      >
        {{ value[0] }}
        <button @click="update_room(key)">Click to change</button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/compat'

export default {
  data() {
    return {
      places: [],
      rooms: null
    }
  },
  methods: {
    realtime_snap() {
      firebase.database().ref('SERVICE1').on('value', snap => {
        console.log(snap.val())
      })
    },
    create_room() {
      console.log('creating room')
      let room = ['room name', []]

      for (let i = 0; i < 14; i++) {
        let place = {
          place_code: i,
          available: true,
        }
        room[1].push(place)
      }

      this.is_path_exist('1-0-0').then(r => {
        if (r) {
          console.log('im here')
          firebase.database().ref('1-0-0').push().set(room);
        } else {
          console.log('slkddksj')
          let service_rooms = []
          service_rooms.push(room)
          firebase.database().ref('1-0-0').set(service_rooms);
        }
      })
    },
    create_service_rooms() {
      let service_rooms = []

      let room = ['room name', []]

      for (let i = 0; i < 14; i++) {
        let place = {
          code: i,
          available: true,
        }
        room[1].push(place)
      }

      service_rooms.push(room)

      firebase.database().ref('1-0-0').set(service_rooms);
    },
    read_room() {
      firebase.database().ref('1-0-0').on('value', snap => {
        console.log(snap.val())
        this.rooms = snap.val()
      })
    },
    update_room(id) {
      console.log(id)
      this.rooms[id][0] = 'something'
      firebase.database().ref('1-0-0').child(id).update(this.rooms[id])
    },
    is_path_exist(path) {
      return new Promise(res => {
        firebase.database().ref(path).on('value', snap => {
          res(snap.exists())
        })
      })
    }
  },
  mounted() {
  }
}
</script>
