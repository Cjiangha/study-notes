import { UserInfo, ShopInfo } from '@/types/autoStore.d';

export type DetailMediaItem = {
  id: string;
  mediaUrl: string;
  mediaType: string;
};

export type PropertyItem = {
  id: string;
  propertyName: string;
  propertyValue: string;
};

export type SkuPropertyItem = {
  title: string;
  data: Array<PropertyItem>;
};

type SkuPropertyMapItem = {
  [T: string]: string;
};

export type SkuItemData = {
  id: string;
  image: string;
  stock: number;
  isBuy?: boolean;
  price?: number;
  minQuantity: number;
  limitQuantity: number;
  customerLevelPrice: number;
};

export type ShopDetail = {
  id: string;
  price: number;
  isBuy?: boolean;
  content: string;
  sku: SkuItemData;
  viewCount: number;
  productNo: string;
  coverImage: string;
  saleStatus: string;
  productName: string;
  avatarList: string[];
  selectedSkuId: string;
  customerLevelPrice: number;
  mainMediaList: Array<DetailMediaItem>;
  detailMediaList: Array<DetailMediaItem>;
  skuPropertyList: Array<SkuPropertyItem>;
  skuPropertyMapList: Array<SkuPropertyMapItem>;
};

export type _wxUserInfo = {
  nickName: string;
  avatarUrl: string;
  gender: number;
  province: string;
  city: string;
  country: string;
};

export type PosterData = {
  userName: string; // 用户名
  wxQRCode: string; // 小程序码
  shopImage: string; // 商品主图
  userAvatar: string; // 用户头像
  userDescribe: string; // 用户描述
  shopDescribe: string; // 商品描述
  lookDescribe: string; // 查看文字
  lookUserAvatar: string[]; // 查看头像
};

export type SwipeItem = {
  id: string;
  url: string;
};

export type ShopTypeRef = {
  hide: () => void;
  show: (type: string) => void;
};

export type shopShareRef = {
  hide: () => void;
  show: (data) => void;
};

export type ShopPosterRef = {
  init: (data) => void;
  show: () => void;
  hide: () => void;
  download: () => void;
};

export type ShareItem = {
  id: string;
  type: string;
  label: string;
  openType: string;
  iconName: string;
};

export type Params = {
  router: {
    params: { shopId: string };
  };
};

export type ShareParams = {
  productId: string;
  createUserId: string;
  createUserType: string;
};

export type WxUserInfo = {
  gender?: number;
  nickName: string;
  avatarUrl: string;
};

export type RouteQuery = {
  share: string;
  scene: string;
  shopId: string;
  goWxApp: string;
  groupId: string;
  activityId: string;
};

export type PageStateProps = {
  store: {
    autoStore: {
      userInfo: UserInfo;
      shopInfo: ShopInfo;
      commitUserInfo: (info) => void;
      commitShopInfo: (data: Record<string, unknown>) => void;
    };
    deviceInfoStore: {
      isIpx: boolean;
      isProfile: boolean;
    };
    orderInfoStore: {
      commitPreviewSources: (media) => void;
      commitCurrentIndex: (index: number) => void;
    };
  };
};

export type PageState = {
  isMoment: boolean;
  qrCodeSrc: string;
  serviceImg: string;
  currentIndex: number;
  skuCoverImage: string;
  routeQuery: RouteQuery;
  shopDetail: ShopDetail;
  isLaunchedCar: boolean;
  shareParams: ShareParams;
  shopId: string | undefined;
  cacheMainMediaImg: number[];
  cacheDetailMediaImg: number[];
};
