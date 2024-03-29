<template>
  <view v-show="!isLoading">
    <view class="flex flex-wrap pt-3 w-full">
      <!-- 收货人 -->
      <view
        class="relative border-radius-primary border border-slate-300 border-solid margin-x-primary mb-3 min-[670px]:mb-6 min-[960px]:mb-3 w-[260px] grow h-12"
      >
        <text
          class="absolute top-[-8px] left-8 bg-white px-3 font-primary-smaller font-light"
          >收货人</text
        >
        <view class="flex justify-between items-center my-4 pl-11 pr-3">
          <input
            v-model="form.receiver"
            type="text"
            placeholder="请填写收货人姓名"
            class="w-[340px] input-primary"
            placeholder-style="color:#b4b5c5;font-size:12px;font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;  font-weight: 600"
          />
          <i class="iconfont icon-chacha"></i>
        </view>
      </view>

      <!-- 手机号码 -->
      <view
        class="relative border-radius-primary border border-slate-300 border-solid margin-x-primary mb-3 min-[670px]:mb-6 min-[960px]:mb-3 w-[280px] grow h-12"
      >
        <text
          class="absolute top-[-8px] left-8 bg-white px-3 font-primary-smaller font-light"
          >电话</text
        >
        <view class="flex justify-between my-4 pl-11 pr-3">
          <input
            v-model="form.contact"
            type="text"
            placeholder="请填写收货人手机号码"
            class="w-[340px] input-primary"
            placeholder-style="color:#b4b5c5;font-size:12px;font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;  font-weight: 600"
          />
          <i class="iconfont icon-chacha"></i>
        </view>
      </view>
      <!-- 所在地区 -->
      <view
        class="relative border-radius-primary border border-slate-300 border-solid margin-x-primary min-[670px]:mb-6 min-[960px]:mb-3 mb-3 w-[330px] grow h-12"
      >
        <text
          class="absolute top-[-8px] left-8 bg-white px-3 font-primary-smaller font-light"
          >所在地区</text
        >
        <view class="flex justify-between my-4 pl-11 pr-3">
          <picker
            class="w-[340px]"
            mode="region"
            value=""
            @change="onRegionChange"
          >
            <text v-if="!form.fullLocation" class="font-secondary w-[340px]"
              >请选择省/市/区(县)</text
            >
            <text v-else class="font-primary">{{ form.fullLocation }}</text>
          </picker>
          <i class="iconfont icon-chacha"></i>
        </view>
      </view>
      <!-- 详细地址 -->
      <view
        class="relative border-radius-primary border border-slate-300 border-solid margin-x-primary min-[670px]:mb-6 min-[960px]:mb-3 mb-3 w-[350px] grow h-12"
      >
        <text
          class="absolute top-[-8px] left-8 bg-white px-3 font-primary-smaller font-light"
          >详细地址</text
        >
        <view class="flex justify-between my-4 pl-11 pr-3">
          <input
            v-model="form.address"
            type="text"
            placeholder="请填写收货人详细地址"
            class="w-[340px] input-primary"
            placeholder-style="color:#b4b5c5;font-size:12px;font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;  font-weight: 600"
          />
          <i class="iconfont icon-chacha"></i>
        </view>
      </view>
    </view>
    <!-- 按钮区 -->
    <view class="text-center min-[960px]:mt-6">
      <!-- 设置为默认地址 -->
      <button
        class="border-radius-primary bg-[#9a3412] mx-auto mb-3 px-6 h-10 leading-10 w-fit font-primary-smaller text-white"
        @tap="setDefaultAddress"
      >
        设为默认
      </button>
      <!-- 保存地址 -->
      <button
        class="border-radius-primary border border-[#fb8a3c] border-solid mx-auto mb-3 px-6 w-fit h-10 leading-10 font-primary-smaller text-[#fb8a3c]"
        @tap="onSubmit"
      >
        保存
      </button>
      <button
        class="border-radius-primary bg-[#22c55e] mx-auto mb-3 px-6 h-10 leading-10 w-fit font-primary-smaller text-white"
        @tap="deleteAddress(query.id)"
      >
        删除地址
      </button>
    </view>
  </view>
  <doubleCircleLoading v-show="isLoading"></doubleCircleLoading>
</template>

<script lang="ts" setup>
import doubleCircleLoading from "../../components/doubleCirlcleLoading/doubleCircleLoading.vue";
import { globalLoadingHook } from "../../hooks/globalLoadingHook";
const { isLoading, setLoading } = globalLoadingHook();

import type { AddressParams } from "./addressFormPageType";
import {
  postMemberAddressAPI,
  getMemberAddressByIdAPI,
  putMemberAddressByIdAPI,
  deleteMemberAddressByIdAPI,
} from "./addressFormPageApi";

import { onMounted, ref } from "vue";

// 获取页面参数
const query = defineProps<{ id?: string }>();

uni.setNavigationBarTitle({ title: query.id ? "修改地址" : "新建地址" });

// 表单数据AddressParams
const form = ref<AddressParams & { fullLocation: string }>({
  receiver: "",
  contact: "", // 联系方式
  fullLocation: "", // 省市区(前端展示)
  provinceCode: "", // 省份编码(后端参数)
  cityCode: "", // 城市编码(后端参数)
  countyCode: "", // 区/县编码(后端参数)
  address: "", // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
});

// 收集是否默认收货地址
const setDefaultAddress = () => {
  form.value.isDefault = 1;
  // 成功提示
  uni.showToast({ icon: "success", title: "设置成功" });
};

// 收集所在地区
const onRegionChange: UniHelper.RegionPickerOnChange = (ev) => {
  // 省市区(前端展示)
  form.value.fullLocation = ev.detail.value.join(" ");
  // 省市区(后端参数)
  const [provinceCode, cityCode, countyCode] = ev.detail.code!;
  // 合并数据
  Object.assign(form.value, { provinceCode, cityCode, countyCode });
};

// 提交表单
const onSubmit = async () => {
  // 判断当前页面是否有地址 id
  if (query.id) {
    // 修改地址请求
    await putMemberAddressByIdAPI(query.id, form.value);
  } else {
    // 新建地址请求
    await postMemberAddressAPI(form.value);
  }

  // 成功提示
  uni.showToast({ icon: "success", title: "添加成功" });
  // 返回上一页
  setTimeout(() => {
    uni.navigateBack();
  }, 400);
};

//根据地址的Id获取地址的详细数据
const getMemberAddressByIdData = async () => {
  // 有 id 才调用接口
  if (query.id) {
    // 发送请求
    setLoading(true);
    const res = await getMemberAddressByIdAPI(query.id);
    // 把数据合并到表单中
    Object.assign(form.value, res.result);
    setLoading(false);
  }
};

//删除地址
const deleteAddress = (id: string) => {
  uni.showModal({
    content: "删除地址?",
    success: async (res) => {
      if (res.confirm) {
        // 根据id删除收货地址
        await deleteMemberAddressByIdAPI(id);
      }
      uni.navigateBack();
    },
  });
};

// 页面加载
onMounted(() => {
  getMemberAddressByIdData();
});
</script>

<style lang="scss" scoped>
.input-primary {
  font-size: 16px;
  font-weight: 600;
  font-family: "ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: #2b2d42;
}
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
