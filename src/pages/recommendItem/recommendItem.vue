<template>
  <!-- 轮播图 -->
  <uni-swiper-dot
    mode="round"
    :info="swiperList"
    color="#ccc"
    :current="current"
    :dots-styles="dotsStyles"
  >
    <swiper circular class="m-1.5 mb-6 h-28" @change="change">
      <swiper-item v-for="item in swiperList" :key="item.id">
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
  <!-- tab页 -->
  <view
    class="flex justify-around items-center shadow-lg rounded-xl border m-5 mb-7 w-[335px] h-24 font-sans font-semibold text-sm"
  >
    <view
      v-for="(item, index) in subTypes"
      :key="item.id"
      class="flex flex-col justify-around items-center h-16"
      @tap="activeIndex = index"
    >
      <text>{{ item.title }}</text>
      <text
        v-show="activeIndex === index"
        class="block h-2 w-2 bg-black rounded"
      ></text>
    </view>
  </view>
  <!-- 数据列表 -->
  <scroll-view
    v-for="(subType, index) in subTypes"
    v-show="activeIndex === index"
    :key="subType.id"
    scroll-y
    class="h-[667px] w-[363px] m-1.5"
    refresher-enabled
  >
    <navigator
      v-for="goods in subType.goodsItems.items"
      :key="goods.id"
      :url="`/pages/goods/goods?id=${goods.id}}`"
      class="grid grid-cols-7 items-center m-1.5"
    >
      <text
        class="col-span-1 h-2 w-2 bg-black rounded justify-self-start"
      ></text>
      <text class="col-span-5 justify-self-start font-semibold">{{
        goods.name
      }}</text>
      <text class="col-span-1 justify-self-end">{{ goods.price }}</text>
      <view
        class="col-start-2 col-end-8 flex justify-center m-1.5 border border-inherit border-solid rounded-xl"
      >
        <image class="w-24 h-24" :src="goods.picture" mode="scaleToFill" />
      </view>
    </navigator>
  </scroll-view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { SwiperItem } from "../indexPage/indexPageType";
import { getHomeSwiperAPI } from "../indexPage/indexPageApi";
import { getRecommendAPI } from "./recommendItemApi";
import type { SubTypeItem } from "./recommendItemType";
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

const recommentMap = [
  { type: "1", title: "最惠", url: "/hot/preference" },
  { type: "2", title: "最潮", url: "/hot/inVogue" },
  { type: "3", title: "最多", url: "/hot/oneStop" },
  { type: "4", title: "最新", url: "/hot/new" },
];

const query = defineProps({
  type: {
    default: "1",
    type: String,
  },
});
const currentRecommentObj:
  | { type: string; title: string; url: string }
  | undefined = recommentMap.find((item) => item.type === query.type);
uni.setNavigationBarTitle({ title: currentRecommentObj!.title });
onMounted(() => {
  getHomeSwiperData();
});

// tab页交互
//高亮下标
const activeIndex = ref(0);

//tabs数组
const subTypes = ref<SubTypeItem[]>([]);

const getRecommendData = async () => {
  const res = await getRecommendAPI(currentRecommentObj!.url, {
    page: 1,
    pageSize: 10,
  });

  subTypes.value = res.result.subTypes;
  console.log("subtypes", subTypes.value);
};
onMounted(() => {
  getRecommendData();
});
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
