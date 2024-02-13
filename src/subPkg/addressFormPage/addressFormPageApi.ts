import type { AddressParams } from "./addressFormPageType.d.ts";
import type { AddressItem } from "../addressPage/addressPageType";
import { http } from "../../utils/http";

/**
 * 添加收货地址
 * @param data 请求参数
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: "POST",
    url: "/member/address",
    data,
  });
};

// 根据id获取地址
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: "GET",
    url: `/member/address/${id}`,
  });
};

//修改地址
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return http({
    method: "PUT",
    url: `/member/address/${id}`,
    data,
  });
};

// 删除地址
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http({
    method: "DELETE",
    url: `/member/address/${id}`,
  });
};
