<template>
  <view></view>
  <view class="flex flex-wrap">
    <navigator
      v-for="item in list"
      :key="item.id"
      class="flex justify-start items-center box-border m-1.5 p-3 w-[175.5px] h-20 font-sans font-semibold text-4xs text-black bg-cyan-200 rounded-xl"
    >
      <view
        class="flex justify-center items-center mx-3 w-9 h-9 bg-white rounded-xl"
      >
        <uni-icons type="contact" size="30" color="#000"></uni-icons>
      </view>
      <text>{{ item.name }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CategoryItem } from "./indexPageType";
import { getHomeCategoryAPI } from "./indexPageApi";
import { onMounted } from "vue";

//首页分类数据
let list = ref<CategoryItem[]>([]);
onMounted(async () => {
  let res = await getHomeCategoryAPI();
  list.value = res.result;
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
