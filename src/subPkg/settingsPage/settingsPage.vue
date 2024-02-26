<template>
  <!-- 我的收货地址 -->
  <view class="flex items-center w-[363px] margin-x-primary my-1.5">
    <view
      class="border-b border-[#22c55e] border-solid border-radius-primary mr-1.5 mb-3 w-6 h-6 leading-[24px] text-center"
    >
      <uni-icons type="home" color="#22c55e" size="20" />
    </view>
    <navigator
      class="ml-1.5 mb-3 font-primary-smaller"
      url="/subPkg/addressPage/addressPage"
      >我的收货地址</navigator
    >
  </view>
  <!-- 授权管理 -->
  <view
    class="flex items-center border-b border-slate-300 border-solid w-[363px] margin-x-primary my-1.5 mb-7"
  >
    <view
      class="w-6 h-6 border-radius-primary mr-1.5 mb-3 text-center leading-[24px] border-b border-[#c2410c] border-solid w"
    >
      <uni-icons type="info" color="#c2410c" size="20" />
    </view>
    <text class="ml-1.5 mb-3 font-primary-smaller">授权管理</text>
  </view>
  <!-- 问题反馈 -->
  <view
    class="flex items-center w-[363px] margin-x-primary my-1.5 font-semibold"
  >
    <view
      class="w-6 h-6 6 border-radius-primary border-b border-[#F5C60B] border-solid mr-1.5 mb-1.5 text-center leading-[24px]"
    >
      <uni-icons type="help" color="#F5C60B" size="20" />
    </view>
    <text class="ml-1.5 mb-1.5 font-primary-smaller">问题反馈</text>
  </view>
  <!-- 联系我们 -->
  <view class="flex items-center w-[363px] margin-x-primary my-1.5">
    <view
      class="w-6 h-6 border-radius-primary border-b border-[#637FF1] border-solid mr-1.5 mb-1.5 text-center leading-[24px]"
    >
      <uni-icons type="phone" color="#637FF1" size="24" />
    </view>
    <text class="ml-1.5 mb-1.5 font-primary">联系我们</text>
  </view>
  <!-- 关于本产品 -->
  <view class="flex items-center w-[363px] margin-x-primary my-1.5">
    <view
      class="w-6 h-6 border-radius-primary border-b border-[#fdba74] border-solid mr-1.5 mb-1.5 text-center leading-[24px]"
    >
      <uni-icons type="paperplane" color="#fdba74" size="24" />
    </view>
    <text class="ml-1.5 mb-1.5 font-primary-smaller">关于本产品</text>
  </view>
  <button
    class="bg-[#9A3412] border-radius-primary m-1.5 mt-9 w-[363px] h-12 leading-[48px] font-base font-semibold text-white"
  >
    退出登录
  </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
