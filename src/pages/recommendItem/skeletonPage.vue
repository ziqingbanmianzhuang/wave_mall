<template>
  <view class="bg-primary px-1.5 w-full h-container">
    <!-- 数据列表 -->
    <scroll-view scroll-y class="w-full h-container">
      <!-- 轮播图 -->

      <!-- 轮播图 -->
      <swiper circular class="mb-3 h-28 min-[960px]:h-80 w-full">
        <swiper-item v-for="item in 2" :key="item">
          <navigator
            url=""
            open-type="navigate"
            hover-class="navigator-hover"
            class="block"
          >
            <view
              class="relative bg-[#e0e0e0] border-radius-primary h-28 min-[960px]:h-80"
            >
              <image
                src=""
                mode="aspectFill"
                class="border-radius-primary w-full h-full"
              />
              <view
                class="flex justify-center items-center w-6 h-6 absolute right-4 top-2 bg-white border-radius-primary"
              >
                <uni-icons type="heart" color="#9a3412" size="20" />
              </view>
            </view>
          </navigator>
        </swiper-item>
      </swiper>

      <!-- tab页 -->
      <view
        class="flex justify-around items-center bg-secondary border-radius-primary m-5 mb-7 w-full h-24 font-primary"
      >
        <view
          v-for="item in 2"
          :key="item"
          class="flex flex-col justify-around items-center h-16"
        >
          <text class="bg-[#e0e0e0] text-transparent">新品推荐</text>
        </view>
      </view>
      <view v-for="(subType, index) in 2" v-show="1 === index" :key="subType">
        <navigator
          v-for="goods in 5"
          :key="goods"
          url=""
          class="grid grid-cols-7 items-center mb-3 bg-secondary border-radius-primary"
        >
          <text
            class="col-span-1 justify-self-start h-2 w-2 bg-[#e0e0e0] rounded"
          ></text>
          <text
            class="col-span-5 justify-self-start bg-[#e0e0e0] font-primary-smaller text-transparent"
            >商品名</text
          >
          <text
            class="col-span-1 justify-self-end bg-[#e0e0e0] font-secondary text-transparent"
            >商品价格</text
          >
          <view
            class="col-start-1 col-end-8 flex justify-center bg-[#e0e0e0] m-1.5"
          >
            <image
              class="w-full h-32 min-[960px]:h-[30rem] border-radius-primary"
              src=""
              mode="aspectFill"
            />
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup></script>

<style>

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
