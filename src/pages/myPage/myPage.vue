<template>
  <view class="bg-primary px-1.5 w-full h-container">
    <!-- 用户信息 -->
    <view class="bg-secondary border-radius-primary mb-3 w-full h-36">
      <!-- 用户信息 -->
      <view class="flex relative p-3">
        <image
          class="bg-primary border-radius-primary w-14 h-14"
          :src="profile?.avatar"
          mode="aspectFill"
        >
        </image>
        <view class="flex flex-col justify-around ml-3">
          <view class="flex">
            <text class="mr-1.5 font-primary"> {{ profile?.nickname }}</text>
            <navigator url="/subPkg/profilePage/profilePage">
              <i class="iconfont icon-wentifankui"></i>
            </navigator>
          </view>
          <view class="flex">
            <text class="font-secondary mr-1.5">
              {{ profile?.gender ? profile?.gender : "性别未知" }}</text
            >
            <text class="font-secondary">{{
              profile?.fullLocation ? profile?.fullLocation : "地址未知"
            }}</text>
          </view>
        </view>
        <navigator
          class="absolute right-1.5 top-1.5"
          url="/subPkg/settingsPage/settingsPage"
        >
          <i class="iconfont icon-a-042_shezhi"></i>
        </navigator>
      </view>
      <!-- 物流 -->
      <view class="flex justify-between p-3">
        <navigator
          v-for="dis in distributions"
          :key="dis.title"
          class="flex flex-col justify-around items-center"
          url="/pages/orderListPage/orderListPage"
        >
          <view
            class="bg-white h-6 w-6 border-radius-primary text-center leading-[24px]"
          >
            <uni-icons :type="dis.icon" :color="dis.color" size="20" />
            <i :class="`iconfont ${dis.icon}`"></i>
          </view>
          <text class="font-primary-smaller">{{ dis.title }}</text>
        </navigator>
      </view>
    </view>
    <!-- 订单 -->
    <view
      class="flex justify-around items-center bg-secondary border-radius-primary my-3 p-3 h-16 w-full font-primary-smaller"
    >
      <text>我的订单</text>
      <navigator url="/pages/orderListPage/orderListPage?type='0'"
        >查看全部订单</navigator
      >
    </view>
    <!-- 登录 -->
    <navigator
      url="/pages/loginPage/loginPage"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      登录
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ProfileDetail } from "./myPageType";
import { getMemberProfileAPI } from "./myPageApi";
import { useProfileStore } from "../../store/profile/index";

// 获取会员Store
const profileStore = useProfileStore();

const distributions = ref([
  {
    title: "待付款",
    icon: "icon-a-042_xinxi",
    color: "#22c55e",
  },
  {
    title: "待发货",
    icon: "icon-a-042_faxian",
    color: "#637FF1",
  },
  {
    title: "待收货",
    icon: "icon-a-042_wenjian",
    color: "#fdba74",
  },
  {
    title: "待评价",
    icon: "icon-a-042_wenben",
    color: "#c2410c",
  },
  {
    title: "售后",
    icon: "icon-a-042_lianxiren",
    color: "#F5C60B",
  },
]);
//用户信息
const profile = ref<ProfileDetail>();

// 获取用户信息
const getMemberProfileData = async () => {
  const res = await getMemberProfileAPI();
  profile.value = res.result;
};

onMounted(() => {
  // 用户已登录才允许调用
  if (profileStore.profile) {
    getMemberProfileData();
  }
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
// #ifdef H5
.h-container {
  height: calc(100vh - 94px);
}
// #endif

// #ifdef MP-WEIXIN
.h-container {
  height: calc(100vh);
}
// #endif
</style>
