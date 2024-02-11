<template>
  <view class="w-[375px] h-[530px] bg-slate-100">
    <!-- 欢迎页 -->
    <view class="flex m-1.5 mb-16 pt-4">
      <view>
        <text class="block mr-3 h-12 w-12 bg-white rounded-xl"></text>
      </view>
      <view class="flex flex-col font-semibold">
        <text class="text-lg">Wave Mall</text>
        <text class="text-base">欢迎你来到购物天堂</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="relative shadow-lg bg-white rounded-xl m-1.5 w-[363px] h-32">
      <view class="flex flex-col border-b p-3 font-semibold">
        <text class="text-base">your phone</text>
        <input
          v-model="phone"
          class="text-xs text-gray-400"
          placeholder="请填写你的手机号"
          placeholder-class="input-placeholder"
        />
      </view>
      <view
        class="flex flex-col p-3 font-semibold"
        @tap="onGetphonenumberSimple"
      >
        <text class="text-base">登录</text>
      </view>
      <view class="absolute right-1 top-1 flex">
        <text
          v-for="item in 3"
          :key="item"
          class="block m-0.5 h-2 w-2 bg-black rounded"
        ></text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { LoginResult } from "./loginPageType";
import { postLoginWxMinSimpleAPI } from "./loginPageApi";
import { ref } from "vue";
import { useProfileStore } from "../../store/profile/index";

// 用户登录数据
const profile = ref<LoginResult>();

// 手机号码
const phone = ref<string>("");

// 模拟手机号码快捷登录（开发练习）
const onGetphonenumberSimple = async () => {
  console.log("登录", profile.value, phone.value);
  const res = await postLoginWxMinSimpleAPI(phone.value);
  profile.value = res.result;

  const profileStore = useProfileStore();
  profileStore.setProfile(profile.value);
  console.log("profilelogin", profileStore.profile);

  uni.showToast({ icon: "success", title: "登录成功" });
  setTimeout(() => {
    // 页面跳转
    uni.switchTab({ url: "/pages/indexPage/indexPage" });
  }, 500);
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
