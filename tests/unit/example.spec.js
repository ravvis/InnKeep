import { shallowMount } from "@vue/test-utils";
import Message from "@/components/Message.vue";

describe("Message.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Hello";
    const wrapper = shallowMount(Message, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
