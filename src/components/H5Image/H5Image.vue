<template>
  <img
    ref="imageRef"
    class="absolute transition-opacity border-radius-primary w-full"
    :data-src="props.dataPicture"
    :class="[props.class]"
  />
  <div
    class="absolute transition-opacity opacity-100 bg-[#e0e0e0] border-radius-primary w-full leading-[192px] text-center"
    :class="[props.class]"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  dataPicture: string;
  class: string;
}>();
import { ref } from "vue";
const imageRef = ref();
</script>

<style lang="scss" scoped></style>
