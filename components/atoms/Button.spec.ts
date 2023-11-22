import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders the button text", () => {
    const text = "Test Button";
    const wrapper = mount(Button, {
      props: {
        text,
      },
    });

    expect(wrapper.text()).toContain(text);
  });

  it("applies the correct color class based on prop", () => {
    const wrapper = mount(Button, {
      props: {
        color: "green",
      },
    });

    expect(wrapper.classes()).toContain("bg-green-500");
  });

  // Adicione mais testes conforme necessário
});
