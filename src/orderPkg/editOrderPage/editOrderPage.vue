<template>
  <view class="bg-primary w-full">
    <!-- 选择收货地址 -->
    <view
      class="box-border flex items-center bg-sky-100 border-radius-primary margin-x-primary my-1.5 mb-3 px-3 w-[363px] h-12 leading-[32px]"
    >
      <navigator
        url="/subPkg/addressPage/addressPage"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <view v-if="selecteAddress" class="flex items-center">
          <uni-icons type="home" color="#fdba74" size="20" />
          <view class="ml-1.5">
            <view class="font-primary-smaller">
              {{ selecteAddress?.receiver }} +{{ selecteAddress?.contact }}
            </view>
            <view class="font-secondary">
              {{ selecteAddress?.fullLocation }}
              {{ selecteAddress?.address }}
            </view>
          </view>
        </view>
        <template v-else>
          <uni-icons type="plusempty" class="mr-1.5" size="20"></uni-icons>
          <text class="font-primary">请选择收货地址</text>
        </template>
      </navigator>
    </view>

    <!-- 商品信息 -->
    <view
      v-for="good in orderData?.goods"
      :key="good.id"
      class="flex justify-between items-center bg-secondary border-radius-primary margin-x-primary mb-3 px-1.5 w-[363px] h-32"
    >
      <view class="bg-orange-500 rounded-[8px] mr-3 h-2 w-2"></view>
      <image
        class="border-radius-primary mr-3 w-16 h-16"
        :src="good.picture"
        mode="aspectFill"
      />
      <view class="flex flex-col flex-1">
        <text class="font-primary-smaller">{{ good.name }}</text>
        <text class="font-secondary">{{ good.attrsText }}</text>
        <view class="flex justify-between"
          ><text class="font-secondary font-yellow">{{ good.totalPrice }}</text
          ><text class="font-secondary"> X {{ good.count }}</text></view
        >
      </view>
    </view>

    <!-- 商品订单信息 -->
    <view
      class="bg-secondary border-radius-primary margin-x-primary mb-3 px-1.5 w-[363px] h-40"
    >
      <view
        class="flex justify-between items-center border-b border-slate-300 border-solid pb-3"
      >
        <view class="flex items-center">
          <view class="bg-orange-500 mr-3 rounded-[8px] h-2 w-2"></view>
          <view class="flex flex-col">
            <text class="font-primary-smaller">商品总价</text>
            <text class="font-primary-smaller">商品运费</text>
          </view>
        </view>
        <view class="flex flex-col">
          <text class="font-secondary font-yellow"
            >${{ orderData?.summary.totalPrice }}</text
          >
          <text class="font-secondary font-yellow"
            >${{ orderData?.summary.postFee }}</text
          >
        </view>
      </view>
      <view
        class="flex justify-between items-center border-b border-slate-300 border-solid pb-3"
      >
        <view class="flex items-center">
          <view class="bg-orange-500 mr-3 rounded-[8px] h-2 w-2"></view>
          <view class="flex flex-col">
            <text class="font-primary-smaller">配送时间</text>
            <text class="font-primary-smaller">订单备注</text>
          </view>
        </view>
        <view class="flex flex-col items-end">
          <uni-data-select
            v-model="activeIndex"
            style="width: 170px"
            placeholder="时间不限"
            :localdata="deliveryList"
            :label="activeDelivery"
            class="w-20 font-secondary"
            @change="changeDelivery"
          >
          </uni-data-select>
          <text class="font-secondary">建议留言</text>
        </view>
      </view>
    </view>
    <!--提交订单 -->
    <view
      class="flex justify-between items-center bg-sky-100 border-radius-primary margin-x-primary px-1.5 w-[363px] h-16"
    >
      <view class="flex flex-col justify-around h-full">
        <text class="font-primary font-yellow"
          >${{ orderData?.summary.totalPayPrice }}</text
        >
        <text class="font-secondary">黄色小象</text>
      </view>
      <button
        class="bg-[#266972] border-radius-primary text-white w-16 h-8 leading-8 font-primary-smaller"
        @tap="orderSubmit"
      >
        提交订单
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  getMemberOrderPreAPI,
  getMemberOrderPreBySkuIDAPI,
  postMemberOrderAPI,
  getMemberOrderRepurchaseByIdAPI,
} from "./editOrderPageApi";
import type { OrderPreResult } from "./editOrderPageType";
import { onMounted, ref, computed } from "vue";
import { useAddressStore } from "../../store/address/index";

// 页面参数
const query = defineProps<{
  skuId?: string;
  count?: string;
  orderId?: string;
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
  } else if (query.orderId) {
    // 再次购买
    const res = await getMemberOrderRepurchaseByIdAPI(query.orderId);
    orderData.value = res.result;
  } else {
    const res = await getMemberOrderPreAPI();
    console.log("getMemberOrderPreAPI", res);

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
