const arrowRightImg = "/common/component/CustomizeMap/image/arrow_right.png";
const closeRightImg = "/common/component/CustomizeMap/image/close.png";
const layoutXmlTriangleImg =
  "/common/component/CustomizeMap/image/layoutXmlTriangle.png";
const startPointIconPath =
  "/common/component/CustomizeMap/image/start-point.png";
const blankImg = "/common/component/CustomizeMap/image/blank.png";
const triangleImg = "/common/component/CustomizeMap/image/triangle.png";

/** ============ 微信callout公共参数 start =========== */

const wxCommoncallout = {
  padding: 10,
  fontSize: 13,
  anchorY: -10,
  borderRadius: 50,
  color: "#050505",
};
/**
 * 修改上车点Marker
 * 获取带自定义气泡的终点marker：单行气泡
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} label 气泡左侧标题
 * @param {*} value 气泡右侧值
 */

function getModifyLocationCalloutFn({
  markerId = Math.random() * 10000,
  iconPath = startPointIconPath,
  latitude,
  longitude,
  anchorX,
  anchorY,
  markerLevel = 10,
  label,
  value = "",
  width = 24,
  height = 32,
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
    customCallout: {
      anchorX: 0,
      anchorY: -2,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: "online-modify-location",
      markerId,
      label,
      value,
      arrowRightImg,
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
 * 上车点修改上方的提示
 * 获取带自定义气泡的终点marker：单行气泡
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} text
 */

function getModifyLocationTipCalloutFn({
  markerId = Math.random() * 10000,
  iconPath = blankImg,
  latitude,
  longitude,
  markerLevel = 10,
  text = "",
}) {
  let marker = "";
  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 1,
    width: 10,
    height: 82,
    markerLevel,
    customCallout: {
      anchorX: 0,
      anchorY: 0,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: "online-modify-location-tip",
      markerId,
      text,
      iconPath,
      rightImg: closeRightImg,
      triangleImg,
    },
  }; // 兜底不支持 customCallout

  marker.callout = {
    padding: 10,
    fontSize: 13,
    anchorY: 0,
    borderRadius: 50,
    color: "#050505",
    display: "ALWAYS",
    content: text,
  };
  return marker;
}
/**
 * 支付宝：小车上方气泡‘距你xx米 xx分’
 * 原始customCallout 层级比 iconLayout的高，因此将小车上方气泡‘距你xx米 xx分’也用iconLayout设置，
 * 应用场景：小车上方气泡‘距你xx米 xx分’ 和 ‘在这里上车｜修改’重合时，降低层级
 * @param {*} param0
 * @returns
 */

function getModifyLocationCalloutFnAlipay({
  markerId = Math.random() * 10000,
  iconPath = blankImg,
  latitude,
  longitude,
  markerLevel = 4,
  label = "",
  value = "",
}) {
  // 提取subLabel对象中的值，并设置默认值，不然xml里面不显示文字
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

  const marker = {
    id: markerId,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 0.55,
    markerLevel,
    iconLayout: {
      params: {
        label,
        verticleLineText: label ? " " : "",
        verticleLineTextWidth: label ? 1 : 0,
        value: mainText,
        valuePaddingL: label ? 7 : 0,
        valuePaddingR: 10,
        top: 45,
        iconPath,
        triangleImg: layoutXmlTriangleImg,
        ...colorObj,
      },
      src: "/alipay_map_layout/markerWithOneLineCallout.xml",
    },
  };
  return marker;
}

export {
  getModifyLocationCalloutFn,
  getModifyLocationTipCalloutFn,
  getModifyLocationCalloutFnAlipay,
};
