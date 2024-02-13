<template>
  <!-- 收货人 -->
  <view
    class="relative rounded-xl border border-slate-300 border-solid m-1.5 mb-3 w-[363px] h-12"
  >
    <text class="absolute top-[-8px] left-8 bg-white px-3 font-semibold"
      >收货人</text
    >
    <view class="flex my-4 px-11">
      <input
        v-model="form.receiver"
        type="text"
        placeholder="请填写收货人姓名"
        class="text-xs w-[340px]"
      />
      <uni-icons type="closeempty" color="" size="18" class="" />
    </view>
  </view>

  <!-- 手机号码 -->
  <view
    class="relative rounded-xl border border-slate-300 border-solid m-1.5 mb-3 w-[363px] h-12"
  >
    <text class="absolute top-[-8px] left-8 bg-white px-3 font-semibold"
      >电话</text
    >
    <view class="flex my-4 px-11">
      <input
        v-model="form.contact"
        type="text"
        placeholder="请填写收货人手机号码"
        class="text-xs w-[340px]"
      />
      <uni-icons type="closeempty" color="" size="18" class="" />
    </view>
  </view>
  <!-- 所在地区 -->
  <view
    class="relative rounded-xl border border-slate-300 border-solid m-1.5 mb-3 w-[363px] h-12"
  >
    <text class="absolute top-[-8px] left-8 bg-white px-3 font-semibold"
      >所在地区</text
    >
    <view class="flex my-4 px-11">
      <view>
        <picker
          class="text-xs w-[340px]"
          mode="region"
          value=""
          @change="onRegionChange"
        >
          <text v-if="!form.fullLocation" class="text-xs w-[340px]"
            >请选择省/市/区(县)</text
          >
          <text v-else>{{ form.fullLocation }}</text>
        </picker>
      </view>
      <uni-icons type="closeempty" color="" size="18" class="" />
    </view>
  </view>
  <!-- 详细地址 -->
  <view
    class="relative rounded-xl border border-slate-300 border-solid m-1.5 mb-3 w-[363px] h-12"
  >
    <text class="absolute top-[-8px] left-8 bg-white px-3 font-semibold"
      >详细地址</text
    >
    <view class="flex my-4 px-11">
      <input
        v-model="form.address"
        type="text"
        placeholder="请填写收货人详细地址"
        class="text-xs w-[340px]"
      />
      <uni-icons type="closeempty" color="" size="18" class="" />
    </view>
  </view>
  <!-- 设置为默认地址 -->
  <button
    class="rounded-xl bg-green-300 w-[363px] mx-1.5 h-12 leading-[48px] font-semibold"
    @tap="setDefaultAddress"
  >
    设置为默认地址
  </button>
  <!-- 保存地址 -->
  <button
    class="rounded-xl bg-blue-300 w-[363px] mx-1.5 mb-3 h-12 leading-[48px] font-semibold"
    @tap="onSubmit"
  >
    保存地址
  </button>
</template>

<script lang="ts" setup>
import type { AddressParams } from "./addressFormPageType";
import {
  postMemberAddressAPI,
  getMemberAddressByIdAPI,
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
  // 新建地址请求
  await postMemberAddressAPI(form.value);
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
    const res = await getMemberAddressByIdAPI(query.id);
    // 把数据合并到表单中
    Object.assign(form.value, res.result);
  }
};
// 页面加载
onMounted(() => {
  getMemberAddressByIdData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
