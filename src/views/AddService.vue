<template>
<div>
  <div
      class="form"
      v-if="GET_SERVICES.length"
  >
    <h1>Add Service</h1>
    <span v-if="error">{{}}</span>
    <form class="login-form" @submit.prevent="save_service">
      <input
          type="text"
          name="type"
          :value="type_name"
          disabled
      >
      <input
          type="text"
          name="subtype"
          :value="subtype_name"
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
          type="number"
          placeholder="Price"
          name="price"
          v-model="form.price"
          required
      />
      <textarea
          placeholder="Additional Information"
          name="additional_information"
          v-model="form.additional_information"
      />
      <button type="submit">Save</button>
    </form>
  </div>
  <Spinner v-else/>
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
        branch_id: null,
        type_id: null,
        subtype_id: null,
        name: '',
        price: 0,
        additional_information: '',
      },
      error: null
    }
  },
  computed: {
    ...mapGetters([
        'GET_SERVICES'
    ]),
  },
  methods: {
    ...mapActions([
        'ADD_SERVICE'
    ]),
    save_service() {
      this.ADD_SERVICE(this.form)
          .then(r => {
            console.log(r)
            this.$router.back()
          })
          .catch(err => {
            this.error = err
          })
    },
    stay_or_push_to_home() {
      if (!this.GET_SERVICES.length) {
        this.$router.push({ name: "Home"})
      } else {
        this.form.branch_id = this.GET_SERVICES[0].branch_id
            this.form.subtype_id = this.type_with_subtype.subtype
        this.form.type_id = this.type_with_subtype.type

        this.type_name = this.type_of_service[this.form.type_id]
        this.subtype_name = this.subtype_of_service[this.form.type_id][this.form.subtype_id]
      }
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