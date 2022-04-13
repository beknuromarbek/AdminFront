import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/compat";

export const service_mixin = {
	data() {
		return {
			have_access: false
		}
	},
	computed: {
		...mapGetters([
			'GET_SERVICES',
		])
	},
	methods: {
		...mapActions([
			'GET_SERVICES_FROM_FIRESTORE',
			'GET_FIRESTORE_INFORMATION_OF_AUTH_USER',
		]),
		async is_admin_have_service_or_redirect() {

			if (this.GET_SERVICES.length === 0) {
				try {
					const user = firebase.auth().currentUser
					await this.GET_FIRESTORE_INFORMATION_OF_AUTH_USER(user)
					await this.GET_SERVICES_FROM_FIRESTORE()
				} catch (err) {
					console.error(err)
				}
			}

			this.have_access = true

		},
	},
}