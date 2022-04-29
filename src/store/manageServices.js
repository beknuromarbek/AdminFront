import firebase from 'firebase/compat/app';
import { doc, setDoc } from 'firebase/firestore'

import {db} from "@/main";

export default {
	state: {},
	actions: {
		ADD_SERVICE({ commit, dispatch }, service_form, numberOfPlaces) {
			return new Promise((resolve, reject) => {
				console.log(service_form)
				const id = db.collection('SERVICES').doc().id
				db.collection('SERVICES').doc(id).set({
					branchId: service_form.branchId,
					typeId: service_form.typeId,
					subTypeId: service_form.subTypeId,
					name: service_form.name,
					image: null,
					price: service_form.price,
					addInformation: service_form.addInformation
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
		ADD_REALTIME_PLACES({commit}) {
			console.log('here')
		},
		async DELETE_SERVICE({ commit }, service_form) {
			const service_query = db.collection('SERVICES')
															.where('branchId', '==', service_form.branchId)
															.where('typeId', '==', service_form.typeId)
															.where('subTypeId', '==', service_form.subTypeId)
			const query_snap = await service_query.get()
			query_snap.forEach(function(doc) {
				doc.ref.delete()
			})

			commit('DELETE_SERVICE', service_form)

			console.log('Successfully deleted')
		},
		UPDATE_SERVICE({ commit, rootState, dispatch }, service_form) {
			console.log(service_form)
			return new Promise((resolve, reject) => {
				dispatch('GET_SERVICE_ID_FROM_DOCUMENT', service_form)
					.then(id => {
						return db.collection('SERVICES').doc(id).update({
							name: service_form.name,
							image: null,
							price: service_form.price,
							addInformation: service_form.addInformation
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