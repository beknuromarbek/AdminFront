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
            v-for="service of services_with_no_duplicates"
        >
          <td>{{ service.name }}</td>
          <td>{{ service.price }}</td>
          <td v-if="service.addInformation">{{ service.addInformation | truncate(30) }}</td>
          <td v-else>Nothing in</td>
          <td>{{ get_type_name(service) }}</td>
          <td>{{ get_subtype_name(service) }}</td>
          <td>
            <i
                class='fas'
                style='font-size:24px; cursor: pointer'
                @click="edit_service(service)"
            >&#xf303;</i>
          <td>
            <i
                class='fas'
                style='font-size:22px; cursor: pointer'
                @click="delete_service(service)"
            >&#xf1f8;</i>
          </td>
        </tr>
      </table>

    </div>
    <Spinner v-else />
  </div>
</template>

<script>
import firebase from 'firebase/compat';
import {mapActions, mapGetters} from 'vuex'

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
    services_with_no_duplicates() {
      return [...new Set(this.GET_SERVICES)]
    }
  },
  filters: {
    truncate: function(data, num) {
      return data.split("").slice(0, num).join("")
    }
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
    } catch (err) {
      console.error(err)
    }
  },
}
</script>

<style scoped>

</style>