import type { AddressItem } from "../../subPkg/addressPage/addressPageType";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddressStore = defineStore("address", () => {
  const selectedAddress = ref<AddressItem>();

  const changeSelectedAddress = (val: AddressItem) => {
    selectedAddress.value = val;
  };

  return { selectedAddress, changeSelectedAddress };
});
