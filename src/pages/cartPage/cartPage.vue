<template>
  <view v-if="profileStore.profile" class="bg-primary">
    <!-- 选择所有商品 -->
    <view
      class="bg-secondary my-3 margin-x-primary border-radius-primary px-3 w-[363px] h-8"
    >
      <checkbox value="全选" :checked="selectedAll" @tap="checkChangeAll" />
      <text class="font-primary-smaller">选择所有商品</text>
    </view>
    <!-- 商品数量 -->
    <view class="my-3 font-secondary text-center"
      >商品数量:
      <text class="font-primary-smaller">x{{ cartList.length }}</text></view
    >
    <!-- 购物车列表 -->
    <!-- 购物车 -->
    <scroll-view scroll-y class="h-[320px]">
      <uni-swipe-action class="h-[320px]">
        <uni-swipe-action-item
          v-for="item in cartList"
          :key="item.id"
          class="margin-x-primary my-1.5 w-[363px] h-36"
        >
          <view class="flex items-center w-[363px] h-36">
            <!-- 商品 -->
            <view
              class="bg-secondary flex justify-between items-center relative border-radius-primary mr-3 pl-3 w-[300px] h-36"
            >
              <!-- checkbox -->
              <checkbox
                value=""
                :checked="item.selected"
                class="mr-3"
                @tap="checkChange(item)"
              />
              <!-- 图片和desc -->
              <view class="flex flex-col mr-3">
                <image
                  :src="item.picture"
                  mode="aspectFill"
                  class="border-radius-primary mb-3 w-20 h-20"
                />
                <text class="font-secondary">{{ item.attrsText }}</text>
              </view>
              <!-- 名称，价格 -->
              <view class="flex flex-col mr-3">
                <text class="font-primary-smaller">{{ item.name }}</text>
                <text class="font-secondary font-yellow"
                  >{{ item.price }} / {{ item.nowPrice }}</text
                >
              </view>
              <!-- threeDots -->
              <view class="absolute right-3 top-3 flex">
                <threeDots></threeDots>
              </view>
            </view>
            <!-- 数量 -->
            <view
              class="flex flex-col justify-around items-center bg-secondary border-radius-primary px-3 w-[50px] h-36"
            >
              <text class="font-primary" @tap="changeGoodsNum('cut', item)"
                >-</text
              >
              <text class="font-secondary font-yellow">{{ item.count }}</text>
              <text class="font-primary" @tap="changeGoodsNum('add', item)"
                >+</text
              >
            </view>
          </view>
          <!-- 插槽 -->
          <template #right>
            <view
              class="bg-orange-300 w-[50px] h-36 leading-[144px] text-white text-center"
              @tap="onDeleteCart(item.skuId)"
              ><text>删除</text></view
            >
          </template>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </scroll-view>
    <!-- 总计 -->
    <view class="flex justify-around margin-x-primary w-full">
      <view
        ><text class="font-secondary">总共：</text>
        <text class="font-primary-smaller"
          >￥{{ selectedCartListMoney }}</text
        ></view
      >
      <view
        ><text class="font-secondary">购买数量：</text
        ><text class="font-primary-smaller"
          >x{{ selectedCartListCount }}</text
        ></view
      >
    </view>
    <!-- 结算 -->
    <view class="flex justify-between items-center margin-x-primary mt-6">
      <view class="flex">
        <uni-icons type="left" size="20"></uni-icons>
        <navigator
          class="font-primary-smaller"
          url="/pages/categoryPage/categoryPage"
          open-type="switchTab"
          >继续购物</navigator
        >
      </view>
      <button
        class="bg-orange-800 border-radius-primary w-36 h-8 leading-8 font-semibold text-center text-sm text-white"
        @tap="gotoPayment"
      >
        去结算
      </button>
    </view>
  </view>
  <template v-else>
    <text>登录后可查看您的购物车</text>
    <navigator
      url="/pages/loginPage/loginPage"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      <button>去登录</button>
    </navigator>
  </template>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useProfileStore } from "../../store/profile/index";
import {
  getMemberCartAPI,
  deleteMemberCartAPI,
  putMemberCartBySkuIdAPI,
  putMemberCartSelectedAPI,
} from "./cartPageApi";
import type { CartItem } from "./cartPage";
import threeDots from "../../components/threeDots/threeDots.vue";

// 获取会员Store
const profileStore = useProfileStore();

// 购物车数据
const cartList = ref<CartItem[]>([]);

//获取购物车列表
const getMemberCartData = async () => {
  const res = await getMemberCartAPI();
  cartList.value = res.result;
};

// 初始化调用: 页面显示触发
onShow(() => {
  // 用户已登录才允许调用
  if (profileStore.profile) {
    getMemberCartData();
  }
});

// 点击删除按钮
const onDeleteCart = (skuId: string) => {
  // 弹窗二次确认
  uni.showModal({
    content: "是否删除",
    success: async (res) => {
      if (res.confirm) {
        // 后端删除单品
        await deleteMemberCartAPI({ ids: [skuId] });
        // 重新获取列表
        getMemberCartData();
      }
    },
  });
};

// 修改选中状态-单品修改
const checkChange = (item: CartItem) => {
  // 前端数据更新-是否选中取反
  item.selected = !item.selected;
  // 后端数据更新
  putMemberCartBySkuIdAPI(item.skuId, { selected: item.selected });
};

// 计算全选状态
const selectedAll = computed(() => {
  return cartList.value.length && cartList.value.every((v) => v.selected);
});

//商品数量修改
const changeGoodsNum = (type: string, good: CartItem) => {
  let hander: {
    [key: string]: () => void;
  } = {
    add: () => {
      good.count <= good.stock
        ? good.count++
        : uni.showModal({ title: "不能再加啦，存货不够啦" });
    },
    cut: () => {
      good.count > 1 ? good.count-- : uni.showModal({ title: "不能再减了噢" });
    },
  };
  hander[type]();
  putMemberCartBySkuIdAPI(good.skuId, { count: good.count });
};

// 全选修改
const checkChangeAll = () => {
  const _isSelectedAll = !selectedAll.value;
  console.log("change-------");

  cartList.value.forEach((item) => {
    item.selected = _isSelectedAll;
  });

  putMemberCartSelectedAPI({ selected: _isSelectedAll });
};

// 计算选中单品列表
const selectedCartList = computed(() => {
  return cartList.value.filter((v) => v.selected);
});

// 计算选中总件数
const selectedCartListCount = computed(() => {
  return selectedCartList.value.reduce((sum, item) => sum + item.count, 0);
});

// 计算选中总金额
const selectedCartListMoney = computed(() => {
  return selectedCartList.value
    .reduce((sum, item) => sum + item.count * item.nowPrice, 0)
    .toFixed(2);
});

// 结算按钮
const gotoPayment = () => {
  if (selectedCartListCount.value === 0) {
    return uni.showToast({
      icon: "none",
      title: "请选择商品",
    });
  }
  // 跳转到结算页
  uni.navigateTo({ url: "/orderPkg/editOrderPage/editOrderPage" });
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
