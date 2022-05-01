import firebase from 'firebase/compat/app';
import { doc, setDoc } from 'firebase/firestore'

import {db} from "@/main";

export default {
	state: {},
	actions: {
		async ADD_SERVICE({ commit, dispatch }, {service_form, numberOfPlaces}) {
			const room = await dispatch('CREATE_PLACES_OF_SERVICE', numberOfPlaces)

			return new Promise((resolve, reject) => {
				const id = db.collection('SERVICES').doc().id

				db.collection('SERVICES').doc(id).set({
					branchId: service_form.branchId,
					typeId: service_form.typeId,
					subTypeId: service_form.subTypeId,
					name: service_form.name,
					image: service_form.image,
					price: service_form.price,
					addInformation: service_form.addInformation
				})
					.then(function() {
						firebase.database().ref(id).set(room)
						service_form['id'] = id
						console.log(service_form)
						commit('PUSH_SERVICE', service_form)
						resolve('Success')
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		CREATE_PLACES_OF_SERVICE({commit}, numberOfPlaces) {
			let room = []
			console.log(numberOfPlaces)

			for (let i = 0; i < numberOfPlaces; i++) {
				let place = {
					name: i.toString(),
					available: true,
					price: 0
				}
				room.push(place)
			}
			console.log(room)

			return room
		},
		async DELETE_SERVICE({ commit }, service_form) {
			console.log('sukkka')
			try {
				await db.collection('SERVICES').doc(service_form.id).delete()
				await firebase.database().ref(service_form.id).remove()

				commit('DELETE_SERVICE', service_form)
				console.log('Successfully deleted')
			} catch (err) {
				console.error(err)
			}
		},
		UPDATE_SERVICE({ commit, rootState, dispatch }, service_form) {
			return new Promise((resolve, reject) => {
				db.collection('SERVICES').doc(service_form.id).update({
					name: service_form.name,
					image: service_form.image,
					price: service_form.price,
					addInformation: service_form.addInformation,
				})
					.then(res => {
						commit('UPDATE_SERVICE', service_form)
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
		async GET_SERVICE_ID_FROM_DOCUMENT({commit}, service_form) {
			const ref = db.collection('SERVICES')
										.where('branchId', '==', service_form.branchId)
										.where('typeId', '==', service_form.typeId)
										.where('subTypeId', '==', service_form.subTypeId)

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