import { http } from "../../utils/http";
import type { OrderListResult } from "./orderListPageType";

export const getMemberOrderAPI = (data: OrderListParams) => {
  return http<OrderListResult>({
    method: "GET",
    url: `/member/order`,
    data,
  });
};
