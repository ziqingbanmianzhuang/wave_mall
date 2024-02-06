// src/types/global.d.ts
import type { PageResult } from "../indexPage/indexPageType";
/** 通用商品类型 */
export type GoodsItem = {
  /** 商品描述 */
  desc: string;
  /** 商品折扣 */
  discount: number;
  /** id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品已下单数量 */
  orderNum: number;
  /** 商品图片 */
  picture: string;
  /** 商品价格 */
  price: number;
};

/ ** 热门推荐 */;
export type RecommendResult = {
  /** id信息 */
  id: string;
  /** 活动图片 */
  bannerPicture: string;
  /** 活动标题 */
  title: string;
  /** 子类选项 */
  subTypes: SubTypeItem[];
};

/** 热门推荐-子类选项 */
export type SubTypeItem = {
  /** 子类id */
  id: string;
  /** 子类标题 */
  title: string;
  /** 子类对应的商品集合 */
  goodsItems: PageResult<GoodsItem>;
};
