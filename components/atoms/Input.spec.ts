import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

const IconStub = {
  template: "<span></span>",
};

describe("Input", () => {
  it("emits an update:modelValue event when input is typed into", async () => {
    const wrapper = mount(Input, {
      global: {
        stubs: {
          Icon: IconStub, // Mock do componente Icon
        },
      },
    });
    const input = wrapper.find("input");
    await input.setValue("new value");
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });

  it("renders the placeholder correctly", () => {
    const placeholder = "Enter text...";
    const wrapper = mount(Input, {
      global: {
        stubs: {
          Icon: IconStub, // Mock do componente Icon
        },
      },
      props: { placeholder },
    });
    expect(wrapper.find("input").attributes("placeholder")).toBe(placeholder);
  });
});
