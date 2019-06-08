import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyANWq8r2J9H_DVgyvbgyOhot7XLXjQ_pzs",
  authDomain: "my-vue-database-b6bed.firebaseapp.com",
  databaseURL: "https://my-vue-database-b6bed.firebaseio.com",
  projectId: "my-vue-database-b6bed",
  storageBucket: "my-vue-database-b6bed.appspot.com",
  messagingSenderId: "1082642108122",
  appId: "1:1082642108122:web:b707a6319b48892c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
