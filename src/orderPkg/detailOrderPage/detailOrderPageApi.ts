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

//确认收货
export const putMemberOrderReceiptByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: "PUT",
    url: `/member/order/${id}/receipt`,
  });
};

//取消订单
export const getMemberOrderCancelByIdAPI = (
  id: string,
  data: { cancelReason: string },
) => {
  return http<OrderResult>({
    method: "PUT",
    url: `/member/order/${id}/cancel`,
    data,
  });
};
