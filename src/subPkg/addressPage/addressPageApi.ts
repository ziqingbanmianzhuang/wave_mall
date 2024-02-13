import { AddressItem } from "./addressPageType";
import { http } from "../../utils/http";

export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    method: "GET",
    url: "/member/address",
  });
};
