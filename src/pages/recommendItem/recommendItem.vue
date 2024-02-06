<template>
  <uni-swiper-dot mode="round" info="" color="#ccc" current="" dots-styles="">
    <swiper circular class="m-1.5 mb-6 h-28">
      <swiper-item v-for="item in 5" :key="item">
        <navigator
          url="/pages/hotItem/hotItem"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          <view class="relative h-28">
            <image
              src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-20/84abb5b1-8344-49ae-afc1-9cb932f3d593.jpg"
              mode="scaleToFill"
              class="w-[363px] h-28 rounded-xl"
            />
            <text class="absolute left-2 bottom-2 text-white">the day you</text>
            <view class="absolute right-2 top-2 bg-white rounded-xl">
              <uni-icons type="contact" color="#000" size="24" />
            </view>
          </view>
        </navigator>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
