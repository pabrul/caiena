<!-- components/Toast.vue -->
<template>
  <div v-if="toastStore.isVisible" :class="`toast ${bgColor}`">
    <div
      class="max-w-xs rounded-md shadow-lg mb-3 ml-3 p-4 absolute bottom-0 right-0 w-full mr-4 flex justify-between flex-row font-mono"
      :class="bgColor"
    >
      <Icon
        v-if="toastStore.icon"
        :name="toastStore.icon"
        class="icon-before-message"
      />
      <span class="text-white">
        {{ toastStore.message }}
      </span>
      <button type="button" @click="closeToast" class="ml-auto">
        <Icon name="twemoji:letter-x" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToastStore } from "~/stores/useToastStore";

const toastStore = useToastStore();

const bgColor = computed(() => {
  switch (toastStore.color) {
    case "success":
      return "bg-green-800";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-800";
  }
});

const closeToast = () => {
  toastStore.hideMessage();
};
</script>

<style scoped>
/* Estilize seu toast aqui */
.icon-before-message {
  margin-right: 10px;
}
</style>
