import firebase from 'firebase/compat/app';
import { doc, setDoc } from 'firebase/firestore'

import {db} from "@/main";

export default {
	state: {},
	actions: {
		ADD_SERVICE({ commit }, service_form) {
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
		},
		async DELETE_SERVICE({ commit }, service_form) {
			const service_query = db.collection('SERVICES')
															.where('branch_id', '==', service_form.branch_id)
															.where('type_id', '==', service_form.type_id)
															.where('subtype_id', '==', service_form.subtype_id)
			const query_snap = await service_query.get()
			query_snap.forEach(function(doc) {
				doc.ref.delete()
			})

			commit('DELETE_SERVICE', service_form)

			console.log('Successfully deleted')
		},
		UPDATE_SERVICE({ commit, rootState, dispatch }, service_form) { console.log(service_form)
			return new Promise((resolve, reject) => {
				dispatch('GET_SERVICE_ID_FROM_DOCUMENT', service_form)
					.then(id => {
						return db.collection('SERVICES').doc(id).update({
							name: service_form.name,
							image: null,
							price: service_form.price,
							additional_information: service_form.additional_information
						})
					})
					.then(r => {
						commit('UPDATE_SERVICE', service_form)
						resolve(r)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		async GET_SERVICE_ID_FROM_DOCUMENT({commit}, service_form) {
			const ref = db.collection('SERVICES')
										.where('branch_id', '==', service_form.branch_id)
										.where('type_id', '==', service_form.type_id)
										.where('subtype_id', '==', service_form.subtype_id)

			let id;
			try {
				await ref.get().then((serviceList) => {
					serviceList.forEach(function(ser) {
						id = ser.id
					})
				})
			} catch (err) {
				console.error(err)
			}

			return id
		}
	},
	mutations: {

	}
}