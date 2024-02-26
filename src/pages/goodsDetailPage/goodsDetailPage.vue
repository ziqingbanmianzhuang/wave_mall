<template>
  <view class="bg-primary w-full">
    <!-- 商品轮播 -->
    <swiper circular autoplay class="h-32" @change="onChange">
      <swiper-item v-for="item in goods!.mainPictures" :key="item">
        <navigator
          url="/pages/hotItem/hotItem"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          <view class="relative h-32">
            <image
              :src="item"
              mode="aspectFill"
              class="w-[375px] h-32"
              @tap="onTapImage(item)"
            />
            <view
              class="flex justify-center items-center w-6 h-6 absolute right-2 top-2 bg-white border-radius-primary"
            >
              <i class="iconfont icon-a-jiantou-you"></i>
            </view>
          </view>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 商品服务 -->
    <view
      class="relative top-[-20px] margin-x-primary my-1.5 px-3 bg-secondary w-[363px] border-radius-primary"
    >
      <view class="flex flex-col border-b py-3">
        <text class="font-primary">{{ goods?.name }}</text>
        <text class="font-primary-smaller font-yellow">{{ goods?.price }}</text>
      </view>
      <view class="flex flex-col border-b py-3" @click="openPopUpAddress">
        <view class="flex">
          <i class="iconfont icon-weizhi pr-3"></i>
          <text class="font-primary-smaller">地址选择</text>
        </view>
        <text class="font-secondary">{{
          selectedAddress ? selectedAddress : "请选择地址"
        }}</text>
      </view>
      <view class="flex flex-col border-b py-3" @tap="openPopUpSku(1)">
        <view class="flex">
          <i class="iconfont icon-a-042_wenben pr-3"></i>
          <text class="font-primary-smaller">商品规格</text>
        </view>
        <text class="font-secondary">{{ selectArrText }}</text>
      </view>
      <view class="flex flex-col border-b py-3" @tap="openPopUp">
        <view class="flex">
          <i class="iconfont icon-a-042_wode-09 pr-3"></i>
          <text class="font-primary-smaller">店家服务</text>
        </view>
        <text class="font-secondary">包退 快速退款 免费包邮</text>
      </view>
    </view>

    <!-- 商品详情 -->
    <view
      class="flex flex-col bg-secondary margin-x-primary my-1.5 p-3 w-[363px] border-radius-primary"
    >
      <text class="font-primary">描述</text>
      <text class="font-secondary">{{
        goods.desc ? goods.desc : "暂无描述"
      }}</text>
    </view>

    <!-- 功能区 -->
    <view class="flex">
      <button
        class="bg-orange-800 border-radius-primary m-1.5 w-[251px] h-12 text-white text-base font-sans font-semibold leading-[48px]"
        @tap="openPopUpSku(2)"
      >
        加入购入车
      </button>
      <button
        class="border border-solid border-orange-500 border-radius-primary m-1.5 w-[100px] h-12 text-base font-sans leading-[48px] text-orange-500"
      >
        客服
      </button>
    </view>
    <!-- 购买区 -->
    <view
      class="flex justify-between bg-[#ededed] border-radius-primary m-1.5 p-3"
    >
      <view class="flex flex-col">
        <text class="font-yellow font-primary-smaller">$68</text>
        <text class="font-secondary">128 码 四条</text>
      </view>
      <button
        class="bg-[#363636] border-radius-primary w-[80px] h-10 font-semibold text-sm font-sans text-white leading-[40px]"
        @tap="openPopUpSku(3)"
      >
        立即购买
      </button>
    </view>
    <!-- 查看购物车 -->
    <view class="flex justify-center items-center">
      <navigator
        url="/pages/cartPage/cartPage"
        class="font-primary-smaller m-1.5"
        open-type="switchTab"
        hover-class="navigator-hover"
      >
        <uni-icons type="cart" color="#9A3412" size="20" />
      </navigator>
    </view>
    <!-- services popup -->
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="font-primary text-center"><text>服务说明</text></view>
      <view class="flex flex-col border-b p-3">
        <text class="font-primary">无忧退货</text>
        <text class="font-secondary">
          自收到商品之日起30天内，可在线申请无忧退货服务（食品等特殊商品除外）</text
        >
      </view>
      <view class="flex flex-col border-b p-3">
        <text class="font-primary">快速退款</text>
        <text class="font-secondary">
          收到退货包裹并确认无误后，将在48小时内办理退款，
          退款将原路返回，不同银行处理时间不同，预计1-5个工作日到账</text
        >
      </view>
      <view class="flex flex-col border-b p-3">
        <text class="font-primary">满88元免邮费</text>
        <text class="font-secondary">
          单笔订单金额(不含运费)满88元可免邮费，不满88元，
          单笔订单收取10元邮费</text
        >
      </view>
    </uni-popup>
    <!-- popUPAddress -->
    <uni-popup ref="popupAddress" type="bottom" background-color="#fff">
      <view class="font-primary text-center"><text>配送至</text></view>
      <template v-if="goods.userAddresses?.length">
        <view
          v-for="address in goods.userAddresses"
          :key="address.id"
          class="flex justify-between border-b p-3"
          @tap="selectAddress(address.fullLocation)"
        >
          <view class="flex flex-col">
            <text class="font-primary-smaller"
              >{{ address.receiver }} {{ address.contact }}</text
            >
            <text class="font-secondary"> {{ address.fullLocation }}</text>
          </view>
          <uni-icons
            v-if="address.isDefault"
            type="checkmarkempty"
            color="#22c55e"
            size="20"
          />
          <uni-icons
            v-else
            type="circle"
            color="#9a3412"
            size="20"
            @tap="setDefaultAddress(address.id, address)"
          />
        </view>
      </template>
      <template v-else>
        <view class="font-secondary text-center">暂无收货地址</view>
      </template>
      <view class="flex flex-col border-b p-3 font-semibold">
        <navigator
          url="/subPkg/addressFormPage/addressFormPage"
          open-type="navigate"
          hover-class="navigator-hover"
          class="text-center font-primary-smaller"
        >
          新建地址
        </navigator>
      </view>
    </uni-popup>
    <!-- openPopUpSku -->
    <vk-data-goods-sku-popup
      ref="skuPopupRef"
      v-model="skuKey"
      buy-now-background-color="#FB8A3C"
      add-cart-background-color="#9A3412"
      border-radius="6"
      :localdata="goodsInfo"
      :mode="skuMode"
      @add-cart="onAddCart"
      @buy-now="onBuyNow"
    ></vk-data-goods-sku-popup>
  </view>
</template>

<script lang="ts" setup>
import {
  getGoodsByIdAPI,
  postMemberCartAPI,
  putMemberAddressByIdAPI,
} from "./goodsDetailApi";
import type {
  SkuPopupInstance,
  SkuPopupEvent,
  AddressParams,
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

//跳转到订单结算页面
// 立即购买
const onBuyNow = (ev: SkuPopupEvent) => {
  uni.navigateTo({
    url: `/orderPkg/editOrderPage/editOrderPage?skuId=${ev._id}&count=${ev.buy_num}`,
  });
};

// 设置默认地址
const setDefaultAddress = async (id, data) => {
  data.isDefault = 1;
  const {
    receiver,
    contact,
    provinceCode,
    cityCode,
    countyCode,
    address,
    isDefault,
  }: AddressParams = data;
  await putMemberAddressByIdAPI(id, {
    receiver,
    contact,
    provinceCode,
    cityCode,
    countyCode,
    address,
    isDefault,
  });
  getGoodsByIdData();
};
//收货地址
const selectedAddress = ref<string>();

//选择收货地址
const selectAddress = (address) => {
  selectedAddress.value = address;
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
