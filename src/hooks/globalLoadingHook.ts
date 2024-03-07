import { ref } from "vue";

export const globalLoadingHook = () => {
  const isLoading = ref(true);
  const setLoading = (isLoad: boolean) => {
    isLoading.value = isLoad;
  };
  return {
    isLoading,
    setLoading,
  };
};
