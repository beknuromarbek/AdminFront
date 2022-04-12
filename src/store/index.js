import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat/app'
import { db } from '@/main'

import auth from '@/store/auth.js'

Vue.use(Vuex)

const getDefaultState = () => {
	return {
		services: [],
		auth: {
			userInfo: null
		}
	}
}

export default new Vuex.Store({
	modules: {
		auth,
	},
	state: {
		services: []
	},
	actions: {
		async GET_SERVICES_FROM_FIRESTORE({ commit, rootState, state }) {
			return new Promise((resolve, reject) => {
				const user = rootState.auth.userInfo
				if (state.services.length === 0) {
					db.collection('SERVICES')
						.where('branch_id', '==', user.branch_id)
						.get()
						.then(r => {
							console.log(r.docs)
							commit('SET_SERVICES', r.docs)
							resolve('Services from firestore fetched successfully');
						})
						.catch(err => {
							reject(err)
						})
				} else {
					resolve('You already have one')
				}
			})
		},
		RESET_VUEX_DATA({ commit }) {
			commit('RESET_STATE')
		}
	},
	mutations: {
		SET_SERVICES(state, services) {
			for (let service of services) {
				state.services.push(service.data())
			}
		},
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		}
	},
	getters: {
		GET_SERVICES(state) {
			return state.services
		}
	}

})