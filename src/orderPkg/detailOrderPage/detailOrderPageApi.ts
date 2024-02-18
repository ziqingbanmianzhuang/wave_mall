import { http } from "../../utils/http";
import type { OrderResult } from "./detailOrdrerPageType";

//获取订单详情
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: "GET",
    url: `/member/order/${id}`,
  });
};
