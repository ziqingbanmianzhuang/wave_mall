import { http } from "../../utils/http";
import type { GoodsResult, AddressParams } from "./goodsDetailType";
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

//修改地址
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return http({
    method: "PUT",
    url: `/member/address/${id}`,
    data,
  });
};
