<template>
  <view v-if="!isLoading" class="flex justify-between">
    <view class="w-[327px]">
      <swiper circular class="m-1.5 mb-6 h-28">
        <swiper-item v-for="item in 5" :key="item">
          <navigator
            url="/pages/hotItem/hotItem"
            open-type="navigate"
            hover-class="navigator-hover"
          >
            <image
              src="https://yanxuan-item.nosdn.127.net/674ec7a88de58a026304983dd049ea69.jpg"
              mode="scaleToFill"
              class="w-[315px] h-24 rounded-xl"
            />
          </navigator>
        </swiper-item>
      </swiper>
      <scroll-view scroll-y class="h-[400px]">
        <view v-for="item in subCategoryList" :key="item.id">
          <text class="m-1.5 font-semibold">{{ item.name }}</text>
          <view class="flex flex-wrap">
            <navigator
              v-for="goods in item.goods"
              :key="goods.id"
              :url="`/pages/goodsDetailPage/goodsDetailPage?id=${goods.id}`"
              open-type="navigate"
              hover-class="navigator-hover"
              class="relative block m-1.5 w-[148px] h-48 rounded-xl"
            >
              <image
                :src="goods.picture"
                mode="scaleToFill"
                class="rounded-xl w-[148px] h-48"
              />
              <view
                class="absolute bottom-0 left-0 flex flex-col bg-white shadow-lg w-full"
              >
                <text class="text-sm">{{ goods.name }}</text>
                <text class="text-xs">$ {{ goods.price }} </text>
              </view>
              <view class="absolute top-0 left-0 flex">
                <text
                  v-for="dots in 3"
                  :key="dots"
                  class="block m-0.5 h-2 w-2 bg-black rounded"
                ></text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="flex flex-col justify-between m-1.5">
      <text
        v-for="(item, index) in categoryList"
        :key="item.id"
        class="flex items-center justify-center bg-sky-200 h-8 w-8 rounded-sm text-white"
        @tap="activeIndex = index"
      >
        {{ item.name }}</text
      >
    </view>
  </view>
  <skeletonPage v-else></skeletonPage>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { getCategoryTopAPI } from "./categoryPageApi";
import type { CategoryTopItem } from "./categoryPageType";
import skeletonPage from "./skeletonPage.vue";

let isLoading = ref(true);

//一级分类数据
const categoryList = ref<CategoryTopItem[]>([]);

// 提取当前二级分类数据
const subCategoryList = computed(() => {
  return categoryList.value[activeIndex.value]?.children || [];
});

// 高亮下标
const activeIndex = ref(0);

//获取一级分类数据
const getCategoryTopData = async () => {
  const res = await getCategoryTopAPI();
  categoryList.value = res.result;
};
onMounted(async () => {
  await getCategoryTopData();
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
