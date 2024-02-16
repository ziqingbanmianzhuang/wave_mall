import { http } from "../../utils/http";
import type { OrderPreResult } from "./editOrderPageType";

// 获取预付订单
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: "GET",
    url: "/member/order/pre",
  });
};
