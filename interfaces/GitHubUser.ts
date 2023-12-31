// interfaces/GitHubUser.ts
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubSearchResult {
  total_count: number;
  items: GitHubUser[];
}
