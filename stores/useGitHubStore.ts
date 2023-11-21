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
    loading: false,
    error: null as Error | null,
    currentPage: 1,
    perPage: 20,
    lastQuery: "",
    lastError: null as unknown | null,
  }),
  actions: {
    async searchUsers(
      query: string,
      page: number,
      perPage: number = 20
    ): Promise<GitHubUser[]> {
      const toastStore = useToastStore();

      try {
        this.loading = true;
        const result: GitHubSearchResult = await GitHubService.searchUsers(
          query,
          page,
          perPage
        );

        if (!query.trim()) {
          // Lógica para lidar com consulta vazia (ex: não fazer nada, retornar resultados padrão, etc.)
          return [];
        }

        if (result.total_count === 0) {
          toastStore.showMessage({
            message: "Usuário não encontrado",
            color: "default",
            icon: "🤷‍♂️",
          });
          return [];
        } else {
          if (page === 1) {
            this.users = result.items;
          } else {
            this.users = [...this.users, ...result.items];
          }
          this.totalCount = result.total_count;
          this.currentPage = page;
          this.lastQuery = query;
          return result.items;
        }
      } catch (error) {
        this.loading = false;
        const errorStore = useErrorStore();
        errorStore.reportError(error);
        this.lastError = error;

        if (error instanceof Error) {
          this.error = error;
        } else {
          this.error = new Error("An unknown error occurred");
        }
        return [];
      } finally {
        this.loading = false;
      }
    },

    async loadMoreUsers(query: string) {
      const nextPage = this.currentPage + 1;
      try {
        const newUsers = await this.searchUsers(query, nextPage, this.perPage);
        if (newUsers.length > 0) {
          this.users = [...this.users, ...newUsers]; // Concatena os novos usuários aos existentes
          this.currentPage = nextPage;
        }
      } catch (error) {
        const errorStore = useErrorStore();
        errorStore.reportError(error);
      }
    },
  },
});
