<template>
  <scroll-view
    scroll-y
    class="bg-secondary h-screen w-screen mb-1.5"
    refresher-enabled
  >
    <!-- 轮播图组件 -->
    <swiper circular class="h-20 min-[710px]:h-28 min-[976px]:h-80">
      <swiper-item v-for="item in 1" :key="item" class="box-border px-1.5">
        <navigator url="" open-type="navigate" hover-class="navigator-hover">
          <view
            class="grid grid-cols-7 bg-secondary font-secondary border-radius-primary"
          >
            <view
              class="col-start-1 col-end-3 place-self-center bg-[#e0e0e0] text-transparent"
            >
              click here -></view
            >
            <view
              class="col-start-3 col-end-8 h-20 min-[710px]:h-28 min-[970px]:h-80 bg-[#e0e0e0]"
            >
              <image
                src=""
                mode="aspectFill"
                class="border-radius-primary w-full h-full"
              />
            </view>
          </view>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类组件 -->
    <view
      class="box-border relative flex flex-wrap justify-around w-full border-radius-primary my-3 max-h-32 overflow-hidden transition-all after:bg-gradient-to-b after:from-transparent after:to-white after:absolute after:bottom-0 after:h-16 after:w-full min-[960px]:after:hidden"
    >
      <navigator
        v-for="item in 10"
        :key="item"
        url=""
        open-type="switchTab"
        hover-class="none"
        :class="`flex justify-start items-center box-border margin-x-primary my-1.5 p-3 flex-1 h-12  min-[470px]:h-8 font-primary min-[470px]:text-sm min-[470px]:p-1.5 min-[960px]:text-base min-[960px]:h-12 bg-[#e0e0e0] border-radius-primary`"
      >
        <view
          class="flex justify-center items-center mx-3 w-6 h-6 bg-white border-radius-primary"
        >
          <uni-icons size="20" color="#000"></uni-icons>
        </view>
        <view class="bg-white"
          ><text class="text-nowrap text-transparent">分类</text></view
        >
      </navigator>
    </view>
    <!-- 展开 -->
    <view
      class="relative left-1/2 -translate-x-1/2 w-12 h-8 min-[960px]:hidden text-center"
      @tap="showCategory"
    >
      <i v-if="isShowCategory" class="iconfont text-[#E0E0E0]">&#xe7a4;</i>
      <i v-else class="iconfont text-[#E0E0E0]">&#xe7a2;</i>
    </view>
    <!-- 推荐组件 -->
    <view
      class="block bg-[#e0e0e0] margin-x-primary mb-1.5 w-fit font-primary-bige"
    >
      <text class="text-transparent">推荐</text>
    </view>
    <view class="bg-secondary border-radius-primary margin-x-primary mb-3 py-3">
      <view class="flex justify-between items-center">
        <navigator
          v-for="item in 4"
          :key="item"
          :url="``"
          open-type="navigate"
          hover-class="navigator-hover"
          class="flex flex-col justify-start items-center"
        >
          <view
            :class="`flex justify-center items-center mb-1.5 w-6 h-6 bg-[#e0e0e0] border-radius-primary`"
          >
            <uni-icons color="" size="20" />
          </view>
          <view class="bg-[#e0e0e0] w-fit font-primary-smaller"
            ><text class="text-transparent">精品优选</text></view
          >
        </navigator>
      </view>
    </view>
    <!-- 推荐喜欢组件 -->
    <view class="bg-[#e0e0e0] mx-auto w-fit font-secondary text-center"
      ><text class="text-transparent">---你可能喜欢---</text></view
    >
    <!-- 商品页面 -->
    <navigator
      v-for="item in 5"
      :key="item"
      url=""
      open-type="navigate"
      hover-class="navigator-hover"
      class="grid grid-cols-7 items-center bg-secondary border-radius-primary mt-3 px-1.5 margin-x-primary"
    >
      <text
        class="col-span-1 h-2 w-2 bg-[#e0e0e0] rounded justify-self-start"
      ></text>
      <view class="bg-[#e0e0e0] col-span-5 font-primary-smaller w-fit">
        <text class="text-transparent">商品名字</text>
      </view>
      <view
        class="col-span-1 justify-self-end bg-[#e0e0e0] w-fit font-secondary"
      >
        <text class="text-transparent">$198</text>
      </view>
      <view
        class="col-start-1 col-end-8 flex justify-center bg-[#e0e0e0] my-1.5"
      >
        <image
          class="border-radius-primary w-full h-32 min-[960px]:h-[30rem]"
          src=""
          mode="aspectFill"
        ></image>
      </view>
    </navigator>
  </scroll-view>
</template>

<script setup lang="ts"></script>

<style>
.show {
  max-height: 300px;
}
@media (min-width: 470px) {
  .show {
    max-height: 500px;
  }
}
.show::after {
  background-image: none !important;
}
a {
  flex: 1;
}
/* #ifdef H5 */
/* .navigator-wrap {
	flex: 1;
} */
/* #endif */
</style>
