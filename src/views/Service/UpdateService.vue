<template>
  <div>
    <div
        v-if="GET_USER"
        class="form"
    >
      <h1>Edit Service</h1>
<!--      <span v-if="error">{{}}</span>-->
      <form class="login-form" @submit.prevent="save_service">
        <input
            type="text"
            name="type"
            v-model="type_name"
            disabled
        >
        <input
            name="subtype"
            v-model="subtype_name"
            disabled
        >
        <input
            type="text"
            placeholder="Name"
            name="name"
            v-model="service_form.name"
            required
        />
        <input
            type="number"
            placeholder="Price"
            name="price"
            v-model="service_form.price"
            required
        />
        <textarea
            placeholder="Additional Information"
            name="additional_information"
            v-model="service_form.addInformation"
        />
        <button type="submit">Save</button>
      </form>
    </div>
    <Spinner v-else />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import Spinner from '@/components/Spinner'

export default {
  name: "UpdateService",
  props: ['service_form'],
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
        'GET_USER'
    ])
  },
  methods: {
    ...mapActions([
        'UPDATE_SERVICE'
    ]),
    async save_service() {
      await this.UPDATE_SERVICE(this.service_form)
      await this.$router.push({name: 'Home'})
    },
    async stay_or_push_to_home() {

      if (!this.service_form) {
        await this.$router.push({name: 'Home'})
        return
      }

      this.filling_form_type_and_subtype()

      console.log('are you her ')
    },
    filling_form_type_and_subtype() {
      this.type_name = this.type_of_service[this.service_form.typeId]
      this.subtype_name = this.subtype_of_service[this.service_form.typeId][this.service_form.subTypeId]
    }
  },
  mounted() {
    this.stay_or_push_to_home()
  }
}
</script>

<style scoped>

</style>