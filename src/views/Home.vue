<template>
  <div class="home">
    <div v-if="GET_USER">

      <h1>You welcome to admin part {{ GET_USER.first_name }}</h1>

      <table id="table">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Information</th>
          <th>Type</th>
          <th>Subtype</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr
            v-for="service of GET_SERVICES"
        >
          <td>{{ service.name }}</td>
          <td>{{ service.price }}</td>
          <td v-if="service.addInformation">{{ service.addInformation }}</td>
          <td v-else>Nothing in</td>
          <td>{{ get_type_name(service) }}</td>
          <td>{{ get_subtype_name(service) }}</td>
          <td><button @click="edit_service(service)">Edit</button></td>
          <td><button @click="delete_service(service)">Delete</button></td>
        </tr>
      </table>

    </div>
    <Spinner v-else />
  </div>
</template>

<script>
import firebase from 'firebase/compat';
import { mapActions, mapGetters } from 'vuex'

import Spinner from '@/components/Spinner'

export default {
  name: 'Home',
  components: {
    Spinner
  },
  data() {
    return {
      type_of_service: ['Computer Club', 'Ps Club', 'Anticafe'],
      subtype_of_service: [['General', 'Private', 'Vip'], ['Hourly', 'Packet', 'PacketWithCalyan'], ['Hourly', 'Daily', 'Night']],
      type_name: null,
      subtype_name: null,
    }
  },
  computed: {
    ...mapGetters([
        'GET_USER',
        'GET_SERVICES'
    ]),
  },
  methods: {
    ...mapActions([
        'GET_FIRESTORE_INFORMATION_OF_AUTH_USER',
        'GET_SERVICES_FROM_FIRESTORE',
        'DELETE_SERVICE',
    ]),
    get_type_name(service) {
      return this.type_of_service[service.typeId]
    },
    get_subtype_name(service) {
      return this.subtype_of_service[service.typeId][service.subTypeId]
    },
    delete_service(service_form) {
      let choice = confirm('Are you wanna delete')
      if (choice) {
        this.DELETE_SERVICE(service_form)
      }
    },
    edit_service(service_form) {
      this.$router.push({ name: 'EditService', params: {'service_form': service_form}})
    },
  },
  async mounted() {
    try {
      const user = await firebase.auth().currentUser
      await this.GET_FIRESTORE_INFORMATION_OF_AUTH_USER(user)
      await this.GET_SERVICES_FROM_FIRESTORE()
      console.log(this.GET_SERVICES)
    } catch (err) {
      console.error(err)
    }
  },
}
</script>

<style>

#table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table td, #table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#table tr:nth-child(even){background-color: #f2f2f2;}

#table tr:hover {background-color: #ddd;}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #877aff;
  color: white;
}

</style>