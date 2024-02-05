<template>
  <!-- 轮播图组件 -->
  <view></view>
  <!-- 分类组件 -->
  <view class="flex flex-wrap">
    <navigator
      v-for="item in list"
      :key="item.id"
      url="/pages/categoryItem/categoryItem"
      :class="`flex justify-start items-center box-border m-1.5 p-3 w-[175.5px] h-20 font-sans font-semibold text-lg text-black ${item.bg} rounded-xl`"
    >
      <view
        class="flex justify-center items-center mx-3 w-9 h-9 bg-white rounded-xl"
      >
        <uni-icons :type="item.icon" size="30" color="#000"></uni-icons>
      </view>
      <text>{{ item.name }}</text>
    </navigator>
  </view>
  <!-- 推荐组件 -->
  <view>
    <text class="block mx-1.5 mt-6 font-sans font-semibold text-xl">推荐</text>
    <view class="flex justify-between items-center m-1.5">
      <navigator
        v-for="item in recommendList"
        :key="item.id"
        url="/pages/hotItem/hotItem"
        open-type="navigate"
        hover-class="navigator-hover"
        class="flex flex-col justify-start items-center"
      >
        <view
          :class="`flex justify-center items-center w-9 h-9 ${item.bg} rounded-xl`"
        >
          <uni-icons :type="item.icon" color="" size="30" />
        </view>
        <view>{{ item.alt }}</view>
        <view class="font-sans font-semibold text-lg text-black">{{
          item.title
        }}</view>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CategoryItem, RecommendItem } from "./indexPageType";
import { getHomeCategoryAPI, getHomeRecommendAPI } from "./indexPageApi";
import { onMounted } from "vue";

//首页分类数据
let list = ref<CategoryItem[]>([]);

//首页分类图标数据
let listIcon = ref<string[]>([
  "home",
  "star",
  "gift",
  "hand-up",
  "medal",
  "staff",
  "headphones",
  "spinner-cycle",
  "loop",
  "paperclip",
]);

//首页分类背景颜色
//首页分类图标数据
let listBg = ref<string[]>([
  "bg-cyan-200",
  "bg-sky-300",
  "bg-pink-200",
  "bg-orange-200",
  "bg-blue-300",
  "bg-indigo-200",
  "bg-orange-200",
  "bg-emerald-200",
  "bg-violet-200",
  "bg-amber-200",
]);

//将首页分类图标数据存进首页分类数据
const assignIcons = (
  listParam: CategoryItem[] | RecommendItem[],
  listIconParam: string[],
  listBgParam: string[],
) => {
  for (let i = 0; i < listIconParam.length; i++) {
    listParam[i].icon = listIconParam[i];
    listParam[i].bg = listBgParam[i];
  }
};

//获取首页分类数据
const getHomeCategoryData = async () => {
  let res = await getHomeCategoryAPI();
  list.value = res.result;
  assignIcons(list.value, listIcon.value, listBg.value);
};

//首页推荐数据
let recommendList = ref<RecommendItem[]>([]);
//首页分类图标数据
let recommendListIcon = ref<string[]>(["home", "star", "gift", "hand-up"]);

//首页分类背景颜色
//首页分类图标数据
let recommendListBg = ref<string[]>([
  "bg-cyan-200",
  "bg-sky-300",
  "bg-pink-200",
  "bg-orange-200",
]);
//获取首页推荐数据
const getHomeRecommendData = async () => {
  let res = await getHomeRecommendAPI();
  recommendList.value = res.result;
  assignIcons(
    recommendList.value,
    recommendListIcon.value,
    recommendListBg.value,
  );
};

onMounted(() => {
  //获取首页分类
  getHomeCategoryData();
  //获取首页推荐
  getHomeRecommendData();
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
