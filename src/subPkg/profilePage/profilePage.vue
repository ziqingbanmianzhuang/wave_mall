<template>
  <view class="bg-slate-200 rounded-xl w-[375px] h-24"></view>
  <view class="relative top-[-30px] left-0 shadow-lg bg-white rounded-xl m-1.5">
    <!-- 头像昵称 -->
    <view class="flex flex-col justify-center items-center text-center">
      <view
        class="absolute top-[-40px] bg-zinc-300 rounded-[24px] h-12 w-12"
      ></view>
      <text
        class="block border-b border-gray-300 border-solid mt-3 w-full text-base font-semibold"
        >昵称</text
      >
    </view>
    <!-- 表单 -->
    <view class="p-3">
      <view class="flex my-3">
        <text>账号</text>
        <input type="text" />
      </view>
      <view class="flex my-3">
        <text>昵称</text>
        <input type="text" />
      </view>
      <view class="flex my-3">
        <text>性别</text>
        <input type="text" />
      </view>
      <view class="flex my-3">
        <text>出生日期</text>
        <input type="text" />
      </view>
      <view class="flex my-3">
        <text>城市</text>
        <input type="text" />
      </view>
      <view class="flex my-3">
        <text>职业</text>
        <input type="text" />
      </view>
      <view class="flex my-3 justify-center">
        <button
          class="bg-slate-200 rounded-xl w-24 h-8 leading-[32px] text-white font-semibold"
        >
          保存
        </button>
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
