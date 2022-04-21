const CacheKeys = {
  MINI_PROGRAM_VERSION: "MINI_PROGRAM_VERSION",
  // 小程序版本
  RECOMMEND_SESSIONID: "RECOMMEND_SESSIONID",
  // 推荐点请求的 sessionid
  SCAN_TAXI_DRIVER_INFO: "SCAN_TAXI_DRIVER_INFO",
  // 扫码打车司机信息
  SUGGEST_REDPAPER_TIPS: "SUGGEST_REDPAPER_TIPS",
  // 扫码打车司机信息
  ON_CAR_TIME: "ON_CAR_TIME",
  // 扫码打车乘客上车时间本地缓存
  RED_PAPER_REQUEST: "RED_PAPER_REQUEST",
  RED_PAPER_USE: "RED_PAPER_USE",
  INVOICE_APPLY_SUCCESS: "INVOICE_APPLY_SUCCESS",
  // 发票申请操作
  NEW_TAXI_USER: "NEW_TAXI_USER",
  //标示当前缓存中是否为新用户
  HAS_ADD_DESKTOP_SHOW: "HAS_ADD_DESKTOP_SHOW",
  //本地是否展示过首页添加桌面引导
  HAS_ADD_ALI_DESK: "HAS_ADD_ALI_DESK",
  // 支付宝重构本地是否展示过添加首页引导
  HAS_ADD_HOME_SHOW: "HAS_ADD_HOME_SHOW",
  //本地是否展示过首页添加桌面引导
  RECOMMEND_CP_LIST_WITH_AMAPORDERID: "RECOMMEND_CP_LIST_WITH_AMAPORDERID",
  // 根据订单 id 维度记录 101 推荐的运力
  FIRST_REQUEST_CAPACITY: "FIRST_REQUEST_CAPACITY",
  //首次请求运力
  ASAC: "ASAC",
  // 活动安全码，由运营创建
  CUR_USER_COMPLAINT_ORDER: "CUR_USER_COMPLAINT_ORDER",
  // 当前需要投诉的行程
  ALIPAY_COMMUTE_BUY_ID: "ALIPAY_COMMUTE_BUY_ID",
  LOCATION_HELPER_LOCATION_INFO: "LOCATION_HELPER_LOCATION_INFO",
  // LocationHelper.js 地址帮助函数中使用的 当前位置经纬度
  SELECTED_CP_MEMORY_FOR_CP_INDEX: "SELECTED_CP_MEMORY_FOR_CP_INDEX",
  // 运力规划页-运力接口使用，缓存每次用户选择的运力。服务下发的是基于上次用户记忆和推荐配置的勾选结果，如果没有任何操作，这个勾选结果就是下次请求带上去的用户记忆
  QUICK_GO_ROUND_WITH_AMAPORDERID: "QUICK_GO_ROUND",
  // 快走轮次，根据订单id记录展示过的快走轮次
  WX_OPEN_ID: "WX_OPEN_ID",
  // 微信端 用户 openid
  APPLICATION_ONSHOW: "APPLICATION_ONSHOW",
  // 应用的前后台状态
  CP_TAG_FILTER: "CP_TAG_FILTER", // 运力规划页中 价格筛选和车型筛选的区分
};
/**
 * 扫码打车 config 信息
 */

export const ScanTaxiConfig = {
  ESTIMATE_PRICE_PAGE: "ESTIMATE_PRICE_PAGE",
  // 预估价页面底部文案
  SUBMIT_ORDER_BADGE: "SUBMIT_ORDER_BADGE",
  // 发单按钮角标
  SUGGEST_PAGE_TIPS: "SUGGEST_PAGE_TIPS",
  // sug页面tip配置
  SCENE_TIPS: "SCENE_TIPS",
  // 分场景tips
  PRRIVACY_NUMBER_GUIDE: "PRRIVACY_NUMBER_GUIDE", //是否展示过隐私号弹框
};
/**
 * 全局参数缓存
 */

export const GlobalData = {
  use_type: "use_type",
  // 标明是要使用哪个小程序，网约车、出租车、扫码打车
  scan_taxi: "scan_taxi",
  // 扫码打车全局参数
  scan_qrcode_taxi: "scan_qrcode_taxi",
  // 扫码打车存储qrcode
  isAdaptive: "isAdaptive",
  // 是否为刘海屏
  source: "source",
  // 区分口碑来源
  hasEnterTaxi: "hasEnterTaxi",
  //本地记录是否为出租车新用户
  hasShowSelectTips: "hasShowSelectTips",
  //当次进入小程序是否展示过选择提示
  selectGuideLocalNum: "selectGuideLocalNum",
  //本地记录运力选择页引导tips展示次数
  popupWindowShowNum: "popupWindowShowNum",
  // 本地记录首页优惠弹层展示次数
  FREE_PAY_STATUS: "FREE_PAY_STATUS",
  // 免密支付状态 0 未签约免密 1 已签约免密 -1 未从服务端更新状态
  GLOBAL_SWITCH: "GLOBAL_SWITCH",
  // 全局开关，控制一些活动等
  CONTAINER_CREATED_QUERY: "CONTAINER_CREATED_QUERY",
  // 缓存支付宝页面首次 created 时的参数
  CONTAINER_FIRST_ON_SHOW_OPTIONS: "CONTAINER_FIRST_ON_SHOW_OPTIONS",
  // 缓存支付宝页面首次 onShow 时的参数
  SUBSCRIBE_MSG_TIME: "SUBSCRIBE_MSG_TIME",
  // 缓存提示用户订阅消息的开始时间
  DIALOG_CONFIG_MESSAGE: "DIALOG_CONFIG_MESSAGE",
  // 是否显示订阅消息提醒服务控制
  ALI_APP_TOKEN: "ALI_APP_TOKEN",
  // 支付宝appToken
  endPointSecondConfirmData: "endPointSecondConfirmData", //场站终点二次确认数据
};
/**
 * 统一的 scheme 协议参数缓存
 */

export const SchemeData = {
  UNIFY_SCHEME_SOURCE: "UNIFY_SCHEME_SOURCE", // 标识从哪里跳到支付宝小程序
};
/**
 * wx
 */

export const WX_CACHE_KEYS = {
  OVER_PAY_ADD_TIPS: "OVER_PAY_ADD_TIPS",
  guideWechatCollect: "guideWechatCollect",
  //微信展示一次，引导tips
  LI_JIA_QI_EVENT: "LI_JIA_QI_EVENT", // 李佳琦活动
};
/**
 * 行后
 */

export const ONLINE_OVER_PAY = {
  FARE_INDOUBT: "FARE_INDOUBT",
  // 订单纬度记录一个已命中未乘车扣费的订单，是否已经弹过未乘车扣费弹窗
  FEE_UPGRADES_DOUBT: "FEE_UPGRADES_DOUBT",
  // 订单纬度记录,是否已经弹过惊喜升舱弹窗
  CROSS_ChANNEL_BLOCK: "CROSS_ChANNEL_BLOCK", //跨渠道支付，是否已经弹过阻塞支付弹窗
};
/**
 * Map
 */

export const MAP_KEY = {
  MAP_MARKER: "MAP_MARKER",
  // 标记marker是否可以点击
  LOCATION_PIN_INFO: "LOCATION_PIN_INFO",
  // 记录上车点请求前扎标的经纬度
  PICKUP_SPOTS_DATA: "PICKUP_SPOTS_DATA", // 首页和送机时 图面推荐点接口返回的数据
};
/**
 *
 * 车型选择页面缓存信息
 *
 */

export const CAR_SELECT_PAGE_KEY = {
  TO_PAGE: "TO_PAGE", // 标记下单结束后跳转的页面
}; // 助老 的cache key

export const ASSIST_OLD_KEYS = {
  // 取消挽留页面取消成功后的订单状态
  CANCEL_RETENTION_STATUS: "CANCEL_RETENTION_STATUS",
  // 首页上次使用的模式
  LAST_TAB_STATE: "LAST_TAB_STATE",
  //助老模式参数
  PARAM: "PARAM",
}; // 运营引导 的cahe key

export const GUIDE = {
  // 场站步行引导id
  GUIDE_SPOT_ID: "GUIDE_SPOT_ID",
  // 运力规划页价格区间气泡引导
  PRICE_RANGE_GUIDE: "PRICE_RANGE_GUIDE",
  // 发送消息的气泡引导
  SEND_MESSAGE_GUIDE: "SEND_MESSAGE_GUIDE",
  // 选择路线气泡引导
  CHOOSE_PATH_GUIDE: "CHOOSE_PATH_GUIDE",
}; //远程特惠

export const INTERCITY_KEYS = {
  GUIDE_INTERCITY_CONFIRM: "GUIDE_INTERCITY_CONFIRM", //上下车确认页是否展示过引导用户tips
}; // 薅打车金新玩法存储用户信息

export const SHARE_HELP = {
  USER_INFO: "USER_INFO",
}; //行中103/104，

export const ONLINE_GOING = {
  GUIDE_MODIFY_START_POINT: "GUIDE_MODIFY_START_POINT",
  //修改上车点用户指引
  CAR_TIPS_POPUP_INFO_FATIGUE: "CAR_TIPS_POPUP_INFO_FATIGUE",
  // cartips 滴滴隐私好弹窗疲劳度
  FREE_UPGRADES_DIALOG_FATIGUE: "FREE_UPGRADES_DIALOG_FATIGUE",
  //惊喜升舱弹窗疲劳度
  PATROL_ALTER_POPUP_FATIGUE: "PATROL_ALTER_POPUP_FATIGUE",
  // 出租车接单弹窗疲劳度缓存
  RECEIVE_COUPON: "RECEIVE_COUPON",
  // 是否在当前订单下领取红包
  CAR_LIST_ROUTE_ID: "CAR_LIST_ROUTE_ID",
  // 本地缓存运力接口返回的 routeId，下单和拉取追加运力使用
  CANCEL_RECOMMEND_LIST: "CANCEL_RECOMMEND_LIST",
  // 取消挽留的接口数据做缓存
  SELECT_ROUTE_TIPS: "SELECT_ROUTE_TIPS", // 是否二次确认路线选择
}; // IM

export const IM = {
  IM_SUPPORT_CONFIG: "IM_SUPPORT_CONFIG",
};
export default CacheKeys;
