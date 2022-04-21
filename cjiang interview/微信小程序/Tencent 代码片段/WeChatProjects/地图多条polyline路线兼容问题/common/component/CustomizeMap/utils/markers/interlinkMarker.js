const layoutXmlTriangleImg =
  "/common/component/CustomizeMap/image/layoutXmlTriangle.png";
const expressCar =
  "https://gw.alicdn.com/imgextra/i1/O1CN01OeYHz81TzWFce0wfE_!!6000000002453-2-tps-40-80.png";
const viaPointImg = "/common/component/CustomizeMap/image/via-point.png";
const blankImg = "/common/component/CustomizeMap/image/blank.png";

/** ============ 微信callout公共参数 start =========== */

const wxCommoncallout = {
  padding: 10,
  fontSize: 13,
  anchorY: -10,
  borderRadius: 50,
  color: "#050505",
};
/**
 * 微信：获取带两行自定义文字的marker
 * 支付宝：只有一个图标的marker
 * CustomizeMarker5
 * @param {*} markerId marker唯一id
 * @param {*} iconPath icon
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} markerLevel marker等级，决定谁覆盖谁的问题
 * @param {*} label 气泡第一行文字中没加粗的文字
 * @param {*} text 气泡第二行文字
 *          示例：{text1,text2,text3,text4,text5,color1,color2,color3,color4,color5,}
 */

function getInterlinkCalloutFn({
  markerId = Math.random() * 10000,
  iconPath = expressCar,
  latitude,
  longitude,
  markerLevel = 3,
  label,
  text = "",
  rotate = 0,
}) {
  // 提取subLabel对象中的值，并设置默认值，不然xml里面不显示文字
  let marker = "";
  let mainText = "";

  if (Array.isArray(text)) {
    mainText = text
      .map((item) => {
        return item.text;
      })
      .join(" ");
  } else {
    mainText = text;
  }

  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 0.5,
    markerLevel,
    width: 20,
    height: 40,
    rotate,
    customCallout: {
      anchorX: 0,
      anchorY: -4,
      display: "ALWAYS",
    },
    // 暂时存储数据后，传递给地图的时候会被删除
    customizeParams: {
      customizeType: 5,
      markerId,
      label,
      labelColor: "#3365F6",
      labelGap: /\d/.test(label),
      // 微信 cover-view 标签展示数字时，微信计算宽度跟手机渲染宽度不一致，导致遮盖
      subLabelsArr: [
        {
          color: "#000000e6",
          val: mainText,
          size: "22rpx",
          showGap: true,
          showGapWidth: "16rpx",
        },
      ],
      layoutXmlTriangleImg,
    },
  }; // 兜底不支持 customCallout

  marker.callout = {
    ...wxCommoncallout,
    display: "ALWAYS",
    content: `${mainText}`,
  };
  return marker;
}
/**
 * 支付宝：获取带两行自定义文字的marker
 * @param {*} param0
 * @returns
 */

function getInterlinkCalloutFnAlipay({
  markerId = Math.random() * 10000,
  iconPath = blankImg,
  latitude,
  longitude,
  markerLevel = 4,
  label,
  text = "",
}) {
  // 提取subLabel对象中的值，并设置默认值，不然xml里面不显示文字
  let mainText = "";

  if (Array.isArray(text)) {
    mainText = text
      .map((item) => {
        return item.text;
      })
      .join(" ");
  } else {
    mainText = text;
  }

  const marker = {
    id: markerId,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 0.5,
    markerLevel,
    iconLayout: {
      params: {
        label,
        text: mainText,
        iconPath,
        top: 45,
        triangleImg: layoutXmlTriangleImg,
      },
      src: "/alipay_map_layout/InterlinkMarker.xml",
    },
  };
  return marker;
}
/**
 * 途经点Marker
 * @param {*} param0
 * @returns
 */

function getViaPointMarkerFn({
  markerId = Math.random() * 10000,
  iconPath = viaPointImg,
  latitude,
  longitude,
  markerLevel = 3,
  width = 18,
  height = 18,
}) {
  let marker = "";
  marker = {
    id: markerId,
    iconPath,
    latitude,
    longitude,
    anchorX: 0.5,
    anchorY: 0.5,
    markerLevel,
    width,
    height,
  };
  return marker;
}

export {
  getInterlinkCalloutFn,
  getInterlinkCalloutFnAlipay,
  getViaPointMarkerFn,
};
