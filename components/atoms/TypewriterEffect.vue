<template>
  <span class="font-mono" :class="textClasses">{{ animatedText }}</span>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: "text-black",
  },
  textSize: {
    type: String,
    default: "text-lg",
  },
  typingSpeed: {
    type: Number,
    default: 150, // milissegundos
  },
});

const textClasses = computed(() => `${props.textColor} ${props.textSize}`);
const animatedText = ref("");

const typeWriterEffect = (text, speed) => {
  let index = 0;
  const intervalId = setInterval(() => {
    animatedText.value = text.substring(0, index);
    if (index === text.length) {
      clearInterval(intervalId);
    } else {
      index++;
    }
  }, speed);
};

onMounted(() => {
  typeWriterEffect(props.text, props.typingSpeed);
});

watch(
  () => props.text,
  (newText) => {
    animatedText.value = "";
    typeWriterEffect(newText, props.typingSpeed);
  }
);
</script>

<style scoped>
/* estilos aqui */
</style>
