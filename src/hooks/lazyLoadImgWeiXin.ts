import { ref } from "vue";

export const sucLoadWeinXinImageHook = () => {
  const isShowSucLoadWeixinImage = ref(false);
  const setShowSucLoadWeixinImage = () => {
    isShowSucLoadWeixinImage.value = true;
    console.log("success");
  };
  return { isShowSucLoadWeixinImage, setShowSucLoadWeixinImage };
};
export const errLoadWeinXinImageHook = () => {
  const isShowErrLoadWeixinImage = ref(false);
  const setShowErrLoadWeixinImage = () => {
    isShowErrLoadWeixinImage.value = true;
    console.log("error");
  };
  return { isShowErrLoadWeixinImage, setShowErrLoadWeixinImage };
};
