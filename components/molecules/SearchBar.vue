<template>
  <div class="md:py-8 md:my-8 md:px-8 md:mx-8 p-4 search-bar">
    <form @submit.prevent="performSearch">
      <div
        class="flex max-md:flex-col gap-4 items-center p-6 md:space-x-6 bg-indigo-500 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 font-mono"
      >
        <Input
          v-model="searchQuery"
          placeholder="Pesquisar por usuario"
          icon="twemoji:rocket"
          width="full"
          class=""
        />

        <Button
          :text="loading ? '' : 'Buscar'"
          :icon="'twemoji:magnifying-glass-tilted-left'"
          :iconPosition="'left'"
          :loading="loading"
          class="max-md:w-full"
        />

        <Button
          :text="loading ? '' : 'Limpar'"
          :icon="'🧹'"
          :iconPosition="'left'"
          :loading="loading"
          :color="'green'"
          class="max-md:w-full"
          @click="reset"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGitHubStore } from "~/stores/useGitHubStore";
import { useLoadingStore } from "~/stores/useLoadingStore";

const store = useGitHubStore();
const loadingStore = useLoadingStore();
const searchQuery = ref("");

async function performSearch() {
  if (searchQuery.value) {
    try {
      loadingStore.show();
      await store.searchUsers(searchQuery.value, 1);
    } catch (error) {
      console.log(
        "🚀 ~ file: SearchBar.vue:40 ~ performSearch ~ error:",
        error
      );
    } finally {
      loadingStore.hide();
    }
  }
}

function reset(event) {
  store.resetSearch();
  searchQuery.value = ""; // Limpar o valor do input de pesquisa
}
</script>

<style scoped>
.search-bar {
}
</style>
