import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import router from "./router/routes";
import store from "./store";


// import * as firebase from 'firebase';
import firebase from "firebase/app";

// Css
// import VueMaterial from 'materialize-css/dist/css/materialize.min.css'
import "./assets/css/animate.css";

// Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAuDeERQt2QIkhHkucAmJNn2kyPKzcDyjM",
      authDomain: "px-market.firebaseapp.com",
      databaseURL: "https://px-market.firebaseio.com",
      projectId: "px-market",
      storageBucket: "px-market.appspot.com",
      messagingSenderId: "14635923237",
      appId: "1:14635923237:web:7f8326ec1e4fe919"

      // apiKey: "AIzaSyDt73dIOqUeWdpEle-KKfGaA8XS-JY437g",
      // authDomain: "px-market2.firebaseapp.com",
      // databaseURL: "https://px-market2.firebaseio.com",
      // projectId: "px-market2",
      // storageBucket: "px-market2.appspot.com",
      // messagingSenderId: "430435494105",
      // appId: "1:430435494105:web:ba19a9ba727a84ea"
    });

    let getUserLocalStorage = JSON.parse(
      localStorage.getItem("px-market-user")
    );
    let user = {};
    if (getUserLocalStorage) {
      user = {
        email: getUserLocalStorage.email,
        id: getUserLocalStorage.id
      };
    }
    /* eslint-disable no-console */

    // console.log(user);
    /* eslint-disable no-console */
    this.$store.dispatch("autoLoginUser", user);
  }
}).$mount("#app");
