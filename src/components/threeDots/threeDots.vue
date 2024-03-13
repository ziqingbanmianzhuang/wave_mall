<template>
  <view class="absolute top-1.5 right-1.5 flex">
    <text
      v-for="item in dots"
      :key="item.id"
      :class="`block m-0.5 h-2 w-2 ${item.bg} rounded`"
    ></text>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const dots = ref([
  { id: 1, bg: "bg-orange-700" },
  { id: 1, bg: "bg-orange-300" },
  { id: 1, bg: "bg-green-500" },
]);
</script>

<style></style>
