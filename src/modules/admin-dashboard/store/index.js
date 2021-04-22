import Vue from "vue";
import { institutionsCollection } from "@/firebase";

const AdminDashboard = {
  namespaced: true,
  state: {
    institutions: [],
    fetching_institutions: false,
    fetching_institutions_error: "",
    active_institution_dashboard: null
  },
  getters: {
    get_institutions(state) {
      return state.institutions;
    },
    fetching_institutions(state) {
      return state.fetching_institutions;
    },
    fetching_institutions_error(state) {
      return state.fetching_institutions_error;
    },
    active_institution_dashboard(state) {
      return state.active_institution_dashboard;
    }
  },
  mutations: {
    SET_INSTITUTIONS(state, institutions) {
      Vue.set(state, "institutions", institutions);
    },
    SET_FETCHING_INSTITUTIONS(state, payload) {
      Vue.set(state, "fetching_institutions", payload);
    },
    SET_FETCHING_INSTITUTIONS_ERROR(state, payload) {
      Vue.set(state, "fetching_institutions_error", payload);
    },
    SET_ACTIVE_INSTITUTION_DASHBOARD(state, payload) {
      console.log({ payload });
      Vue.set(state, "active_institution_dashboard", payload);
    },
    RESET_ACTIVE_INSTITUTION_DASHBOARD(state) {
      Vue.set(state, "active_institution_dashboard", null);
    }
  },
  actions: {
    fetch_institutions({ commit, rootState }) {
      commit("SET_FETCHING_INSTITUTIONS", true);
      institutionsCollection
        .get()
        .then(collection => {
          commit(
            "SET_INSTITUTIONS",
            collection.docs
              .filter(doc => doc.data().user === rootState.user.email)
              .map(doc => doc.data())
          );
        })
        .catch(() => {
          commit(
            "SET_FETCHING_INSTITUTIONS_ERROR",
            "Oops! something went wrong."
          );
        })
        .then(() => {
          setTimeout(() => {
            commit("SET_FETCHING_INSTITUTIONS", false);
          }, 400);
        });
    }
  }
};
export default AdminDashboard;
