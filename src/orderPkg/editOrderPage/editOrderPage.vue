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
    v-for="good in orderData.goods"
    :key="good.id"
    class="flex items-center shadow-lg rounded-xl mx-1.5 mb-3 px-1.5 w-[363px] h-32"
  >
    <view class="bg-red-300 rounded-[8px] h-2 w-2"></view>
    <image
      class="rounded-xl w-16 h-16"
      :src="good.picture"
      mode="scaleToFill"
    />
    <view class="flex flex-col flex-1">
      <text class="font-semibold">{{ good.name }}</text>
      <text class="text-xs text-slate-300">{{ good.attrsText }}</text>
      <view class="flex justify-between"
        ><text class="text-red-300 font-semibold">{{ good.totalPrice }}</text
        ><text class="font-semibold"> X {{ good.count }}</text></view
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
        <text>${{ orderData.summary.totalPrice }}</text>
        <text>${{ orderData.summary.postFee }}</text>
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
      <text class="text-red-300">${{ orderData.summary.totalPayPrice }}</text>
      <text class="text-slate-300">黄色小象</text>
    </view>
    <button class="bg-green-400 rounded-xl text-white w-16 h-8 leading-8">
      提交订单
    </button>
  </view>
</template>

<script setup lang="ts">
import { getMemberOrderPreAPI } from "./editOrderPageApi";
import type { OrderPreResult } from "./editOrderPageType";
import { onMounted, ref } from "vue";

//订单数据
let orderData = ref<OrderPreResult>();

// 获取订单预付数据
const getMemberOrderPreData = async () => {
  const res = await getMemberOrderPreAPI();
  orderData.value = res.result;
};

onMounted(() => {
  getMemberOrderPreData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
