import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateBack from '@alife/anyui-wx-api/lib/navigateBack.js';
import _a_u_showLoading from '@alife/anyui-wx-api/lib/showLoading.js';
import _a_u_showToast from '@alife/anyui-wx-api/lib/showToast.js';
import _a_u_hideLoading from '@alife/anyui-wx-api/lib/hideLoading.js';
anyui._wrapApi('navigateBack', _a_u_navigateBack)
anyui._wrapApi('showLoading', _a_u_showLoading)
anyui._wrapApi('showToast', _a_u_showToast)
anyui._wrapApi('hideLoading', _a_u_hideLoading)
import { createPage } from "@alife/anyui-wx-framework/index.js";

import User from "../../../../common/login/User";
import * as lodash from "../../../../common/tool/lodashUtil";
import * as mapUtils from "../../../../common/component/CustomizeMap/mapUtils";
import formatterUtil from "../../../../common/tool/formatterUtil";
import { replaceColor } from "../../../../common/tool/richTool.js";
import { distanceFormat } from "../../common/common";
import { timeFormat } from "../../common/common";
import Timer from "../../../../common/tool/timer.js";
import { selectRouteTips } from "../../../../common/cache/Cache";
import dataLog from "../../../../common/dataLog/dataLog.js";
import { DATA_LOG_PAGE_ID } from "../../../../common/dataLog/dataLog.js";
const defaultPreferenceCode = "0x06";
const currentPageData = {
  defaultChoose: 0,
  // 默认选择，用户自己选择
  routeId: "",
  estimatePrice: 0,
  estimateIdPrice: "",
  originEstimatePrice: 0,
  routeChooseButtonContent: "",
  routeChooseButtonAction: "", // BACK_LAST_PAGE：返回沉浸页,BIND_NEW_ROUTE：绑定路线
};
const POINT_MARKER_ID = {
  startPoint: 100,
  startText: 101,
  endPoint: 200,
  endText: 201,
};
const DELAY_INCLUDEPOINTS_TIME = 5; //图面操作后，延迟缩放的时间

let isRetryGetRoutes = false; // 第一次进来失败重试

const doChangeDriverRoutesPolling = {
  timer: null,
  loading: false,
  isDone: false,
}; // 绑定路线接口轮训

let isFirstSetSelectData = false;
let preferenceLoading = false;
let isRefresh105 = false; // 用来在105判断是不是点击刷新按钮

const orderDetailPolling = {
  // 订单状态
  timer: null,
  isDone: false,
};
createPage(
  createOptions({
    name: "OnlineSelectRoutes",
    data: {
      preferenceCode: "",
      // 用户偏好路线标示
      amapOrderId: "",
      cpSource: "",
      status: "",
      polyline: [],
      includePoints: [],
      runningCarMaker: {},
      startPointMarker: {},
      startTextMarker: {},
      endPointMarker: {},
      endTextMarker: {},
      startPointData: {"startLat":"39.993895","startLon":"116.473340","startName":"首开广场(东北三门)","startPOI":""},
      endPointData: {"endLat":"40.033677","endLon":"116.502199","endName":"马泉营(地铁站)","endPOI":"BV10011274"},
      productType: "",
      amapRideType: "",
      businessModel: -1,
      vehicleColor: "",
      cardStatus: "loading",
      originData: {},
      // 存储服务端数据
      secondSelectRouteSure: {
        show: false,
      },
      polylineList: [],
      // 已处理后的路线数据
      currentRouteId: "",
      delayIncludePoints: false,
      // 控制全览暂停与否
      // cardData: {
      //   styleData: {},
      // },
      isClearPolyLine: false, // 是否清空路线
    },
    computed: {

      preferences() {
        return lodash.get(this.originData, "routePreference", {});
      },

      routesData() {
        if ([103, 104].indexOf(this.status) > -1) {
          const itemList = lodash.get(this.originData, "item", []);
          const defaultChoose = lodash.get(this.originData, "defaultChoose", 0);
          const tempOriginData = {
            item: [],
          };
          tempOriginData.item = itemList.map((routeItem) => {
            const tempItem = this.formateRouteData(routeItem);
            return { ...routeItem, ...tempItem };
          });
          tempOriginData.defaultChoose = defaultChoose;
          return tempOriginData;
        }

        if (this.status === 105) {
          const driverData = lodash.get(
            this.originData,
            "driver.route.data",
            {}
          );
          let driverEtaData = lodash.get(this.originData, "eta", {});
          driverEtaData = this.formate105RouteData({
            ...driverData,
            ...driverEtaData,
          });
          let backRouteData = lodash.get(this.originData, "backRoute", []);
          backRouteData = backRouteData.map((item) => {
            const tempItem = lodash.get(item, "driver.route.data", {});
            let tempEta = lodash.get(item, "eta", {});
            tempEta = this.formate105RouteData({ ...tempItem, ...tempEta });
            return tempEta;
          });
          const formateOriginData = {
            item: [{ ...driverEtaData }, ...backRouteData],
          };
          return formateOriginData;
        }

        return {};
      },

      markers() {
        const markers = [];

        if (Object.keys(this.runningCarMaker).length > 0) {
          markers.push(this.runningCarMaker);
        }

        if (Object.keys(this.startPointMarker).length > 0) {
          markers.push(this.startPointMarker);
        }

        if (Object.keys(this.endPointMarker).length > 0) {
          markers.push(this.endPointMarker);
        }

        if (Object.keys(this.startTextMarker).length > 0) {
          markers.push(this.startTextMarker);
        }

        if (Object.keys(this.endTextMarker).length > 0) {
          markers.push(this.endTextMarker);
        }

        return markers;
      },

      navStyle() {
        const item = lodash.get(
          this.originData,
          "routePreference.preferences",
          []
        );

        if (item.length < 4) {
          return {
            right: "none",
            width: "max-content",
          };
        }

        return {
          right: "16rpx",
          width: "auto",
        };
      },
    },

    // eslint-disable-next-line no-empty-function
    created(query) {
      

      
        this.getDriverRoutes();
     
    },

    // eslint-disable-next-line no-empty-function
    watch: {
      cardStatus: {
        immediate: true,

        handler(val) {
          if (val === "loading") {
            this.clearMap();
          }
        },
      },
    },

    // eslint-disable-next-line no-empty-function
    onShow() {},

    methods: {
      handleRegionChange(e) {
        const { type, causedBy } = e;

        if (type === "end") {
          //地图有操作，延迟进行视野缩放
          if (["scale", "rotate", "drag"].indexOf(causedBy) > -1) {
            this.delayIncludePoints = true;
            this.delayIncludePointsTimer &&
              clearTimeout(this.delayIncludePointsTimer);
            this.delayIncludePointsTimer = setTimeout(() => {
              this.delayIncludePoints = false;
              clearTimeout(this.delayIncludePointsTimer);

              if (this.status !== 105) {
                // 103、104拖动图面后也要全览
                this.setIncludePoints(this.markers);
              }
            }, DELAY_INCLUDEPOINTS_TIME * 1000);
          }
        }
      },

      setDriverRoutesPoll() {
        if (this.getDriverRoutesPolling) {
          this.getDriverRoutesPolling.stop();
          this.getDriverRoutesPolling = null;
        }

        this.getDriverRoutesPolling = new Timer(
          this.getDriverRoutes.bind(this),
          1000 * 3
        );
        this.getDriverRoutesPolling.start();
      },

      async getDriverRoutes() {
        if (isRefresh105 || !this.getDriverRoutesPolling || preferenceLoading) {
          this.cardStatus = "loading";
        }

        const { userId = "" } = User.getUserInfo() || {};
        const params = {
          uid: userId,
          needPoints: 1,
          cpSource: this.cpSource,
          amapOrderId: this.amapOrderId,
          preferenceCode: this.preferenceCode,
        };
        const res = {"result":true,"traceId":"0b9e198416366818422508157d125f","code":1,"data":{"eta":{"travelTime":1230000,"distance":7597,"discountTravelTime":1230000},"driver":{"frameInfo":{"duration":10000,"traceId":"0b9e198416366818422508157d125f","frameTime":1636681843156,"routeTime":1636681843138,"frame":[{"course":131.32382202148438,"lon":116.47367777777778,"percentRemain":0.0,"currentIndex":0,"lat":39.99367083333333}],"syncId":516},"route":{"data":{"coordinateTypes":"lonlat","selectedTip":"您选择的是司机当前送驾路线","routeChooseButtonAction":"BIND_NEW_ROUTE","showTip":true,"tipSkin":"linear-gradient\u0028to bottom, #E3EDFE, #F5F6F8, #F6F7F8\u0029","pathId":"3016661501","routeChooseButtonContent":"确认路线","reasonTip":"当前路线","tolls":0,"trafficStatus":["3,0,0,0","3,3,0,0"],"tipDescription":"您选择的是司机当前送驾路线","point2ds":["116.473678,39.993671","116.474273,39.99327","116.47451,39.993209","116.474739,39.993171","116.475532,39.993888","116.476577,39.994838","116.47705,39.995265","116.477592,39.995742","116.477775,39.99591","116.478385,39.996456","116.4785,39.996589","116.478691,39.996879","116.478775,39.997039","116.478904,39.997409","116.478935,39.997745","116.478912,39.99826","116.478904,39.998588","116.478897,39.998699","116.478843,39.999679","116.478828,40.000286","116.478782,40.001026","116.478767,40.001216","116.478767,40.001262","116.478721,40.001998","116.478713,40.002094","116.478637,40.003253","116.478622,40.003604","116.478538,40.004882","116.478538,40.004947","116.4785,40.006008","116.478454,40.007198","116.478439,40.007354","116.478424,40.007678","116.47837,40.008632","116.478363,40.008728","116.47834,40.009723","116.478309,40.010139","116.478302,40.010253","116.478294,40.010383","116.478248,40.011436","116.478233,40.011596","116.478202,40.012069","116.478195,40.012203","116.478179,40.012588","116.478141,40.013385","116.478042,40.015563","116.478027,40.015949","116.477981,40.01686","116.477935,40.017318","116.477905,40.017448","116.477813,40.017658","116.477706,40.017814","116.477607,40.017921","116.4775,40.018028","116.47705,40.018352","116.476638,40.018653","116.475753,40.019294","116.47557,40.019409","116.474868,40.019886","116.474525,40.020111","116.474067,40.020416","116.473846,40.020507","116.473815,40.020511","116.473632,40.020542","116.472908,40.020572","116.47232,40.020591","116.471,40.020603","116.469253,40.020603","116.467796,40.020614","116.467208,40.020603","116.467086,40.020603","116.467086,40.020809","116.467094,40.021408","116.467132,40.021682","116.467208,40.021919","116.467369,40.02227","116.467521,40.022525","116.467651,40.02275","116.467956,40.023094","116.468055,40.023189","116.468139,40.023284","116.468391,40.023532","116.468513,40.02362","116.469017,40.023933","116.469596,40.024192","116.470428,40.024463","116.475502,40.02568","116.476249,40.025917","116.476745,40.026134","116.47705,40.026294","116.477134,40.026332","116.477386,40.026489","116.477661,40.026679","116.477981,40.026939","116.478118,40.027004","116.478523,40.027324","116.478927,40.02766","116.479225,40.027965","116.48014,40.0288","116.480461,40.029087","116.48069,40.029312","116.480834,40.029476","116.480957,40.029644","116.481101,40.029888","116.481216,40.030143","116.481277,40.030349","116.48133,40.030601","116.481353,40.030826","116.481361,40.031147","116.4813,40.032363","116.4813,40.032619","116.481819,40.032623","116.484992,40.032737","116.487503,40.032875","116.487648,40.032882","116.488578,40.032897","116.490409,40.033","116.492721,40.033107","116.49282,40.033115","116.493232,40.033138","116.494476,40.033184","116.495643,40.033237","116.497184,40.033321","116.497421,40.033405","116.499023,40.033496","116.50212,40.033672","116.502197,40.033676"],"lights":21},"versionCode":0},"lng":"116.47367777777778","routeTime":1636681843138,"showRoute":true,"lat":"39.99367083333333","direction":"130.831"},"backRoute":[{"eta":{"travelTime":1295000,"distance":7336,"discountTravelTime":1295000},"driver":{"frameInfo":{"duration":10000,"traceId":"0b9e198416366818422508157d125f","frameTime":1636681843165,"routeTime":1636681843138,"frame":[{"course":131.32382202148438,"lon":116.47367777777778,"percentRemain":0.0,"currentIndex":0,"lat":39.99367083333333}],"syncId":516},"route":{"data":{"coordinateTypes":"lonlat","selectedTip":"预计比当前路线短261米，耗时长2分钟","routeChooseButtonAction":"BIND_NEW_ROUTE","showTip":true,"tipSkin":"linear-gradient\u0028to bottom, #E3EDFE, #F5F6F8, #F6F7F8\u0029","pathId":"717736007","routeChooseButtonContent":"确认路线","reasonTip":"距离短","tolls":0,"trafficStatus":["3,0,0,0","3,3,0,0","5,51,0,0","3,58,0,0","4,65,0,0","3,67,0,0","5,70,0,0","3,75,0,0","4,89,0,0","5,93,0,0","3,99,0,0"],"tipDescription":"预计比当前路线短261米，耗时长2分钟","point2ds":["116.473678,39.993671","116.474273,39.99327","116.47451,39.993209","116.474594,39.99316","116.473571,39.992237","116.473472,39.992134","116.472763,39.9915","116.47261,39.991378","116.472549,39.991313","116.471794,39.991813","116.471405,39.99208","116.470703,39.992534","116.470397,39.992721","116.470298,39.992786","116.469993,39.992996","116.469261,39.993476","116.469085,39.993618","116.468887,39.993797","116.468734,39.993976","116.468574,39.994194","116.468467,39.994365","116.468299,39.99477","116.468231,39.995101","116.4682,39.995468","116.468162,39.996677","116.468139,39.996898","116.468116,39.997196","116.468116,39.997272","116.468101,39.99768","116.468055,39.999011","116.467926,40.001194","116.467926,40.001216","116.467926,40.00127","116.467948,40.001625","116.467941,40.001724","116.467926,40.00196","116.46791,40.002388","116.467895,40.002559","116.467887,40.002708","116.467811,40.004333","116.467788,40.00468","116.467781,40.004936","116.467781,40.005016","116.467765,40.005207","116.46775,40.006038","116.467735,40.006278","116.467712,40.006698","116.467689,40.007366","116.467681,40.007514","116.467674,40.008373","116.467658,40.008586","116.467651,40.008701","116.467643,40.008846","116.467605,40.009742","116.46759,40.01015","116.467582,40.010448","116.467536,40.011169","116.467521,40.011463","116.467498,40.011604","116.467483,40.011951","116.46746,40.012203","116.467445,40.012348","116.46743,40.013057","116.467391,40.01382","116.467384,40.014232","116.467384,40.014305","116.467308,40.015861","116.4673,40.015949","116.467254,40.017154","116.467208,40.01807","116.467201,40.018287","116.467163,40.019016","116.467109,40.019973","116.467094,40.020214","116.467094,40.020519","116.467086,40.020603","116.467086,40.020809","116.467094,40.021408","116.467132,40.021682","116.467208,40.021919","116.467369,40.02227","116.467521,40.022525","116.467651,40.02275","116.467956,40.023094","116.468055,40.023189","116.468139,40.023284","116.468391,40.023532","116.468513,40.02362","116.469017,40.023933","116.469596,40.024192","116.470428,40.024463","116.475502,40.02568","116.476249,40.025917","116.476745,40.026134","116.47705,40.026294","116.477134,40.026332","116.477386,40.026489","116.477661,40.026679","116.477981,40.026939","116.478118,40.027004","116.478523,40.027324","116.478927,40.02766","116.479225,40.027965","116.48014,40.0288","116.480461,40.029087","116.48069,40.029312","116.480834,40.029476","116.480957,40.029644","116.481101,40.029888","116.481216,40.030143","116.481277,40.030349","116.48133,40.030601","116.481353,40.030826","116.481361,40.031147","116.4813,40.032363","116.4813,40.032619","116.481819,40.032623","116.484992,40.032737","116.487503,40.032875","116.487648,40.032882","116.488578,40.032897","116.490409,40.033","116.492721,40.033107","116.49282,40.033115","116.493232,40.033138","116.494476,40.033184","116.495643,40.033237","116.497184,40.033321","116.497421,40.033405","116.499023,40.033496","116.50212,40.033672","116.502197,40.033676"],"lights":19},"versionCode":0},"lng":"116.47367777777778","routeTime":1636681843138,"showRoute":true,"lat":"39.99367083333333","direction":"130.831"}},{"eta":{"travelTime":1204000,"distance":8219,"discountTravelTime":1204000},"driver":{"frameInfo":{"duration":10000,"traceId":"0b9e198416366818422508157d125f","frameTime":1636681843167,"routeTime":1636681843138,"frame":[{"course":131.32382202148438,"lon":116.47367777777778,"percentRemain":0.0,"currentIndex":0,"lat":39.99367083333333}],"syncId":516},"route":{"data":{"coordinateTypes":"lonlat","selectedTip":"预计比当前路线节省1分钟，距离长622米","routeChooseButtonAction":"BIND_NEW_ROUTE","showTip":true,"tipSkin":"linear-gradient\u0028to bottom, #E3EDFE, #F5F6F8, #F6F7F8\u0029","pathId":"1572927697","routeChooseButtonContent":"确认路线","reasonTip":"时间短 距离长","tolls":0,"trafficStatus":["3,0,0,0","3,3,0,0"],"tipDescription":"预计比当前路线节省1分钟，距离长622米","point2ds":["116.473678,39.993671","116.474273,39.99327","116.47451,39.993209","116.474739,39.993171","116.475532,39.993888","116.476577,39.994838","116.47705,39.995265","116.477592,39.995742","116.477775,39.99591","116.478385,39.996456","116.4785,39.996589","116.478691,39.996879","116.478775,39.997039","116.478904,39.997409","116.478935,39.997745","116.478912,39.99826","116.478904,39.998588","116.478897,39.998699","116.478843,39.999679","116.478828,40.000286","116.478782,40.001026","116.478767,40.001216","116.478767,40.001262","116.478721,40.001998","116.478713,40.002094","116.478637,40.003253","116.478622,40.003604","116.478538,40.004882","116.478538,40.004947","116.4785,40.006008","116.478454,40.007198","116.478439,40.007354","116.478424,40.007678","116.47837,40.008632","116.478363,40.008728","116.47834,40.009723","116.478309,40.010139","116.478302,40.010253","116.478294,40.010383","116.478248,40.011436","116.478233,40.011596","116.478202,40.012069","116.478195,40.012203","116.478179,40.012588","116.478141,40.013385","116.478042,40.015563","116.478027,40.015949","116.477981,40.01686","116.477935,40.017318","116.477905,40.017448","116.477813,40.017658","116.477706,40.017814","116.477607,40.017921","116.4775,40.018028","116.47705,40.018352","116.476638,40.018653","116.475753,40.019294","116.47557,40.019409","116.474868,40.019886","116.474525,40.020111","116.474067,40.020416","116.473846,40.020507","116.473815,40.020511","116.473632,40.020542","116.472908,40.020572","116.47232,40.020591","116.472114,40.020656","116.470993,40.020675","116.470878,40.021648","116.470848,40.022029","116.470771,40.023189","116.470748,40.023578","116.470756,40.023708","116.470794,40.023826","116.470848,40.023914","116.470962,40.024005","116.471153,40.024074","116.471321,40.024093","116.47245,40.024124","116.472526,40.024093","116.473197,40.024116","116.473388,40.024158","116.473571,40.024253","116.473678,40.024326","116.474029,40.024608","116.474143,40.024669","116.474243,40.024707","116.474418,40.024738","116.474716,40.024745","116.4748,40.024734","116.474983,40.024662","116.476211,40.023803","116.476539,40.023582","116.476593,40.023574","116.47705,40.023258","116.477149,40.023189","116.478286,40.022407","116.479446,40.02161","116.479721,40.021499","116.47985,40.021461","116.480201,40.021461","116.480361,40.021465","116.480834,40.021503","116.48114,40.021526","116.48143,40.021541","116.482177,40.021598","116.482818,40.021644","116.483306,40.021682","116.485527,40.02185","116.487525,40.022003","116.487777,40.022026","116.492439,40.022392","116.492744,40.022415","116.492805,40.022418","116.49414,40.02251","116.4944,40.022529","116.495002,40.022563","116.495582,40.02259","116.496032,40.022617","116.496559,40.022647","116.497398,40.022693","116.498092,40.022739","116.498443,40.022758","116.498512,40.022769","116.498878,40.022792","116.499023,40.0228","116.49932,40.022827","116.500343,40.022907","116.500961,40.02296","116.502296,40.023078","116.502647,40.02312","116.503395,40.023181","116.503517,40.023189","116.50415,40.02325","116.504417,40.023277","116.504989,40.023323","116.505187,40.023345","116.505081,40.024299","116.504867,40.025829","116.504783,40.02639","116.504699,40.027","116.504669,40.027248","116.504463,40.028942","116.504257,40.030498","116.504241,40.030582","116.503952,40.032653","116.503814,40.033737","116.502616,40.033683","116.502197,40.033676"],"lights":15},"versionCode":0},"lng":"116.47367777777778","routeTime":1636681843138,"showRoute":true,"lat":"39.99367083333333","direction":"130.831"}}],"cpOid":"2111117768501001246","cpSupportDriverPoints":true,"routePreference":{"showLastUpdate":false,"preferences":[{"preferenceCode":"0x06","preferenceName":"打车推荐"},{"preferenceCode":"32","preferenceName":"自驾常走"},{"preferenceCode":"45","preferenceName":"速度最快"},{"preferenceCode":"37","preferenceName":"大路优先"},{"preferenceCode":"34","preferenceName":"高速优先"},{"preferenceCode":"33","preferenceName":"躲避拥堵"}],"currentPreferenceIndex":0,"showPreferences":true,"chosenPreferenceIndex":0},"routePlan":2,"status":105},"message":"Successful","version":"1.0","timestamp":1636681843482};

        if (res && res.code === 1) {
          const tempStatus = lodash.get(res, "data.status");

          if (tempStatus === 105 && this.status !== 105) {
            this.status = tempStatus;
          }

          this.cardStatus = "suc";
          this.originData = res.data;
          this.handleRouteData(this.originData);
          this.handleDefaultSelected();
          this.initDefaultPreNav();
        } else if (!isRetryGetRoutes) {
          this.getDriverRoutes();
          isRetryGetRoutes = true;
        } else {
          this.cardStatus = "err";
        }
      },

      handlePreferenceNavSelect(index, item) {
        // 参数会返回index,item
        this.preferenceCode = item.preferenceCode || defaultPreferenceCode;
        this.clearMap();
        preferenceLoading = true;
        this.getDriverRoutes(); // eslint-disable-next-line no-unused-vars

        preferenceLoading = false;
        dataLog.report(DATA_LOG_PAGE_ID.chooseRoutePage, "B005", {
          change_route_type_rank: this.getLogPreferenceStr(),
          timestamp: new Date().getTime(),
          amap_order_id: this.amapOrderId,
          pathid: currentPageData.routeId,
          status: this.status,
          change_route_type_index: this.preferenceCode,
        });
      },

      handleRouteSelect: lodash.throttle(
        function (index, item) {
          this.setSelectedRouteLine(item.routeId); // 参数会返回index,item
          // currentPageData.defaultChoose = index;

          currentPageData.routeId = item.routeId;
          currentPageData.estimatePrice = item.estimatePrice;
          currentPageData.estimateIdPrice = item.estimateIdPrice;
          currentPageData.originEstimatePrice = item.originEstimatePrice;
          currentPageData.routeChooseButtonContent =
            item.routeChooseButtonContent;
          currentPageData.routeChooseButtonAction =
            item.routeChooseButtonAction;
          dataLog.report(DATA_LOG_PAGE_ID.chooseRoutePage, "B004", {
            change_route_type_rank: this.getLogPreferenceStr(),
            timestamp: new Date().getTime(),
            amap_order_id: this.amapOrderId,
            pathid: currentPageData.routeId,
            status: this.status,
          });
        },
        100,
        {
          leading: true,
          trailing: false,
        }
      ),

      handleOk() {
        // 确认路线按钮
        if (currentPageData.routeChooseButtonAction === "BACK_LAST_PAGE") {
          dataLog.report(DATA_LOG_PAGE_ID.chooseRoutePage, "B003", {
            timestamp: new Date().getTime(),
            amap_order_id: this.amapOrderId,
            change_button_type: 2,
            pathid: currentPageData.routeId,
          });
          anyui.navigateBack({
            delta: 1,
          });
          return;
        } else if (selectRouteTips.get() === "isTip") {
          this.doChangeDriverRoutes();
        } else {
          this.secondSelectRouteSure.show = true;
        }

        dataLog.report(DATA_LOG_PAGE_ID.chooseRoutePage, "B003", {
          change_route_type_rank: this.getLogPreferenceStr(),
          timestamp: new Date().getTime(),
          amap_order_id: this.amapOrderId,
          change_button_type: 1,
          pathid: currentPageData.routeId,
          status: this.status,
        });
      },

      doChangeDriverRoutes() {
        
      },


      filterObj(obj) {
        const result = {};
        Object.keys(obj).filter((key) => {
          if (obj[key]) {
            result[key] = obj[key];
          }

          return true;
        });
        return result;
      },

      // 格式化数据
      handleRouteData(data) {
        let polylineList = [];

        if ([103, 104].indexOf(this.status) > -1) {
          // 103/104与105数据格式不一样
          const item = lodash.get(data, "item", []);
          const defaultChoose = lodash.get(data, "defaultChoose", 0);
          item.forEach((itemData, index) => {
            const points = itemData.points.split(";");

            if (defaultChoose === index) {
              // 缓存当前路线id
              this.currentRouteId = itemData.routeId;
            }

            const polylineData = {
              backRoute: defaultChoose !== index,
              frameList: [],
              eta: {
                distance: 0,
              },
              points,
              trafficStatus: itemData.trafficStatus,
              routeId: itemData.routeId,
            };

            if (defaultChoose === index) {
              // 当前路线放在最后渲染，覆盖备选路线的样式
              polylineList.push(polylineData);
            } else {
              polylineList.unshift(polylineData);
            }
          });
        } else if (this.status === 105) {
          const backRoute = lodash.get(data, "backRoute", []); // 备选路线数据

          const routeIds = [];
          polylineList = backRoute.map((routeItem) => {
            const frameList = lodash.get(
              routeItem,
              "driver.frameInfo.frame",
              []
            );
            const points = lodash.get(
              routeItem,
              "driver.route.data.point2ds",
              []
            );
            const trafficStatus = lodash.get(
              routeItem,
              "driver.route.data.trafficStatus",
              []
            );
            const eta = lodash.get(routeItem, "eta", {});
            const routeId = lodash.get(
              routeItem,
              "driver.route.data.pathId",
              ""
            );
            routeIds.push(routeId);
            return {
              backRoute: true,
              frameList,
              points,
              trafficStatus,
              eta,
              routeId,
            };
          });
          const frameLists = lodash.get(data, "driver.frameInfo.frame", []);
          const eta = lodash.get(data, "eta", {});
          const routeId = lodash.get(data, "driver.route.data.pathId", "");
          routeIds.push(routeId);
          polylineList.push({
            frameList: frameLists,
            points: lodash.get(data, "driver.route.data.point2ds", []),
            trafficStatus: lodash.get(
              data,
              "driver.route.data.trafficStatus",
              []
            ),
            eta,
            routeId,
            backRoute: false,
          });

          if (isRefresh105) {
            isRefresh105 = false;
            this.currentRouteId = routeId;
          } else if (
            !this.currentRouteId ||
            routeIds.indexOf(this.currentRouteId) === -1
          ) {
            // 轮训结果不覆盖用户已选路线
            this.currentRouteId = routeId;
          }
        } // 缓存已处理好的路线数据

        this.polylineList = polylineList; // 设置路线

        this.setSelectedRouteLine(this.currentRouteId); // 设置起终点

        this.setMarkersData();

        if (!this.delayIncludePoints) {
          // 设置全览
          this.handleCurrentPostion();
        }
      },

      // 绘画小车和气泡
      setRunningCarMarker(frameLists, eta) {
        if (frameLists && frameLists.length > 0) {
          const { lat, lon, course } = frameLists[frameLists.length - 1];
          const travelTime = eta.travelTime;
          const distance = eta.distance;
          const calloutValue = [
            {
              text: "剩余",
              color: "#212121",
            },
            {
              text: `${distanceFormat(
                distance === 0 ? 1 : distance
              )} ${timeFormat(travelTime === 0 ? 1 : travelTime)}`,
              color: "#1A66FF",
            },
          ];
          this.runningCarMaker = mapUtils.generateRunningCarMarkerFn({
            markerId: 10002,
            // 此处需要注意需为数字
            latitude: lat,
            longitude: lon,
            rotate: course,
            carType: this.productType === "taxi" ? "taxi" : "expressCar",
            calloutValue,
            amapRideType: this.amapRideType,
            vehicleColor: this.vehicleColor,
            businessModel: this.businessModel,
          });
        }
      },

      // 选择路线
      setSelectedRouteLine(routeId) {
        const copyPolylineList = [];
        let eta = {};
        let frameLists = [];
        this.polylineList.forEach((item) => {
          const itemData = item;

          if (itemData.routeId === routeId) {
            itemData.backRoute = false;
            frameLists = itemData.frameList;
            eta = itemData.eta;
            copyPolylineList.push(itemData);
          } else {
            itemData.backRoute = true;
            copyPolylineList.unshift(itemData);
          }
        });
        this.currentRouteId = routeId;
        this.setPolyLineData(copyPolylineList);
        this.setRunningCarMarker(frameLists, eta);
        this.polylineList = copyPolylineList;
      },

      // 绘画起终点
      setMarkersData() {
        const start = {
          lon: lodash.get(this.startPointData, "startLon", ""),
          lat: lodash.get(this.startPointData, "startLat", ""),
          name: lodash.get(this.startPointData, "startName", ""),
        };
        const end = {
          lon: lodash.get(this.endPointData, "endLon", ""),
          lat: lodash.get(this.endPointData, "endLat", ""),
          name: lodash.get(this.endPointData, "endName", ""),
        };
        this.startPointMarker =
          mapUtils.generateGoingStartPointMarkForRidehailing({
            markerId: POINT_MARKER_ID.startPoint,
            latitude: start.lat,
            longitude: start.lon,
            showCustomizeCallout: false,
          });
        this.startTextMarker = mapUtils.generateTextLabelMarkerFn({
          markerId: POINT_MARKER_ID.startText,
          longitude: start.lon,
          latitude: start.lat,
          value: start.name,
          anchorY: 7,
        });
        this.endPointMarker = mapUtils.generateGoingEndPointMarkForRidehailing({
          markerId: POINT_MARKER_ID.endPoint,
          latitude: end.lat,
          longitude: end.lon,
          showCustomizeCallout: false,
        });
        this.endTextMarker = mapUtils.generateTextLabelMarkerFn({
          markerId: POINT_MARKER_ID.endText,
          longitude: end.lon,
          latitude: end.lat,
          value: end.name,
          anchorY: 7,
        });
      },

      // 绘画路线
      setPolyLineData(polylineList) {
        this.polyline = [];
        const polylineData = polylineList.map((itemData) => {
          const { points, trafficStatus, frameList, eta, backRoute } = itemData;
          const polyline = mapUtils.processPolyLineFn(
            points,
            trafficStatus,
            frameList,
            eta.distance,
            backRoute
              ? {
                  color: "#9BD3C5",
                  lineType: "other",
                }
              : undefined
          );
          return polyline[0];
        });
        const copyPolylineData = polylineData.pop();
        this.polyline = polylineData;
        setTimeout(() => {
          // 延迟100毫秒渲染主路线，解决安卓（华为）部分机型在切换路线是主路线被备选路线覆盖的问题
          this.polyline.push(copyPolylineData);
        }, 100);
      },

      // 设置全览
      setIncludePoints(markers) {
        this.includePoints = []; // 清空includePoints，否则再次设置时，不起作用

        this.$nextTick(() => {
          this.includePoints = mapUtils.processIncludePointsFn(markers, {
            spanScale: 1.2,
          });
        });
      },

      handleReload() {
        this.getDriverRoutes();
      },

      // eslint-disable-next-line no-empty-function
      handleRefreshPostion() {
        this.handleCurrentPostion();

        if (this.status === 105) {
          isRefresh105 = true;
          this.setDriverRoutesPoll();
        } else {
          this.getDriverRoutes();
        }
      },

      // eslint-disable-next-line no-empty-function
      handleCurrentPostion() {
        if (this.status === 105) {
          this.setIncludePoints([this.endPointMarker, this.runningCarMaker]);
        } else {
          this.setIncludePoints(this.markers);
        }
      },

      formateRouteData(routeItem) {
        return {
          ...routeItem,
          // eslint-disable-next-line radix
          distance: formatterUtil.formatDistance(routeItem.distance),
          tolls: Math.round(routeItem.tolls / 100),
          estimatePrice: Math.round(routeItem.estimatePrice / 100),
          upperEstimatePrice: Math.round(routeItem.upperEstimatePrice / 100),
          tipTag: routeItem.tipTag && replaceColor(routeItem.tipTag),
          tipDescription:
            routeItem.tipDescription && replaceColor(routeItem.tipDescription),
        };
      },

      formate105RouteData(routeItem) {
        return {
          ...routeItem,
          upperEstimatePrice: Math.round(routeItem.upperEstimatePrice / 100),
          routeName: routeItem.reasonTip,
          routeId: routeItem.pathId,
          tolls: Math.round(routeItem.tolls / 100),
          //服务端恢复元
          estimatePrice: Math.round(routeItem.estimatePrice / 100),
          tipTag: routeItem.tipTag && replaceColor(routeItem.tipTag),
          tipDescription:
            routeItem.tipDescription && replaceColor(routeItem.tipDescription),
          distance: formatterUtil.formatDistance(routeItem.distance),
        };
      },

      handleSecondSelectRouteSure(isTip) {
        if (isTip) {
          selectRouteTips.set("isTip");
        }

        this.doChangeDriverRoutes();
      },

      handleSecondSelectRouteCancel() {
        this.secondSelectRouteSure.show = false;
      },

      handleDefaultSelected() {
        if (!isFirstSetSelectData) {
          isFirstSetSelectData = true;
          const item = lodash.get(this.routesData, "item", []);
          const index = lodash.get(this.routesData, "defaultChoose", 0);

          if (item.length > 0) {
            currentPageData.routeId = item[index].routeId;
            currentPageData.estimatePrice = item[index].estimatePrice;
            currentPageData.estimateIdPrice = item[index].estimateIdPrice;
            currentPageData.originEstimatePrice =
              item[index].originEstimatePrice;
            currentPageData.routeChooseButtonContent =
              item[index].routeChooseButtonContent;
            currentPageData.routeChooseButtonAction =
              item[index].routeChooseButtonAction;
          }
        }
      },

      // handleCardStyle(data) {
      //   this.cardData.styleData = data;
      // },
      clearMap() {
        this.includePoints = [];
        this.polyline = [];
        this.runningCarMaker = {};
      },

      /**
       * 初始化偏好导航
       */
      initDefaultPreNav() {
        const preferences = lodash.get(
          this.originData,
          "routePreference.preferences",
          []
        );

        if (preferences.length > 0) {
          this.preferenceCode =
            preferences[
              lodash.get(
                this.originData,
                "routePreference.currentPreferenceIndex",
                0
              )
            ].preferenceCode;
        } else {
          this.preferenceCode = defaultPreferenceCode;
        }
      },

      /**
       * 日志获取偏好排序字符串
       */
      getLogPreferenceStr() {
        const preferences = lodash.get(
          this.originData,
          "routePreference.preferences",
          []
        );
        const temp = preferences.map((item) => {
          return item.preferenceName;
        });
        return temp.join("｜");
      },

      setPullThroughOrderDetailRequestPoll() {
        orderDetailPolling.timer = new Timer(
          this.getDetailStatus.bind(this, this.amapOrderId),
          1000 * 5
        );
        orderDetailPolling.timer.start();
      },

      async getDetailStatus(amapOrderId) {
        
      },
    },

    // eslint-disable-next-line no-empty-function
    beforeDestroy() {
      isFirstSetSelectData = false;
      isRetryGetRoutes = false;
      this.currentRouteId = "";
      this.getDriverRoutesPolling && this.getDriverRoutesPolling.stop();
      this.getDriverRoutesPolling = null;

      if (doChangeDriverRoutesPolling.timer) {
        doChangeDriverRoutesPolling.timer.stop();
        doChangeDriverRoutesPolling.loading = false;
        doChangeDriverRoutesPolling.timer = null;
        doChangeDriverRoutesPolling.isDone = false;
      } // currentPageData.defaultChoose = 0; // 默认选择，用户自己选择

      currentPageData.routeId = "";
      currentPageData.estimatePrice = 0;
      currentPageData.estimateIdPrice = "";
      currentPageData.originEstimatePrice = 0;
      currentPageData.routeChooseButtonContent = "";
      currentPageData.routeChooseButtonContent = "";
      currentPageData.routeChooseButtonAction = "";

      if (orderDetailPolling.timer) {
        orderDetailPolling.timer.stop();
      }

      orderDetailPolling.timer = null;
      orderDetailPolling.isDone = false;
    },
  })
);

function createOptions(opts = {}) {
  opts.methods["handleRegionChange_custHd_1"] = function (e) {
    this.handleRegionChange(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.methods["handlePreferenceNavSelect_custHd_2"] = function (e) {
    this.handlePreferenceNavSelect(...e.detail.$event);
  };

  opts.methods["handleRouteSelect_custHd_3"] = function (e) {
    this.handleRouteSelect(...e.detail.$event);
  };

  opts.methods["handleOk_custHd_4"] = function (e) {
    this.handleOk(...e.detail.$event);
  };

  opts.methods["handleReload_custHd_5"] = function (e) {
    this.handleReload(...e.detail.$event);
  };

  opts.methods["handleCardStyle_custHd_6"] = function (e) {
    this.handleCardStyle(...e.detail.$event);
  };

  opts.methods["_saveRef1"] = function (ref) {
    if (!this.$refs) {
      this.$refs = {};
    }
    ref = ref.detail[0];
    this.$refs["refCardId"] = ref.$anyui;
  };

  opts.methods["handleSecondSelectRouteSure_custHd_7"] = function (e) {
    this.handleSecondSelectRouteSure(...e.detail.$event);
  };

  opts.methods["handleSecondSelectRouteCancel_custHd_8"] = function (e) {
    this.handleSecondSelectRouteCancel(...e.detail.$event);
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "polyline",
    "markers",
    "includePoints",
    "startPointData",
    "preferences",
    "navStyle",
    "cardStatus",
    "routesData",
    "currentRouteId",
    "secondSelectRouteSure",
  ];
  return opts;
}
