import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat/app'
import { db } from '@/main'

import manageServices from "@/store/manageServices";
import auth from '@/store/auth'

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
		manageServices
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
		PUSH_SERVICE(state, service) {
			state.services.push(service)
		},
		UPDATE_SERVICE(state, service) {
			for (let i = 0; i < state.services.length; i++) {
				let type_id = state.services[i].type_id
				let subtype_id = state.services[i].subtype_id
				if (service.type_id === type_id && service.subtype_id === subtype_id) {
					state.services[i] = service
					break
				}
			}
		},
		DELETE_SERVICE(state, service) {
			for (let i = 0; i < state.services.length; i++) {
				let type_id = state.services[i].type_id
				let subtype_id = state.services[i].subtype_id
				if (service.type_id === type_id && service.subtype_id === subtype_id) {
					state.services.splice(i, 1)
				}
			}
		},
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
	},
	getters: {
		GET_SERVICES(state) {
			return state.services
		}
	}

})