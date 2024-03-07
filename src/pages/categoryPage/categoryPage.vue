<template>
  <view v-show="!isLoading" class="flex justify-between bg-primary">
    <!-- 二级分类 -->
    <view class="flex-1 h-container flex flex-col">
      <!-- 轮播图 -->
      <swiper circulars class="mb-3 h-24 min-[960px]:h-80">
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
            <image
              :src="item.imgUrl"
              mode="aspectFill"
              class="border-radius-primary w-full h-24 min-[960px]:h-80"
            />
          </navigator>
        </swiper-item>
      </swiper>
      <!-- 商品列表 -->
      <scroll-view scroll-y class="h-[400px] grow">
        <view v-for="item in subCategoryList" :key="item.id" class="bg-primary">
          <text class="margin-x-primary my-1.5 font-primary">{{
            item.name
          }}</text>
          <view class="flex flex-wrap justify-between">
            <view
              v-for="goods in item.goods"
              :key="goods.id"
              class="relative block border-radius-primary mx-1.5 grow w-[148px] min-[633px]:w-[300px] min-[960px]:h-96 h-48"
            >
              <navigator
                :url="`/pages/goodsDetailPage/goodsDetailPage?id=${goods.id}`"
                open-type="navigate"
                hover-class="navigator-hover"
              >
                <!-- #ifdef MP-WEIXIN-->
                <image
                  :src="goods.picture"
                  mode="aspectFill"
                  class="opacity-0 transition-opacity duration-200 border-radius-primary w-full min-[960px]:h-96 h-48"
                  lazy-load
                  :class="{
                    successImage: isShowSucLoadWeixinImage,
                    errorImage: isShowErrLoadWeixinImage,
                  }"
                  @error="errLoadWeinXinImage"
                  @load="sucLoadWeinXinImage"
                />
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <view class="relative">
                  <img
                    ref="imageRef"
                    class="absolute transition-opacity border-radius-primary w-full min-[960px]:h-96 h-48"
                    :data-src="goods.picture"
                  />
                  <div
                    class="absolute transition-opacity opacity-100 bg-[#e0e0e0] border-radius-primary w-full leading-[192px] min-[960px]:h-96 h-48 text-center"
                  ></div>
                </view>
                <!-- #endif -->
                <view
                  class="absolute bottom-0 left-0 flex flex-col bg-white shadow-lg border-radius-b-primary p-1.5 w-full"
                >
                  <text class="font-primary-smaller">{{ goods.name }}</text>
                  <text class="font-secondary font-yellow"
                    >$ {{ goods.price }}
                  </text>
                </view>

                <threeDots></threeDots>
              </navigator>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 一级分类 -->
    <view class="flex flex-col justify-between margin-x-primary w-16">
      <text
        v-for="(item, index) in categoryList"
        :key="item.id"
        class="flex items-center justify-center font-secondary"
        @tap="activeIndex = index"
      >
        {{ item.name }}</text
      >
    </view>
  </view>
  <skeletonPage v-show="isLoading"></skeletonPage>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from "vue";
import { getCategoryTopAPI, getCatgorySwiperAPI } from "./categoryPageApi";
import type { CategoryTopItem, SwiperItem } from "./categoryPageType";
import skeletonPage from "./skeletonPage.vue";
import threeDots from "../../components/threeDots/threeDots.vue";

import {
  sucLoadWeinXinImageHook,
  errLoadWeinXinImageHook,
} from "../../hooks/lazyLoadImgWeiXin";
const { isShowSucLoadWeixinImage, setShowSucLoadWeixinImage } =
  sucLoadWeinXinImageHook();
const { isShowErrLoadWeixinImage, setShowErrLoadWeixinImage } =
  errLoadWeinXinImageHook();
const sucLoadWeinXinImage = () => {
  setShowSucLoadWeixinImage();
};
const errLoadWeinXinImage = () => {
  setShowErrLoadWeixinImage();
};

import { globalLoadingHook } from "../../hooks/globalLoadingHook";
const { isLoading, setLoading } = globalLoadingHook();
// #ifdef H5
import { observerImgHook } from "../../hooks/lazyLoadImg";
// #endif
//一级分类数据
const categoryList = ref<CategoryTopItem[]>([]);

// 高亮下标
const activeIndex = ref(0);

const imageRef = ref();

// 提取当前二级分类数据
const subCategoryList = computed(() => {
  return categoryList.value[activeIndex.value]?.children || [];
});
// #ifdef H5
watch(
  subCategoryList,
  async () => {
    console.log("change");
    console.log("imageref", imageRef.value);
    observerImgHook(imageRef);
  },
  {
    flush: "post",
  },
);
// #endif

//获取一级分类数据
const getCategoryTopData = async () => {
  const res = await getCategoryTopAPI();
  categoryList.value = res.result;
};

//轮播图数据
let swiperList = ref<SwiperItem[]>();

//获取轮播图数据
const getCatgorySwiperData = async () => {
  const res = await getCatgorySwiperAPI();
  swiperList.value = res.result;
};
onMounted(async () => {
  await getCatgorySwiperData();
  await getCategoryTopData();
  setLoading(false);
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

// #ifdef H5
.h-container {
  height: calc(100vh - 94px);
}
// #endif

// #ifdef MP-WEIXIN
.h-container {
  height: calc(100vh);
}
// #endif
.successImage {
  opacity: 1;
  transition: opacity 2s ease-in-out;
}
.errorImage {
  opacity: 1;
  transition: opacity 2s ease-in-out;
}
.errorImage:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-image: url("../../static/images/imgBack.svg");
  background-position: center;
  background-size: cover;
}
</style>
