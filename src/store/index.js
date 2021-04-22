import Vue from "vue";
import Vuex from "vuex";

import AuthStore from "../modules/auth/store";
import AdminDashboard from "../modules/admin-dashboard/store";
import Institutions from "../modules/institutions/store";
import { usersCollection, institutionTypesCollection } from "@/firebase";

import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    show_create_institution_form: false,
    institution_types: [],
    theme: {
      dark: true
    }
  },
  getters: {
    is_authenticated(state) {
      console.log({ user: state.user });
      return state.user && Object.keys(state.user).length;
    },
    user(state) {
      return state.user;
    },
    institution_types(state) {
      return state.institution_types.map(
        institution_type => institution_type.type
      );
    }
  },
  mutations: {
    SET_USER(state, user) {
      Vue.set(state, "user", user);
    },
    SET_SHOW_CREATE_INSTITUTION_FORM(state, payload) {
      Vue.set(state, "show_create_institution_form", payload);
    },
    SET_INSTITUTION_TYPES(state, payload) {
      Vue.set(state, "institution_types", payload);
    },
    SET_DARK_THEME(state, payload = true) {
      Vue.set(state.theme, "dark", payload);
    }
  },
  actions: {
    async fetchUserInfo({ commit }, user) {
      // fetch user profile
      const userProfile = await usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("SET_USER", userProfile.data());

      // change route to dashboard
      // console.log(router)
      if (
        router.currentRoute.name == "signin" ||
        router.currentRoute.name == "signup"
      ) {
        router.push({ name: "home" }).catch(() => {});
      }
    },
    open_create_institution_form({ commit }) {
      commit("SET_SHOW_CREATE_INSTITUTION_FORM", true);
    },
    close_create_institution_form({ commit }) {
      commit("SET_SHOW_CREATE_INSTITUTION_FORM", false);
    },
    fetch_institution_types({ commit }) {
      institutionTypesCollection.get().then(collection => {
        commit(
          "SET_INSTITUTION_TYPES",
          collection.docs.map(doc => doc.data())
        );
      });
    }
  },
  modules: {
    AuthStore,
    AdminDashboard,
    Institutions
  }
});
export default store;
