import LocalCache from "./module/LocalCache.js";
import MemoryCache from "./module/MemoryCache.js";
import CacheKeys from "./module/CacheKeys.js";
import { ScanTaxiConfig } from "./module/CacheKeys.js";
import { GlobalData } from "./module/CacheKeys.js";
import { SchemeData } from "./module/CacheKeys.js";
import { WX_CACHE_KEYS } from "./module/CacheKeys.js";
import { ONLINE_OVER_PAY } from "./module/CacheKeys.js";
import { MAP_KEY } from "./module/CacheKeys.js";
import { CAR_SELECT_PAGE_KEY } from "./module/CacheKeys.js";
import { ASSIST_OLD_KEYS } from "./module/CacheKeys.js";
import { GUIDE } from "./module/CacheKeys.js";
import { INTERCITY_KEYS } from "./module/CacheKeys.js";
import { SHARE_HELP } from "./module/CacheKeys.js";
import { ONLINE_GOING } from "./module/CacheKeys.js";
import { IM } from "./module/CacheKeys.js"; // 解决分包多次实例化问题
const setDefault = (cacheInstance, defaultValue) => {
  const currentValue = cacheInstance.get();

  if (currentValue === undefined) {
    cacheInstance.set(defaultValue);
  } else {
    cacheInstance.set(currentValue);
  }
};

export const miniProgramVersionCache = new MemoryCache(
  CacheKeys.MINI_PROGRAM_VERSION
).set("3.7.5");
export const recommendSessionIdCache = new MemoryCache(
  CacheKeys.RECOMMEND_SESSIONID
).set("");
export const scanTaxiDriverInfoCache = new MemoryCache(
  CacheKeys.SCAN_TAXI_DRIVER_INFO
);
export const estimatePricePageCache = new MemoryCache(
  ScanTaxiConfig.ESTIMATE_PRICE_PAGE
);
export const submitOrderBadgeCache = new MemoryCache(
  ScanTaxiConfig.SUBMIT_ORDER_BADGE
);
export const suggestPageTipsCache = new MemoryCache(
  ScanTaxiConfig.SUGGEST_PAGE_TIPS
);
export const suggestRedPaperTips = new MemoryCache(
  ScanTaxiConfig.SUGGEST_REDPAPER_TIPS
);
export const sceneTipsCache = new MemoryCache(ScanTaxiConfig.SCENE_TIPS);
export const redPaperRequestCache = new MemoryCache(
  CacheKeys.RED_PAPER_REQUEST
).set(false);
export const redPaperUseCache = new MemoryCache(CacheKeys.RED_PAPER_USE).set(
  false
);
export const unifySchemeSourceCache = new MemoryCache(
  SchemeData.UNIFY_SCHEME_SOURCE
).set("0");
export const scanTaxiCache = new MemoryCache(GlobalData.scan_taxi);
export const scanTaxiQrCodeCache = new MemoryCache(GlobalData.scan_qrcode_taxi);
export const useTypeCache = new MemoryCache(GlobalData.use_type);
setDefault(useTypeCache, ""); // 是否为刘海屏

export const isAdaptiveCache = new MemoryCache(GlobalData.isAdaptive).set(
  false
); // 区分口碑来源

export const sourceCache = new MemoryCache(GlobalData.source).set("alipay");
export const freePayStatusCache = new MemoryCache(GlobalData.FREE_PAY_STATUS);
setDefault(freePayStatusCache, -1); //本地存储是否进入过出租车 & 缓存记录当次是否为新用户

export const NEW_TAXI_USER = new MemoryCache(GlobalData.NEW_TAXI_USER).set(
  false
);
export const hasEnterTaxi = new LocalCache(GlobalData.hasEnterTaxi);
export const FIRST_REQUEST_CAPACITY = new MemoryCache(
  CacheKeys.FIRST_REQUEST_CAPACITY
); //服务下发运力规划页勾选引导tips记录

export const hasShowSelectTips = new MemoryCache(
  GlobalData.hasShowSelectTips
).set(false); //本地下发运力规划页勾选殷桃tips记录

export const selectGuideLocalNum = new LocalCache(
  GlobalData.selectGuideLocalNum
); //本地是否展示过首页添加桌面引导

export const HAS_ADD_DESKTOP_SHOW = new LocalCache(
  CacheKeys.HAS_ADD_DESKTOP_SHOW
); //本地存储添加首页引导的疲劳度缓存

export const addHomeShowCache = new LocalCache(CacheKeys.HAS_ADD_HOME_SHOW); //支付宝重构本地是否展示过首页添加桌面引导

export const addAliDesktopCache = new LocalCache(CacheKeys.HAS_ADD_ALI_DESK);
export const onCarTimeCache = new LocalCache(CacheKeys.ON_CAR_TIME);
export const privacyNumberGuideCache = new LocalCache(
  ScanTaxiConfig.PRRIVACY_NUMBER_GUIDE
); //是否展示过引导用户tips

export const guideWechatCollect = new LocalCache(
  WX_CACHE_KEYS.guideWechatCollect
);
export const invoiceApplySuccessCache = new MemoryCache(
  CacheKeys.INVOICE_APPLY_SUCCESS
);
export const recommendCpListCache = new LocalCache(
  CacheKeys.RECOMMEND_CP_LIST_WITH_AMAPORDERID
);
export const asacCache = new MemoryCache(CacheKeys.ASAC).set({
  scanTaxi: "2A20402V011135EFX42JI2",
  alipayCommuteCard: "2A20A12ZCPT1X8W2QSQRG2",
  fissionRedEnvelope: "2A20B171TG6OM9SJZIWZV0",
  // 裂变红包安全码
  wxPackageCoupon: "2A21111FQ5KXPAB7JQIJ13",
  //微信套餐券安全码
  alipayPackageCoupon: "2A21B027ON7PKG0W0LJ6RM", //支付宝套餐券安全码
}); // 当前用户行程投诉单

export const curUserComplaintOrderCache = new MemoryCache(
  CacheKeys.CUR_USER_COMPLAINT_ORDER
).set(null); // wx

export const overPayAddTipsCache = new LocalCache(
  WX_CACHE_KEYS.OVER_PAY_ADD_TIPS
); // 微信端 用户 openid

export const wxOpenIdCache = new MemoryCache(CacheKeys.WX_OPEN_ID).set(""); // 支付宝通勤卡购买中的id

export const alipayCommuteBuyIdCache = new MemoryCache(
  CacheKeys.ALIPAY_COMMUTE_BUY_ID
).set(null); // LocationHelper.js 文件中使用的 当前位置信息、poi信息

export const locationInfoByLocationHelper = new MemoryCache(
  CacheKeys.LOCATION_HELPER_LOCATION_INFO
); // 运力规划页-运力接口使用，缓存每次用户选择的运力。服务下发的是基于上次用户记忆和推荐配置的勾选结果，如果没有任何操作，这个勾选结果就是下次请求带上去的用户记忆

export const selectedCpMemoryForCPIndexCache = new LocalCache(
  CacheKeys.SELECTED_CP_MEMORY_FOR_CP_INDEX
); // 首页弹层 - 优惠券弹层使用，缓存弹层展示时间、次数等疲劳度信息

export const homeCouponPopupCache = new LocalCache(
  GlobalData.popupWindowShowNum
); // 步行引导卡片，场站上车点id缓存

export const guideSpotIdCache = new LocalCache(GUIDE.GUIDE_SPOT_ID); // 快走轮次记录，一轮只弹一次

export const quickGoRoundCache = new LocalCache(
  CacheKeys.QUICK_GO_ROUND_WITH_AMAPORDERID
);
export const fareIndoubtCache = new LocalCache(ONLINE_OVER_PAY.FARE_INDOUBT);
export const mapCache = new LocalCache(MAP_KEY.MAP_MARKER);
export const carSelectToPageCache = new MemoryCache(
  CAR_SELECT_PAGE_KEY.TO_PAGE
).set("");
/** 全局配置开关 */

export const globalSwitchCache = new MemoryCache(GlobalData.GLOBAL_SWITCH).set(
  null
);
/** 李佳琦活动缓存 */

export const liJiaQiEventCache = new LocalCache(WX_CACHE_KEYS.LI_JIA_QI_EVENT); // 助老 使用到的cache key。取消挽留页取消成功后从cancel_order拿到的status 0 为默认状态:

export const assistOldCancelRetentionStatus = new MemoryCache(
  ASSIST_OLD_KEYS.CANCEL_RETENTION_STATUS
).set(0);
export const assistOldLastTab = new LocalCache(ASSIST_OLD_KEYS.LAST_TAB_STATE); //助老传入参数

export const assistoldCache = new MemoryCache(ASSIST_OLD_KEYS.PARAM);
export const containerCreatedQueryCache = new MemoryCache(
  GlobalData.CONTAINER_CREATED_QUERY
).set([]);
export const containerFirstOnShowOptionsCache = new MemoryCache(
  GlobalData.CONTAINER_FIRST_ON_SHOW_OPTIONS
).set([]); // 开启用户订阅时间

export const subscribeMsgTimeLocal = new LocalCache(
  GlobalData.SUBSCRIBE_MSG_TIME
); // 是否显示订阅消息提醒服务控制

export const dialogConfigMessage = new LocalCache(
  GlobalData.DIALOG_CONFIG_MESSAGE
);
/* 记录上车点请求前扎标的经纬度 */

export const locationPinInfoCache = new MemoryCache(
  MAP_KEY.LOCATION_PIN_INFO
).set({});
/* 首页 图面 推荐点接口返回的数据 */

export const pickupSpotsDataCache = new MemoryCache(
  MAP_KEY.PICKUP_SPOTS_DATA
).set({}); //远程特惠--上下车确认页--是否展示过引导用户tips

export const guideIntercityConfirm = new LocalCache(
  INTERCITY_KEYS.GUIDE_INTERCITY_CONFIRM
);
/* 薅打车金新玩法存储用户信息 */

export const setShareHelpUserInfo = new LocalCache(SHARE_HELP.USER_INFO); //修改上车点--103/104--是否展示过引导用户tips

export const guideModifyStartPoint = new LocalCache(
  ONLINE_GOING.GUIDE_MODIFY_START_POINT
); //滴滴隐私号弹窗，疲劳度缓存

export const carTipsPopupInfoFatigue = new LocalCache(
  ONLINE_GOING.CAR_TIPS_POPUP_INFO_FATIGUE
).set({}); //惊喜升舱，疲劳度缓存，一个订单只弹一次

export const freeUpgradesDialogFatigue = new LocalCache(
  ONLINE_GOING.FREE_UPGRADES_DIALOG_FATIGUE
).set({}); // 出租车接单弹窗疲劳度缓存

export const patrolAlterPopupFatigue = new LocalCache(
  ONLINE_GOING.PATROL_ALTER_POPUP_FATIGUE
); //惊喜升舱，费用异常提示，疲劳度

export const feeUpgradesDoubtCache = new LocalCache(
  ONLINE_OVER_PAY.FEE_UPGRADES_DOUBT
).set({}); //跨渠道支付，支付阻塞弹窗

export const crossChannelBlockCache = new LocalCache(
  ONLINE_OVER_PAY.CROSS_ChANNEL_BLOCK
).set({}); // 应用的前后台状态

export const applicationOnshowCache = new MemoryCache(
  CacheKeys.APPLICATION_ONSHOW
).set(true); // 每笔订单下愿勾红包的领取状态

export const receiveCouponCache = new LocalCache(
  ONLINE_GOING.RECEIVE_COUPON
).set({}); // 运力规划页价格区间新手指引

export const priceRangeGuide = new LocalCache(GUIDE.PRICE_RANGE_GUIDE); // 运力规划页中价格筛选和车型筛选的区分

export const cpTagFilter = new LocalCache(CacheKeys.CP_TAG_FILTER); // 2 代表车型筛选 1代表 价格筛选
// 支付宝appToken存储

export const aliAppTokenCache = new MemoryCache(GlobalData.ALI_APP_TOKEN); // 本地缓存运力接口返回的 routeId，下单和拉取追加运力使用

export const carListRouteIdCache = new LocalCache(
  ONLINE_GOING.CAR_LIST_ROUTE_ID
); // 行中发送消息icon新手引导

export const sendMessageGuide = new LocalCache(GUIDE.SEND_MESSAGE_GUIDE);
export const choosePathGuide = new LocalCache(GUIDE.CHOOSE_PATH_GUIDE); // 获取101取消挽留的追减运力接口

export const cancelRecommendListCache = new LocalCache(
  ONLINE_GOING.CANCEL_RECOMMEND_LIST
); //场站终点二次确认数据

export const endPointSecondConfirmDataCache = new MemoryCache(
  GlobalData.endPointSecondConfirmData
); // 路线选择二次确认提示

export const selectRouteTips = new LocalCache(ONLINE_GOING.SELECT_ROUTE_TIPS); // IM suuport config

export const imSupportConfigCache = new MemoryCache(IM.IM_SUPPORT_CONFIG).set(
  null
);
