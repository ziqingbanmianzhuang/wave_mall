<template>
  <view class="bg-slate-200 rounded-xl w-[375px] h-24"></view>
  <view class="relative top-[-30px] left-0 shadow-lg bg-white rounded-xl m-1.5">
    <!-- 头像昵称 -->
    <view class="flex flex-col justify-center items-center text-center">
      <image
        :src="profile?.avatar"
        mode="aspectFill"
        class="absolute top-[-40px] rounded-[24px] h-12 w-12"
        @tap="onAvatarChange"
      />
      <text
        class="block border-b border-gray-300 border-solid mt-3 w-full text-base font-semibold"
        >{{ profile?.account }}</text
      >
    </view>
    <!-- 表单 -->
    <view class="p-3">
      <view class="flex my-3">
        <text class="mr-20">账号</text>
        <text class="text-gray-500">ziqing</text>
      </view>
      <view class="flex my-3">
        <text class="mr-20">昵称</text>
        <input
          v-model="profile.nickname"
          type="text"
          placeholder="请填写昵称"
          class="text-gray-500"
        />
      </view>
      <view class="flex my-3">
        <text class="mr-20">性别</text>
        <radio-group @change="onGenderChange">
          <label>
            <radio
              value="男"
              color="#27ba9b"
              :checked="profile?.gender === '男'"
            />
            <text class="text-gray-500 mr-3">男</text>
          </label>
          <label>
            <radio
              value="女"
              color="#27ba9b"
              :checked="profile?.gender === '女'"
            />
            <text class="text-gray-500">女</text>
          </label>
        </radio-group>
      </view>
      <view class="flex my-3">
        <text class="mr-20">生日</text>
        <picker
          mode="date"
          :value="profile?.birthday"
          start="1900-01-01"
          :end="new Date()"
          @change="onBirthdayChange"
        >
          <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
          <view v-else class="text-gray-500">请选择日期</view>
        </picker>
      </view>
      <view class="flex my-3">
        <text class="mr-20">城市</text>
        <picker
          class="picker"
          :value="profile?.fullLocation?.split(' ')"
          mode="region"
          @change="onFullLocationChange"
        >
          <view v-if="profile?.fullLocation">{{ profile.fullLocation }}</view>
          <view v-else class="text-gray-500">请选择城市</view>
        </picker>
      </view>
      <view class="flex my-3">
        <text class="mr-20">职业</text>
        <input
          v-model="profile.profession"
          type="text"
          placeholder="请填写职业"
          class="text-gray-500"
        />
      </view>
      <view class="flex my-3 justify-center">
        <button
          class="bg-slate-200 rounded-xl w-24 h-8 leading-[32px] text-white font-semibold"
          @tap="onSubmit"
        >
          保存
        </button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getMemberProfileAPI, putMemberProfileAPI } from "./profileApi";
import type { ProfileDetail, Gender, ProfileParams } from "./profileType";
import { ref, onMounted } from "vue";
import { useProfileStore } from "../../store/profile/index";

// 获取个人信息
const profile = ref({} as ProfileDetail);
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

const profileStore = useProfileStore();

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
onMounted(() => {
  getMemberProfileData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>