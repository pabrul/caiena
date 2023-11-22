// stores/useGitHubStore.ts
import { defineStore } from "pinia";
import { GitHubService } from "~/services/GitHubService";
import { GitHubUser, GitHubSearchResult } from "~/interfaces/GitHubUser";
import { useToastStore } from "~/stores/useToastStore";
import { useErrorStore } from "~/stores/useErrorStore";

export const useGitHubStore = defineStore("github", {
  state: () => ({
    users: [] as GitHubUser[],
    totalCount: 0,
    error: null as Error | null,
    currentPage: 1,
    perPage: 20,
    lastQuery: "",
    lastError: null as unknown | null,
    searchPerformed: false,
  }),
  actions: {
    async searchUsers(
      query: string,
      page: number,
      perPage: number = 20
    ): Promise<GitHubUser[]> {
      const toastStore = useToastStore();
      const errorStore = useErrorStore();

      try {
        const result: GitHubSearchResult = await GitHubService.searchUsers(
          query,
          page,
          perPage
        );

        this.searchPerformed = !!query.trim() && result.total_count > 0;

        if (!query.trim()) {
          toastStore.showMessage({
            message: "Por favor, insira uma pesquisa válida.",
            color: "warning",
            icon: "⚠️",
          });
          return [];
        }

        if (result.total_count === 0) {
          toastStore.showMessage({
            message: "Usuário não encontrado",
            color: "default",
            icon: "🤷‍♂️",
          });
          return [];
        }

        let newUsers = result.items;
        if (page === 1) {
          this.users = newUsers;
          this.lastQuery = query;
        } else {
          const existingUserIds = new Set(this.users.map((user) => user.id));
          const filteredNewUsers = newUsers.filter(
            (user) => !existingUserIds.has(user.id)
          );
          this.users = [...this.users, ...filteredNewUsers];
        }

        this.totalCount = result.total_count;
        this.currentPage = page;

        return newUsers;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ocorreu um erro desconhecido.";
        toastStore.showMessage({
          message: `Erro ao buscar usuários: ${errorMessage}`,
          color: "error",
          icon: "⚠️",
        });

        errorStore.reportError(error);
        this.lastError = error;

        return [];
      } finally {
        // Aqui você pode adicionar qualquer lógica que precisa ser executada após a conclusão da tentativa/catch
      }
    },

    async loadMoreUsers() {
      const toastStore = useToastStore();

      if (this.lastQuery) {
        const nextPage = this.currentPage + 1;

        // Verificar se já carregamos todos os usuários
        if (this.users.length >= this.totalCount) {
          toastStore.showMessage({
            message: "Todos os usuários já foram carregados.",
            color: "info",
            icon: "✅",
          });
          return;
        }

        try {
          const newUsers = await this.searchUsers(
            this.lastQuery,
            nextPage,
            this.perPage
          );

          if (newUsers.length > 0) {
            const existingUserIds = new Set(this.users.map((user) => user.id));
            const filteredNewUsers = newUsers.filter(
              (user) => !existingUserIds.has(user.id)
            );

            this.users = [...this.users, ...filteredNewUsers];
            this.currentPage = nextPage;
          } else if (this.totalCount > 0 && newUsers.length === 0) {
            toastStore.showMessage({
              message: "Mais usuários não estão disponíveis.",
              color: "warning",
              icon: "🧐",
            });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Ocorreu um erro desconhecido.";
          toastStore.showMessage({
            message: `Erro ao carregar mais usuários: ${errorMessage}`,
            color: "error",
            icon: "⚠️",
          });
        }
      } else {
        toastStore.showMessage({
          message: "Nenhuma consulta de pesquisa foi fornecida.",
          color: "info",
          icon: "ℹ️",
        });
      }
    },

    // Adicionar uma ação para resetar a pesquisa
    resetSearch() {
      this.users = [];
      this.totalCount = 0;
      this.currentPage = 1;
      this.lastQuery = "";
      this.searchPerformed = false;
    },
  },
});
