// services/GitHubService.ts
import { GitHubSearchResult } from "~/interfaces/GitHubUser";

export class GitHubService {
  static async searchUsers(
    query: string,
    page: number,
    perPage: number = 20
  ): Promise<GitHubSearchResult> {
    const config = useRuntimeConfig();
    const url = config.public.apiBase;
    const token = config.public.gitHubToken;

    if (process.server) {
      console.log("API secret 1:", config.apiSecret);
    }

    try {
      const response = await useFetch<GitHubSearchResult>(
        `${url}/search/users`,
        {
          params: {
            q: query,
            page,
            per_page: perPage,
          },
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      if (response.error.value) {
        throw response.error.value;
      }

      // Verifica se response.data.value é null e trata de acordo
      if (response.data.value === null) {
        throw new Error("No data received from GitHub API");
      }

      return response.data.value;
    } catch (error) {
      throw error;
    }
  }
}
