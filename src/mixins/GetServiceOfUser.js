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
			// this.check_permission_by_type_id(type_id)

			// if (!this.have_access) {
			// 	await this.$router.push({ name: 'ServiceInformation'})
			// }
		},
		check_permission_by_type_id(type_id) {
			for (let service of this.GET_SERVICES) {
				if (service.type_id === type_id) {
					this.have_access = true
					break;
				}
			}
		},
	},
}