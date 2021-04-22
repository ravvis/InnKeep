import Home from "@/modules/user/components/home";
import {
  createLocalVue,
  shallowMount
} from "@vue/test-utils";
import {
  MOCK_STORE
} from "../mock_store";
import Vuetify from "vuetify";
import Vue from "vue";
// import { mocksdk } from "../mock_forebase";

jest.mock("@/firebase", () => {
  // return mocksdk;
});
Vue.use(Vuetify);

describe("Request Registeration form", () => {
  let wrapper, store;
  let mockState = {};
  let vuetify;
  const localVue = createLocalVue();
  const $route = {
    params: {
      id: "23"
    }
  };
  const requestsCollection = {
    add: jest.fn().mockImplementation(() => {
      return new Promise.resolve();
    })
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  let createWrapper = () => {
    wrapper = shallowMount(Home, {
      store,
      vuetify,
      localVue,
      mocks: {
        $route,
        requestsCollection
      }
    });
  };
  store = MOCK_STORE(mockState);
  // const findNameLabel = () => wrapper.find("[data-testid=\"name-label\"]");
  // const findNameInput = () => wrapper.find("[data-testid=\"name-input\"]");

  test("sets data property", function () {
    createWrapper();
    wrapper.vm.$data.name = "Ravindra";
    const dummyData = {
      name: "Ravindra",
      email: "test@test.com",
      type: "test",
      desc: "test desc",
      institution_id: "2",
      request_id: "23",
      isOpen: true,
      resource: 4,
      service: 5
    }
    wrapper.setData(dummyData);
    // const addRequestsCollection = jest
    //   .spyOn(requestsCollection, "add")
    //   .mockImplementation(() => {
    //     return new Promise.resolve();
    //   });
    // wrapper.vm.submit();
    // expect(addRequestsCollection).toHaveBeenCalled();
    // expect(wrapper.vm.submit).toBe("hello");
    console.log({
      data: wrapper.vm.$data
    });
    for (const key in dummyData) {
      if (Object.hasOwnProperty.call(dummyData, key)) {
        const element = dummyData[key];
        expect(wrapper.vm.$data[key]).toBe(element);
      }
    }
  });
});