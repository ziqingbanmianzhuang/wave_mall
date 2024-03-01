<template>
  <view v-if="!isLoading" class="bg-primary px-1.5 w-full h-container">
    <!-- 数据列表 -->
    <scroll-view
      scroll-y
      class="w-full h-container"
      @scrolltolower="onScrolltolower"
    >
      <!-- 轮播图 -->
      <uni-swiper-dot
        mode="round"
        :info="swiperList"
        color="#ccc"
        :current="current"
        :dots-styles="{
          backgroundColor: '#f97316',
          border: '0px solid #000',
          selectedBackgroundColor: '#9a3412',
          selectedBorder: '0px solid #000',
          bottom: 0,
        }"
      >
        <!-- 轮播图 -->
        <swiper
          circular
          autoplay
          class="mb-3 h-28 min-[960px]:h-80 w-full"
          @change="change"
        >
          <swiper-item v-for="item in swiperList" :key="item.id">
            <navigator
              url="/pages/hotItem/hotItem"
              open-type="navigate"
              hover-class="navigator-hover"
              class="block"
            >
              <view class="relative h-28 min-[960px]:h-80">
                <image
                  :src="item.imgUrl"
                  mode="aspectFill"
                  class="border-radius-primary w-full h-full"
                />
                <view
                  class="flex justify-center items-center w-6 h-6 absolute right-4 top-2 bg-white border-radius-primary"
                >
                  <uni-icons type="heart" color="#9a3412" size="20" />
                </view>
              </view>
            </navigator>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
      <!-- tab页 -->
      <view
        class="flex justify-around items-center bg-secondary border-radius-primary m-5 mb-7 w-full h-24 font-primary"
      >
        <view
          v-for="(item, index) in subTypes"
          :key="item.id"
          class="flex flex-col justify-around items-center h-16"
          @tap="activeIndex = index"
        >
          <text>{{ item.title }}</text>
          <view v-show="activeIndex === index">
            <text class="block h-2 w-2 bg-black rounded"></text>
          </view>
        </view>
      </view>
      <view
        v-for="(subType, index) in subTypes"
        v-show="activeIndex === index"
        :key="subType.id"
      >
        <navigator
          v-for="goods in subType.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goodsDetailPage/goodsDetailPage?id=${goods.id}`"
          class="grid grid-cols-7 items-center mb-3 bg-secondary border-radius-primary"
        >
          <text
            class="col-span-1 justify-self-start h-2 w-2 bg-orange-800 rounded"
          ></text>
          <text class="col-span-5 justify-self-start font-primary-smaller">{{
            goods.name
          }}</text>
          <text
            class="col-span-1 justify-self-end font-secondary font-yellow"
            >{{ goods.price }}</text
          >
          <view class="col-start-1 col-end-8 flex justify-center m-1.5">
            <image
              class="w-full h-32 min-[960px]:h-[30rem] border-radius-primary"
              :src="goods.picture"
              mode="aspectFill"
            />
          </view>
        </navigator>
        <text class="flex justify-center text-xs">{{
          subType.finish ? "没有更多数据了" : "正在加载"
        }}</text>
      </view>
    </scroll-view>
  </view>
  <skeletonPage></skeletonPage>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { SwiperItem } from "../indexPage/indexPageType";
import { getHomeSwiperAPI } from "../indexPage/indexPageApi";
import { getRecommendAPI } from "./recommendItemApi";
import type { SubTypeItem } from "./recommendItemType";
import { onMounted } from "vue";
import skeletonPage from "./skeletonPage.vue";

//标识是否加载成功
const isLoading = ref(true);

//轮播图当前序号
let current = ref(0);

//轮播图数据

const swiperList = ref<SwiperItem[]>([]);

//轮播图事件切换回调
const change: UniHelper.SwiperOnChange = (e) => {
  current.value = e.detail.current;
};

//获取轮播图数据
const getHomeSwiperData = async () => {
  let res = await getHomeSwiperAPI();
  swiperList.value = res.result;
  isLoading.value = false;
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
  isLoading.value = true;
  getHomeSwiperData();
});

// tab页交互
//高亮下标
const activeIndex = ref(0);

//tabs数组
const subTypes = ref<SubTypeItem[]>([]);

//获取推荐的数据
const getRecommendData = async () => {
  const res = await getRecommendAPI(currentRecommentObj!.url, {
    page: 28,
    pageSize: 10,
  });

  subTypes.value = res.result.subTypes;
};

//下拉触底
const onScrolltolower = async () => {
  const currentSubType = subTypes.value[activeIndex.value];
  if (currentSubType.goodsItems.page < currentSubType.goodsItems.pages) {
    currentSubType.goodsItems.page++;
  } else {
    currentSubType.finish = true;
    return uni.showToast({
      title: "没有更多数据了",
    });
  }

  const res = await getRecommendAPI(currentRecommentObj!.url, {
    subType: currentSubType.id,
    page: currentSubType.goodsItems.page,
    pageSize: currentSubType.goodsItems.pageSize,
  });

  const newSubType = res.result.subTypes[activeIndex.value];
  currentSubType.goodsItems.items.push(...newSubType.goodsItems.items);
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
