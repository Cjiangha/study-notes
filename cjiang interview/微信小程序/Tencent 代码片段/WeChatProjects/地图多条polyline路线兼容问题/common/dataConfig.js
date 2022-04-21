import { anyui } from '@alife/anyui-wx-framework/index.js';
import Environment from "./environment.js";
const envirom = Environment.getEnvironment();
export const PAGE_SOURCE = {
  userCenter: "userCenter",
  // 用户中心
  userService: "serviceCenter",
  // 客服中心
  proposal: "proposal",
  scheme: "scheme",
  // scheme 进入
  userFeedbackDetail: "userFeedbackDetail",
  // 客服服务详情，反馈与建议
  myTravel: "MyTravel",
  // 我的行程列表
  taxiOverPay: "taxiOverPay",
  // 行后页面
  priceDetail: "priceDetail",
  //费用详情 travel
  travel: "travel",
  // 正在进行的订单
  airportIndexStart: "airportIndexStart",
  // 接送机首页起点地址
  accountabilityDetail: "AccountabilityDetail",
  // 行后判责页面
  airportCarSelect: "airportCarSelect",
  // 接送机车型选择
  userFeedbackProgressList: "userFeedbackProgressList",
  // 客服中心，选择其他行程
  coverPhone: "coverPhone",
  changePhoneSuccess: "changePhoneSuccess",
  cpIndexPage: "cpIndexPage",
  home: "home",
  scanIndex: "scanIndex",
  fixDestination: "fixDestination",
  //修改目的地
  overPayVipCard: "overPayVipCard", // 行后 vipCard
};
/** 我的行程 订单状态 对应 showStatus */

export const ENUM_ORDER_STATUS = {
  dispatch: 0,
  // 派单中
  unpaid: 1,
  // 待支付
  cancelUnpaid: 2,
  // 取消待支付
  closed: 3,
  // 已关闭
  completed: 4,
  // 已完成
  readyToGo: 5,
  // 待出发
  waitingForCar: 6,
  // 待上车
  onTheWay: 7, // 行程中
};
export const ORDER_DIS_STATUS = {
  [ENUM_ORDER_STATUS.dispatch]: "派单中",
  [ENUM_ORDER_STATUS.unpaid]: "待支付",
  [ENUM_ORDER_STATUS.cancelUnpaid]: "取消待支付",
  [ENUM_ORDER_STATUS.closed]: "已关闭",
  [ENUM_ORDER_STATUS.completed]: "已完成",
  [ENUM_ORDER_STATUS.readyToGo]: "待出发",
  [ENUM_ORDER_STATUS.waitingForCar]: "待上车",
  [ENUM_ORDER_STATUS.onTheWay]: "行程中",
};
export const ORDER_DIS_SERVICE = {
  1: "实时",
  2: "预约",
  3: "接机",
  4: "送机",
}; //错误类型

export const ERR_TYPE = {
  SIGN_ERR: 1,
  //未登录
  NET_ERR: 2, //网络不佳
};
const ORDERING_DOMAIN_ENV = {
  test: "https://hailing-test.amap.com",
  pre: "https://pre-dache.amap.com",
  public: "https://dache.amap.com",
};
export const ORDERING_DOMAIN = ORDERING_DOMAIN_ENV[envirom];
/** 首页 tab切换的键值常量 */

export const HOME_TAB_KEYS = {
  /** 现在 */
  now: "now",

  /** 接送机 */
  airport: "airport",

  /** 预约 */
  reserve: "reserve",

  /** 远程特惠 */
  intercity: "intercity",
};
/**
 * gdServiceId 映射
 */

export const GD_SERVICEID_MAP = {
  now: 1,
  // 实时单
  reserve: 2,
  // 预约单
  airportBack: 3,
  // 接机
  airportGo: 4,
  // 送机
  intercity: 5, // 远程特惠
};
/*
 * subGdServiceId 映射
 */

export const SUB_GD_SERVICEID_MAP = {
  NORMAL_ORDER: 0,
  // 普通单
  CALL_FOR_OTHERS_ORDER: 1,
  // 代叫单
  EXAMINE_ORDER: 3,
  // 考生专车
  ASSIGN_DISPATCH_ORDER: 4,
  // 定向派单/扫码打车
  SENIOR_MODE: 5, // 助老单
};
/** 页面跳转来源 标识对应的page页面 */

export const ENUM_NAVIGATE_SOURCE = {
  /** cp页 */
  cp: "cp",
};
/* 微信地图外观配置的subkey 枚举数据 */

const ENUM_WX_MAP_SUBKEY = {
  test: "AVQBZ-F6HC3-QDN35-YUA55-ZLEFF-DBBO4",
  pre: "AZKBZ-XZI6I-SQHGM-5NQ2T-JLSWQ-JFB2Z",
  public: "AZKBZ-XZI6I-SQHGM-5NQ2T-JLSWQ-JFB2Z",
};
/* 微信地图外观配置的subkey */

export const WX_MAP_SUBKEY = ENUM_WX_MAP_SUBKEY[envirom];
/* 行程分享来源标识 */

function getTravelShareFrom() {
  let from;
  from = "wxmini";
  return from;
}

export const TRAVEL_SHARE_FROM = getTravelShareFrom();
export const TAXI_PRICE = {
  SHOW: 1,
  HIDE: 2,
};
