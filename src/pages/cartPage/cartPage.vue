<template>
  <template v-if="profileStore.profile">
    <!-- 选择所有商品 -->
    <view class="shadow-lg my-3 mx-1.5 rounded-xl px-3 w-[363px] h-8">
      <checkbox value="全选" :checked="selectedAll" @tap="checkChangeAll" />
      <text class="text-gray-300">选择所有商品</text>
    </view>
    <!-- 商品数量 -->
    <view class="my-3 text-center text-slate-300"
      >商品数量:<text class="font-semibold text-black">{{
        cartList.length
      }}</text></view
    >
    <!-- 购物车列表 -->
    <!-- 购物车 -->
    <scroll-view scroll-y class="h-[320px]">
      <uni-swipe-action class="h-[320px]">
        <uni-swipe-action-item
          v-for="item in cartList"
          :key="item.id"
          class="m-1.5 w-[363px] h-36"
        >
          <view class="flex items-center w-[363px] h-36">
            <!-- 商品 -->
            <view
              class="flex justify-between items-center relative shadow-lg rounded-xl border border-slate-300 border-solid mr-3 pl-3 w-[300px]"
            >
              <checkbox
                value=""
                :checked="item.selected"
                class="mr-3"
                @tap="checkChange(item)"
              />
              <view class="flex flex-col mr-3">
                <image
                  :src="item.picture"
                  mode="scaleToFill"
                  class="rounded-xl border border-slate-300 border-solid mb-3 w-20 h-20"
                />
                <text class="text-gray-300">{{ item.attrsText }}</text>
              </view>
              <view class="flex flex-col mr-3">
                <text class="font-semibold">{{ item.name }}</text>
                <text class="text-orange-300"
                  >{{ item.price }} / {{ item.nowPrice }}</text
                >
              </view>
              <view class="absolute right-3 top-3 flex">
                <text
                  v-for="it in 3"
                  :key="it"
                  class="bg-black rounded m-0.5 h-2 w-2"
                ></text>
              </view>
            </view>
            <!-- 数量 -->
            <view
              class="flex flex-col justify-around items-center shadow-lg rounded-xl px-3 w-[50px] h-36 text-slate-300"
            >
              <text
                class="font-semibold text-2xl"
                @tap="changeGoodsNum('cut', item)"
                >-</text
              >
              <text class="text-red-300">{{ item.count }}</text>
              <text
                class="font-semibold text-2xl"
                @tap="changeGoodsNum('add', item)"
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
    <view class="flex justify-around w-[300px] text-sm">
      <view
        ><text class="text-gray-300 font-semibold">总共</text>
        <text class="font-semibold">{{ selectedCartListMoney }}</text></view
      >
      <view
        ><text class="text-gray-300 font-semibold">购买数量</text
        ><text class="font-semibold">{{ selectedCartListCount }}</text></view
      >
    </view>
    <!-- 结算 -->
    <view class="flex justify-between mx-1.5 mt-6">
      <view class="flex">
        <uni-icons type="left"></uni-icons>
        <text class="font-semibold">继续购物</text>
      </view>
      <button
        class="bg-blue-300 rounded-xl w-36 h-8 leading-8 font-semibold text-center text-sm"
        @tap="gotoPayment"
      >
        去结算
      </button>
    </view>
  </template>
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
import { ref, onMounted, computed } from "vue";
import { useProfileStore } from "../../store/profile/index";
import {
  getMemberCartAPI,
  deleteMemberCartAPI,
  putMemberCartBySkuIdAPI,
  putMemberCartSelectedAPI,
} from "./cartPageApi";
import type { CartItem } from "./cartPage";

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
onMounted(() => {
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
  type === "add" ? good.count++ : good.count--;
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
  uni.navigateTo({ url: "/orderPkg/editorOrderPage/editorOrderPage" });
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
