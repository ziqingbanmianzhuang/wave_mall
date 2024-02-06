<template>
  <view class="flex justify-between">
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
        <view v-for="item in 2" :key="item">
          <text class="m-1.5 font-semibold">收纳</text>
          <view class="flex flex-wrap">
            <navigator
              v-for="goods in 5"
              :key="goods"
              url="/pages/"
              open-type="navigate"
              hover-class="navigator-hover"
              class="relative block m-1.5 w-[148px] h-48 rounded-xl"
            >
              <image
                src="https://yanxuan-item.nosdn.127.net/674ec7a88de58a026304983dd049ea69.jpg"
                mode="scaleToFill"
                class="rounded-xl w-[148px] h-48"
              />
              <view
                class="absolute bottom-0 left-0 flex flex-col bg-white shadow-lg w-full"
              >
                <text class="text-sm">男装</text>
                <text class="text-xs">$120</text>
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
        v-for="item in 10"
        :key="item"
        class="flex items-center justify-center bg-sky-200 rounded-sm text-white"
        >{{ item }}</text
      >
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
