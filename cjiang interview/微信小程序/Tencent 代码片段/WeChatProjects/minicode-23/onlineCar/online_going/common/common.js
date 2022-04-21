/**
 * 状态码映射
 */
export const statusCodeMap = {
  101: "正在呼叫中",
  102: "暂无应答",
  103: "司机接单",
  104: "司机到达",
  105: "行程中",
  107: "司机取消",
  108: "改派新订单",
  109: "取消订单",
  110: "客服关单",
};
/**
 * 预约单状态码映射
 */

export const reserveStatusCodeMap = {
  103: "等待接驾",
};
/**
 * 距离格式化
 * @param {*} distance
 */

export function distanceFormat(distance) {
  if (isNaN(distance)) {
    return "";
  }

  if (distance < 1000) {
    return `${distance}米`;
  }

  return `${Math.round((distance / 1000) * 10) / 10}公里`;
}
/**
 * 毫秒转分钟，不足一分钟按一分钟算
 * @param {*} millisecond
 */

export function timeFormat(millisecond) {
  if (isNaN(millisecond)) {
    return "";
  }

  let minutes = Math.round(millisecond / 1000 / 60);
  !minutes && (minutes = 1);

  if (minutes >= 60) {
    // 大于1小时
    const hours = Math.floor(minutes / 60);
    minutes %= 60; // 求余算分钟

    return minutes > 0 ? `${hours}小时${minutes}分` : `${hours}小时`;
  }

  return `${minutes}分钟`;
}
/**
 * 按钮类型枚举
 */

export const buttonTypeMap = {
  /**
   * H5 schema
   */
  SCHEMA: 1,

  /**
   * 增加车型
   */
  ADD_SP: 2,

  /**
   * 添加红包
   */
  REDPACKET: 3,
}; // todo: 待优化

/**
 * 时间格式化
 * @param {*} startTime
 * @param {*} endTime
 */

export function formatDay(startTime, endTime) {
  const obj = {};
  const date = new Date(startTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const d1 = new Date(`${year}/${month}/${day}`);
  const endTimes = new Date(endTime);
  const y = endTimes.getFullYear();
  const m = endTimes.getMonth() + 1;
  const d = endTimes.getDate();
  const d2 = new Date(`${y}/${m}/${d}`);
  const iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;

  if (iday >= 0 && iday < 1) {
    obj.day = "今天";
  } else if (iday >= 1 && iday < 2) {
    obj.day = "明天";
  } else if (iday >= 2 || iday < 0) {
    obj.day = `${endTimes.getMonth() + 1}月${endTimes.getDate()}日`;
  } else {
    obj.day = false;
  }

  obj.clock = `${
    endTimes.getHours() < 10 ? `0${endTimes.getHours()}` : endTimes.getHours()
  }:${
    endTimes.getMinutes() < 10
      ? `0${endTimes.getMinutes()}`
      : endTimes.getMinutes()
  }`;
  return obj;
}
/**
 * markerId 要求为数字
 */

export const MARKER_ID = {
  startPoint: 10000,
  endPoint: 10001,
  runningCar: 10002,
};
export const patchZero = (number) => {
  return number < 10 ? `0${number}` : String(number);
};
export const timeParse = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
};
export const statusMap = {
  103: 1,
  104: 2,
  105: 3,
};
