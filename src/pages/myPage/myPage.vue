<template>
  <view class="w-[375px] h-[530px] bg-slate-100">
    <!-- 欢迎页 -->
    <view class="flex m-1.5 mb-16 pt-4">
      <view>
        <text class="block mr-3 h-12 w-12 bg-white rounded-xl"></text>
      </view>
      <view class="flex flex-col font-semibold">
        <text class="text-lg">Wave Mall</text>
        <text class="text-base">欢迎你来到购物天堂</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="relative shadow-lg bg-white rounded-xl m-1.5 w-[363px] h-32">
      <view class="flex flex-col border-b p-3 font-semibold">
        <text class="text-base">your phone</text>
        <input
          class="text-xs text-gray-400"
          placeholder="请填写你的手机号"
          placeholder-class="input-placeholder"
        />
      </view>
      <view class="flex flex-col p-3 font-semibold">
        <text class="text-base">登录</text>
      </view>
      <view class="absolute right-1 top-1 flex">
        <text
          v-for="item in 3"
          :key="item"
          class="block m-0.5 h-2 w-2 bg-black rounded"
        ></text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
