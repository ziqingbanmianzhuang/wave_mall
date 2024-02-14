import { http } from "../../utils/http";
import type { GoodsResult } from "./goodsDetailType";
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: "GET",
    url: "/goods",
    data: { id },
  });
};

// 加入购物车
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: "POST",
    url: "/member/cart",
    data,
  });
};
