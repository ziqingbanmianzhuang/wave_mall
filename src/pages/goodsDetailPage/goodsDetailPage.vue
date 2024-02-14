<template>
  <!-- 商品轮播 -->
  <swiper circular class="h-32" :autoplay="false" @change="onChange">
    <swiper-item v-for="item in goods!.mainPictures" :key="item">
      <navigator
        url="/pages/hotItem/hotItem"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <view class="relative h-32">
          <image
            :src="item"
            mode="scaleToFill"
            class="w-[375px] h-32"
            @tap="onTapImage(item)"
          />
          <view
            class="flex justify-center items-center w-6 h-6 absolute right-2 top-2 bg-white rounded-xl"
          >
            <uni-icons type="arrow-right" color="#000" size="20" />
          </view>
        </view>
      </navigator>
    </swiper-item>
  </swiper>
  <!-- 商品服务 -->
  <view
    class="relative top-[-20px] shadow-lg m-1.5 px-3 bg-white w-[363px] rounded-xl"
  >
    <view class="flex flex-col border-b py-3 font-semibold">
      <text class="text-lg">{{ goods?.name }}</text>
      <text class="texg-sm">{{ goods?.price }}</text>
    </view>
    <view
      class="flex flex-col border-b py-3 font-semibold"
      @click="openPopUpAddress"
    >
      <view>
        <uni-icons type="flag" class="pr-3"></uni-icons>
        <text class="text-base">地址选择</text>
      </view>
      <text class="text-xs text-gray-400">四川省成都市双流区</text>
    </view>
    <view
      class="flex flex-col border-b py-3 font-semibold"
      @tap="openPopUpSku(1)"
    >
      <view>
        <uni-icons type="eye" class="pr-3"></uni-icons>
        <text class="text-base">商品规格</text>
      </view>
      <text class="text-xs text-gray-400">{{ selectArrText }}</text>
    </view>
    <view class="flex flex-col border-b py-3 font-semibold" @tap="openPopUp">
      <view>
        <uni-icons type="hand-up" class="pr-3"></uni-icons>
        <text class="text-base">店家服务</text>
      </view>
      <text class="text-xs text-gray-400">包退 快速退款 免费包邮</text>
    </view>
  </view>

  <!-- 商品详情 -->
  <view
    class="flex flex-col shadow-lg bg-white m-1.5 p-3 w-[363px] rounded-xl font-semibold"
  >
    <text class="text-lg">描述</text>
    <text class="text-xs text-gray-400">{{ goods.desc }}</text>
  </view>

  <!-- 功能区 -->
  <view class="flex">
    <button
      class="bg-teal-800 rounded-xl m-1.5 w-[100px] h-12 text-white font-semibold leading-[48px]"
    >
      客服
    </button>
    <button
      class="bg-red-900 rounded-xl m-1.5 w-[251px] h-12 text-white font-semibold leading-[48px]"
      @tap="openPopUpSku(2)"
    >
      加入购入车
    </button>
  </view>
  <!-- 购买区 -->
  <view class="flex justify-between bg-teal-100 rounded-xl m-1.5 p-3">
    <view class="flex flex-col">
      <text class="text-red-600 font-semibold">$68</text>
      <text class="text-xs text-gray-400">128 码 四条</text>
    </view>
    <button
      class="bg-teal-800 rounded-xl w-[80px] h-10 text-sm text-white font-semibold leading-[40px]"
      @tap="openPopUpSku(3)"
    >
      立即购买
    </button>
  </view>
  <view class="text-center">
    <uni-icons type="eye-filled" color="#064e3b"></uni-icons>
    <text class="text-sm font-semibold m-1.5">查看购物车</text>
  </view>
  <!-- popup -->
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="text-lg font-semibold text-center"><text>服务说明</text></view>
    <view class="flex flex-col border-b p-3 font-semibold">
      <text class="text-base">无忧退货</text>
      <text class="text-xs text-gray-400">
        自收到商品之日起30天内，可在线申请无忧退货服务（食品等特殊商品除外）</text
      >
    </view>
    <view class="flex flex-col border-b p-3 font-semibold">
      <text class="text-base">快速退款</text>
      <text class="text-xs text-gray-400">
        收到退货包裹并确认无误后，将在48小时内办理退款，
        退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账</text
      >
    </view>
    <view class="flex flex-col border-b p-3 font-semibold">
      <text class="text-base">满88元免邮费</text>
      <text class="text-xs text-gray-400">
        单笔订单金额(不含运费)满88元可免邮费，不满88元，
        单笔订单收取10元邮费</text
      >
    </view>
  </uni-popup>
  <!-- popUPAddress -->
  <uni-popup ref="popupAddress" type="bottom" background-color="#fff">
    <view class="text-lg font-semibold text-center"><text>配送至</text></view>
    <view class="flex justify-between border-b p-3 font-semibold">
      <view class="flex flex-col">
        <text class="text-base">李明 13824686868</text>
        <text class="text-xs text-gray-400">
          北京市顺义区后沙峪地区安平北街6号院</text
        >
      </view>
      <uni-icons type="checkmarkempty" color="" size="24" />
    </view>
    <view class="flex justify-between border-b p-3 font-semibold">
      <view class="flex flex-col">
        <text class="text-base">李明 13824686868</text>
        <text class="text-xs text-gray-400">
          北京市顺义区后沙峪地区安平北街6号院</text
        >
      </view>
      <uni-icons type="circle" color="" size="24" />
    </view>
    <view class="flex justify-between border-b p-3 font-semibold">
      <view class="flex flex-col">
        <text class="text-base">李明 13824686868</text>
        <text class="text-xs text-gray-400">
          北京市顺义区后沙峪地区安平北街6号院</text
        >
      </view>
      <uni-icons type="circle" color="" size="24" />
    </view>
    <view class="flex flex-col border-b p-3 font-semibold">
      <button>新建地址</button>
    </view>
  </uni-popup>
  <!-- openPopUpSku -->
  <vk-data-goods-sku-popup
    ref="skuPopupRef"
    v-model="skuKey"
    :localdata="goodsInfo"
    border-radius="20"
    :mode="skuMode"
    @add-cart="onAddCart"
  ></vk-data-goods-sku-popup>
</template>

<script lang="ts" setup>
import { getGoodsByIdAPI, postMemberCartAPI } from "./goodsDetailApi";
import type {
  SkuPopupInstance,
  SkuPopupEvent,
} from "../../components/vk-data-goods-sku-popup/vk-data-goods-sku-popup";
import type { GoodsResult } from "./goodsDetailType";
import type { SkuPopupLocaldata } from "../../components/vk-data-goods-sku-popup/vk-data-goods-sku-popup";
import { ref, onMounted, computed } from "vue";

// 接收页面参数
const query = defineProps<{
  id: string;
}>();

// 轮播图变化时
const currentIndex = ref(0);
const onChange: UniHelper.SwiperOnChange = (ev) => {
  currentIndex.value = ev.detail.current;
};

// 点击图片时
const onTapImage = (url: string) => {
  // 大图预览
  uni.previewImage({
    current: url,
    urls: goods.value!.mainPictures,
  });
};

//goodsinfo
const goodsInfo = ref<SkuPopupLocaldata>({
  _id: "002",
  name: "迪奥香水",
  goods_thumb:
    "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
  sku_list: [
    {
      _id: "004",
      goods_id: "002",
      goods_name: "迪奥香水",
      image:
        "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
      price: 19800,
      sku_name_arr: ["50ml/瓶"],
      stock: 100,
    },
    {
      _id: "005",
      goods_id: "002",
      goods_name: "迪奥香水",
      image:
        "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
      price: 9800,
      sku_name_arr: ["70ml/瓶"],
      stock: 100,
    },
  ],
  spec_list: [
    {
      list: [
        {
          name: "20ml/瓶",
        },
        {
          name: "50ml/瓶",
        },
        {
          name: "70ml/瓶",
        },
      ],
      name: "规格",
    },
  ],
});

// 获取商品详情信息
const goods = ref<GoodsResult>({
  id: "",
  name: "",
  desc: "",
  price: 0,
  oldPrice: 0,
  details: {
    properties: [],
    pictures: [],
  },
  mainPictures: [],
  similarProducts: [],
  skus: [],
  specs: [],
  userAddresses: [],
});
const getGoodsByIdData = async () => {
  const res = await getGoodsByIdAPI(query.id);
  goods.value = res.result;
  goodsInfo.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((v) => ({
      name: v.name,
      list: v.values,
    })),
    sku_list: res.result.skus.map((v) => ({
      _id: v.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: v.picture,
      price: v.price * 100, // 注意：需要乘以 100
      stock: v.inventory,
      sku_name_arr: v.specs.map((vv) => vv.valueName),
    })),
  };
};

// 页面加载
onMounted(() => {
  getGoodsByIdData();
});

// popup元素
const popup = ref();

//popupAddress
const popupAddress = ref();

// 打开popup的方法
const openPopUp = () => {
  popup.value.open();
};

// 打开popUpAddress的方法
const openPopUpAddress = () => {
  popupAddress.value.open();
};

// 控制是否打开PopUpSku
const skuKey = ref(false);

//sku插件的模式
// 按钮模式
enum SkuMode {
  Both = 1,
  Cart = 2,
  Buy = 3,
}
//设置打开PopUpSku的模式
const skuMode = ref<SkuMode>(SkuMode.Cart);

// 打开openPopUpSku的方法
const openPopUpSku = (val: number) => {
  skuKey.value = true;
  skuMode.value = val;
};

// SKU组件实例
const skuPopupRef = ref<SkuPopupInstance>();

// 计算被选中的值
const selectArrText = computed(() => {
  return skuPopupRef.value?.selectArr?.join(" ").trim() || "请选择商品规格";
});

// 加入购物车
const onAddCart = async (ev: SkuPopupEvent) => {
  await postMemberCartAPI({ skuId: ev._id, count: ev.buy_num });
  uni.showToast({ title: "添加成功" });
  skuKey.value = false;
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
