<template>
  <!-- 选择收货地址 -->
  <view
    class="box-border flex bg-blue-100 rounded-xl m-1.5 mb-3 px-1.5 w-[363px] h-32 leading-[32px] font-semibold"
  >
    <navigator
      url="/subPkg/addressPage/addressPage"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <uni-icons type="plusempty" class="mr-1.5"></uni-icons>
      <text>请选择收货地址</text>
      <view class="user">
        {{ selecteAddress?.receiver }} {{ selecteAddress?.contact }}
      </view>
      <view class="address">
        {{ selecteAddress?.fullLocation }} {{ selecteAddress?.address }}
      </view>
    </navigator>
  </view>

  <!-- 商品信息 -->
  <view
    v-for="good in orderData?.goods"
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
        <text>${{ orderData?.summary.totalPrice }}</text>
        <text>${{ orderData?.summary.postFee }}</text>
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
        <uni-data-select
          v-model="activeIndex"
          :localdata="deliveryList"
          :label="activeDelivery"
          @change="changeDelivery"
        >
        </uni-data-select>
        <text>建议留言</text>
      </view>
    </view>
  </view>
  <!--提交订单 -->
  <view
    class="flex justify-between items-center bg-blue-300 rounded-xl mx-1.5 px-1.5 w-[363px] h-32 font-semibold text-xs"
  >
    <view class="flex flex-col">
      <text class="text-red-300">${{ orderData?.summary.totalPayPrice }}</text>
      <text class="text-slate-300">黄色小象</text>
    </view>
    <button
      class="bg-green-400 rounded-xl text-white w-16 h-8 leading-8"
      @tap="orderSubmit"
    >
      提交订单
    </button>
  </view>
</template>

<script setup lang="ts">
import {
  getMemberOrderPreAPI,
  getMemberOrderPreBySkuIDAPI,
  postMemberOrderAPI,
} from "./editOrderPageApi";
import type { OrderPreResult } from "./editOrderPageType";
import { onMounted, ref, computed } from "vue";
import { useAddressStore } from "../../store/address/index";

// 页面参数
const query = defineProps<{
  skuId?: string;
  count?: string;
}>();

//订单数据
let orderData = ref<OrderPreResult>();

// 获取订单预付数据
const getMemberOrderPreData = async () => {
  // 是否有立即购买参数
  if (query.count && query.skuId) {
    // 调用立即购买 API
    const res = await getMemberOrderPreBySkuIDAPI({
      count: query.count,
      skuId: query.skuId,
    });
    orderData.value = res.result;
  } else {
    const res = await getMemberOrderPreAPI();
    orderData.value = res.result;
  }
};

//pinia中的地址
const addressStore = useAddressStore();

// 收货地址
const selecteAddress = computed(() => {
  return (
    addressStore.selectedAddress ||
    orderData.value?.userAddresses.find((v) => v.isDefault)
  );
});

//// 订单备注
const buyerMessage = ref("");
// 配送时间
const deliveryList = ref([
  { type: 1, text: "时间不限 (周一至周日)" },
  { type: 2, text: "工作日送 (周一至周五)" },
  { type: 3, text: "周末配送 (周六至周日)" },
]);
// 当前配送时间下标
const activeIndex = ref(0);
// 当前配送时间
const activeDelivery = computed(() => deliveryList.value[activeIndex.value]);
// 修改配送时间
const changeDelivery: UniHelper.SelectorPickerOnChange = (ev) => {
  activeIndex.value = ev?.detail.value;
};

// 提交订单
const orderSubmit = async () => {
  // 没有收货地址提醒
  if (!selecteAddress.value?.id) {
    return uni.showToast({ icon: "none", title: "请选择收货地址" });
  }
  // 发送请求
  const res = await postMemberOrderAPI({
    addressId: selecteAddress.value?.id,
    buyerMessage: buyerMessage.value,
    deliveryTimeType: activeDelivery.value?.type,
    goods: orderData.value!.goods.map((v) => ({
      count: v.count,
      skuId: v.skuId,
    })),
    payChannel: 2,
    payType: 1,
  });
  // 关闭当前页面，跳转到订单详情，传递订单id
  uni.redirectTo({
    url: `/orderPkg/detailOrderPage/detailOrderPage?id=${res.result.id}`,
  });
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
