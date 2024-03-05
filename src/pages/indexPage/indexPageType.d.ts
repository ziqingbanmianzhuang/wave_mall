/** 主页推荐喜欢模块的Img扩展类型 */
export interface ImgElement extends HTMLElement {
  dataset: { src: string };
  src: string;
  style: {
    transition: string;
    opacity: string;
    display: string;
  };
}

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

/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 列表数据 */
  items: T[];
  /** 总条数 */
  counts: number;
  /** 当前页数 */
  page: number;
  /** 总页数 */
  pages: number;
  /** 每页条数 */
  pageSize: number;
};

/** 猜你喜欢-商品类型 */
export type LikeItem = {
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
/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  page?: number;
  /** 页大小：默认值为 10 */
  pageSize?: number;
};
