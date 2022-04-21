import * as polylineUtils from "./utils/polylineUtils";
import * as markerUtils from "./utils/markerUtils";
import { GD_SERVICEID_MAP } from "../../dataConfig";

import { CAR_ICON_PATH } from "./imageConfig.js";
import { CAR_COLOR } from "./imageConfig.js";
const startPointIconPath =
  "/common/component/CustomizeMap/image/start-point.png";
const endPointIconPath = "/common/component/CustomizeMap/image/end-point.png";
const expressCarIconPath =
  "https://gw.alicdn.com/imgextra/i1/O1CN01OeYHz81TzWFce0wfE_!!6000000002453-2-tps-40-80.png";
const privateCarIconPath =
  "https://gw.alicdn.com/imgextra/i3/O1CN01nkMEsq1qQvV8mgo5f_!!6000000005491-2-tps-40-80.png";
const taxiIconPath =
  "https://gw.alicdn.com/imgextra/i1/O1CN01pinasA1tw1Em9EIVS_!!6000000005965-2-tps-40-80.png";
const emptyIconPath = "/common/component/CustomizeMap/image/empty.png";
const sameRouteAliIconPath =
  "https://gw.alicdn.com/imgextra/i2/O1CN01UK0tm51ayKXGCpxaf_!!6000000003398-2-tps-128-128.png";
const fixedPointIconPath =
  "/common/component/CustomizeMap/image/fixed_spot.png"; // 设置marker时，经纬度在icon图标的位置

const ANCHOR_X_LEFT = 0.073;
const ANCHOR_X_RIGHT = 0.927;
const ANCHOR_Y = 0.5;
/**
 * 处理推荐点，将后端返回的推荐点信息处理成 map 能识别的格式
 * @param {*} markers 接口返回的marker数据
 * @param {*} idPrefix marker id前缀，点击marker的时候获用来区分marker
 * @param {*} centerLocation.longitude 当前map中心点经度
 * @param {*} centerLocation.latitude 当前map中心点纬度
 * @param {boolean} isUseRank 是否使用权重 默认true
 * @param {object} markerData marker的扩展数据，比如改变color
 */

function processRecommendMarkerFn(
  markers,
  idPrefix = "",
  centerLocation = {},
  isUseRank = true,
  markerData = {}
) {
  if (!markers || !markers.length) {
    return [];
  }

  const [targetMarker, ...restMarkers] = markers;
  const targetMarkerLon = targetMarker.lon;
  const targetMarkerLat = targetMarker.lat;
  const targetMarkerName = targetMarker.name; // 处理restMarkers（除目标marker以外的其他marker）
  // result 处理过的restMarkers，leftNum 目标marker左侧的marker数量，rightNum 目标marker右侧的marker数量

  const { result, leftNum, rightNum } = getRestMarkersHelperFn({
    restMarkers,
    markersLength: markers.length,
    targetMarkerLon,
    idPrefix,
    markerData,
  });
  const targetMarkerPosition = targetMarkerPositionHelperFn({
    leftNum,
    rightNum,
    centerLocationLon: centerLocation.longitude,
    targetMarkerLon,
  });
  const targetMarkerAnchorX =
    targetMarkerPosition === "right" ? ANCHOR_X_RIGHT : ANCHOR_X_LEFT;
  const targetMarkerId = markerUtils.getMarkerIdFn({
    idPrefix,
    id: targetMarker.id,
    longitude: targetMarkerLon,
    latitude: targetMarkerLat,
    position: targetMarkerPosition,
  }); // 处理目标marker

  result.unshift(
    markerUtils.getRecommendedPointMarkerFn({
      markerId: targetMarkerId,
      longitude: targetMarkerLon,
      latitude: targetMarkerLat,
      name: targetMarkerName,
      anchorX: targetMarkerAnchorX,
      anchorY: ANCHOR_Y,
      markerLevel: 1,
      position: targetMarkerPosition,
      // markers 有5个，他的rank应该分别是 5,4,3,2,1；这里处理的是第一个，所以rank为5
      rank: markers.length,
      isUseRank,
      //是否配置rank
      width: 18,
      height: 18,
      ...markerData,
    })
  );
  return result;
}
/**
 * 根据targerMarker 左右两侧的marker数量、中心点的经度、目标marker的经度 来决定targetMarker的position
 * @param {*} leftNum 根据targerMarker 左侧的marker数量
 * @param {*} rightNum 根据targerMarker 右侧的marker数量
 * @param {*} centerLocationLon 中心点的经度
 * @param {*} targetMarkerLon 目标marker的经度
 */

function targetMarkerPositionHelperFn({
  leftNum,
  rightNum,
  centerLocationLon,
  targetMarkerLon,
}) {
  let position = "";

  if (leftNum < rightNum) {
    position = "right";
  } else if (leftNum > rightNum) {
    position = "left";
  } // 为支持接机不需要和当前位置做比较
  else if (centerLocationLon) {
    position = centerLocationLon > targetMarkerLon ? "right" : "left";
  } else {
    position = "left";
  }

  return position;
}
/**
 * 处理除目标marker 以外的其他marker
 * @param {*} restMarkers 目标marker以外的其他marker
 * @param {*} markersLength 需要处理的markers
 * @param {*} targetMarkerLon 目标marker的经度
 * @param {*} idPrefix marker id前缀，点击marker的时候获用来区分marker
 */

function getRestMarkersHelperFn({
  restMarkers,
  markersLength,
  targetMarkerLon,
  idPrefix,
  markerData,
}) {
  let leftNum = 0; // 目标marker 左侧的marker个数

  let rightNum = 0; // 目标marker 右侧的marker个数
  // 处理除目标 marker 以外的其他marker

  const result = restMarkers.reduce((pre, next, index) => {
    const { id, lon, lat, name } = next;
    let position = "";
    let anchorX = 0;

    if (lon < targetMarkerLon) {
      leftNum++;
      position = "right";
      anchorX = ANCHOR_X_RIGHT;
    } else {
      rightNum++;
      position = "left";
      anchorX = ANCHOR_X_LEFT;
    }

    const markerId = markerUtils.getMarkerIdFn({
      idPrefix,
      id,
      longitude: lon,
      latitude: lat,
      position,
    });
    pre.push(
      markerUtils.getRecommendedPointMarkerFn({
        markerId,
        longitude: lon,
        latitude: lat,
        name,
        anchorX,
        anchorY: ANCHOR_Y,
        markerLevel: 1,
        position,
        // markers 有5个，他的rank应该分别是 5,4,3,2,1；这里遍历的是 restMarkers，rank应该分别是 4，3，2，1 所以多减了1
        rank: markersLength - index - 1,
        ...markerData,
      })
    );
    return pre;
  }, []);
  return {
    leftNum,
    rightNum,
    result,
  };
}
/**
 * 处理是否需要吸附到marker上。根据当前经纬度（longitude ,latitude）判断是否要吸附到 markers中的某个marker上
 * @param {*} markers 推荐点
 * @param {*} longitude 经度
 * @param {*} latitude 纬度
 * @returns { isAdsorbed, adsorbedMarker, index, } isAdsorbed 是否吸附；adsorbedMarker 吸附对象；index 吸附对象在数组中的下表
 */

function processWhetherToAdsorbMarker({ markers, longitude, latitude }) {
  if (!markers || !markers.length) {
    return {
      isAdsorbed: false,
    };
  }

  const { minIdx, min } = getMinDistanceMarkerFn({
    markers,
    longitude,
    latitude,
  }); // todo 添加吸附逻辑

  if (min < 20) {
    return {
      isAdsorbed: true,
      adsorbedMarker: markers[minIdx],
      index: minIdx,
    };
  }

  return {
    isAdsorbed: false,
  };
}
/**
 * 重置marker的rank权重，并提高指定marker的rank权重
 * @param markers 推荐点数据
 * @param selectedMarkerIndex 当前选中的推荐点 index
 * @param hiddenText 隐藏推荐点文案
 */

function processSelectedMarkerRankFn(markers, selectedMarkerIndex) {
  if (!markers || !markers.length) {
    return [];
  } // 重新设置权重，根据数组顺序依次赋值，如4个marker -> [3,2,1,0]

  const newMarkers = markers.reduce((pre, next, index, originMarkers) => {
    const temp = { ...next };
    temp.rank = originMarkers.length - index - 1;
    pre.push(temp);
    return pre;
  }, []);
  const selectedMarker = newMarkers[selectedMarkerIndex]; // 指定的marker权重提升，如selectedMarkerIndex为0，则 [3,2,1,0] -> [4,2,1,0]

  if (selectedMarker) {
    selectedMarker.rank = newMarkers.length;
  }

  return newMarkers;
}
/**
 * 在markers数组中 找到距离lat, lon最近的marker
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markers marker数组
 */

function getMinDistanceMarkerFn({ latitude, longitude, markers = [] }) {
  const L = markers.length;
  let minIdx = 0;
  let min = 0;

  if (L) {
    min = getDistanceFn(
      latitude,
      longitude,
      markers[0].latitude,
      markers[0].longitude
    );

    for (let i = 1; i < L; i++) {
      const dis = getDistanceFn(
        latitude,
        longitude,
        markers[i].latitude,
        markers[i].longitude
      );

      if (min > dis) {
        min = dis;
        minIdx = i;
      }
    }
  }

  return {
    minIdx,
    min,
  };
}
/**
 * 计算两个经纬度点之间的距离
 * @param {*} startLat
 * @param {*} startLon
 * @param {*} endLat
 * @param {*} endLon
 */

function getDistanceFn(startLat, startLon, endLat, endLon) {
  if (startLat < 0 || startLon < 0 || endLat < 0 || endLon < 0) {
    // 过滤掉不在大陆地区的错误经纬度
    return -1;
  }

  const radLat1 = (startLat * Math.PI) / 180.0;
  const radLat2 = (endLat * Math.PI) / 180.0;
  const a = radLat1 - radLat2;
  const b = (startLon * Math.PI) / 180.0 - (endLon * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s *= 6378.137; // EARTH_RADIUS;

  s = (Math.round(s * 10000) / 10000) * 1000;
  return s;
}
/**
 * 将车辆信息处理成一个数组，并根据车辆类型配置不同的图片
 * @param {*} data 获取附近车辆接口拿到的信息
 */

function processCarMarkerFn(data, markerLevel = 1) {
  const tmpMarkerArr = [];
  const ICON_PATH_MAP = {
    privateCar: privateCarIconPath,
    expressCar: expressCarIconPath,
    taxi: taxiIconPath,
  }; // 区分3种车型，分别用3中种图片

  ["privateCar", "expressCar", "taxi"].forEach((item, index) => {
    data[item] &&
      data[item].location.forEach((car, idx) => {
        const makerModel = {
          id: 200 + idx + index * 10,
          iconPath: ICON_PATH_MAP[item] || expressCarIconPath,
          latitude: car.lat,
          longitude: car.lon,
          width: 20,
          height: 40,
          rotate: parseInt(car.angle),
          markerLevel,
          customCallout: {
            type: 0,
            descList: [],
            isShow: 0,
          },
        };
        tmpMarkerArr.push(makerModel);
      });
  });
  return tmpMarkerArr;
}
/**
 * 处理Polygon的数据，适用于场站 管制区域等
 * @param {string} shape 服务返回的区域字符串
 * @param {object} obj 生成Polygon时 需要的额外的参数
 * polygon参数文档：https://opendocs.alipay.com/mini/component/map#polygon
 */

function processPolygonItemFn(shape, obj) {
  if (!shape) {
    return [];
  }

  const newPointsArr = shape.split(";").reduce((pre, m) => {
    const polylineLatlngs = m.split(",");

    if (polylineLatlngs.length === 2) {
      pre.push({
        latitude: Number(polylineLatlngs[1]),
        longitude: Number(polylineLatlngs[0]),
      });
      return pre;
    }

    return pre;
  }, []);
  return {
    points: newPointsArr,
    color: "#00B6FFFF",
    fillColor: "#00C6D31A",
    width: 1,
    ...obj,
  };
}
/**
 * 处理Polygon的数据，适用于场站 管制区域等
 * @param {Array<{
 * shape: string,
 * data: object
 * }>} areas
 * shape 是服务下发的区域数据，字符串类型，如果是数组类型
 * data 是polygon参数，文档：https://opendocs.alipay.com/mini/component/map#polygon
 */

function processPolygonFn(areas) {
  if (!areas) {
    return [];
  }

  return areas.map((v) => processPolygonItemFn(v.shape, v.data || {}));
}
/**
 * @description 通过 polygon 获取 Polyline 数据，场景：完成 polygon 无法实现的虚线等
 * @param {object[]} polygon 地图的 polygon 一般是调用 processPolygonFn 生成的数据
 * @param {object} data 配置Polyline额外的参数
 * 文档：https://opendocs.alipay.com/mini/component/map#polyline
 * @returns {object[]}
 */

function polygonToPolylineFn(polygon, data) {
  if (!polygon || !polygon.length) {
    return [];
  }

  return polygon.map((v) => {
    return {
      /* 最后添加第一个元素，形成闭合线 */
      points: [...v.points, v.points[0]],
      color: "#33B276",
      dottedLine: true,
      width: 2,
      ...data,
    };
  });
}
/**
 * 处理多围栏数据, 图面会有多个polygon
 * @param {*} fenceList 围栏数据
 */

function processMultiPolygonFn(fenceList) {
  if (fenceList.length === 0) {
    return [];
  }

  const polyons = [];
  fenceList.forEach((fence) => {
    const points = [];
    fence.points &&
      fence.points.forEach((point) => {
        points.push({
          latitude: Number(point.y),
          longitude: Number(point.x),
        });
      });
    polyons.push({
      points,
      color: "transparent",
      //默认黑色，使用透明将颜色隐掉
      fillColor: "#ff80261a",
      with: 0,
    });
  });
  return polyons;
}
/**
 * 根据围栏数据, 计算polyline
 * @param {*} fenceList 围栏数据
 */

function processMultiPolylineFn(fenceList) {
  if (fenceList.length === 0) {
    return [];
  }

  const polyline = [];
  fenceList.forEach((fence) => {
    const points = [];
    fence.points &&
      fence.points.forEach((point) => {
        points.push({
          latitude: Number(point.y),
          longitude: Number(point.x),
        });
      }); //最后添加第一个元素，形成闭合线

    points.push({
      latitude: Number(fence.points[0].y),
      longitude: Number(fence.points[0].x),
    });
    polyline.push({
      points,
      color: "#F69915",
      dottedLine: true,
      width: 2,
    });
  });
  return polyline;
}
/**
 * 校验当前点 是否在某一区域内
 * @param {[]} points  区域内的点
 * @param {[]} polygon 区域的图面 processPolygonFn计算得到的值
 */

function checkPointInPolygon(points, polygon) {
  const lon = points[0];
  const lat = points[1];
  let flag = false;
  const polygonPoints = polygon[0] && polygon[0].points;

  if (!lon || !lat || !polygonPoints) {
    return flag;
  } // console.log('polygonPoints', polygonPoints);

  for (
    let i = 0, j = polygonPoints.length - 1;
    i < polygonPoints.length;
    j = i++
  ) {
    const lonI = polygonPoints[i].longitude;
    const latI = polygonPoints[i].latitude;
    const lotJ = polygonPoints[j].longitude;
    const latJ = polygonPoints[j].latitude;
    const intersect =
      latI > lat != latJ > lat &&
      lon < ((lotJ - lonI) * (lat - latI)) / (latJ - latI) + lonI;

    if (intersect) {
      flag = !flag;
    }
  }

  return flag;
}
/**
 * 获取 includePoints，根据 markers，可以设置map的视窗显示范围
 * @param {*} markers
 */

function processIncludePointsFn(markers = [], options = {}) {
  
}
/**
 * 处理画线（行程）的数据
 *  1. 通过 frameList 截取 point2ds ，只显示未完成的路线
 *  2. 处理 point2ds 为 map 可以识别的格式
 *  3. 根据 trafficStatus 给路线添加颜色
 *
 * @param {*} _point2ds 未处理的线数据，
 * @param {*} _trafficStatus 交通状态数据，用来标识路的颜色
 * @param {*} frameList 当前帧数据，list中最后一个为正在行驶的点
 * @param {number} distance 路线长度
 * @param {object} polylineData 路线定制数据（覆盖）
 *    polylineData:{
 *       color: '',
 *       lineType: 'other', // other 备选路线
 *    }
 */

function processPolyLineFn(
  _point2ds = [],
  _trafficStatus = [],
  frameList = [],
  distance = 0,
  polylineData = {
    lineType: "",
  }
) {
  let point2ds = [..._point2ds];
  let trafficStatus = [..._trafficStatus];

  if (frameList && frameList.length > 0) {
    // currentIndex 用来截取路线数据。也就是截取 point2ds
    const { currentIndex, lat, lon } = frameList[frameList.length - 1]; // 获取还有没行驶的里程

    point2ds = polylineUtils.getPoint2dsToBeDrivedFn(point2ds, currentIndex);
    point2ds.unshift(`${lon},${lat}`);
    trafficStatus = polylineUtils.getTrafficStatusToBeDrivedFn(
      trafficStatus,
      currentIndex
    );
  } // 获取points

  const points = polylineUtils.getPolylinePointsFn(point2ds); // 获取colorlist

  const colorList = polylineUtils.getPolylineColorListFn(
    trafficStatus,
    polylineData.lineType
  );
  let isTooFar = distance > 500 * 1000; // 大于 500 km 不画路况，支付宝 ios 端路线折断问题

  isTooFar = false;
  const _polyLine = {
    points,
    colorList: isTooFar ? ["#00C96D"] : colorList,
    color: "#1FB53BFF",
    width: 10,
    dottedLine: false,
    ...polylineData,
  }; // 支付宝地图 polyline 上的自定义箭头 // 微信地图配置自定义icon的时候，安卓、ios标签不一致，因此使用默认的箭头团

  _polyLine.arrowLine = true; // _polyLine.arrowIconPath = sameRouteWxIconPath;

  return [_polyLine];
}
/**
 * 扫码打车-行中-起点样式：生成扫码打车行中起点marker结构
 * @param {*} markerId marker唯一id
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} showCustomizeCallout 是否展示自定义气泡
 * @param {*} descList showCustomizeCallout 为false：气泡文字内容,具体格式参考小程序map文档 descList 字段
 * @param {*} label showCustomizeCallout 为true：气泡左侧标题
 * @param {*} value showCustomizeCallout 为true：气泡右侧文字
 */

function generateStartingPointMarkerFn({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  markerLevel = 3,
  label = "",
  value = "",
  descList = [],
  showCustomizeCallout,
}) {
  if (showCustomizeCallout) {
    // 获取自定义单行marker
    return markerUtils.getStartEndPointMarkerWithOneLineCalloutFn({
      iconPath: startPointIconPath,
      markerId,
      latitude,
      longitude,
      markerLevel,
      label,
      value,
      width: 32,
      height: 40,
    });
  } // 返回普通气泡的终点

  return markerUtils.getCommonStartEndPointMarkerFn({
    iconPath: startPointIconPath,
    markerId,
    latitude,
    longitude,
    markerLevel,
    descList,
    width: 32,
    height: 40,
  });
}
/**
 * 扫码打车-行中-终点样式：生成扫码打车行中终点marker结构
 * @param {*} markerId marker唯一id
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} showCustomizeCallout 是否展示自定义气泡
 * @param {*} descList showCustomizeCallout 为false：气泡文字内容,具体格式参考小程序map文档 descList 字段
 * @param {*} label showCustomizeCallout 为true：气泡左侧标题
 * @param {*} subLabel showCustomizeCallout 为true带气泡：气泡左侧子标题
 * @param {*} value showCustomizeCallout 为true：气泡右侧文字
 */

function generateEndingPointMarkerFn({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  markerLevel = 3,
  label = "",
  subLabel = "",
  value = "",
  descList = [],
  showCustomizeCallout,
}) {
  if (showCustomizeCallout) {
    // 返回带自定义两行气泡的终点
    return markerUtils.getStartEndPointMarkerWithTwoLineCalloutFn({
      iconPath: endPointIconPath,
      markerId,
      latitude,
      longitude,
      markerLevel,
      label,
      subLabel,
      value,
      width: 32,
      height: 40,
    });
  } // 返回普通气泡的终点

  return markerUtils.getCommonStartEndPointMarkerFn({
    iconPath: endPointIconPath,
    markerId,
    latitude,
    longitude,
    markerLevel,
    descList,
    width: 32,
    height: 40,
  });
}
/**
 * //运力+运力颜色，确定使用的小车图标
 * @param {*} amapRideType  运力类型
 * @param {*} vehicleColor  运力颜色
 * @param {Number} businessModel 业务类型
 * @returns
 */

function specialCarIcon(amapRideType, vehicleColor, businessModel = -1) {
  // 巡游出租、巡改网、空投，都展示出租车小车，不展示对应颜色小车
  if ([0, 2, 3].includes(Number(businessModel))) {
    return CAR_ICON_PATH["gd_taxi"]["default"];
  }

  if (amapRideType && vehicleColor) {
    //运力+运力颜色，确定使用的小车图标
    if (
      ["gd_compact", "preferential", "gd_coach_compact"].includes(amapRideType)
    ) {
      amapRideType = "gd_express";
    }

    let color = "default";

    for (const [key, value] of Object.entries(CAR_COLOR)) {
      if (value === vehicleColor) {
        color = key;
        break;
      }
    }

    const amapRideTypeObj = CAR_ICON_PATH[amapRideType];

    if (amapRideTypeObj && amapRideTypeObj[color]) {
      return amapRideTypeObj[color];
    }
  }

  return "";
}
/**
 * 生成行驶中的小车 marker 结构
 * @param {*} carType
 */

function generateRunningCarMarkerFn({
  markerId = Math.random() * 10000,
  carType = "expressCar",
  markerLevel = 4,
  longitude,
  latitude,
  rotate = 0,
  calloutValue,
  amapRideType,
  vehicleColor,
  businessModel = -1,
}) {
  const ICON_PATH_MAP = {
    privateCar: privateCarIconPath,
    expressCar: expressCarIconPath,
    taxi: taxiIconPath,
  };
  const carIcon = specialCarIcon(amapRideType, vehicleColor, businessModel);
  const iconPath = carIcon || ICON_PATH_MAP[carType] || expressCarIconPath;
  let descList = [];

  if (Array.isArray(calloutValue)) {
    descList = calloutValue.map((item, index) => {
      return {
        desc: item.text,
        descColor: item.color,
        gap: true,
      };
    });
  } else if (calloutValue) {
    descList = [
      {
        desc: calloutValue,
        descColor: "#050505",
        gap: true,
      },
    ];
  }

  return markerUtils.getCommonStartEndPointMarkerFn({
    markerId,
    iconPath,
    longitude,
    latitude,
    width: 20,
    height: 40,
    anchorX: 0.5,
    anchorY: 0.5,
    markerLevel,
    rotate,
    descList,
  });
}
/**
 * 生成行驶中的小车 marker 结构: 连环单特有
 * @param {*} carType
 */

function generateRunningCarInterlinkMarkerFn({
  markerId = Math.random() * 10000,
  carType = "expressCar",
  longitude,
  latitude,
  rotate = 0,
  label = "",
  text = "",
  amapRideType,
  vehicleColor,
  businessModel = -1,
}) {
  const ICON_PATH_MAP = {
    privateCar: privateCarIconPath,
    expressCar: expressCarIconPath,
    taxi: taxiIconPath,
  };
  const carIcon = specialCarIcon(amapRideType, vehicleColor, businessModel);
  const iconPath = carIcon || ICON_PATH_MAP[carType] || expressCarIconPath;
  return markerUtils.getInterlinkCalloutFn({
    markerId,
    iconPath,
    longitude,
    latitude,
    rotate,
    label,
    text,
  });
}
/**
 * 生成显示文本标签的marker
 */

function generateTextLabelMarkerFn({
  markerId = Math.random() * 10000,
  markerLevel,
  longitude,
  latitude,
  anchorX,
  anchorY,
  value,
}) {
  return markerUtils.getTextLabelMarker({
    markerId,
    latitude,
    longitude,
    anchorX,
    anchorY,
    markerLevel,
    value,
  });
} // todo 整理map util的命名 产出文档，下沉npm包

/**
 * 网约车-运力页面-起点样式：获取带两行自定义文字的marker 样式1
 * @param {String} markerId marker的唯一标识
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} labelWithFontWeight 颜色加粗的标题
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 */

function generateStartPointMarkerWithCustomText({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  labelWithFontWeight = "",
  gdServiceId,
  subLabel,
  subLabelColor,
  time,
}) {
  if (
    gdServiceId === GD_SERVICEID_MAP.reserve ||
    gdServiceId === GD_SERVICEID_MAP.intercity
  ) {
    return markerUtils.getStartEndPointMarkerWithCustomTextFn({
      markerId,
      iconPath: startPointIconPath,
      latitude,
      longitude,
      labelWithFontWeight,
      label: "",
      width: 32,
      height: 40,
      time,
      subLabel: subLabel || "已推荐附近上车点，点击可修改",
      subLabelColor: subLabelColor || "#00BD9D",
    });
  }

  return markerUtils.getStartEndPointMarkerWithCustomTextFn({
    markerId,
    iconPath: startPointIconPath,
    latitude,
    longitude,
    labelWithFontWeight,
    label: "",
    time,
    width: 32,
    height: 40,
    subLabel: subLabel || "已推荐附近上车点，点击可修改",
    subLabelColor: subLabelColor || "#00BD9D",
  });
}
/**
 * 网约车-运力页面-终点样式：获取带两行自定义文字的marker 样式2
 * @param {*} params
 */

function generateEndPointMarkerWithCustomText2({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  estArriveTime = "",
  distance = "",
  unit = "",
  minutes = "",
  labelWithFontWeight = "",
  gdServiceId,
  isShowSecondLine = true,
  width,
  height,
}) {
  if (
    gdServiceId === GD_SERVICEID_MAP.reserve ||
    gdServiceId === GD_SERVICEID_MAP.intercity
  ) {
    const param = {
      markerId,
      iconPath: endPointIconPath,
      latitude,
      longitude,
      labelWithFontWeight,
      label: "",
      subLabel: {
        text1: "全程",
        text2: distance,
        text3: `${unit}，约行驶`,
        text4: minutes,
        text5: "分钟",
        color2: "#1A66FF",
        color4: "#1A66FF",
      },
      showGap: true,
      isShowSecondLine,
      width,
      height,
      estArriveTime,
    };

    if (gdServiceId === GD_SERVICEID_MAP.intercity) {
      param.rightImg = emptyIconPath;
      param.isShowArrowRightImg = false;
    }

    return markerUtils.getStartEndPointMarkerWithCustomText2Fn(param);
  }

  return markerUtils.getStartEndPointMarkerWithCustomText2Fn({
    markerId,
    iconPath: endPointIconPath,
    latitude,
    longitude,
    labelWithFontWeight,
    label: "",
    subLabel: {
      text1: "全程",
      text2: distance,
      text3: `${unit}，约行驶`,
      text4: minutes,
      text5: "分钟",
      color2: "#1A66FF",
      color4: "#1A66FF",
    },
    showGap: true,
    isShowSecondLine,
    width,
    height,
    estArriveTime,
  });
}
/**
 * 网约车-行中-起点样式：生成网约车行中起点样式
 * @param {*} markerId marker唯一id
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} showCustomizeCallout 是否展示自定义气泡
 * @param {*} descList showCustomizeCallout 为false：气泡文字内容,具体格式参考小程序map文档 descList 字段
 * @param {*} label showCustomizeCallout 为true：气泡左侧标题
 * @param {*} value showCustomizeCallout 为true：气泡右侧文字
 */

function generateGoingStartPointMarkForRidehailing({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  markerLevel = 3,
  label = "",
  value = "",
  descList = [],
  showCustomizeCallout,
  anchorY = 1,
}) {
  if (showCustomizeCallout) {
    // 获取自定义单行marker
    return markerUtils.getStartEndPointMarkerWithOneLineCalloutFn({
      iconPath: startPointIconPath,
      markerId,
      latitude,
      longitude,
      markerLevel,
      label,
      value,
      anchorY,
      width: 32,
      height: 40,
    });
  }

  return markerUtils.getCommonStartEndPointMarkerFn({
    iconPath: startPointIconPath,
    markerId,
    latitude,
    longitude,
    markerLevel,
    descList,
    anchorY,
    width: 32,
    height: 40,
  });
}
/**
 * 网约车-行中-终点样式：生成网约车行中起点样式
 * @param {*} markerId marker唯一id
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} showCustomizeCallout 是否展示自定义气泡
 * @param {*} descList showCustomizeCallout 为false：气泡文字内容,具体格式参考小程序map文档 descList 字段
 * @param {*} label showCustomizeCallout 为true：气泡左侧标题
 * @param {*} subLabel showCustomizeCallout 为true带气泡：气泡左侧子标题
 * @param {*} value showCustomizeCallout 为true：气泡右侧文字
 */

function generateGoingEndPointMarkForRidehailing({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  markerLevel = 3,
  label = "",
  subLabel = "",
  value = "",
  descList = [],
  showCustomizeCallout,
}) {
  if (showCustomizeCallout) {
    // 返回带自定义两行气泡的终点
    return markerUtils.getStartEndPointMarkerWithTwoLineCalloutFn({
      iconPath: endPointIconPath,
      markerId,
      latitude,
      longitude,
      markerLevel,
      label,
      subLabel,
      value,
      width: 32,
      height: 40,
    });
  } // 返回普通气泡的终点

  return markerUtils.getCommonStartEndPointMarkerFn({
    iconPath: endPointIconPath,
    markerId,
    latitude,
    longitude,
    markerLevel,
    descList,
    width: 32,
    height: 40,
  });
}
/**
 * 远程特惠-运力页-终点样式：生成远程特惠运力页面终点样式
 * @param {*} markerId marker唯一id
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} showCustomizeCallout 是否展示自定义气泡
 * @param {*} descList showCustomizeCallout 为false：气泡文字内容,具体格式参考小程序map文档 descList 字段
 * @param {*} label showCustomizeCallout 为true：气泡左侧标题
 * @param {*} subLabel showCustomizeCallout 为true带气泡：气泡左侧子标题
 * @param {*} value showCustomizeCallout 为true：气泡右侧文字
 */

function generateIntercityStartPointMark({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  markerLevel = 3,
  name = "",
}) {
  return markerUtils.getStartEndPointMarkerWithOneLineCalloutFn({
    iconPath: startPointIconPath,
    markerId,
    latitude,
    longitude,
    markerLevel,
    label: name,
    isShowGap: true,
    // 解决ios 微信气泡文案遮盖问题
    width: 32,
    height: 40,
  });
}
/**
 * @description 微信: 获取当前地图缩放后 真实距离对应屏幕的距离
 * @param {Number} scale 当前的缩放
 * @return {Number}
 */

function getWxMapProportion(scale) {
  /* 比例尺映射数据 单位：m */
  const scaleData = {
    3: 1000 * 1000,
    4: 500 * 100,
    5: 200 * 1000,
    6: 100 * 1000,
    7: 50 * 1000,
    8: 50 * 1000,
    9: 20 * 1000,
    10: 10 * 1000,
    11: 5000,
    12: 2000,
    13: 1000,
    14: 500,
    15: 200,
    16: 100,
    17: 50,
    18: 35,
    19: 20,
    20: 10,
  };
  const leftScale = Math.floor(scale); //

  const rightScale = leftScale + 1;
  /* 计算缩放小数部分的距离 */

  const middenDis =
    (scaleData[leftScale] - scaleData[rightScale]) * (scale - leftScale);
  return scaleData[leftScale] - middenDis;
}
/**
 * 远程特惠，上下车确认页，固定点气泡
 * @param {*} param0
 * @returns
 */

function generateIntercityConfirmPointMarkerFn({
  id,
  lat,
  lon,
  markerLevel = 5,
  descList = [],
}) {
  // 返回普通气泡的终点
  return markerUtils.getCommonStartEndPointMarkerFn({
    iconPath: fixedPointIconPath,
    markerId: Number(id),
    latitude: lat,
    longitude: lon,
    markerLevel,
    descList,
    anchorY: 1,
  });
}
/**
 * @description 判断经纬度是否相等
 * @param {number} a 经纬度
 * @param {number} b 经纬度
 * @returns {boolean}
 */

function isAlmostSame(a, b) {
  return Math.abs(a - b) < 0.000001;
}
/**
 * @description 只有微信用 ---> 判断两个点是在一个维度上,且文字方向相同
 * @param {{label:{anchorX:number}}} a markers点数据
 * @param {{label:{anchorX:number}}} b markers点数据
 * @returns {boolean}
 */

function isSameLat(a, b) {
  const anchorXA = a.label ? a.label.anchorX : "a";
  const anchorXB = b.label ? b.label.anchorX : "b";
  return Math.abs(a.latitude - b.latitude) < 0.00004 && anchorXA === anchorXB;
  return false;
}
/**
 * @description 处理微信小程序 地图上marker点在缩放时 聚合的操作
 * @param {Number} points 当前的推荐点
 * @param {Number} scale 当前的缩放
 * @return {Number}
 */

function getProcessedScalePointsForWx(points, scale) {
  if (points.length <= 1) {
    return points;
  }

  const baseDis = getWxMapProportion(scale);
  let collisionDistance = 50; // 碰撞的距离临界值，代表地图上的距离，不是实际距离

  /* 待聚合的推荐点 先都置为不隐藏 */

  const newPoints = points.map((v) => {
    v.hide = false;
    return v;
  });
  /* 找到权重最大的点 */

  const maxRankPoint = newPoints.reduce((obj, v) => {
    if (v.rank > obj.rank) {
      obj = v;
    }

    return obj;
  }, newPoints[0]);
  let index = 0;

  while (index <= newPoints.length - 2) {
    const item = newPoints[index];

    for (let i = index + 1; i < newPoints.length; i++) {
      const dis = getDistanceFn(
        newPoints[i].latitude,
        newPoints[i].longitude,
        item.latitude,
        item.longitude
      );
      /* 如果是同一个维度，防止同一个方向，比如左侧，文字会覆盖，所以把阈值调高一些 */

      if (isSameLat(newPoints[i], item)) {
        collisionDistance = 130;
      }
      /* 判断是否碰撞 */

      const isHide = (dis / baseDis) * 100 <= collisionDistance; // 排除权重最高的 和 当前已经是隐藏的

      if (newPoints[index].id !== maxRankPoint.id && !newPoints[index].hide) {
        newPoints[index].hide = isHide;
      } // 排除权重最高的 和 当前已经是隐藏的

      if (newPoints[i].id !== maxRankPoint.id && !newPoints[i].hide) {
        newPoints[i].hide = isHide;
      }
    }

    index += 1;
  }

  return newPoints;
}
/**
 * @description 新拉取数据后，处理推荐点
 * @param {any[]} spots 接口返回的推荐点
 * @param {string} prefix 处理推荐点的前缀
 * @param {number} scale 当前的缩放
 * @param {object} markerData 当前点的数据 比如改变color
 * @return {any[]}
 */

function getProcessedPoints(spots, prefix, scale, markerData) {
  let points = processRecommendMarkerFn(spots, prefix, {}, true, markerData);
  /* 处理微信小程序下的推荐点碰撞 */

  points = getProcessedScalePointsForWx(points, scale);
  return points;
}
/**
 * @description 处理推荐点权重
 * @param {any[]} points map的推荐点数据
 * @param {number} minIdx 距离最小值的index
 * @param {boolean} hiddenText 隐藏推荐点文案, 如果是吸附的，则隐藏当前文案
 * @param {number} scale 缩放值
 * @return {Array<object>}
 */

function getProcessedRankPoints(points, minIdx, hiddenText, scale) {
  /* 不能判断 hiddenAdsorbedPointName 因为 hiddenAdsorbedPointName可能会从true切成false */
  // if(this.hiddenAdsorbedPointName){

  /* 处理 是否隐藏label */
  points.forEach((v, i) => {
    if (minIdx === i) {
      v.hiddenText = hiddenText;
    } else {
      v.hiddenText = false;
    }
  }); // }
  // 处理吸附后的推荐点marker权重

  let newPoints = processSelectedMarkerRankFn(points, minIdx);

  /* 如果当前这个点是隐藏的，微信下 重新处理碰撞逻辑 */
  if (points[minIdx] && points[minIdx].hide) {
    newPoints = getProcessedScalePointsForWx(newPoints, scale);
  }

  return newPoints;
}
/**
 * @description 处理markers里需要隐藏文件的点，并返回所有点
 * @param {object[]} markers
 * @returns {object[]}
 */

function getHiddenTextPoints(markers) {
  return markers.map((v) => {
    if (v.hiddenText) {
      let restData = {};
      restData = {
        label: {},
      };
      return { ...v, ...restData };
    }

    return v;
  });
}
/**
 * 逆地理（转换 经纬度 为 地址信息）
 * @param {Object} lonAndLatObj 经纬度信息
 * @param {*} lonAndLatObj.lon 经度
 * @param {*} lonAndLatObj.lat 纬度
 */

async function transformLonLatToAdress(lonAndLatObj) {
 
}
/**
 * 获取以某个点为基准点的所有镜像点
 * @param {*} adsorbPoint
 * @param {*} spots
 * @returns
 */

function mirrorSpots(adsorbPoint, spots = []) {
  if (spots.length === 0) {
    return [];
  }

  const appendSpot = [];
  spots.forEach((spot) => {
    if (
      isAlmostSame(adsorbPoint.latitude, spot.latitude) &&
      isAlmostSame(adsorbPoint.longitude, spot.longitude)
    ) {
      return;
    }

    const longitude =
      2 * Number(adsorbPoint.longitude) - Number(spot.longitude);
    const latitude = 2 * Number(adsorbPoint.latitude) - Number(spot.latitude);
    const point = {
      longitude,
      latitude,
    };
    appendSpot.push(point);
  });
  return appendSpot;
}

export {
  processRecommendMarkerFn,
  processCarMarkerFn,
  processPolygonFn,
  processMultiPolygonFn,
  checkPointInPolygon,
  processPolyLineFn,
  polygonToPolylineFn,
  processIncludePointsFn,
  generateStartingPointMarkerFn,
  generateEndingPointMarkerFn,
  generateRunningCarMarkerFn,
  generateRunningCarInterlinkMarkerFn,
  processSelectedMarkerRankFn,
  getMinDistanceMarkerFn,
  processWhetherToAdsorbMarker,
  generateStartPointMarkerWithCustomText,
  generateEndPointMarkerWithCustomText2,
  generateGoingStartPointMarkForRidehailing,
  generateGoingEndPointMarkForRidehailing,
  generateTextLabelMarkerFn,
  getWxMapProportion,
  getDistanceFn,
  generateIntercityConfirmPointMarkerFn,
  getProcessedPoints,
  isAlmostSame,
  getProcessedRankPoints,
  getHiddenTextPoints,
  transformLonLatToAdress,
  getProcessedScalePointsForWx,
  processMultiPolylineFn,
  generateIntercityStartPointMark,
  mirrorSpots,
};
