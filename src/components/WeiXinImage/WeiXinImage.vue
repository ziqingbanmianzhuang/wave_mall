<template>
  <image
    :src="props.picture"
    mode="aspectFill"
    lazy-load
    class="opacity-0 transition-opacity duration-200 border-radius-primary w-full min-[960px]:h-96 h-48"
    :class="[
      props.class,
      {
        successImage: isShowSucLoadWeixinImage,
        errorImage: isShowErrLoadWeixinImage,
      },
    ]"
    @error="errLoadWeinXinImage"
    @load="sucLoadWeinXinImage"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ picture: string; class: string }>();
import {
  sucLoadWeinXinImageHook,
  errLoadWeinXinImageHook,
} from "../../hooks/lazyLoadImgWeiXin";

const { isShowSucLoadWeixinImage, setShowSucLoadWeixinImage } =
  sucLoadWeinXinImageHook();
const { isShowErrLoadWeixinImage, setShowErrLoadWeixinImage } =
  errLoadWeinXinImageHook();

const sucLoadWeinXinImage = () => {
  setShowSucLoadWeixinImage();
};
const errLoadWeinXinImage = () => {
  setShowErrLoadWeixinImage();
};
</script>

<style lang="scss" scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.successImage {
  opacity: 1;
  transition: opacity 2s ease-in-out;
}
.errorImage {
  opacity: 1;
  transition: opacity 2s ease-in-out;
}
.errorImage:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background-image: url("../../static/images/imgBack.svg");
  background-position: center;
  background-size: cover;
}
</style>
