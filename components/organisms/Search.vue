<template>
  <div class="search w-screen py-8 my-8 px-8 mx-8">
    <SearchBar @search="performSearch" :loading="store.loading" />

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-8 my-8 px-8 mx-8"
    >
      <UserCard
        v-for="user in store.users"
        :key="user.id"
        :user="{
          userName: user.login, // Ajuste conforme o formato dos dados do usuário
          userUrl: user.html_url,
          avatarUrl: user.avatar_url,
        }"
      />
    </div>

    <div class="py-4 my-4 flex items-center justify-center">
      <Button
        :text="loading ? '' : 'Carregar Mais'"
        :icon="'➕'"
        :iconPosition="'left'"
        :loading="loading"
        :color="'green'"
        @click="loadMoreUsers"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGitHubStore } from "~/stores/useGitHubStore";

const store = useGitHubStore();
const searchQuery = ref("");

async function performSearch(query) {
  searchQuery.value = query; // Defina o valor da query

  console.log("Performing search with query:", query);
  if (query) {
    await store.searchUsers(query, 1);
  }
}

async function loadMoreUsers() {
  if (store.lastQuery) {
    await store.loadMoreUsers(store.lastQuery);
  } else {
    console.log("No search query provided for loadMoreUsers");
  }
}

onMounted(async () => {
  await performSearch(""); // Pode ser uma string vazia ou algum valor padrão
});
</script>

<style scoped>
.search {
}
</style>
