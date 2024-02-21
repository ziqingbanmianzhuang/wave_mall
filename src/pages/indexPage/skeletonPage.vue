<template name="skeleton">
  <view class="sk-container">
    <view>
      <view class="uni-swiper__warp dot--uni-swiper__warp">
        <swiper
          :circular="true"
          class="h-28 h-28 mb-6 mb-6"
          :current="0"
          :autoplay="false"
        >
          <swiper-item
            style="
              position: absolute;
              width: 100%;
              height: 100%;
              transform: translate(0%, 0px) translateZ(0px);
            "
          >
            <navigator hover-class="navigator-hover" open-type="navigate">
              <view
                class="flex flex justify-between justify-between items-center items-center box-border box-border mx-1d5 mx-1d5 p-6 p-6 w-_363px_ w-_363px_ h-28 h-28 bg-orange-200 bg-orange-200 font-sans font-sans text-xs text-xs text-black text-black rounded-xl rounded-xl"
              >
                <text class="sk-transparent sk-text-12-5000-663 sk-text"
                  >click here -&gt;21</text
                >
                <image
                  class="w-_200px_ h-16 border-8 border-white border-solid rounded-xl sk-image"
                  mode="scaleToFill"
                ></image>
              </view>
            </navigator>
          </swiper-item>
        </swiper>
        <view
          class="uni-swiper__dots-box dot--uni-swiper__dots-box"
          style="bottom: 5px"
        >
          <view
            class="uni-swiper__dots-long dot--uni-swiper__dots-long uni-swiper__dots-item dot--uni-swiper__dots-item"
            style="width: 24px; height: 6px; background-color:; border:"
          ></view>
          <view
            class="uni-swiper__dots-item dot--uni-swiper__dots-item"
            style="
              width: 8px;
              height: 6px;
              background-color:;
              border: 0px solid skyblue;
            "
          ></view>
          <view
            class="uni-swiper__dots-item dot--uni-swiper__dots-item"
            style="
              width: 8px;
              height: 6px;
              background-color:;
              border: 0px solid skyblue;
            "
          ></view>
          <view
            class="uni-swiper__dots-item dot--uni-swiper__dots-item"
            style="
              width: 8px;
              height: 6px;
              background-color:;
              border: 0px solid skyblue;
            "
          ></view>
          <view
            class="uni-swiper__dots-item dot--uni-swiper__dots-item"
            style="
              width: 8px;
              height: 6px;
              background-color:;
              border: 0px solid skyblue;
            "
          ></view>
        </view>
      </view>

      <view class="flex flex flex-wrap flex-wrap">
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-cyan-200 bg-cyan-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-home icons--uniui-home sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-795 sk-text">居家</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-sky-300 bg-sky-300 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-star icons--uniui-star sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-522 sk-text">锦鲤</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-pink-200 bg-pink-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-gift icons--uniui-gift sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-96 sk-text">服饰</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-orange-200 bg-orange-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-hand-up icons--uniui-hand-up sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-557 sk-text">母婴</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-blue-300 bg-blue-300 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-medal icons--uniui-medal sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-166 sk-text">个护</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-indigo-200 bg-indigo-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-staff icons--uniui-staff sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-296 sk-text">严选</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-orange-200 bg-orange-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-headphones icons--uniui-headphones sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-613 sk-text">数码</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-emerald-200 bg-emerald-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-spinner-cycle icons--uniui-spinner-cycle sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-711 sk-text">运动</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-violet-200 bg-violet-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-loop icons--uniui-loop sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-694 sk-text">杂项</text>
        </navigator>
        <navigator
          class="flex flex justify-start justify-start items-center items-center box-border box-border m-1d5 m-1d5 p-3 p-3 w-_175d5px_ w-_175d5px_ h-20 h-20 font-sans font-sans font-semibold font-semibold text-lg text-lg text-black text-black bg-amber-200 bg-amber-200 rounded-xl rounded-xl"
        >
          <view
            class="flex flex justify-center justify-center items-center items-center mx-3 mx-3 w-9 w-9 h-9 h-9 bg-white bg-white rounded-xl rounded-xl"
          >
            <text
              class="uni-icons icons--uni-icons uniui-paperclip icons--uniui-paperclip sk-pseudo sk-pseudo-circle"
              style="color: #000; font-size: 30px"
            ></text>
          </view>
          <text class="sk-transparent sk-text-17-8571-633 sk-text">品牌</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/*
此文件为开发者工具生成，生成时间: 2024/2/21上午10:26:19

在 C:\Users\ziqing\Desktop\wava_mall\wave_mall_source4\dist\dev\mp-weixin\pages\indexPage\indexPage.wxss 中引入样式
```
@import "./indexPage.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-12-5000-663 {
  background-image: linear-gradient(
    transparent 12.5%,
    #eeeeee 0%,
    #eeeeee 87.5%,
    transparent 0%
  ) !important;
  background-size: 100% 32rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-17-8571-795 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-522 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-96 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-557 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-166 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-296 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-613 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-711 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-694 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-text-17-8571-633 {
  background-image: linear-gradient(
    transparent 17.8571%,
    #eeeeee 0%,
    #eeeeee 82.1429%,
    transparent 0%
  ) !important;
  background-size: 100% 56rpx;
  position: relative !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
