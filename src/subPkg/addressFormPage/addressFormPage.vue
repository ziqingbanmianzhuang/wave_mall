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
        <picker class="text-xs w-[340px]" mode="region" value="">
          <text class="text-xs w-[340px]">请选择省/市/区(县)</text>
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
        type="text"
        placeholder="请填写收货人详细地址"
        class="text-xs w-[340px]"
      />
      <uni-icons type="closeempty" color="" size="18" class="" />
    </view>
  </view>
  <!-- 保存地址 -->
  <button
    class="rounded-xl bg-blue-300 w-[363px] mx-1.5 mb-3 h-12 leading-[48px] font-semibold"
  >
    保存地址
  </button>
  <button
    class="rounded-xl bg-green-300 w-[363px] mx-1.5 h-12 leading-[48px] font-semibold"
  >
    设置为默认地址
  </button>
</template>

<script lang="ts" setup>
// 获取页面参数
const query = defineProps<{ id?: string }>();

uni.setNavigationBarTitle({ title: query.id ? "修改地址" : "新建地址" });
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
