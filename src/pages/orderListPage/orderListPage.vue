<template>
  <!-- tab -->
  <view
    class="flex justify-between border-b border-slate-300 border-solid margin-x-primary my-1.5 pb-1.5 w-[363px] h-16"
  >
    <view
      v-for="item in orderTabs"
      :key="item?.state"
      class="flex flex-col items-center justify-around"
    >
      <uni-icons :type="item.type" :color="item.color" size="20" />
      <view class="font-primary">{{ item.title }}</view>
    </view>
  </view>
  <view v-show="!isLoading">
    <swiper
      :current="activeIndex"
      @change="activeIndex = $event.detail.current"
    >
      <swiper-item v-for="tab in orderTabs" :key="tab?.state" class="h-96">
        <!-- 订单列表 -->
        <scroll-view scroll-y class="h-96">
          <tempalte v-if="orderList.length"
            ><view
              v-for="order in orderList"
              :key="order.id"
              class="mx-1.5 mb-3"
            >
              <!-- 日期和订单状态 -->
              <view class="flex justify-between w-[363px]">
                <text class="text-xs text-slate-300">{{
                  order.createTime
                }}</text>
                <text class="font-semibold text-sm">{{
                  orderStateList[order.orderState].text
                }}</text>
              </view>
              <!-- 商品图片和信息 -->
              <navigator
                v-for="item in order.skus"
                :key="item.id"
                class="goods"
                :url="`/pagesOrder/detail/detail?id=${order.id}`"
                hover-class="none"
              >
                <view class="flex justify-start">
                  <image
                    src=""
                    mode="scaleToFill"
                    class="rounded-xl mr-3 h-16 w-16"
                  />
                  <view class="flex flex-col">
                    <text class="font-semibold">{{ item.name }}</text>
                    <text class="text-xs text-slate-300">商品规格</text>
                    <text class="text-xs text-slate-300"
                      >共{{ order.totalNum }}件商品,实付:<text
                        class="text-red-300"
                      >
                        ${{ order.payMoney }}</text
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
                  <template v-if="order.orderState === OrderState.DaiFuKuan">
                    <button
                      class="border border-slate-600 border-solid w-20 h-8 leading-8"
                    >
                      去支付
                    </button>
                  </template>

                  <template v-else
                    ><button>再次购买</button>
                    <button>确认收货</button></template
                  >
                </view>
              </navigator>
            </view></tempalte
          >
          <tempalte v-else>暂无订单</tempalte>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
  <doubleCircleLoading v-show="isLoading"></doubleCircleLoading>
</template>

<script lang="ts" setup>
import { OrderState, orderStateList } from "./detailOrderPageUtils";
import { getMemberOrderAPI } from "./orderListPageApi";
import type { OrderItem, OrderListParams } from "./orderListPageType";
import { onMounted, ref } from "vue";

import doubleCircleLoading from "../../components/doubleCirlcleLoading/doubleCircleLoading.vue";
import { globalLoadingHook } from "../../hooks/globalLoadingHook";
const { isLoading, setLoading } = globalLoadingHook();

// 获取页面参数
const query = defineProps<{
  type: string;
}>();

// tabs 数据
const orderTabs = ref([
  { state: 0, title: "全部", color: "#22c55e", type: "star-filled" },
  { state: 1, title: "待付款", color: "#637ff1", type: "weixin" },
  { state: 2, title: "待发货", color: "#fdba74", type: "cart-filled" },
  { state: 3, title: "待收货", color: "#c2410c", type: "auth-filled" },
  { state: 4, title: "待评价", color: "#f5c60b", type: "chatboxes-filled" },
]);

// 高亮下标
const activeIndex = ref(
  orderTabs.value.findIndex((v) => v?.state === Number(query.type)),
);

// 请求参数
const queryParams: OrderListParams = {
  page: 1,
  pageSize: 5,
  orderState: orderTabs.value[activeIndex.value]?.state,
};

// 获取订单列表
const orderList = ref<OrderItem[]>([]);
const getMemberOrderData = async () => {
  setLoading(true);
  const res = await getMemberOrderAPI(queryParams);
  orderList.value = res.result.items;
  setLoading(false);
};

onMounted(() => {
  getMemberOrderData();
});
</script>

<style lang="scss" scoped></style>
