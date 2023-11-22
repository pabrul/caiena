import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Avatar from "./Avatar.vue";

describe("Avatar", () => {
  it("renders correctly with props", () => {
    const avatarUrl = "test-url.jpg";
    const altText = "Test Avatar";

    const wrapper = mount(Avatar, {
      props: {
        avatarUrl,
        altText,
      },
    });

    const image = wrapper.find("img");
    expect(image.attributes("src")).toBe(avatarUrl);
    expect(image.attributes("alt")).toBe(altText);
  });
});
