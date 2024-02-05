<template>
  <!-- 轮播图组件 -->
  <uni-swiper-dot
    mode="round"
    :info="swiperList"
    color="#ccc"
    :current="current"
    :dots-styles="dotsStyles"
  >
    <swiper circular class="h-28 mb-6" @change="change">
      <swiper-item v-for="item in swiperList" :key="item.id">
        <navigator
          url="/pages/hotItem/hotItem"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          <view
            class="flex justify-between items-center box-border mx-1.5 p-6 w-[363px] h-28 bg-orange-200 font-sans text-xs text-black rounded-xl"
          >
            <text>click here ->{{ item.id }}</text>
            <image
              :src="item.hrefUrl"
              mode="scaleToFill"
              class="w-[200px] h-16 border-8 border-white border-solid rounded-xl"
            />
          </view>
        </navigator>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>

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
  <view class="mb-6">
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
  <!-- 推荐喜欢组件 -->
  <scroll-view scroll-y class="h-[667px] w-[363px] m-1.5">
    <view v-for="i in 10" :key="i" class="grid grid-cols-7 items-center m-1.5">
      <text
        class="col-span-1 h-2 w-2 bg-black rounded justify-self-start"
      ></text>
      <text class="col-span-5 justify-self-start font-semibold">儿童服装</text>
      <text class="col-span-1 justify-self-end">$18</text>
      <view
        class="col-start-2 col-end-8 flex justify-center m-1.5 border border-inherit border-solid rounded-xl"
      >
        <image
          class="w-24 h-24"
          src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_1.jpg"
          mode="scaleToFill"
        />
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { CategoryItem, RecommendItem, SwiperItem } from "./indexPageType";
import {
  getHomeCategoryAPI,
  getHomeRecommendAPI,
  getHomeSwiperAPI,
} from "./indexPageApi";
import { onMounted } from "vue";

//轮播图当前序号
let current = ref(0);

//轮播图数据

const swiperList = ref<SwiperItem[]>([]);

//轮播图点样式对象
let dotsStyles = {
  width: 8,
  bottom: 5,
  backgroundColor: "",
  border: "0px solid skyblue",
  selectedBackgroundColor: "",
  selectedBorder: "",
};

//轮播图事件切换回调
const change: UniHelper.SwiperOnChange = (e) => {
  current.value = e.detail.current;
};

//获取轮播图数据
const getHomeSwiperData = async () => {
  let res = await getHomeSwiperAPI();
  swiperList.value = res.result;
  console.log("首页", swiperList.value);
};

//首页分类数据
let list = ref([] as CategoryItem[]);
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

  //获取轮播图数据
  getHomeSwiperData();
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
