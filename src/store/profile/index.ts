import type { LoginResult } from "../../pages/loginPage/loginPageType";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore(
  "profile",
  () => {
    // 会员信息
    const profile = ref<LoginResult>();

    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val;
    };

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined;
    };

    // 记得 return
    return { profile, setProfile, clearProfile };
  },
  {
    // 小程序端配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  },
);
