<template>
  <!-- 新建地址 -->
  <view
    class="box-border flex bg-blue-100 rounded-xl m-1.5 mb-3 px-1.5 w-[363px] h-8 leading-[32px] font-semibold"
  >
    <uni-icons type="plusempty" class="mr-1.5"></uni-icons>
    <navigator
      url="/subPkg/addressFormPage/addressFormPage"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      新建地址
    </navigator>
  </view>
  <!-- 默认地址 -->
  <text class="m-1.5 font-semibold">默认地址</text>
  <view
    class="relative flex flex-col shadow-xl rounded-xl m-1.5 mb-3 px-1.5 w-[363px] h-32 leading-[32px] font-semibold"
  >
    <text class="">{{ defaultAddress.contact }}</text>
    <text>{{ defaultAddress.receiver }}</text>
    <text class="border-b borde-slate-300 border-solid text-gray-300 text-xs">{{
      defaultAddress.fullLocation
    }}</text>
    <text class="block mt-3 text-xs">修改地址 -></text>
    <view class="flex absolute right-6 top-6">
      <text
        v-for="item in 3"
        :key="item"
        class="block bg-black rounded mx-0.5 h-2 w-2"
      ></text>
    </view>
    <view class="flex absolute right-6 bottom-6">
      <text
        v-for="item in 3"
        :key="item"
        class="block bg-slate-200 rounded mx-0.5 h-1 w-1"
      ></text>
    </view>
  </view>
  <!-- 其他地址 -->
  <text class="m-1.5 font-semibold">其他地址</text>
  <view
    v-if="addressList.length"
    class="shadow-xl rounded-xl m-1.5 mb-3 p-1.5 w-[363px] font-semibold"
  >
    <view
      v-for="item in addressList"
      :key="item.id"
      class="relative border-b borde-slate-300 border-solid mb-3 p-3"
    >
      <view>
        <text class="mr-1.5"> {{ item.receiver }}</text>
        <text>{{ item.contact }}</text>
      </view>
      <text class="text-gray-300 text-xs"
        >{{ item.fullLocation }} {{ item.address }}</text
      >
      <view class="absolute right-1.5 top-1.5">
        <uni-icons type="forward" color="" size="24" />
      </view>
      <text
        class="absolute left-0 top-8 block bg-black rounded mx-0.5 h-2 w-2"
      ></text>
    </view>
  </view>
  <view v-else>暂无收货地址</view>
</template>

<script lang="ts" setup>
import { getMemberAddressAPI } from "./addressPageApi";
import type { AddressItem } from "./addressPageType";
import { onShow } from "@dcloudio/uni-app";
import { ref, computed } from "vue";

// 收货地址列表数据
const addressList = ref<AddressItem[]>([]);

// 默认地址
const defaultAddress = computed(() => {
  return addressList.value.find((add) => add.isDefault === 1);
});

// 获取收货地址列表数据
const getMemberAddressData = async () => {
  const res = await getMemberAddressAPI();
  addressList.value = res.result;
};

// 初始化调用(页面显示)
onShow(() => {
  getMemberAddressData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
