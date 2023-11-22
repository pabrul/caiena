<template>
  <div class="search w-screen md:py-8 md:my-8 md:px-8 md:mx-8 p-2">
    <div
      v-show="!store.searchPerformed"
      class="md:py-8 md:my-8 md:px-8 md:mx-8 p-4 flex items-center justify-center z-auto"
    >
      <TypewriterEffect
        text="À procura de alguém no universo do GitHub? Basta pesquisar (:"
        textColor="text-green-500"
        textSize="md:text-5xl text-xl "
        class="text-center z-100 leading-8 bg-gradient-to-r from-blue-200 via-blue-500 to-indigo-600 inline-block text-transparent bg-clip-text"
      />
    </div>

    <SearchBar @search="performSearch" :loading="store.loading" />

    <div
      v-show="store.searchPerformed"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-8 my-8 px-8 mx-8"
    >
      <UserCard
        v-for="user in store.users"
        :key="user.id"
        :user="{
          userName: user.login,
          userUrl: user.html_url,
          avatarUrl: user.avatar_url,
        }"
      />
    </div>

    <div
      v-show="!store.searchPerformed"
      class="py-8 my-8 px-8 mx-8 flex items-center justify-center"
    >
      <img
        src="@/assets/images/bright.png"
        class="md:w-32 w-16 absolute bottom-0 left-0 scale-150 brightness-50"
        alt=""
        srcset=""
      />
      <img
        src="@/assets/images/buble.png"
        class="md:w-32 w-16 absolute bottom-0 right-0 scale-150 brightness-50"
        alt=""
        srcset=""
      />
    </div>

    <div class="float-images">
      <img
        src="@/assets/images/rocket.png"
        class="md:w-32 w-16 absolute top-0 right-0 scale-150 brightness-50"
        alt=""
        srcset=""
      />
      <img
        src="@/assets/images/stars.png"
        class="md:w-32 w-16 absolute top-0 left-0 scale-150 brightness-50"
        alt=""
        srcset=""
      />
    </div>

    <div
      class="py-4 my-4 flex items-center justify-center"
      v-show="store.searchPerformed"
    >
      <Button
        :text="store.loading ? '' : 'Carregar Mais'"
        :icon="'➕'"
        :iconPosition="'left'"
        :loading="loading"
        :color="'indigo'"
        :disabled="store.loading"
        @click="loadMoreUsers"
      />
    </div>
    <Up />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGitHubStore } from "~/stores/useGitHubStore";

const store = useGitHubStore();
const searchQuery = ref("");

async function performSearch() {
  if (searchQuery.value) {
    try {
      loadingStore.show();
      await store.resetSearch(); // Reseta o estado antes de realizar uma nova pesquisa
      await store.searchUsers(searchQuery.value, 1);
    } catch (error) {
      console.log("Erro ao realizar pesquisa:", error);
    } finally {
      loadingStore.hide();
    }
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
.detetive {
}
</style>
