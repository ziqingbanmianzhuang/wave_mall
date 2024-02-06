import { http } from "../../utils/http";
import type { PageParams } from "../indexPage/indexPageType";
import type { RecommendResult } from "./recommendItemType";

type RecommendParams = PageParams & {
  /** Tab 项的 id，默认查询全部 Tab 项的第 1 页数据 */
  subType?: string;
};
/**
 * 通用热门推荐类型
 * @param url 请求地址
 * @param data 请求参数
 */
export const getRecommendAPI = (url: string, data?: RecommendParams) => {
  return http<RecommendResult>({
    method: "GET",
    url,
    data,
  });
};
