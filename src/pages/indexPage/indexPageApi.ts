// services/home.ts
/**
 * 首页-前台分类-小程序
 */
import { http } from "../../utils/http";
import type { CategoryItem, RecommendItem, SwiperItem } from "./indexPageType";

export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: "GET",
    url: "/home/category/mutli",
  });
};

export const getHomeRecommendAPI = () => {
  return http<RecommendItem[]>({
    method: "GET",
    url: "/home/hot/mutli",
  });
};

export const getHomeSwiperAPI = (distributionSite: number = 1) => {
  return http<SwiperItem[]>({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite,
    },
  });
};
