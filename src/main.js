import Vue from 'vue';
import App from './App.vue';
import router from './router';

import firebase from "firebase/compat/app";

Vue.config.productionTip = false;

let app = ''

const firebaseConfig = {
  apiKey: "AIzaSyD7Jw3KvXK0Oha7-v6w_R0jLXaQEtUN0Go",
  authDomain: "diploma-c971d.firebaseapp.com",
  databaseURL: "https://diploma-c971d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "diploma-c971d",
  storageBucket: "diploma-c971d.appspot.com",
  messagingSenderId: "479957697670",
  appId: "1:479957697670:web:816997ba6a732c011cfd07",
  measurementId: "G-GLDRY34EP1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
