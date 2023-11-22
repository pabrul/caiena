<template>
  <div
    class="fixed m-6 p-4 right-0 bottom-0 rounded-full border-indigo-500 border-solid bg-indigo-500 cursor-pointer text-white"
    @click="scrollToTop"
  >
    <span class="up-icon">👆</span>
  </div>
</template>

<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.up-icon {
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .up-icon {
    font-size: 20px;
  }
}
</style>
