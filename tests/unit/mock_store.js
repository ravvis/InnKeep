import Vue from "vue";
import Vuex from "vuex";
import Institutions from "@/modules/institutions/store";

Vue.use(Vuex);

export const MOCK_STORE = (
  mockState = {},
  mockGetters = {},
  mockMutations = {},
  mockActions = {}
) => {
  return new Vuex.Store({
    modules: {
      Institutions: Object.assign(Institutions, {
        state: Object.assign(Institutions.state, mockState),
        getters: Object.assign(Institutions.getters, mockGetters),
        mutations: Object.assign(Institutions.mutations, mockMutations),
        actions: Object.assign(Institutions.actions, mockActions)
      })
    }
  });
};
