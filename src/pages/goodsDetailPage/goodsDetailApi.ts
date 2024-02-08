import { http } from "../../utils/http";
import type { GoodsResult } from "./goodsDetailType";
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: "GET",
    url: "/goods",
    data: { id },
  });
};
