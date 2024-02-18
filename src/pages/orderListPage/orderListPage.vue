<template>
  <!-- tab -->
  <view
    class="flex justify-between border-b border-slate-300 border-solid m-1.5 pb-1.5 w-[363px] h-20"
  >
    <view v-for="item in orderTabs" :key="item.state">
      <view>{{ item.title }}</view>
      <uni-icons type="color" color="" size="24" />
    </view>
  </view>
  <!-- 订单列表 -->
  <scroll-view scroll-y>
    <view v-for="item in 10" :key="item" class="mx-1.5 mb-3">
      <!-- 日期和订单状态 -->
      <view class="flex justify-between w-[363px]">
        <text class="text-xs text-slate-300">2023-12-12</text>
        <text class="font-semibold text-sm">待付款</text>
      </view>
      <!-- 商品图片和信息 -->
      <view class="flex justify-start">
        <image src="" mode="scaleToFill" class="rounded-xl mr-3 h-16 w-16" />
        <view class="flex flex-col">
          <text class="font-semibold">商品名</text>
          <text class="text-xs text-slate-300">商品规格</text>
          <text class="text-xs text-slate-300"
            >您一共买了一件商品,实付:<text class="text-red-300">
              $227</text
            ></text
          >
        </view>
      </view>
      <!-- 按钮 -->
      <view class="flex justify-end">
        <button
          class="border border-slate-300 border-solid mr-3 w-20 h-8 leading-8"
        >
          取消
        </button>
        <button class="border border-slate-600 border-solid w-20 h-8 leading-8">
          支付
        </button>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// tabs 数据
const orderTabs = ref([
  { state: 0, title: "全部" },
  { state: 1, title: "待付款" },
  { state: 2, title: "待发货" },
  { state: 3, title: "待收货" },
  { state: 4, title: "待评价" },
]);
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
