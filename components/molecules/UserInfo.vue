<!-- components/molecules/UserInfo.vue -->
<template>
  <div class="flex flex-col items-center p-2 m-2">
    <h4 class="text-lg font-bold text-white dark:text-white">
      <Icon name="🙋" />

      {{ userName }}
    </h4>
    <a
      :href="userUrl"
      class="text-base font-normal text-indigo-200 relative w-fit block after:block after:mt-2 after:content-[''] after:absolute after:h-[3px] after:bg-indigo-500 after:w-32 after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left p-4 hover:border-gray-700 border-transparent border-2"
      target="_blank"
    >
      <Icon name="🔗" />
      Ver Perfil
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  userName: String,
  userUrl: String,
});
</script>
