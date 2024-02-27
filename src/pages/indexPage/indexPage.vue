<template>
  <scroll-view
    scroll-y
    class="bg-primary h-full w-full mb-1.5"
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
  >
    <view v-if="!isLoading"
      ><!-- 轮播图组件 -->
      <swiper
        circular
        class="h-20 min-[710px]:h-28 min-[976px]:h-80"
        @change="change"
      >
        <swiper-item
          v-for="item in swiperList"
          :key="item.id"
          class="box-border px-1.5"
        >
          <navigator
            url="/pages/hotItem/hotItem"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <view
              class="grid grid-cols-7 bg-secondary font-secondary border-radius-primary"
            >
              <view class="col-start-1 col-end-3 place-self-center"
                >click here -></view
              >
              <view
                class="col-start-3 col-end-8 h-20 min-[710px]:h-28 min-[970px]:h-80 bg-orange-50"
              >
                <image
                  :src="item.imgUrl"
                  mode="aspectFill"
                  class="border-radius-primary w-full h-full"
                />
              </view>
            </view>
          </navigator>
        </swiper-item>
      </swiper>

      <!-- 分类组件 -->
      <view
        class="box-border relative flex flex-wrap justify-around w-full border-radius-primary my-3 max-h-32 overflow-hidden transition-all after:bg-gradient-to-b after:from-transparent after:to-white after:absolute after:bottom-0 after:h-16 after:w-full min-[960px]:after:hidden"
        :class="{ show: isShowCategory }"
      >
        <navigator
          v-for="item in list"
          :key="item.id"
          url="/pages/categoryPage/categoryPage"
          open-type="switchTab"
          hover-class="none"
          :class="`flex justify-start items-center box-border margin-x-primary my-1.5 p-3 flex-1 h-12  min-[470px]:h-8 font-primary min-[470px]:text-sm min-[470px]:p-1.5 min-[960px]:text-base min-[960px]:h-12 ${item.bg} border-radius-primary`"
        >
          <view
            class="flex justify-center items-center mx-3 w-6 h-6 bg-white border-radius-primary"
          >
            <uni-icons :type="item.icon" size="20" color="#000"></uni-icons>
          </view>
          <text class="text-nowrap">{{ item.name }}</text>
        </navigator>
      </view>
      <!-- 展开 -->
      <view
        class="relative left-1/2 -translate-x-1/2 w-12 h-8 min-[960px]:hidden text-center"
        @tap="showCategory"
      >
        <i v-if="isShowCategory" class="iconfont text-[#E0E0E0]">&#xe7a4;</i>
        <i v-else class="iconfont text-[#E0E0E0]">&#xe7a2;</i>
      </view>
      <!-- 推荐组件 -->
      <text class="block margin-x-primary mb-1.5 font-primary-biger">推荐</text>
      <view
        class="bg-secondary border-radius-primary margin-x-primary mb-3 py-3"
      >
        <view class="flex justify-between items-center">
          <navigator
            v-for="item in recommendList"
            :key="item.id"
            :url="`/pages/recommendItem/recommendItem?type=${item.type}`"
            open-type="navigate"
            hover-class="navigator-hover"
            class="flex flex-col justify-start items-center"
          >
            <view
              :class="`flex justify-center items-center w-6 h-6 bg-white border-radius-primary`"
            >
              <uni-icons :type="item.icon" :color="`${item.bg}`" size="20" />
            </view>
            <view class="font-primary-smaller">{{ item.alt }}</view>
          </navigator>
        </view>
      </view>
      <!-- 推荐喜欢组件 -->
      <view class="font-secondary text-center">---你可能喜欢---</view>
      <!-- 商品页面 -->
      <navigator
        v-for="item in likeList"
        :key="item.id"
        :url="`/pages/goodsDetailPage/goodsDetailPage?id=${item.id}`"
        open-type="navigate"
        hover-class="navigator-hover"
        class="grid grid-cols-7 items-center bg-secondary border-radius-primary m-1.5"
      >
        <text
          class="col-span-1 h-2 w-2 bg-orange-800 rounded justify-self-start"
        ></text>
        <text class="col-span-5 font-primary-smaller">{{ item.name }}</text>
        <text class="col-span-1 justify-self-end font-secondary font-yellow">{{
          item.price
        }}</text>
        <view class="col-start-1 col-end-8 flex justify-center m-1.5">
          <image
            class="border-radius-primary w-full h-32"
            :src="item.picture"
            mode="center"
          ></image>
        </view>
      </navigator>
    </view>
    <skeletonPage v-else></skeletonPage>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import skeletonPage from "./skeletonPage.vue";
import type {
  CategoryItem,
  RecommendItem,
  SwiperItem,
  PageParams,
  LikeItem,
} from "./indexPageType";
import {
  getHomeCategoryAPI,
  getHomeRecommendAPI,
  getHomeSwiperAPI,
  getHomeLikeAPI,
} from "./indexPageApi";
import { onMounted } from "vue";

//是否展开category
let isShowCategory = ref(false);

//展开category组件
const showCategory = () => {
  isShowCategory.value = !isShowCategory.value;
};

const isLoading = ref(true);

//轮播图当前序号
let current = ref(0);

//轮播图数据

const swiperList = ref<SwiperItem[]>([]);

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
  "person",
  "vip",
  "gift",
  "shop",
  "medal",
  "folder-add",
  "flag",
  "images",
  "more",
  "fire",
]);

//首页分类背景颜色
//首页分类图标数据
let listBg = ref<string[]>([
  "bg-[#ffc3d4]",
  "bg-[#ffd6a5]",
  "bg-[#ffadad]",
  "bg-[#e6dee4]",
  "bg-[#98b5b4]",
  "bg-[#fef1c7]",
  "bg-[#FFB6C1]",
  "bg-[#FAD9E6]",
  "bg-[#ffecda]",
  "bg-[#B5D3D2]",
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
let recommendListIcon = ref<string[]>(["gift", "fire", "heart", "hand-up"]);

//首页分类背景颜色
//首页分类图标数据
let recommendListBg = ref<string[]>([
  "#587372",
  "#9A3412",
  "#FFB6C1",
  "#f5be0b",
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

//分页参数
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
};

//推荐喜欢的数据
const likeList = ref<LikeItem[]>([]);

//数据分页加载结束的标志
const finish = ref(false);

//获取推荐喜欢的数据
const getHomeLikeData = async () => {
  if (finish.value === true) {
    return uni.showToast({ title: "没有更多数据" });
  }

  const res = await getHomeLikeAPI(pageParams);

  //追加数据
  likeList.value.push(...res.result.items);

  //分页条件
  if (pageParams.page < res.result.pages) {
    pageParams.page++;
  } else {
    finish.value = true;
  }
};

// 滚动触底事件
const onScrolltolower = () => {
  getHomeLikeData();
};

//下拉刷新状态
const isTriggered = ref(false);

const onRefresherrefresh = async () => {
  isTriggered.value = true;
  resetData();
  await Promise.all([
    getHomeSwiperData(),
    getHomeCategoryData(),
    getHomeRecommendData(),
    getHomeLikeData(),
  ]);
  isTriggered.value = false;
};

//重置数据
const resetData = () => {
  pageParams.page = 1;
  likeList.value = [];
  finish.value = false;
};

onMounted(async () => {
  //获取首页分类
  // getHomeCategoryData()
  //获取首页推荐
  // getHomeRecommendData();

  //获取轮播图数据
  // getHomeSwiperData();

  //获取推荐喜欢组件数据
  // getHomeLikeData();
  await Promise.all([
    getHomeCategoryData(),
    getHomeRecommendData(),
    getHomeSwiperData(),
    getHomeLikeData(),
  ]);
  isLoading.value = false;
});
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.show {
  max-height: 300px;
}
@media (min-width: 470px) {
  .show {
    max-height: 500px;
  }
}
.show::after {
  background-image: none !important;
}
a {
  flex: 1;
}
/* #ifdef H5 */
/* .navigator-wrap {
	flex: 1;
} */
/* #endif */
</style>
