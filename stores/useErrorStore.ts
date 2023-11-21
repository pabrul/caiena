// stores/useErrorStore.ts
import { defineStore } from "pinia";
import { ErrorDetails } from "~/interfaces/ErrorDetails";
import { useToastStore } from "./useToastStore"; // Importe sua store de Toast

export const useErrorStore = defineStore("error", {
  state: () => ({
    errors: [] as ErrorDetails[],
  }),
  actions: {
    reportError(error: any) {
      console.log("Reported Error:", error);

      this.errors.push({
        message: error.message || "Erro desconhecido",
        timestamp: new Date(),
      });
      this.handleErrorMessage(error);
    },
    clearErrors() {
      this.errors = [];
    },
    handleErrorMessage(error: any) {
      const toastStore = useToastStore();
      let message, color, icon;

      switch (error.response?.status) {
        case 429:
          message =
            "Limite de requisições excedido. Aguarde um momento e tente novamente.";
          color = "error";
          icon = "⏱️";
          break;
        case 500:
          message =
            "Erro interno do servidor. Por favor, tente novamente mais tarde.";
          color = "error";
          icon = "🔧";
          break;
        case 403:
          console.log("Handling 403 error"); // Log para depuração
          message =
            "Limite de requisições excedido. Aguarde um momento e tente novamente.";
          color = "error";
          icon = "⏱️";
          break;
        default:
          if (error.message === "Network Error") {
            message = "Erro de conexão. Por favor, tente novamente mais tarde.";
            icon = "🌐";
          } else {
            message = "Ocorreu um erro inesperado. Tente novamente.";
            icon = "❗";
          }
          color = "error";
      }

      toastStore.showMessage({
        message,
        color,
        icon,
      });
    },
  },
});
