<template>
<div>
  <div
      class="form"
  >
    <h1>Add Service</h1>
    <span v-if="error">{{}}</span>
    <form class="login-form" @submit.prevent="save_service">
      <input
          type="text"
          name="type"
          v-model="type_name"
          disabled
      >
      <input
          type="text"
          name="subtype"
          v-model="subtype_name"
          disabled
      >
      <input
          type="text"
          placeholder="Name"
          name="name"
          v-model="form.name"
          required
      />
      <input
          type="text"
          placeholder="Link to image"
          name="ImageLink"
          v-model="form.image"
      >
      <input
          type="number"
          placeholder="Price"
          name="price"
          v-model="form.price"
          required
      />
      <input
          type="number"
          placeholder="Number of Places"
          name="number"
          v-model="numberOfPlaces"
          required
      />
      <textarea
          placeholder="Additional Information"
          name="additional_information"
          v-model="form.addInformation"
      />
      <button type="submit">Save</button>
    </form>
  </div>
<!--  <Spinner v-else/>-->
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import Spinner from '@/components/Spinner'

export default {
  name: "AddService",
  components: { Spinner },
  props: ['type_with_subtype'],
  data() {
    return {
      type_of_service: ['Computer Club', 'Ps Club', 'Anticafe'],
      subtype_of_service: [['General', 'Private', 'Vip'], ['Hourly', 'Packet', 'PacketWithCalyan'], ['Hourly', 'Daily', 'Night']],
      type_name: null,
      subtype_name: null,
      form: {
        branchId: null,
        typeId: null,
        subTypeId: null,
        name: '',
        image: '',
        price: null,
        addInformation: '',
      },
      error: null,
      numberOfPlaces: null
    }
  },
  computed: {
    ...mapGetters([
        'GET_SERVICES',
        'GET_USER',
    ]),
  },
  methods: {
    ...mapActions([
        'GET_FIRESTORE_INFORMATION_OF_AUTH_USER',
        'GET_SERVICES_FROM_FIRESTORE',
        'ADD_SERVICE'
    ]),
    save_service() {
      this.ADD_SERVICE({service_form: this.form, numberOfPlaces: this.numberOfPlaces})
          .then(res => {
            this.$router.back()
          })
          .catch(err => {
            this.error = err
          })
    },
    async stay_or_push_to_home() {

      if (!this.type_with_subtype) {
        await this.$router.push({name: 'Home'})
        return
      }

      this.filling_form_type_and_subtype()

      console.log('are you her ')
    },
    filling_form_type_and_subtype() {
      this.form.branchId = this.GET_USER.branchId
      this.form.subTypeId = this.type_with_subtype.subtype
      this.form.typeId = this.type_with_subtype.type

      this.type_name = this.type_of_service[this.form.typeId]
      this.subtype_name = this.subtype_of_service[this.form.typeId][this.form.subTypeId]

    }
  },
  mounted() {
    this.stay_or_push_to_home()
  }
}
</script>

<style scoped>
.form {
  margin-top: 50px;
  padding-top: 20px;
}
</style>