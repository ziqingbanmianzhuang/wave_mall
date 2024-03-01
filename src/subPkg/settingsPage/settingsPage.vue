<template>
  <!-- 我的收货地址 -->
  <view
    v-if="profileStore.profile"
    class="flex items-center w-full px-1.5 my-1.5"
  >
    <view
      class="border-b border-[#22c55e] border-solid border-radius-primary mr-1.5 mb-3 w-6 h-6 leading-[24px] text-center"
    >
      <i class="iconfont icon-shouye"></i>
    </view>
    <navigator
      class="ml-1.5 mb-3 font-primary-smaller"
      url="/subPkg/addressPage/addressPage"
      >我的收货地址</navigator
    >
  </view>
  <!-- 授权管理 -->
  <view
    class="flex items-center border-b border-slate-300 border-solid w-full px-1.5 my-1.5 mb-7"
  >
    <view
      class="w-6 h-6 border-radius-primary mr-1.5 mb-3 text-center leading-[24px] border-b border-[#c2410c] border-solid w"
    >
      <i class="iconfont icon-jiami"></i>
    </view>
    <text class="ml-1.5 mb-3 font-primary-smaller">授权管理</text>
  </view>
  <!-- 问题反馈 -->
  <view class="flex items-center w-full margin-x-primary my-1.5 font-semibold">
    <view
      class="w-6 h-6 6 border-radius-primary border-b border-[#F5C60B] border-solid mr-1.5 mb-1.5 text-center leading-[24px]"
    >
      <i class="iconfont icon-alert_circle_warning"></i>
    </view>
    <text class="ml-1.5 mb-1.5 font-primary-smaller">问题反馈</text>
  </view>
  <!-- 联系我们 -->
  <view class="flex items-center w-full margin-x-primary my-1.5">
    <view
      class="w-6 h-6 border-radius-primary border-b border-[#637FF1] border-solid mr-1.5 mb-1.5 text-center leading-[24px]"
    >
      <i class="iconfont icon-a-042_biaoqing"></i>
    </view>
    <text class="ml-1.5 mb-1.5 font-primary-smaller">联系我们</text>
  </view>
  <!-- 关于本产品 -->
  <view class="flex items-center w-full margin-x-primary my-1.5">
    <view
      class="w-6 h-6 border-radius-primary border-b border-[#fdba74] border-solid mr-1.5 mb-1.5 text-center leading-[24px]"
    >
      <i class="iconfont icon-a-042_shoucang-10"></i>
    </view>
    <text class="ml-1.5 mb-1.5 font-primary-smaller">关于本产品</text>
  </view>
  <button
    v-if="profileStore.profile"
    class="bg-[#9A3412] border-radius-primary mt-9 mx-auto px-6 py-3 w-fit font-base font-semibold text-white"
  >
    退出登录
  </button>
</template>

<script lang="ts" setup>
import { useProfileStore } from "../../store/profile/index";

// 获取会员Store
const profileStore = useProfileStore();
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
