import './init'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

export const eventBus=new Vue();

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCir46VWSyRYXgIKkAtHE05IukR9N4xjLg",
  authDomain: "railhelp-c4ed1.firebaseapp.com",
  projectId: "railhelp-c4ed1",
  storageBucket: "railhelp-c4ed1.appspot.com",
  messagingSenderId: "523838824682",
  appId: "1:523838824682:web:0f43f3728518abdd557793"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')
