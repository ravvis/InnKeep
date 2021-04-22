import Vue from "vue";
import {
  institutionsCollection,
  requestsCollection,
  resourcesCollection,
  servicesCollection
} from "@/firebase";
const initialState = () => ({
  institute: null,
  request: null,
  fetching_institute: false,
  fetching_requests: false,
  fetching_request: false,
  fetching_resources: false,
  requests: [],
  resources: [],
  services: []
});
const Institutions = {
  namespaced: true,
  state: initialState(),
  getters: {
    get_institute(state) {
      return state.institute;
    },
    get_request(state) {
      return state.request;
    },
    get_institute_id(state) {
      return state.institute.institution_id;
    },
    fetching_institute(state) {
      return state.fetching_institute;
    },
    fetching_request(state) {
      return state.fetching_request;
    },
    fetching_requests(state) {
      return state.fetching_requests;
    },
    get_requests(state) {
      return state.requests ? state.requests.slice().reverse() : [];
    },
    fetching_resources(state) {
      return state.fetching_resources;
    },
    get_resources(state) {
      console.log({
        state
      });
      return state.resources ? state.resources.slice().reverse() : [];
    },
    fetching_services(state) {
      return state.fetching_services;
    },
    get_services(state) {
      console.log({
        state
      });
      return state.services ? state.services.slice().reverse() : [];
    }
  },
  mutations: {
    RESET_STATE(state) {
      Object.assign(state, initialState());
    },
    SET_INSTITUTE(state, payload) {
      Vue.set(state, "institute", payload);
    },
    RESET_INSTITUTE(state) {
      Vue.set(state, "institute", null);
    },
    SET_REQUEST(state, payload) {
      Vue.set(state, "request", payload);
    },
    RESET_REQUEST(state) {
      Vue.set(state, "request", null);
    },
    SET_REQUESTS(state, payload) {
      Vue.set(state, "requests", payload);
    },
    RESET_REQUESTS(state) {
      Vue.set(state, "requests", null);
    },
    SET_RESOURCES(state, payload) {
      Vue.set(state, "resources", payload);
    },
    RESET_RESOURCES(state) {
      Vue.set(state, "resources", null);
    },
    SET_SERVICES(state, payload) {
      Vue.set(state, "services", payload);
    },
    RESET_SERVICES(state) {
      Vue.set(state, "services", null);
    },
    SET_FETCHING_INSTITUTE(state, payload) {
      Vue.set(state, "fetching_institute", payload);
    },
    SET_FETCHING_REQUEST(state, payload) {
      Vue.set(state, "fetching_request", payload);
    },
    SET_FETCHING_REQUESTS(state, payload) {
      Vue.set(state, "fetching_requests", payload);
    },
    SET_FETCHING_RESOURCES(state, payload) {
      Vue.set(state, "fetching_resources", payload);
    },
    SET_FETCHING_SERVICES(state, payload) {
      Vue.set(state, "fetching_services", payload);
    }
  },
  actions: {
    async fetch_institute({
      commit
    }, institution_id) {
      if (institution_id) {
        commit("SET_FETCHING_INSTITUTE", true);
        let institutions = await institutionsCollection
          .where("institution_id", "==", institution_id)
          .get();
        let docs = [];
        institutions.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          docs.push(doc.data());
        });
        // console.log("p", docs[0]);
        if (docs && docs.length) {
          commit("SET_INSTITUTE", docs[0]);
        } else {
          commit("RESET_INSTITUTE");
        }
        setTimeout(() => {
          commit("SET_FETCHING_INSTITUTE", false);
        }, 200);
      } else {
        commit("RESET_INSTITUTE");
      }
    },
    async fetch_request({
      commit
    }, request_id) {
      if (request_id) {
        commit("SET_FETCHING_REQUEST", true);
        let requests = await requestsCollection
          .where("request_id", "==", request_id)
          .get();
        let docs = [];
        requests.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          docs.push(doc.data());
        });
        // console.log("p", docs[0]);
        if (docs && docs.length) {
          commit("SET_REQUEST", docs[0]);
        } else {
          commit("RESET_REQUEST");
        }
        setTimeout(() => {
          commit("SET_FETCHING_REQUEST", false);
        }, 400);
      } else {
        commit("RESET_REQUEST");
      }
    },
    async fetch_requests_of_institute({
        commit,
        state
      },
      config = {
        loading: true
      }
    ) {
      if (state.institute.institution_id) {
        if (config.loading) commit("SET_FETCHING_REQUESTS", true);
        let requests = await requestsCollection
          .where("institution_id", "==", state.institute.institution_id)
          .get();
        let docs = [];
        requests.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          docs.push(doc.data());
        });
        // console.log("p", docs[0]);
        if (docs && docs.length) {
          commit("SET_REQUESTS", docs);
        } else {
          commit("RESET_REQUESTS");
        }
        setTimeout(() => {
          if (config.loading) commit("SET_FETCHING_REQUESTS", false);
        }, 200);
      }
    },
    async fetch_resources_of_institute({
        commit,
        state
      },
      config = {
        loading: true,
        institution_id: null
      }
    ) {
      if (config.institution_id || state.institute.institution_id) {
        if (config.loading) commit("SET_FETCHING_RESOURCES", true);
        let resources = await resourcesCollection
          .where(
            "institution_id",
            "==",
            config.institution_id ?
            config.institution_id :
            state.institute.institution_id
          )
          .get();
        let docs = [];
        resources.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          docs.push(doc.data());
        });
        // console.log("p", docs[0]);
        if (docs && docs.length) {
          commit("SET_RESOURCES", docs);
        } else {
          commit("RESET_RESOURCES");
        }
        setTimeout(() => {
          if (config.loading) commit("SET_FETCHING_RESOURCES", false);
        }, 200);
      }
    },
    async fetch_services_of_institute({
        commit,
        state
      },
      config = {
        loading: true,
        institution_id: null
      }
    ) {
      if (config.institution_id || state.institute.institution_id) {
        if (config.loading) commit("SET_FETCHING_SERVICES", true);
        let services = await servicesCollection
          .where(
            "institution_id",
            "==",
            config.institution_id ?
            config.institution_id :
            state.institute.institution_id
          )
          .get();
        let docs = [];
        services.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          docs.push(doc.data());
        });
        // console.log("p", docs[0]);
        if (docs && docs.length) {
          commit("SET_SERVICES", docs);
        } else {
          commit("RESET_SERVICES");
        }
        setTimeout(() => {
          if (config.loading) commit("SET_FETCHING_SERVICES", false);
        }, 200);
      }
    }
  }
};
export default Institutions;