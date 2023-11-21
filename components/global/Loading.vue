<template>
  <div
    v-if="isLoading"
    class="loading-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
  >
    <Icon
      name="svg-spinners:12-dots-scale-rotate"
      class="text-white text-4xl"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useLoadingStore } from "~/stores/useLoadingStore";

const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.isLoading);
</script>

<style scoped>
.icon {
  font-size: 150px;
}
</style>
