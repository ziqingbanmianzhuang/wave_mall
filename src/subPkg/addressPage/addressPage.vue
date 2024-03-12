<template>
  <view v-show="!isLoading" class="bg-primary w-full px-1.5">
    <!-- 新建地址 -->
    <view
      class="box-border flex items-center bg-[#e0e0e0] border-radius-primary mb-3 px-1.5 w-full h-10"
    >
      <i class="iconfont icon-jia font-primary-smaller"></i>
      <navigator
        url="/subPkg/addressFormPage/addressFormPage"
        open-type="navigate"
        hover-class="navigator-hover"
        class="font-primary-smaller"
      >
        新建地址
      </navigator>
    </view>
    <!-- 默认地址 -->
    <text class="mb-3 font-primary">默认地址</text>
    <view
      class="relative flex flex-col bg-secondary border-radius-primary mb-3 p-1.5 w-full h-28"
    >
      <text class="mb-3 font-primary-smaller"
        >+{{ defaultAddress?.contact }}</text
      >
      <text class="font-primary-smaller">{{ defaultAddress?.receiver }}</text>
      <text class="border-b borde-slate-300 border-solid pb-1.5 font-secondary"
        >地址:{{ defaultAddress?.fullLocation }}</text
      >

      <threeDots></threeDots>
      <navigator
        :url="`/subPkg/addressFormPage/addressFormPage?id=${defaultAddress?.id}`"
        open-type="navigate"
        hover-class="navigator-hover"
        class="flex absolute right-1.5 bottom-1.5"
      >
        <i class="iconfont icon-wentifankui font-primary-smaller"></i>
      </navigator>
    </view>
    <!-- 其他地址 -->
    <text class="mb-3 font-primary">其他地址</text>
    <view
      v-if="addressList.length"
      class="bg-secondary border-radius-primary mb-3 p-1.5 w-full"
    >
      <view
        v-for="item in addressList"
        :key="item.id"
        class="relative flex items-center justify-between border-b borde-slate-300 border-solid mb-3 p-3"
        @tap="onChangeAddress(item)"
      >
        <view class="margin-x-primary"
          ><view>
            <text class="mr-1.5 font-primary-smaller">
              {{ item.receiver }}</text
            >
            <text class="font-primary-smaller">+{{ item.contact }}</text>
          </view>
          <text class="font-secondary"
            >{{ item.fullLocation }} {{ item.address }}</text
          ></view
        >
        <navigator
          :url="`/subPkg/addressFormPage/addressFormPage?id=${item.id}`"
          open-type="navigate"
          hover-class="navigator-hover"
          class=""
        >
          <uni-icons type="forward" color="" size="20" />
        </navigator>
        <text
          class="absolute left-1.5 top-1/2 -translate-x-1/2 block bg-orange-800 rounded mx-0.5 h-2 w-2"
        ></text>
      </view>
    </view>
    <view v-else>暂无收货地址</view>
  </view>
  <doubleCircleLoading v-show="isLoading"></doubleCircleLoading>
</template>

<script lang="ts" setup>
import { getMemberAddressAPI } from "./addressPageApi";
import { onShow } from "@dcloudio/uni-app";
import type { AddressItem } from "./addressPageType";
import { useAddressStore } from "../../store/address";
import { ref, computed } from "vue";
import threeDots from "../../components/threeDots/threeDots.vue";

import doubleCircleLoading from "../../components/doubleCirlcleLoading/doubleCircleLoading.vue";
import { globalLoadingHook } from "../../hooks/globalLoadingHook";
const { isLoading, setLoading } = globalLoadingHook();

// 收货地址列表数据
const addressList = ref<AddressItem[]>([]);

// 默认地址
const defaultAddress = computed(() => {
  return addressList.value.find((add) => add.isDefault === 1);
});

// 获取收货地址列表数据
const getMemberAddressData = async () => {
  setLoading(true);
  const res = await getMemberAddressAPI();
  addressList.value = res.result;
  setLoading(false);
};

// 修改收货地址
const onChangeAddress = (item: AddressItem) => {
  // 修改选中收货地址
  const addressStore = useAddressStore();
  addressStore.changeSelectedAddress(item);
  // 返回上一页
  uni.navigateBack();
};

// 初始化调用(页面显示)
onShow(() => {
  getMemberAddressData();
});
</script>

<style lang="scss" scoped></style>
