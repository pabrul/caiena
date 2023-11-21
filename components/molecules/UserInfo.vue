<!-- components/molecules/UserInfo.vue -->
<template>
  <div class="flex flex-col items-center p-4 m-4">
    <h4 class="text-xl font-bold text-navy-700 dark:text-gray-950">
      {{ userName }}
    </h4>
    <a
      :href="userUrl"
      class="text-base font-normal text-gray-600 p-2"
      target="_blank"
    >
      <Icon name="🔗" />
      Ver Perfil
    </a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  userName: String,
  userUrl: String,
});
</script>
