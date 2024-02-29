<template>
  <view class="bg-primary w-full px-1.5">
    <!-- 买家信息 -->
    <view class="bg-secondary border-radius-primary px-3 mb-3 w-full h-32">
      <view
        class="flex items-center justify-start border-b border-slate-300 border-solid w-full"
      >
        <text class="block bg-orange-800 rounded-[8px] mr-3 w-2 h-2"></text>
        <view class="flex flex-col my-3">
          <text class="font-primary-smaller">下单时间</text>
          <text class="font-secondary">{{ orderDetail?.createTime }}</text>
        </view>
      </view>
      <view class="flex items-center justify-start my-3 w-full">
        <text class="block bg-orange-800 rounded-[8px] mr-3 w-2 h-2"></text>
        <view
          ><view class="mr-3 font-primary-smaller">
            <text>{{ orderDetail?.receiverContact }}</text>
            <text>+{{ orderDetail?.receiverMobile }}</text>
          </view>
          <text class="font-secondary">{{ orderDetail?.receiverAddress }}</text>
        </view></view
      >
    </view>

    <!-- 订单商品 -->
    <view>
      <view
        v-for="item in orderDetail?.skus"
        :key="item.id"
        class="relative flex justify-start items-center bg-secondary border-radius-primary mb-3 px-3 py-3 w-full h-fit"
      >
        <image
          :src="item.image"
          mode="aspectFill"
          class="border-radius-primary mr-3 w-16 h-16"
        />
        <view class="flex flex-col justify-around">
          <text class="font-primary">{{ item.name }}</text>
          <text class="font-secondary">{{ item.attrsText }}</text>
          <text class="font-secondary font-yellow">X {{ item.quantity }} </text>
        </view>
        <three-dots></three-dots>
      </view>
    </view>

    <!-- 评价,售后 -->
    <view class="flex justify-center mb-3 w-full">
      <button
        class="border-radius-primary border border-[#FB8A3C] border-solid mr-3 px-6 w-fit h-10 leading-10 text-[#FB8A3C]"
      >
        去售后
      </button>
      <button
        class="bg-[#FB8A3C] border-radius-primary px-6 w-fit h-10 leading-10 text-white"
      >
        去评价
      </button>
    </view>

    <!-- 账目 -->
    <view
      class="flex flex-col justify-around border-radius-primary bg-secondary px-3 mb-3 w-full h-16"
    >
      <view class="flex justify-between items-center">
        <text class="font-secondary">商品总价</text>
        <text class="font-secondary">${{ orderDetail?.totalMoney }}</text>
      </view>
      <view class="flex justify-between items-center">
        <view class="flex items-center">
          <text class="font-secondary">商品运费</text></view
        >
        <text class="font-secondary">${{ orderDetail?.postFee }}</text>
      </view>
      <view class="flex justify-between items-center">
        <view class="flex items-center">
          <text class="font-secondary">应付金额</text></view
        >
        <text class="font-secondary text-orange-800"
          >${{ orderDetail?.payMoney }}</text
        >
      </view>
    </view>

    <!-- 支付剩余 -->
    <view
      v-if="orderDetail?.orderState === OrderState.DaiFuKuan"
      class="flex justify-center mb-3 w-full font-primary-smaller"
    >
      <text class="mr-3">应付金额:{{ orderDetail?.payMoney }}</text>
      <!-- 倒计时组件 -->
      <text>倒计时: </text>
      <uni-countdown
        :second="orderDetail?.countdown"
        color="#000"
        splitor-color="#000"
        :show-day="false"
        :show-colon="false"
        @timeup="timeUp"
      />
    </view>

    <view v-else class="flex justify-center">
      <view class="mr-3 font-primary-smaller font-yellow">
        {{ orderStateList[orderDetail?.orderState]?.text }}
      </view>
      <navigator
        :url="`/orderPkg/editOrderPage/editOrderPage?orderId=${query.id}`"
        hover-class="none"
        class="font-primary-smaller"
      >
        再次购买
      </navigator>
      <view
        v-if="orderDetail?.orderState == OrderState.DaiFaHuo"
        class="button"
        @tap="sendGoodsMock"
      >
        模拟发货
      </view>
      <view
        v-if="orderDetail?.orderState == OrderState.DaiShouHuo"
        class="button"
        @tap="confirmReceiveGoods"
      >
        确认收货
      </view>
    </view>

    <!-- 取消 or 支付订单 -->
    <view class="flex justify-between text-white">
      <button
        class="border border-[#363636] border-solid border-radius-primary px-3 w-fit h-10 leading-10 text-[#363636]"
        @tap="cancelOrder"
      >
        取消订单
      </button>
      <button
        class="bg-[#9A3412] border-radius-primary px-3 w-fit h-10 leading-10"
        @tap="payOrder"
      >
        去支付
      </button>
    </view>
  </view>
  <navigator
    :url="`/pages/orderListPage/orderListPage?orderState=${orderDetail?.orderState}`"
    open-type="navigate"
    hover-class="navigator-hover"
    >查看订单
  </navigator>
</template>

<script lang="ts" setup>
import type { OrderResult } from "./detailOrdrerPageType";
import { OrderState, orderStateList } from "./detailOrderPageUtils";
import {
  getMemberOrderByIdAPI,
  getPayMockAPI,
  getMemberOrderConsignmentByIdAPI,
  putMemberOrderReceiptByIdAPI,
  getMemberOrderCancelByIdAPI,
} from "./detailOrderPageApi";
import { ref, onMounted } from "vue";
import threeDots from "../../components/threeDots/threeDots.vue";

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

  //动态设置标题
  uni.setNavigationBarTitle({
    title: orderStateList[orderDetail.value?.orderState]?.text,
  });
});

//倒计时结束的时候,修改订单状态为已取消
const timeUp = () => {
  orderDetail.value.orderState = OrderState.YiQuXiao;
};

//支付订单
// 订单支付
const payOrder = async () => {
  await getPayMockAPI({ orderId: query.id });

  // 跳转支付结果页
  uni.redirectTo({ url: `/orderPkg/payResPage/payResPage?id=${query.id}` });
};

// 模拟发货
const sendGoodsMock = async () => {
  await getMemberOrderConsignmentByIdAPI(query.id);
  uni.showToast({ icon: "success", title: "模拟发货完成" });
  // 主动更新订单状态
  orderDetail.value!.orderState = OrderState.DaiShouHuo;
};

//确认收货
// 确认收货
const confirmReceiveGoods = () => {
  // 二次确认弹窗
  uni.showModal({
    content: "为保障您的权益，请收到货并确认无误后，再确认收货",
    success: async (success) => {
      if (success.confirm) {
        const res = await putMemberOrderReceiptByIdAPI(query.id);
        // 更新订单状态
        orderDetail.value = res.result;
      }
    },
  });
};

//取消订单
const cancelOrder = () => {
  getMemberOrderCancelByIdAPI(query.id, { cancelReason: "不想要了" });
  uni.navigateBack({});
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
