<template>
  <!-- 选择收货地址 -->
  <view
    class="box-border flex bg-blue-100 rounded-xl m-1.5 mb-3 px-1.5 w-[363px] h-8 leading-[32px] font-semibold"
  >
    <uni-icons type="plusempty" class="mr-1.5"></uni-icons>
    <navigator
      url="/subPkg/addressFormPage/addressFormPage"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      请选择收货地址
    </navigator>
  </view>

  <!-- 商品信息 -->
  <view
    class="flex items-center shadow-lg rounded-xl mx-1.5 mb-3 px-1.5 w-[363px] h-32"
  >
    <view class="bg-red-300 rounded-[8px] h-2 w-2"></view>
    <image class="rounded-xl w-16 h-16" src="" mode="scaleToFill" />
    <view class="flex flex-col flex-1">
      <text class="font-semibold">商品名</text>
      <text class="text-xs text-slate-300">11 22 33</text>
      <view class="flex justify-between"
        ><text class="text-red-300 font-semibold">$11.00</text
        ><text class="font-semibold">X1</text></view
      >
    </view>
  </view>

  <!-- 商品订单信息 -->
  <view class="shadow-lg rounded-xl mx-1.5 mb-3 px-1.5 w-[363px] h-40">
    <view
      class="flex justify-between items-center border-b border-slate-300 border-solid pb-3"
    >
      <view class="flex items-center">
        <view class="bg-orange-300 mr-3 rounded-[8px] h-2 w-2"></view>
        <view class="flex flex-col font-semibold">
          <text>商品总价</text>
          <text>商品运费</text>
        </view>
      </view>
      <view class="flex flex-col text-xs font-semibold text-red-300">
        <text>$69</text>
        <text>$8</text>
      </view>
    </view>
    <view
      class="flex justify-between items-center border-b border-slate-300 border-solid pb-3"
    >
      <view class="flex items-center">
        <view class="bg-orange-300 mr-3 rounded-[8px] h-2 w-2"></view>
        <view class="flex flex-col font-semibold">
          <text>配送时间</text>
          <text>订单备注</text>
        </view>
      </view>
      <view class="flex flex-col text-xs font-semibold text-slate-300">
        <text>时间不限</text>
        <text>建议留言</text>
      </view>
    </view>
  </view>
  <!--提交订单 -->
  <view
    class="flex justify-between items-center bg-blue-300 rounded-xl mx-1.5 px-1.5 w-[363px] h-32 font-semibold text-xs"
  >
    <view class="flex flex-col">
      <text class="text-red-300">$120.00</text>
      <text class="text-slate-300">黄色小象</text>
    </view>
    <button class="bg-green-400 rounded-xl text-white w-16 h-8 leading-8">
      提交订单
    </button>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
