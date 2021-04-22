import {
  MOCK_STORE
} from "../mock_store";
import Vuetify from "vuetify";
import Vue from "vue";

Vue.use(Vuetify);

describe("Request Registeration form", () => {
  const mockResources = [{
      resource_id: 1
    },
    {
      resource_id: 2
    }
  ];

  let store;
  const createStore = () => {
    store = MOCK_STORE({
      resources: mockResources
    });
  };
  createStore();

  afterEach(() => {
    store.commit("Institutions/RESET_STATE");
  });

  describe("get_resources", () => {
    test("should return correct get_resources", () => {
      store.commit("Institutions/SET_ORDER", mockResources);

      let resources = store.getters["Institutions/get_resources"];
      expect(resources.map(resource => resource.resource_id).sort()).toEqual(
        mockResources.map(resource => resource.resource_id).sort()
      );
    });

    test("should return empty array if resources is empty", () => {
      let resources = store.getters["Institutions/get_resources"];
      expect(resources.map(resource => resource.resource_id).sort()).toEqual(
        [].map(resource => resource.resource_id).sort()
      );
    });
  });
});