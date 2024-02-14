<template>
  <!-- 选择所有商品 -->
  <view class="shadow-lg my-3 mx-1.5 rounded-xl px-3 w-[363px] h-8">
    <checkbox value="全选" :checked="false" />
    <text class="text-gray-300">选择所有商品</text>
  </view>
  <!-- 商品数量 -->
  <view class="my-3 text-center text-slate-300"
    >商品数量:<text class="font-semibold text-black">3</text></view
  >
  <!-- 购物车列表 -->
  <!-- 购物车 -->
  <scroll-view scroll-y class="h-[320px]">
    <view
      v-for="item in 3"
      :key="item"
      class="flex justify-between m-1.5 w-[363px] h-36"
    >
      <!-- 商品 -->
      <view
        class="relative flex items-center shadow-lg rounded-xl px-3 w-[300px] h-36"
      >
        <checkbox value="" :checked="false" class="mr-3" />
        <view class="flex flex-col mr-3">
          <image
            src=""
            mode="scaleToFill"
            class="rounded-xl border border-slate-300 border-solid mb-3 w-20 h-20"
          />
          <text class="text-gray-300">商品规格</text>
        </view>
        <view class="flex flex-col mr-3">
          <text class="font-semibold">商品名</text>
          <text class="text-orange-300">$120</text>
        </view>
        <view class="absolute right-3 top-3 flex">
          <text
            v-for="item in 3"
            :key="item"
            class="bg-black rounded m-0.5 h-2 w-2"
          ></text>
        </view>
      </view>
      <!-- 数量 -->
      <view
        class="flex flex-col justify-around items-center shadow-lg rounded-xl px-3 w-[50px] h-36 text-slate-300"
      >
        <text class="font-semibold text-2xl">-</text>
        <text class="text-red-300">2</text>
        <text class="font-semibold text-2xl">+</text>
      </view>
    </view>
  </scroll-view>
  <!-- 总计 -->
  <view class="flex justify-around w-[300px] text-sm">
    <view
      ><text class="text-gray-300 font-semibold">总共</text>
      <text class="font-semibold">$100</text></view
    >
    <view
      ><text class="text-gray-300 font-semibold">购买数量</text
      ><text class="font-semibold">6</text></view
    >
  </view>
  <!-- 结算 -->
  <view class="flex justify-between mx-1.5 mt-6">
    <view class="flex">
      <uni-icons type="left"></uni-icons>
      <text class="font-semibold">继续购物</text>
    </view>
    <button
      class="bg-blue-300 rounded-xl w-36 h-8 leading-8 font-semibold text-center text-sm"
    >
      去结算
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
