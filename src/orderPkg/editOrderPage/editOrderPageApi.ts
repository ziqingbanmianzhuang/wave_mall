import { http } from "../../utils/http";
import type { OrderPreResult } from "./editOrderPageType";

// 获取预付订单
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: "GET",
    url: "/member/order/pre",
  });
};

// 根据商品的skuid获取预付订单
export const getMemberOrderPreBySkuIDAPI = (data: {
  skuId: string;
  count: string;
  addressId?: string;
}) => {
  return http<OrderPreResult>({
    method: "GET",
    url: "/member/order/pre/now",
    data,
  });
};

//提交订单
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    method: "POST",
    url: "/member/order",
    data,
  });
};

//根据Orderid获取订单
export const getMemberOrderRepurchaseByIdAPI = (id: string) => {
  return http<OrderPreResult>({
    method: "GET",
    url: `/member/order/repurchase/${id}`,
  });
};
