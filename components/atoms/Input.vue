<template>
  <div
    :class="`flex bg-gray-100 p-4 w-${width} rounded-lg font-mono`"
    class="active:border-gray-300 active:border active:border-solid"
  >
    <Icon v-if="icon" :class="`mr-2`" :name="icon" />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="`bg-gray-100 outline-none w-full ${inputSize}`"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Enter text...",
  },
  type: {
    type: String,
    default: "text",
  },
  icon: String,
  width: {
    type: String,
    default: "full", // Pode ser 'full', '1/2', '1/4', etc., conforme a necessidade
  },
  inputSize: {
    type: String,
    default: "", // Pode ser classes como 'text-sm', 'text-lg', etc.
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
