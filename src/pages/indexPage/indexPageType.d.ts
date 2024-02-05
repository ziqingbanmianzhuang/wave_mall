/** 首页-前台类目数据类型 */
export type CategoryItem = {
  /** 图标路径 */
  icon: UniHelper.UniIcons["type"];
  /** id */
  id: string;
  /** 分类名称 */
  name: string;
  //背景颜色
  bg: string;
};

/** 首页-热门推荐数据类型 */
export type RecommendItem = {
  /** 说明 */
  alt: string;
  /** id */
  id: string;
  /** 图片集合 */
  pictures: string[];
  /** 跳转地址 */
  target: string;
  /** 标题 */
  title: string;
  /** 推荐类型 */
  type: string;
  /** 图标路径 */
  icon: UniHelper.UniIcons["type"];
  //背景颜色
  bg: string;
};

/** 首页-广告区域数据类型 */
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
