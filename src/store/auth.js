import firebase from 'firebase/compat/app';

import {db} from "@/main";

export default {
	state: {
		userInfo: null
	},
	actions: {
		async LOGIN({ dispatch }, form) {
			return new Promise((resolve, reject) => {
				firebase.auth()
					.signInWithEmailAndPassword(form.email, form.password)
					.then(e => {
						resolve('Login successfully')
					})
					.catch(err => {
						reject(err)
					})
				}
			)

		},
		GET_FIRESTORE_INFORMATION_OF_AUTH_USER({ commit, state }, user) {
			return new Promise((resolve, reject) => {
				db.collection("users")
					.onSnapshot((querySnapshot) => {
						querySnapshot.forEach((doc) => {
							if (doc.id !== user.uid) {
								reject('Id doesnt match')
							}
							commit('SET_USER', doc.data())
							resolve('User fetched from firestore successfully');
						})
					})
			})
		}
	},
	mutations: {
		SET_USER(state, info) {
			state.userInfo = info
		},
	},
	getters: {
		GET_USER(state) {
			return state.userInfo
		}
	}
}
