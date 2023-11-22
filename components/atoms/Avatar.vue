<!-- components/atoms/Avatar.vue -->
<template>
  <div
    class="absolute border-indigo-300 -bottom-6 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-solid border-red"
  >
    <img
      loading="lazy"
      :src="avatarUrl"
      :alt="altText"
      class="h-full w-full rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  avatarUrl: String,
  altText: String,
});
</script>
