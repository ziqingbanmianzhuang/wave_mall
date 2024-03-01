<template>
  <view class="flex justify-between bg-primary">
    <!-- 二级分类 -->
    <view class="flex-1 h-container flex flex-col">
      <!-- 轮播图 -->
      <swiper circulars class="mb-3 h-24 min-[960px]:h-80">
        <swiper-item v-for="item in 10" :key="item" class="box-border px-1.5">
          <view class="bg-[#e0e0e0]">
            <image
              src=""
              mode="aspectFill"
              class="border-radius-primary w-full h-24 min-[960px]:h-80"
            />
          </view>
        </swiper-item>
      </swiper>
      <!-- 商品列表 -->
      <scroll-view scroll-y class="h-[400px] grow">
        <view v-for="item in 10" :key="item" class="bg-primary">
          <text
            class="bg-[#e0e0e0] margin-x-primary my-1.5 font-primary text-transparent"
            >商品名</text
          >
          <view class="flex flex-wrap justify-between">
            <view
              v-for="goods in 10"
              :key="goods"
              class="relative block border-radius-primary mx-1.5 my-3 grow w-[148px] min-[633px]:w-[300px] min-[960px]:h-96 h-48"
            >
              <view
                class="border-radius-primary bg-[#e0e0e0] w-full min-[960px]:h-96 h-48"
              >
                <image src="" mode="aspectFill" class="" />
              </view>
              <view
                class="absolute bottom-0 left-0 flex flex-col bg-white shadow-lg border-radius-b-primary p-1.5 w-full"
              >
                <text
                  class="w-fit bg-[#e0e0e0] font-primary-smaller text-transparent mb-0.5"
                  >商品名</text
                >
                <text class="w-fit bg-[#e0e0e0] font-secondary text-transparent"
                  >$129
                </text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 一级分类 -->
    <view class="flex flex-col justify-between margin-x-primary w-16">
      <view
        v-for="item in 10"
        :key="item"
        class="flex items-center justify-center bg-[#e0e0e0] w-fit font-secondary"
      >
        <text class="text-transparent"> 分类</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

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
</style>
