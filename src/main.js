require("dotenv").config();
import Vue from "vue";
import App from "./app.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// firebase
import "@/firebase";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "@/plugins/vuetify";
import vueToast from "@/plugins/vue-toast";

import "material-design-icons-iconfont/dist/material-design-icons.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

// AUTH
import __auth__ from "@/modules/auth/auth";
Vue.prototype.$auth = __auth__;

import { auth } from "@/firebase";

let app;
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      vueToast,
      render: h => h(App)
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserInfo", user);
  }
});
