import {mapGetters} from 'vuex'

export const subtype_mixin = {
	data() {
		return {
			have_service: null,
			service: null
		}
	},
	computed: {
		...mapGetters([
			'GET_SERVICES'
		]),
	},
	methods: {
		have_this_service_or_not(type_id, subtype_id) {
			const get_service_from_store = this.GET_SERVICES.filter(el => el.subTypeId === subtype_id && el.typeId === type_id)
			if (get_service_from_store.length) {
				this.have_service = true
				this.service = get_service_from_store[0]
			} else {
				this.have_service = false
			}
		}
	}
}