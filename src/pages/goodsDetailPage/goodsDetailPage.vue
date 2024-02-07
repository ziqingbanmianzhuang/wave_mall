<template>
  <!-- 商品轮播 -->
  <swiper circular class="h-32">
    <swiper-item v-for="item in 5" :key="item">
      <navigator
        url="/pages/hotItem/hotItem"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <view class="relative h-32">
          <image
            src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png"
            mode="scaleToFill"
            class="w-[375px] h-32"
          />
          <view
            class="flex justify-center items-center w-6 h-6 absolute right-2 top-2 bg-white rounded-xl"
          >
            <uni-icons type="arrow-right" color="#000" size="20" />
          </view>
        </view>
      </navigator>
    </swiper-item>
  </swiper>
  <!-- 商品服务 -->
  <view
    class="relative top-[-20px] shadow-lg m-1.5 px-3 bg-white w-[363px] rounded-xl"
  >
    <view class="flex flex-col border-b py-3 font-semibold">
      <text class="text-lg">商品名称</text>
      <text class="texg-sm">$68</text>
    </view>
    <view class="flex flex-col border-b py-3 font-semibold">
      <view>
        <uni-icons type="flag" class="pr-3"></uni-icons>
        <text class="text-base">地址选择</text>
      </view>
      <text class="text-xs text-gray-400">四川省成都市双流区</text>
    </view>
    <view class="flex flex-col border-b py-3 font-semibold">
      <view>
        <uni-icons type="eye" class="pr-3"></uni-icons>
        <text class="text-base">商品规格</text>
      </view>
      <text class="text-xs text-gray-400">128码 四条</text>
    </view>
    <view class="flex flex-col border-b py-3 font-semibold">
      <view>
        <uni-icons type="hand-up" class="pr-3"></uni-icons>
        <text class="text-base">店家服务</text>
      </view>
      <text class="text-xs text-gray-400">包退 快速退款 免费包邮</text>
    </view>
  </view>

  <!-- 商品详情 -->
  <view
    class="flex flex-col shadow-lg bg-white m-1.5 p-3 w-[363px] rounded-xl font-semibold"
  >
    <text class="text-lg">详情</text>
    <text class="text-xs text-gray-400">轻巧 旅行 易携带</text>
  </view>

  <!-- 功能区 -->
  <view class="flex">
    <button
      class="bg-teal-800 rounded-xl m-1.5 w-[100px] h-12 text-white font-semibold leading-[48px]"
    >
      客服
    </button>
    <button
      class="bg-red-900 rounded-xl m-1.5 w-[251px] h-12 text-white font-semibold leading-[48px]"
    >
      加入购入车
    </button>
  </view>
  <!-- 购买区 -->
  <view class="flex justify-between bg-teal-100 rounded-xl m-1.5 p-3">
    <view class="flex flex-col">
      <text class="text-red-600 font-semibold">$68</text>
      <text class="text-xs text-gray-400">128 码 四条</text>
    </view>
    <button
      class="bg-teal-800 rounded-xl w-[80px] h-10 text-sm text-white font-semibold leading-[40px]"
    >
      立即购买
    </button>
  </view>
  <view class="text-center">
    <uni-icons type="eye-filled" color="#064e3b"></uni-icons>
    <text class="text-sm font-semibold m-1.5">查看购物车</text>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
