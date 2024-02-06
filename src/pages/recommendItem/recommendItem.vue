<template>
  <uni-swiper-dot
    mode="round"
    :info="swiperList"
    color="#ccc"
    :current="current"
    :dots-styles="dotsStyles"
  >
    <swiper circular class="m-1.5 mb-6 h-28" @change="change">
      <swiper-item v-for="item in swiperList" :key="item">
        <navigator
          url="/pages/hotItem/hotItem"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          <view class="relative h-28">
            <image
              :src="item.imgUrl"
              mode="scaleToFill"
              class="w-[363px] h-28 rounded-xl"
            />
            <text class="absolute left-2 bottom-2 text-white">{{
              item.type
            }}</text>
            <view
              class="flex justify-center items-center w-6 h-6 absolute right-2 top-2 bg-white rounded-xl"
            >
              <uni-icons type="heart" color="#000" size="20" />
            </view>
          </view>
        </navigator>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { SwiperItem } from "../indexPage/indexPageType";
import { getHomeSwiperAPI } from "../indexPage/indexPageApi";
import { onMounted } from "vue";

//轮播图当前序号
let current = ref(0);

//轮播图数据

const swiperList = ref<SwiperItem[]>([]);

//轮播图点样式对象
let dotsStyles = {
  width: 8,
  bottom: 5,
  backgroundColor: "",
  border: "0px solid skyblue",
  selectedBackgroundColor: "",
  selectedBorder: "",
};

//轮播图事件切换回调
const change: UniHelper.SwiperOnChange = (e) => {
  current.value = e.detail.current;
};

//获取轮播图数据
const getHomeSwiperData = async () => {
  let res = await getHomeSwiperAPI();
  swiperList.value = res.result;
  console.log("首页", swiperList.value);
};
onMounted(() => {
  getHomeSwiperData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
