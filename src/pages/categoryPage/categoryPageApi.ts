import { http } from "../../utils/http";
import type { CategoryTopItem, SwiperItem } from "./categoryPageType";
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: "GET",
    url: "/category/top",
  });
};
//获取轮播图
export const getCatgorySwiperAPI = (distributionSite: number = 1) => {
  return http<SwiperItem[]>({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite,
    },
  });
};
