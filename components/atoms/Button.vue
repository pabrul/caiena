<template>
  <button
    :class="[buttonBaseClasses, colorClasses, { 'opacity-50': loading }]"
    @click="onClick"
    :disabled="loading"
    @keyup.enter="onKeyupEnter"
    class="font-mono"
  >
    <Icon
      v-if="loading"
      name="twemoji:magnifying-glass-tilted-left"
      class="loading-icon"
    />
    <template v-else>
      <Icon v-if="icon && iconPosition === 'left'" :name="icon" class="mr-2" />
      {{ text }}
      <Icon v-if="icon && iconPosition === 'right'" :name="icon" class="mr-2" />
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "gray-800",
  },
  icon: {
    type: String,
    default: "",
  },
  iconPosition: {
    type: String,
    default: "left",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const buttonBaseClasses =
  "inline-flex items-center justify-center py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer";

function onKeyupEnter(event) {
  console.log("🚀 ~ file: Button.vue:56 ~ onKeyupEnter ~ event:", event);
  emit("keyup-enter");
}

const colorClasses = computed(() => {
  switch (props.color) {
    case "green":
      return "bg-green-500";
    case "indigo":
      return "bg-indigo-500";
    default:
      return "bg-gray-800";
  }
});
</script>

<style scoped></style>
