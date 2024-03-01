<template>
  <view class="relative w-full h-container px-1.5 bg-primary">
    <!-- 欢迎页 -->
    <view class="flex mb-16 pt-4">
      <view>
        <text
          class="block mr-3 h-12 w-12 bg-secondary border-radius-primary"
        ></text>
      </view>
      <view class="flex flex-col">
        <text class="font-primary">Wave Mall</text>
        <text class="font-primary-smaller">欢迎你来到购物天堂</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="relative bg-secondaryborder-radius bg-secondary w-full h-32">
      <view class="flex flex-col border-b p-3">
        <text class="font-primary-smaller">your phone</text>
        <input
          v-model="phone"
          class="text-xs text-gray-400"
          placeholder="请填写你的手机号"
          placeholder-class="input-placeholder"
        />
      </view>
      <view class="flex flex-col p-3" @tap="onGetphonenumberSimple">
        <text class="font-primary-smaller">登录</text>
      </view>
      <threeDots></threeDots>
    </view>
    <!-- 登录成功的动画 -->
    <view v-if="isLogin" class="absolute right-0 top-1/2 -translate-y-1/2">
      <image src="../../static/lotties/successLogin.gif" mode="aspectFill" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { LoginResult } from "./loginPageType";
import { postLoginWxMinSimpleAPI } from "./loginPageApi";
import { ref } from "vue";
import { useProfileStore } from "../../store/profile/index";
import threeDots from "../../components/threeDots/threeDots.vue";

//标识是否登录成功
const isLogin = ref(false);

// 用户登录数据
const profile = ref<LoginResult>();

// 手机号码
const phone = ref<string>("");

// 模拟手机号码快捷登录（开发练习）
const onGetphonenumberSimple = async () => {
  const res = await postLoginWxMinSimpleAPI(phone.value);
  profile.value = res.result;

  const profileStore = useProfileStore();
  profileStore.setProfile(profile.value);
  isLogin.value = true;
  uni.showToast({ icon: "success", title: "登录成功" });
  setTimeout(() => {
    // 页面跳转
    isLogin.value = false;
    uni.navigateBack();
  }, 500);
};
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
