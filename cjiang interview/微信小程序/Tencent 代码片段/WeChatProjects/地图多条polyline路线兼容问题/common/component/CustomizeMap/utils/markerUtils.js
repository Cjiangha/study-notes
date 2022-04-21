import { gblen } from "../../../tool/tool";
import { getIntercityCpStartMarker } from "./markers/intercityMarker";
import { getModifyLocationCalloutFn } from "./markers/modifyLocationMarker";
import { getModifyLocationTipCalloutFn } from "./markers/modifyLocationMarker";
import { getModifyLocationCalloutFnAlipay } from "./markers/modifyLocationMarker";
import { getInterlinkCalloutFn } from "./markers/interlinkMarker";
import { getInterlinkCalloutFnAlipay } from "./markers/interlinkMarker";
import { getViaPointMarkerFn } from "./markers/interlinkMarker";
const layoutXmlTriangleImg =
  "/common/component/CustomizeMap/image/layoutXmlTriangle.png";
const arrowRightImg = "/common/component/CustomizeMap/image/arrow_right.png";
const recommendedPointImg =
  "https://gw.alicdn.com/imgextra/i4/O1CN016VyZ671dzeWoLGO07_!!6000000003807-2-tps-41-39.png";
const blankImg = "/common/component/CustomizeMap/image/blank.png";
const passengersIcon =
  "https://gw.alicdn.com/imgextra/i1/O1CN01T26oFJ1aLrGVyWvnf_!!6000000003314-2-tps-132-132.png";

/** ============ 微信callout公共参数 start =========== */

const wxCommoncallout = {
  padding: 10,
  fontSize: 13,
  anchorY: -10,
  borderRadius: 50,
  color: "#050505",
};
/** ============ 微信callout公共参数 end =========== */

/**
 * 获取带普通气泡的终点marker
 * CustomizeMarker1
 *
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} anchorX 经纬度在标注图标的锚点-横向值
 * @param {*} anchorY 经纬度在标注图标的锚点-纵向值
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} descList 经度 气泡右侧值
 * @param {*} width icon宽度
 * @param {*} height icon高度
 * @param {*} rotate 顺时针旋转的角度
 */

function getCommonStartEndPointMarkerFn({
  markerId = Math.random() * 10000,
  iconPath,
  latitude,
  longitude,
  anchorX,
  anchorY,
  markerLevel = 3,
  descList,
  width = 24,
  height = 31,
  rotate = 0,
}) {
  let marker = "";
  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: anchorX || 0.5,
    anchorY: anchorY || 1,
    markerLevel,
    width,
    height,
    rotate,
  };

  if (descList && descList.length > 0) {
    const content = descList.reduce((pre, next) => {
      pre += next.desc;
      return pre;
    }, "");
    marker.customCallout = {
      anchorX: 0,
      anchorY: -6,
      display: "ALWAYS",
    }; // 暂时存储数据后，传递给地图的时候会被删除

    marker.customizeParams = {
      customizeType: 1,
      markerId,
      layoutXmlTriangleImg,
      descList,
    }; // 兜底不支持 customCallout

    marker.callout = { ...wxCommoncallout, display: "ALWAYS", content };
  }

  return marker;
}
/**
 * 获取带自定义气泡的终点marker：单行气泡
 * CustomizeMarker2
 *
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} label 气泡左侧标题
 * @param {*} value 气泡右侧值
 */

function getStartEndPointMarkerWithOneLineCalloutFn({
  markerId = Math.random() * 10000,
  iconPath,
  latitude,
  longitude,
  markerLevel = 3,
  label,
  value = "",
  isShowGap = false,
  width = 32,
  height = 42,
}) {
  let marker = "";
  let mainText = "";
  let colorObj = {};

  if (Array.isArray(value)) {
    // 多色文案处理
    value.forEach((item, index) => {
      colorObj[`color${index + 1}`] = item.color;
      colorObj[`text${index + 1}`] = item.text;
    });
  } else {
    mainText = value;
    colorObj = {
      color1: "#FFFFFF",
      text1: "",
      color2: "#FFFFFF",
      text2: "",
    };
  }

  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 1,
    markerLevel,
    width,
    height,
    customCallout: {
      anchorX: 0,
      anchorY: -6,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 2,
      markerId,
      label,
      isShowGap,
      value,
      layoutXmlTriangleImg,
    },
  }; // 兜底不支持 customCallout

  marker.callout = {
    ...wxCommoncallout,
    display: "ALWAYS",
    content: `${label}: ${value}`,
  };
  return marker;
}
/**
 * 获取带自定义气泡的终点marker：双行气泡
 * CustomizeMarker3
 *
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} label 气泡左侧标题
 * @param {*} subLabel 气泡左侧子标题
 * @param {*} value 气泡右侧值
 */

function getStartEndPointMarkerWithTwoLineCalloutFn({
  markerId = Math.random() * 10000,
  iconPath,
  latitude,
  longitude,
  markerLevel = 3,
  label,
  subLabel,
  value,
  width = 24,
  height = 31,
}) {
  let marker = "";
  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 1,
    markerLevel,
    width,
    height,
    customCallout: {
      anchorX: 0,
      anchorY: -6,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 3,
      markerId,
      label,
      subLabel,
      value,
      layoutXmlTriangleImg,
    },
  }; // 兜底不支持 customCallout

  marker.callout = {
    ...wxCommoncallout,
    display: "ALWAYS",
    content: `预计${label}到达${value}`,
  };
  return marker;
}
/**
 * 获取带两行自定义文字的marker
 * CustomizeMarker4
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} labelWithFontWeight 气泡第一行文字中加粗的文字
 * @param {*} label 气泡第一行文字中没加粗的文字
 * @param {*} subLabel 气泡第二行文字
 * @param {*} subLabelColor 气泡第二行文字的颜色
 */

function getStartEndPointMarkerWithCustomTextFn({
  markerId = Math.random() * 10000,
  iconPath,
  latitude,
  longitude,
  markerLevel = 3,
  labelWithFontWeight,
  label,
  time,
  subLabel,
  subLabelColor,
  width = 24,
  height = 31,
}) {
  let marker = "";
  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 1,
    markerLevel,
    width,
    height,
    customCallout: {
      anchorX: 0,
      anchorY: -6,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 4,
      markerId,
      labelWithFontWeight,
      label,
      subLabel,
      subLabelColor,
      arrowRightImg,
      layoutXmlTriangleImg,
      time,
    },
  }; // 兜底不支持 customCallout

  marker.callout = {
    ...wxCommoncallout,
    display: "ALWAYS",
    content: `${labelWithFontWeight}后出发`,
  };
  return marker;
}
/**
 * 获取带两行自定义文字的marker
 * CustomizeMarker5
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} labelWithFontWeight 气泡第一行文字中加粗的文字
 * @param {*} label 气泡第一行文字中没加粗的文字
 * @param {*} subLabel 气泡第二行文字
 *          示例：{text1,text2,text3,text4,text5,color1,color2,color3,color4,color5,}
 */

function getStartEndPointMarkerWithCustomText2Fn({
  markerId = Math.random() * 10000,
  iconPath,
  latitude,
  longitude,
  markerLevel = 3,
  label,
  subLabel = {},
  showGap = false,
  labelWithFontWeight = "",
  rightImg = arrowRightImg,
  isShowArrowRightImg = true,
  isShowSecondLine = true,
  width = 24,
  height = 31,
  estArriveTime,
}) {
  // 提取subLabel对象中的值，并设置默认值，不然xml里面不显示文字
  const {
    text1 = "",
    text2 = "",
    text3 = "",
    text4 = "",
    text5 = "",
    color1 = "#666666",
    color2 = "#666666",
    color3 = "#666666",
    color4 = "#666666",
    color5 = "#666666",
  } = subLabel;
  let marker = "";
  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 1,
    markerLevel,
    width,
    height,
    customCallout: {
      anchorX: 0,
      anchorY: -6,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 5,
      markerId,
      labelWithFontWeight,
      llabelWithFontWeightGap: /\d/.test(labelWithFontWeight),
      // 微信 cover-view 标签展示数字时，微信计算宽度跟手机渲染宽度不一致，导致遮盖
      label,
      labelGap: /\d/.test(label),
      // 微信 cover-view 标签展示数字时，微信计算宽度跟手机渲染宽度不一致，导致遮盖
      subLabelsArr: isShowSecondLine
        ? [
            {
              color: color1,
              val: text1,
              showGap,
              showGapWidth: "4rpx",
            },
            {
              color: color2,
              val: text2,
              showGap,
              showGapWidth: "4rpx",
            },
            {
              color: color3,
              val: text3,
              showGap,
              showGapWidth: "4rpx",
            },
            {
              color: color4,
              val: text4,
              showGap,
              showGapWidth: "4rpx",
            },
            {
              color: color5,
              val: text5,
            },
          ]
        : [],
      arrowRightImg: rightImg,
      isShowArrowRightImg,
      layoutXmlTriangleImg,
      estArriveTime,
      isShowTime: isShowSecondLine,
    },
  }; // 兜底不支持 customCallout

  marker.callout = {
    ...wxCommoncallout,
    display: "ALWAYS",
    content: `${text1}${text2}${text3}${text4}${text5}`,
  };
  return marker;
}
/**
 * 获取地图上推荐点marker数据
 * @param {*} markerId marker唯一id
 * @param {*} longitude 经度
 * @param {*} latitude 纬度
 * @param {*} name 推荐点名称
 * @param {*} anchorX 经纬度在标注图标的锚点-横向值
 * @param {*} anchorY 经纬度在标注图标的锚点-竖向值
 * @param {*} markerLevel marker在地图上的绘制层级
 * @param {*} position icon和文字的位置 left： icon在左，文字在右 right：icon在右，文字在左
 * @param {*} rank marker碰撞时的逻辑，越大权重越高
 */

function getRecommendedPointMarkerFn({
  markerId,
  iconPath = recommendedPointImg,
  longitude,
  latitude,
  name,
  anchorX,
  anchorY,
  width = 18,
  height = 18,
  markerLevel = 2,
  position,
  rank = 0,
  isUseRank = true,
  color = "#00B795",
  fontSize = 12,
}) {
  const isAndroid = systemInfo.platform.indexOf("Android") > -1;
  let content = name; // marker名称

  let labelWidth = 0; // 文案过长时截取文案

  if (content.length > 6) {
    content = `${name.substr(0, 6)}...`;
    labelWidth = -(gblen(content) * 6 + 3);
  } else {
    labelWidth = -(gblen(content) * 6 + 10); // marker在左边时的宽度
  }

  return {
    id: markerId,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 0.5,
    markerLevel,
    iconPath,
    width,
    height,
    label: {
      content,
      color,
      fontSize,
      anchorX: position === "right" ? labelWidth : 10,
      // 微信地图上 安卓 ios兼容
      anchorY: isAndroid ? -10 : -17,
    },
    rank,
  };
}
/**
 * 根据参数生成markerId
 * @param {*} idPrefix marker id前缀，点击marker的时候获用来区分marker
 * @param {*} id 后端服务返回的markerid 可能为空
 * @param {*} longitude marker的经度
 * @param {*} latitude marker的纬度
 * @param {*} position marker的icon的左右位置 left、right
 */

function getMarkerIdFn({
  idPrefix = "",
  id = "",
  longitude = "",
  latitude = "",
  position,
}) {
  const uniqueId = id || `${longitude}/${latitude}`; // 结尾拼上position 是因为 同一个markder的显示状态有左、右两种状态。如果不加postion 则marker左右显示变化的时候，不会重绘

  return `${idPrefix}-${uniqueId}-${position}`;
}
/**
 * 生成显示文本标签的marker
 */

function getTextLabelMarker({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  anchorX,
  anchorY = 0,
  markerLevel = 1,
  value,
}) {
  let marker = "";
  // 文本标签宽度
  const labelWidth = gblen(value) * 6;
  marker = {
    id: markerId,
    iconPath: blankImg,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 0.5,
    markerLevel,
    width: 1,
    height: 1,
    label: {
      content: value,
      color: "#212121",
      fontSize: 12,
      anchorX: anchorX || -labelWidth / 2,
      anchorY,
    },
  };
  return marker;
}

function getCustomizeMarker6({
  iconPath,
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  anchorX = 0.5,
  anchorY = 1,
  markerLevel = 2,
  width = 60,
  height = 66,
  text = "",
  textColor = "#FFFFFF",
  textSize = "8",
}) {
  let marker = "";
  marker = {
    id: markerId,
    iconPath: blankImg,
    latitude,
    longitude,
    anchorX,
    anchorY,
    width: 1,
    height: 1,
    markerLevel,
    customCallout: {
      anchorX: 0,
      anchorY: 10,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 6,
      markerId,
      text,
      textColor,
      textSize,
      iconPath,
      iconWidth: width,
      iconHeight: height,
    },
  };
  return marker;
}
/**
 * 拼友合并时的气泡样式
 * @param {*} param0
 */

function getCustomizeMarker7({
  markerId = Math.random() * 10000,
  latitude,
  longitude,
  anchorX = 0.5,
  anchorY = 1,
  markerLevel = 2,
  itemArr = [],
}) {
  let marker = "";
  // 设置默认参数
  const _itemArr = itemArr.map((item) => {
    const {
      width = 42,
      height = 42,
      text = "",
      textColor = "#FFFFFF",
      textSize = "8",
    } = item;
    return {
      iconWidth: width,
      iconHeight: height,
      text,
      textColor,
      textSize,
      iconPath: passengersIcon,
    };
  });

  marker = {
    id: markerId,
    iconPath: blankImg,
    latitude,
    longitude,
    anchorX,
    anchorY,
    width: 1,
    height: 1,
    markerLevel,
    customCallout: {
      anchorX: 0,
      anchorY: -10,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 7,
      markerId,
      itemArr: _itemArr,
      layoutXmlTriangleImg,
    },
  };
  return marker;
}

export {
  getCommonStartEndPointMarkerFn,
  getStartEndPointMarkerWithOneLineCalloutFn,
  getStartEndPointMarkerWithTwoLineCalloutFn,
  getStartEndPointMarkerWithCustomTextFn,
  getStartEndPointMarkerWithCustomText2Fn,
  getRecommendedPointMarkerFn,
  getMarkerIdFn,
  getTextLabelMarker,
  getCustomizeMarker6,
  getCustomizeMarker7,
  getIntercityCpStartMarker,
  getModifyLocationCalloutFn,
  getModifyLocationTipCalloutFn,
  getInterlinkCalloutFn,
  getInterlinkCalloutFnAlipay,
  getViaPointMarkerFn,
  getModifyLocationCalloutFnAlipay,
};
