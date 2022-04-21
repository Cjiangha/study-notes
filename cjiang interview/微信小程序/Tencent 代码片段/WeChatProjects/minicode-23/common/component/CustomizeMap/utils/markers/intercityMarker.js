import { anyui } from '@alife/anyui-wx-framework/index.js';
const layoutXmlTriangleImg =
  "/common/component/CustomizeMap/image/layoutXmlTriangle.png";
const startPointIconPath =
  "/common/component/CustomizeMap/image/start-point.png";

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
 * 获取远程特惠运力规划页起点 marker
 */

export const getIntercityCpStartMarker = ({
  markerId = Math.random() * 10000,
  iconPath = startPointIconPath,
  latitude,
  longitude,
  markerLevel = 3,
  label,
  value = "",
  isShowGap = true,
  width = 24,
  height = 31,
}) => {
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
      customizeType: "intercity-cp",
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
};
