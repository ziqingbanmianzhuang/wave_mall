<template>
  <view class="bg-slate-100 rounded-xl mx-1.5 mt-1.5 mb-9 w-[363px] h-36">
    <!-- 用户信息 -->
    <view class="flex relative p-3">
      <view class="bg-white rounded-xl w-14 h-14"> </view>
      <view class="flex flex-col font-semibold ml-3">
        <navigator class="mb-3 text-base" url="/subPkg/profilePage/profilePage"
          >昵称</navigator
        >
        <text class="text-xs text-gray-400">更新用户昵称</text>
      </view>
      <navigator
        class="absolute right-1.5 top-1.5"
        url="/subPkg/settingsPage/settingsPage"
      >
        <uni-icons type="gear-filled" color="" size="24" />
      </navigator>
    </view>
    <!-- 物流 -->
    <view class="flex justify-between p-3 text-sm font-semibold">
      <view class="flex flex-col">
        <text>待付款</text>
        <view
          class="bg-white h-6 w-6 rounded-[12px] text-center leading-[24px]"
        >
          <uni-icons type="color" color="" size="18" />
        </view>
      </view>

      <view class="flex flex-col">
        <text>待发货</text>
        <view
          class="bg-white h-6 w-6 rounded-[12px] text-center leading-[24px]"
        >
          <uni-icons type="color" color="" size="18" />
        </view>
      </view>

      <view class="flex flex-col">
        <text>待收货</text>
        <view
          class="bg-white h-6 w-6 rounded-[12px] text-center leading-[24px]"
        >
          <uni-icons type="color" color="" size="18" />
        </view>
      </view>

      <view class="flex flex-col">
        <text>待评价</text>
        <view
          class="bg-white h-6 w-6 rounded-[12px] text-center leading-[24px]"
        >
          <uni-icons type="color" color="" size="18" />
        </view>
      </view>

      <view class="flex flex-col">
        <text>售后</text>
        <view
          class="bg-white h-6 w-6 rounded-[12px] text-center leading-[24px]"
        >
          <uni-icons type="color" color="" size="18" />
        </view>
      </view>
    </view>
  </view>
  <!-- 订单 -->
  <view
    class="flex justify-between bg-white shadow-lg rounded-xl m-1.5 p-3 h-16 leading-[64px] w-[363px] text-base font-semibold"
  >
    <text>我的订单</text>
    <navigator url="/pages/orderListPage/orderListPage">查看全部订单</navigator>
  </view>
  <!-- 登录 -->
  <navigator
    url="/pages/loginPage/loginPage"
    open-type="navigate"
    hover-class="navigator-hover"
  >
    登录
  </navigator>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
