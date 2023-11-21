<template>
  <div class="search-page">
    <Search />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGitHubStore } from "~/stores/useGitHubStore";

const store = useGitHubStore();
const searchQuery = ref("");

async function performSearch(query = searchQuery.value) {
  if (query) {
    await store.searchUsers(query, 1);
  }
}

async function loadMoreUsers() {
  await store.searchUsers(searchQuery.value, store.currentPage);
}

onMounted(async () => {
  // Carregar inicialmente alguns usuários, se necessário
  await performSearch(""); // Pode ser uma string vazia ou algum valor padrão
});
</script>

<style scoped>
.user-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
