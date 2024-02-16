import { http } from "../../utils/http";
import type { CartItem } from "./cartPage";

export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: "GET",
    url: "/member/cart",
  });
};

//删除购物车
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    method: "DELETE",
    url: "/member/cart",
    data,
  });
};

//修改购物车
export const putMemberCartBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http({
    method: "PUT",
    url: `/member/cart/${skuId}`,
    data,
  });
};
