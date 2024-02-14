import { http } from "../../utils/http";
import type { CartItem } from "./cartPage";

export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: "GET",
    url: "/member/cart",
  });
};
