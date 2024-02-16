<template>
  <template v-if="profileStore.profile">
    <!-- 选择所有商品 -->
    <view class="shadow-lg my-3 mx-1.5 rounded-xl px-3 w-[363px] h-8">
      <checkbox value="全选" :checked="false" />
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
          class="flex justify-between m-1.5 w-[363px] h-36"
        >
          <view>
            <!-- 商品 -->
            <view class="relative flex items-center w-[363px] h-36">
              <view
                class="shadow-lg rounded-xl border border-slate-300 border-solid mr-3 pl-3 w-[300px]"
              >
                <checkbox value="" :checked="false" class="mr-3" />
                <view class="flex flex-col mr-3">
                  <image
                    src=""
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
                <text class="font-semibold text-2xl">-</text>
                <text class="text-red-300">{{ item.count }}</text>
                <text class="font-semibold text-2xl">+</text>
              </view>
            </view>
          </view>
          <!-- 插槽 -->
          <template #right>
            <view
              class="bg-orange-300 w-[50px] h-36 leading-[144px] text-white text-center"
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
        <text class="font-semibold">$100</text></view
      >
      <view
        ><text class="text-gray-300 font-semibold">购买数量</text
        ><text class="font-semibold">6</text></view
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
import { ref, onMounted } from "vue";
import { useProfileStore } from "../../store/profile/index";
import { getMemberCartAPI, deleteMemberCartAPI } from "./cartPageApi";
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
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
