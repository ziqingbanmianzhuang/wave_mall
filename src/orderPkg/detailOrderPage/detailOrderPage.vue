<template>
  <!-- 买家信息 -->
  <view class="shadow-lg rounded-xl mx-1.5 px-3 w-[363px] h-32">
    <view
      class="flex items-center justify-start border-b border-slate-300 border-solid w-full"
    >
      <text class="block bg-orange-300 rounded-[8px] mr-3 w-2 h-2"></text>
      <view class="flex flex-col my-3">
        <text class="font-semibold">下单时间</text>
        <text class="text-xs text-slate-300">{{
          orderDetail?.createTime
        }}</text>
      </view>
    </view>
    <view class="flex items-center justify-start my-3 w-full">
      <text class="block bg-orange-300 rounded-[8px] mr-3 w-2 h-2"></text>
      <view
        ><view class="font-semibold">
          <text class="mr-3">{{ orderDetail?.receiverContact }}</text>
          <text>+{{ orderDetail?.receiverMobile }}</text>
        </view>
        <text class="text-xs text-slate-300">{{
          orderDetail?.receiverAddress
        }}</text>
      </view></view
    >
  </view>

  <!-- 订单商品 -->
  <view>
    <view
      v-for="item in orderDetail?.skus"
      :key="item.id"
      class="flex justify-start shadow-lg rounded-xl mx-1.5 px-3 w-[363px] h-32"
    >
      <image
        :src="item.image"
        mode="scaleToFill"
        class="rounded-xl mr-3 w-16 h-16"
      />
      <view class="flex flex-col justify-around">
        <text class="font-semibold">{{ item.name }}</text>
        <text class="text-slate-300 text-xs">{{ item.attrsText }}</text>
        <text class="text-orange-300">X {{ item.quantity }} </text>
      </view>
    </view>
  </view>

  <!-- 评价,售后 -->
  <view class="flex justify-center mt-3 w-full">
    <button
      class="rounded-xl border border-slate-300 border-solid mr-3 w-16 h-8 leading-8"
    >
      去评价
    </button>
    <button
      class="rounded-xl border border-slate-300 border-solid w-16 h-8 font-semibold leading-8"
    >
      去售后
    </button>
  </view>

  <!-- 账目 -->
  <view class="shadow-lg rounded-xl mx-1.5 w-[363px] h-32 font-semibold">
    <view class="flex justify-between items-center">
      <view class="flex items-center">
        <text class="block bg-orange-300 rounded-[8px] mr-3 w-2 h-2"> </text>
        <text>商品总价</text></view
      >
      <text class="text-slate-300 text-xs">{{ orderDetail?.totalMoney }}</text>
    </view>
    <view class="flex justify-between items-center">
      <view class="flex items-center">
        <text class="block bg-orange-300 rounded-[8px] mr-3 w-2 h-2"></text
        ><text>商品运费</text></view
      >
      <text class="text-slate-300 text-xs">{{ orderDetail?.postFee }}</text>
    </view>
    <view class="flex justify-between items-center">
      <view class="flex items-center">
        <text class="block bg-orange-300 rounded-[8px] mr-3 w-2 h-2"></text
        ><text>应付金额</text></view
      >
      <text class="text-orange-300">{{ orderDetail?.payMoney }}</text>
    </view>
  </view>

  <!-- 支付剩余 -->
  <view
    v-if="orderDetail?.orderState === OrderState.DaiFuKuan"
    class="text-center font-semibold"
  >
    <text class="mr-3">应付金额:{{ orderDetail?.payMoney }}</text>
    <text>支付倒计时:{{ orderDetail?.countdown }}</text>
  </view>

  <view v-else class="flex justify-center font-semibold">
    <view class="mr-3">
      {{ orderStateList[orderDetail?.orderState]?.text }}
    </view>
    <navigator
      class="button"
      :url="`/orderPkg/editOrderPage/editOrderPage?orderId=${query.id}`"
      hover-class="none"
    >
      再次购买
    </navigator>
  </view>

  <!-- 取消 or 支付订单 -->
  <view class="flex justify-between mx-1.5 text-white">
    <button class="bg-green-300 rounded-xl w-28 h-8 leading-8">取消订单</button>
    <button class="bg-red-300 rounded-xl w-36 h-8 leading-8">去支付</button>
  </view>
</template>

<script lang="ts" setup>
import type { OrderResult } from "./detailOrdrerPageType";
import { OrderState, orderStateList } from "./detailOrderPageUtils";
import { getMemberOrderByIdAPI } from "./detailOrderPageApi";
import { ref, onMounted } from "vue";

// 获取页面参数
const query = defineProps<{
  id: string;
}>();

// 订单详情
const orderDetail = ref<OrderResult>();

//获取订单详情
const getMemberOrderByIdData = async () => {
  const res = await getMemberOrderByIdAPI(query.id);
  orderDetail.value = res.result;
};

onMounted(() => {
  getMemberOrderByIdData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
