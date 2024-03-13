<template>
  <view>支付成功</view>
  <navigator
    hover-class="none"
    class="button navigator"
    url="/pages/indexPage/indexPage"
    open-type="switchTab"
  >
    返回首页
  </navigator>
  <navigator
    hover-class="none"
    class="button navigator"
    :url="`/orderPkg/detailOrderPage/detailOrderPage?id=${query.id}`"
    open-type="redirect"
  >
    查看订单
  </navigator>
</template>

<script lang="ts" setup>
// 获取页面参数
const query = defineProps<{
  id: string;
}>();
</script>

<style></style>
