<template>
  <view v-if="profileStore.profile" class="bg-primary w-full h-container">
    <!-- 背景图 -->
    <view class="bg-slate-200 w-full h-48 min-[440px]:h-32 min-[960px]:h-72">
      <image
        :src="profile?.avatar"
        mode="aspectFill"
        class="w-full h-48 min-[440px]:h-32 min-[960px]:h-72"
        @tap="onAvatarChange"
      />
    </view>

    <view
      class="relative top-[-30px] left-0 bg-white border-radius-primary mx-1.5"
    >
      <!-- 头像昵称 -->
      <view
        class="relative top-[-40px] left-1/2 -translate-x-1/2 flex flex-col justify-center items-center text-center"
      >
        <image
          :src="profile?.avatar"
          mode="aspectFill"
          class="border-radius-primary h-12 w-12 min-[960px]:h-32 min-[960px]:w-32"
          @tap="onAvatarChange"
        />
        <text
          class="block border-b border-gray-300 border-solid mt-3 w-full font-primary"
          >{{ profile?.account }}</text
        >
      </view>
      <!-- 表单 -->
      <view
        class="grid grid-cols-5 auto-rows-[50px] min-[960px]:grid-cols-6 justify-items-end px-1.5"
      >
        <text
          class="mr-20 font-primary-smaller col-span-2 min-[960px]:col-span-3 text-nowrap"
          >账号</text
        >
        <text class="font-primary-smaller col-span-3 justify-self-start"
          >waveMall</text
        >
        <text
          class="mr-20 font-primary-smaller col-span-2 min-[960px]:col-span-3 text-nowrap"
          >昵称</text
        >
        <input
          v-model="profile.nickname"
          type="text"
          placeholder="请填写昵称"
          placeholder-style="color:#b4b5c5;font-size:12px;font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;  font-weight: 600"
          class="input-primary col-span-3 justify-self-start"
        />
        <text
          class="mr-20 font-primary-smaller col-span-2 min-[960px]:col-span-3 text-nowrap"
          >性别</text
        >
        <radio-group
          class="col-span-3 justify-self-start"
          @change="onGenderChange"
        >
          <label>
            <radio
              value="男"
              color="#27ba9b"
              :checked="profile?.gender === '男'"
              style="transform: scale(0.7)"
            />
            <text class="font-primary-smaller mr-3">男</text>
          </label>
          <label>
            <radio
              value="女"
              color="#27ba9b"
              :checked="profile?.gender === '女'"
              style="transform: scale(0.7)"
            />
            <text class="font-primary-smaller">女</text>
          </label>
        </radio-group>
        <text
          class="mr-20 font-primary-smaller col-span-2 min-[960px]:col-span-3 text-nowrap"
          >生日</text
        >
        <picker
          mode="date"
          :value="profile?.birthday"
          start="1900-01-01"
          :end="new Date()"
          class="input-primary col-span-3 justify-self-start"
          @change="onBirthdayChange"
        >
          <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
          <view v-else class="font-primary-smaller input-secondary"
            >请选择日期</view
          >
        </picker>

        <text
          class="mr-20 font-primary-smaller col-span-2 min-[960px]:col-span-3 text-nowrap"
          >城市</text
        >
        <picker
          class="picker input-primary col-span-3 justify-self-start"
          :value="profile?.fullLocation?.split(' ')"
          mode="region"
          @change="onFullLocationChange"
        >
          <view v-if="profile?.fullLocation">{{ profile.fullLocation }}</view>
          <view v-else class="font-primary-smaller input-secondary"
            >请选择城市</view
          >
        </picker>
        <text
          class="mr-20 font-primary-smaller col-span-2 min-[960px]:col-span-3 text-nowrap"
          >职业</text
        >
        <input
          v-model="profile.profession"
          type="text"
          placeholder="请填写职业"
          class="input-primary col-span-3 justify-self-start"
          placeholder-style="color:#b4b5c5;font-size:12px;font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;  font-weight: 600"
        />
      </view>
      <view class="flex mb-3 justify-center">
        <button
          class="bg-[#9A3412] border-radius-primary py-3 px-6 text-white font-sm font-semibold"
          @tap="onSubmit"
        >
          保存
        </button>
      </view>
    </view>
  </view>
  <view v-else>
    <view class="w-full text-center">
      <text class="font-primary">你还没有登录嗷</text>
      <navigator
        url="/pages/loginPage/loginPage"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <button
          class="bg-[#9A3412] border-radius-primary mx-auto my-3 px-6 py-3 w-fit font-primary-smaller text-white font-semibold"
        >
          去登录
        </button>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getMemberProfileAPI, putMemberProfileAPI } from "./profileApi";
import type { ProfileDetail, Gender, ProfileParams } from "./profileType";
import { ref, onMounted } from "vue";
import { useProfileStore } from "../../store/profile/index";
import { onShow } from "@dcloudio/uni-app";

// 获取会员Store
const profileStore = useProfileStore();

// 获取个人信息
const profile = ref({
  id: 0,
  avatar: "",
  account: "",
  nickname: "",
  gender: "男",
  birthday: "",
  fullLocation: "",
  profession: "",
} as ProfileDetail);
const getMemberProfileData = async () => {
  const res = await getMemberProfileAPI();
  profile.value = res.result;
};

//修改性别
const onGenderChange: UniHelper.RadioGroupOnChange = (ev) => {
  profile.value.gender = ev.detail.value as Gender;
};

// 修改生日
const onBirthdayChange: UniHelper.DatePickerOnChange = (ev) => {
  profile.value.birthday = ev.detail.value;
};

// 修改城市
let fullLocationCode: [string, string, string] = ["", "", ""];
const onFullLocationChange: UniHelper.RegionPickerOnChange = (ev) => {
  // 修改前端界面
  profile.value.fullLocation = ev.detail.value.join(" ");
  // 提交后端更新
  fullLocationCode = ev.detail.code!;
};

// 修改头像
const onAvatarChange = () => {
  // 调用拍照/选择图片
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ["image"],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0];
      // 文件上传
      uni.uploadFile({
        url: "/member/profile/avatar",
        name: "file", // 后端数据字段名
        filePath: tempFilePath, // 新头像
        success: (res) => {
          // 判断状态码是否上传成功
          if (res.statusCode === 200) {
            // 提取头像
            const { avatar } = JSON.parse(res.data).result;
            // 当前页面更新头像
            profile.value!.avatar = avatar;
            // 更新 Store 头像
            profileStore.profile!.avatar = avatar;
            uni.showToast({ icon: "success", title: "更新成功" });
          } else {
            console.log("错误", res);

            uni.showToast({ icon: "error", title: "出现错误" });
          }
        },
      });
    },
  });
};

// 点击保存提交表单
const onSubmit = async () => {
  const { nickname, gender, birthday, profession } = profile.value;
  const res = await putMemberProfileAPI({
    nickname,
    gender,
    birthday,
    profession,
    provinceCode: fullLocationCode[0],
    cityCode: fullLocationCode[1],
    countyCode: fullLocationCode[2],
  });
  // 更新Store昵称
  profileStore.profile!.nickname = res.result.nickname;
  uni.showToast({ icon: "success", title: "保存成功" });
  setTimeout(() => {
    uni.navigateBack();
  }, 400);
};
onShow(() => {
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
.input-primary {
  font-size: 14px;
  font-weight: 600;
  font-family: "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: #2b2d42;
}
.input-secondary {
  color: #b4b5c5;
  font-size: 12px;
  font-family: "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 600;
}
// #ifdef H5
.h-container {
  height: calc(100vh - 44px);
}
// #endif

// #ifdef MP-WEIXIN
.h-container {
  height: calc(100vh);
}
// #endif
</style>
