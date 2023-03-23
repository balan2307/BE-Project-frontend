import './init'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from '@/store'


// import VueLoading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

export const eventBus=new Vue();

Vue.config.productionTip = false

Vue.use(Vuelidate)
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSG_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    // VueLoading.show();
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
  // VueLoading.hide();
});

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')
