<template>
  <view class="bg-primary w-full h-full">
    <!-- 用户信息 -->
    <view
      class="bg-secondary border-radius-primary margin-x-primary mt-1.5 mb-9 w-[363px] h-36"
    >
      <!-- 用户信息 -->
      <view class="flex relative p-3">
        <image
          class="bg-primary border-radius-primary w-14 h-14"
          :src="profile?.avatar"
        >
        </image>
        <view class="flex flex-col justify-around ml-3">
          <view class="flex">
            <text class="mr-1.5 font-primary"> {{ profile?.nickname }}</text>
            <navigator url="/subPkg/profilePage/profilePage">
              <uni-icons type="compose" color="#b4b5c5" size="20" />
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
          <uni-icons type="gear-filled" color="#c2410c" size="20" />
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
          </view>
          <text class="font-primary-smaller">{{ dis.title }}</text>
        </navigator>
      </view>
    </view>
    <!-- 订单 -->
    <view
      class="flex justify-around items-center bg-secondary border-radius-primary margin-x-primary my-1.5 p-3 h-16 leading-[64px] w-[363px] font-primary-smaller"
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
import type { _UniIconsType, ProfileDetail } from "./myPageType";
import { getMemberProfileAPI } from "./myPageApi";
interface distributionsType {
  title: string;
  icon: _UniIconsType;
  color: string;
}
const distributions = ref<distributionsType[]>([
  {
    title: "待付款",
    icon: "weixin",
    color: "#22c55e",
  },
  {
    title: "待发货",
    icon: "home-filled",
    color: "#637FF1",
  },
  {
    title: "待收货",
    icon: "notification-filled",
    color: "#fdba74",
  },
  {
    title: "待评价",
    icon: "notification-filled",
    color: "#c2410c",
  },
  {
    title: "售后",
    icon: "hand-up-filled",
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
  getMemberProfileData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
