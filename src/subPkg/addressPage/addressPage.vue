<template>
  <!-- 新建地址 -->
  <view
    class="box-border flex bg-blue-100 rounded-xl m-1.5 mb-3 px-1.5 w-[363px] h-8 leading-[32px] font-semibold"
  >
    <uni-icons type="plusempty" class="mr-1.5"></uni-icons>
    <navigator
      url="/subPkg/addressFormPage/addressFormPage"
      open-type="navigate"
      hover-class="navigator-hover"
    >
      新建地址
    </navigator>
  </view>
  <!-- 默认地址 -->
  <text class="m-1.5 font-semibold">默认地址</text>
  <view
    class="relative flex flex-col shadow-xl rounded-xl m-1.5 mb-3 px-1.5 w-[363px] h-32 leading-[32px] font-semibold"
  >
    <text class="">+1821234333</text>
    <text>张三</text>
    <text class="border-b borde-slate-300 border-solid text-gray-300 text-xs"
      >广东省 广州区 天玑</text
    >
    <text class="block mt-3 text-xs">修改地址 -></text>
    <view class="flex absolute right-6 top-6">
      <text
        v-for="item in 3"
        :key="item"
        class="block bg-black rounded mx-0.5 h-2 w-2"
      ></text>
    </view>
    <view class="flex absolute right-6 bottom-6">
      <text
        v-for="item in 3"
        :key="item"
        class="block bg-slate-200 rounded mx-0.5 h-1 w-1"
      ></text>
    </view>
  </view>
  <!-- 其他地址 -->
  <text class="m-1.5 font-semibold">其他地址</text>
  <view class="shadow-xl rounded-xl m-1.5 mb-3 p-1.5 w-[363px] font-semibold">
    <view class="relative border-b borde-slate-300 border-solid mb-3 p-3">
      <view>
        <text class="mr-1.5">张三</text>
        <text>12341323</text>
      </view>
      <text class="text-gray-300 text-xs">广东省 广州区 天玑</text>
      <view class="absolute right-1.5 top-1.5">
        <uni-icons type="forward" color="" size="24" />
      </view>
      <text
        class="absolute left-0 top-8 block bg-black rounded mx-0.5 h-2 w-2"
      ></text>
    </view>

    <view class="relative border-b borde-slate-300 border-solid mb-3 p-3">
      <view>
        <text class="mr-1.5">张三</text>
        <text>12341323</text>
      </view>
      <text class="text-gray-300 text-xs">广东省 广州区 天玑</text>
      <view class="absolute right-1.5 top-1.5">
        <uni-icons type="forward" color="" size="24" />
      </view>
      <text
        class="absolute left-0 top-8 block bg-black rounded mx-0.5 h-2 w-2"
      ></text>
    </view>

    <view class="relative border-b borde-slate-300 border-solid mb-3 p-3">
      <view>
        <text class="mr-1.5">张三</text>
        <text>12341323</text>
      </view>
      <text class="text-gray-300 text-xs">广东省 广州区 天玑</text>
      <view class="absolute right-1.5 top-1.5">
        <uni-icons type="forward" color="" size="24" />
      </view>
      <text
        class="absolute left-0 top-8 block bg-black rounded mx-0.5 h-2 w-2"
      ></text>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
