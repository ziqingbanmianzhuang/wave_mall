import { http } from "../../utils/http";
import type { OrderResult } from "./detailOrdrerPageType";

//获取订单详情
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: "GET",
    url: `/member/order/${id}`,
  });
};

//微信模拟支付
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    method: "GET",
    url: "/pay/mock",
    data,
  });
};

//模拟商家发货
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return http({
    method: "GET",
    url: `/member/order/consignment/${id}`,
  });
};
