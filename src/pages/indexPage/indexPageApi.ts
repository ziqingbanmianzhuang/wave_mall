// services/home.ts
/**
 * 首页-前台分类-小程序
 */
import { http } from "../../utils/http";
import type { CategoryItem } from "./indexPageType";

export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: "GET",
    url: "/home/category/mutli",
  });
};
