<!-- components/organisms/UserCard.vue -->
<template>
  <div
    class="py-8 my-8 font-mono relative gap-4 flex flex-col items-center rounded-[20px] justify-center h-[150px] w-full mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none"
  >
    <div class="relative flex w-full justify-center rounded-xl bg-cover">
      <Avatar
        :avatarUrl="user.avatarUrl"
        :altText="`Avatar de ${user.userName}`"
      />
    </div>
    <UserInfo :userName="user.userName" :userUrl="user.userUrl" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  user: Object, // Pode ser expandido para um tipo mais específico se necessário
});
</script>
