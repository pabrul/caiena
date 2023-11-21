<template>
  <div class="py-8 my-8 px-8 mx-8 search-bar">
    <form @submit.prevent="performSearch">
      <div
        class="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 font-mono"
      >
        <Input
          v-model="searchQuery"
          placeholder="Pesquisar por usuario"
          icon="twemoji:rocket"
          width="full"
        />
        <Button
          :text="loading ? '' : 'Buscar'"
          :icon="'twemoji:magnifying-glass-tilted-left'"
          :iconPosition="'left'"
          :loading="loading"
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
</script>

<style scoped>
.search-bar {
}
</style>
