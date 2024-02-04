<template>
  <view></view>
  <view class="flex flex-wrap">
    <navigator
      v-for="btn in btns"
      :key="btn.id"
      class="box-border m-1.5 p-3 w-[175.5px] h-20 font-sans font-semibold text-4xs text-black bg-cyan-200 rounded-xl"
    >
      <text>{{ btn.name }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

//首页分类数据
const btns = ref([
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
  { id: 1, name: "分类" },
]);
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
