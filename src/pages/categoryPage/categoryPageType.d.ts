/**
 * 分类列表-小程序
 */
import type { GoodsItem } from "../recommendItem/recommendItemType";

/** 一级分类项 */
export type CategoryTopItem = {
  /** 二级分类集合[ 二级分类项 ] */
  children: CategoryChildItem[];
  /** 一级分类id */
  id: string;
  /** 一级分类图片集[ 一级分类图片项 ] */
  imageBanners: string[];
  /** 一级分类名称 */
  name: string;
  /** 一级分类图片 */
  picture: string;
};

/** 二级分类项 */
export type CategoryChildItem = {
  /** 商品集合[ 商品项 ] */
  goods: GoodsItem[];
  /** 二级分类id */
  id: string;
  /** 二级分类名称 */
  name: string;
  /** 二级分类图片 */
  picture: string;
};

/**分类页轮播图数据 */
export type SwiperItem = {
  /** 跳转链接 */
  hrefUrl: string;
  /** id */
  id: string;
  /** 图片链接 */
  imgUrl: string;
  /** 跳转类型 */
  type: number;
};
