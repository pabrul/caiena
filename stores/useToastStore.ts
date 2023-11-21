// stores/useToastStore.ts
import { defineStore } from "pinia";
import { Toast } from "~/interfaces/Toast";

export const useToastStore = defineStore("toast", {
  state: () => ({
    message: "",
    color: "default", // Pode ser 'success', 'error', etc.
    icon: "",
    isVisible: false,
  }),
  actions: {
    showMessage({ message, color = "default", icon = "" }: Toast) {
      this.message = message;
      this.color = color;
      this.icon = icon;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 4000);
    },
    hideMessage() {
      this.isVisible = false;
    },
  },
});
