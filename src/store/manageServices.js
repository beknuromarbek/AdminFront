import firebase from 'firebase/compat/app';
import { doc, setDoc } from 'firebase/firestore'

import {db} from "@/main";

export default {
	state: {},
	actions: {
		async ADD_SERVICE({ commit }, service_form) {
			return new Promise((resolve, reject) => {
				console.log(service_form)
				const id = db.collection('SERVICES').doc().id
				db.collection('SERVICES').doc(id).set({
					branch_id: service_form.branch_id,
					type_id: service_form.type_id,
					subtype_id: service_form.subtype_id,
					name: service_form.name,
					image: null,
					price: service_form.price,
					additional_information: service_form.additional_information
				})
					.then(function() {
						console.log('Success bolgannan kein')
						commit('PUSH_SERVICE', service_form)
						resolve('Success')
					})
					.catch(err => {
						reject(err)
					})
			})
		}
	},
	mutations: {

	}
}