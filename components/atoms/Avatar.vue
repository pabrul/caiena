<!-- components/atoms/Avatar.vue -->
<template>
  <div
    class="absolute -bottom-6 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-solid border-red bg-pink-400 dark:!border-navy-700"
  >
    <img :src="avatarUrl" :alt="altText" class="h-full w-full rounded-full" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  avatarUrl: String,
  altText: String,
});
</script>
