import Vue from 'vue';
import store from './store'
import App from './App.vue';
import router from './router';

import firebase from "firebase/compat/app";
import { firebaseConfig } from "@/firebase-config";

Vue.config.productionTip = false;

let app = ''

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
