import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateBack from '@alife/anyui-wx-api/lib/navigateBack.js';
import _a_u_redirectTo from '@alife/anyui-wx-api/lib/redirectTo.js';
anyui._wrapApi('navigateBack', _a_u_navigateBack)
anyui._wrapApi('redirectTo', _a_u_redirectTo)
/**
 * 公共工具方法
 */

/**
 * 手机号是否符合规则
 * @param {*} phone 手机号
 */

export const checkPhoneisValid = (phone) => {
  const phoneReg = /^1[3456789]\d{9}$/;
  return Boolean(phone && phoneReg.test(phone));
};
/**
 * 时间格式化
 * @param {String} time 单位: ms
 */

export function timeFormat(time) {
  if (isNaN(time)) {
    return "";
  }

  const totalSeconds = time / 1000;
  const second = totalSeconds % 60;
  const minute = Math.floor(totalSeconds / 60);
  const hour = Math.floor(minute / 60);
  let res = "";

  if (hour > 0) {
    res += `${_help(hour)}:`;
  }

  res += `${_help(minute)}:${_help(second)}`;
  return res;

  function _help(num) {
    if (num < 10) {
      return `0${num}`;
    }

    return num;
  }
}
/**
 * 日期格式化 通用方法 支持自定义格式
 * @param {Date | Number} date  日期对象 或 13位数字时间戳
 * @param {String} fmt 输出格式字符串 如 yyyy-MM-dd hh:mm:ss 分隔符可以随意替换
 * @param {boolean} needZeroFill 是否需要补零 比如 2018-08-08
 */

export function dateFormat(date, fmt, needZeroFill = true) {
  //如果是时间戳必须是13位的 否则直接返回该时间戳
  if (typeof date === "number") {
    if (date.toString().length === 13) {
      date = new Date(date);
    } else {
      return date;
    }
  }

  if (!(date instanceof Date)) {
    return date;
  } //默认输出格式

  if (!(fmt && typeof fmt === "string")) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  }

  const o = {
    "M+": date.getMonth() + 1,
    //月份
    "d+": date.getDate(),
    //日
    "h+": date.getHours(),
    //小时
    "m+": date.getMinutes(),
    //分
    "s+": date.getSeconds(),
    //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    //季度
    S: date.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  const zeroFill = needZeroFill ? "00" : "0";

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : (zeroFill + o[k]).substr(`${o[k]}`.length)
      );
    }
  }

  return fmt;
}
export function orderDateFormat(time, hasYear) {
  if (typeof time === "string") {
    time = Number(time);
  }

  const presentYear = new Date().getFullYear(); // 订单年份

  const ordersYear = new Date(time).getFullYear();

  if (presentYear == ordersYear && !hasYear) {
    // 时间格式化
    time = dateFormat(time, "MM-dd hh:mm");
  } else {
    // 时间格式化
    time = dateFormat(time, "yyyy-MM-dd hh:mm");
  }

  return time;
}
/**
 * 价格 分转元
 * @param {*} price
 */

export function priceCentToYuan(price, noRound = false) {
  if ((!price && price !== 0) || isNaN(Number(price))) {
    return price;
  }

  if (noRound) {
    return price / 100;
  }

  return Math.round(price / 100);
} // 价格 分转为元

/**
 * @description 价格 分转为元, 并保留两位小数点 输出为字符串
 * @export
 * @param {string | number} price
 * @return {string}
 */

export function centToYuanString(price) {
  if (price || price === 0) {
    return price
      .toString()
      .padStart(3, "0")
      .replace(/(\d{2})$/, ".$1");
  }

  return "";
}
/**
 * 一口价格式化获取价格，最高精确到小数点后一位
 * @param {number} priceVal 价格
 * @param {number} fixLength 最多修复的位数
 */

export function formatFixedPrice(priceVal, fixLength = 1) {
  const price = Number(priceVal);

  if (!price || price === 0) {
    return price;
  }

  const pFixed = Number(Number(price / 100).toFixed(fixLength));
  const pRound = Math.round(pFixed);

  if (fixLength === 0 || pRound === pFixed) {
    return pRound;
  }

  return pFixed;
}
/**
 * @description 将对象转换为 url 字符串 key = value 形式
 * @param {*} price
 */

export function objToUrlQuery(data) {
  const _result = []; // eslint-disable-next-line guard-for-in

  for (const key in data) {
    const value = data[key];

    if (value && value.constructor == Array) {
      value.forEach((_value) => {
        _result.push(`${key}=${_value}`);
      });
    } else {
      _result.push(`${key}=${value}`);
    }
  }

  return _result.join("&");
}
/**
 * @description 航班号校验
 * @param {*} num 航班号
 */

export function verifyFlightNumber(num) {
  // const reg = /\b[A-Z]{2}\d{3,4}\b/; // AA1234 或 AA123   // 旧的校验逻辑
  const reg = /^[A-Za-z0-9]+$/; // AA1234 或 AA123   // 放开校验

  return reg.test(num);
}
/**
 * @description 填充前置0字符串方法, ios 低版本不支持padStart方法
 * @param {*} value
 */

export function padStartZero(value, length) {
  let str = value.toString();

  for (let i = 0; i < length - str.length; i++) {
    str = `0${str}`;
  }

  return str;
}
export default {
  checkPhoneisValid,
};
/**
 * @des 计算两个经纬度之间的距离
 * @param {String} startLat
 * @param {String} startLon
 * @param {String} endLat
 * @param {String} endLon
 */

export function getDistance(startLat, startLon, endLat, endLon) {
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
 * @des 格式化时间为今天，明天
 * @param {date} time  时间戳
 */

export function formateDateToday(ptime, hasDayAfterTomorrow) {
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const fortyEightHours = 24 * 60 * 60 * 1000 * 2;
  const seventyTwoHours = 24 * 60 * 60 * 1000 * 3;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // 使用 构造函数处理时间月份不用加1

  const day = date.getDate();
  const todayTime = new Date(year, month, day).getTime();
  const tomorrowTime = new Date(todayTime + twentyFourHours).getTime();
  const acquiredTime = new Date(todayTime + fortyEightHours).getTime();
  const afterTomorrow = new Date(todayTime + seventyTwoHours).getTime();

  if (ptime >= todayTime && tomorrowTime > ptime) {
    return `今天 ${dateFormat(ptime, "hh:mm")}`;
  } else if (ptime >= tomorrowTime && ptime < acquiredTime) {
    return `明天 ${dateFormat(ptime, "hh:mm")}`;
  } else if (
    ptime >= acquiredTime &&
    ptime < afterTomorrow &&
    hasDayAfterTomorrow
  ) {
    return `后天 ${dateFormat(ptime, "hh:mm")}`;
  }

  return dateFormat(ptime, "MM月dd日 hh:mm");
}
/**
 *
 * 处理 ios 时间格式问题
 * @param ptime 2019-04-01-14:13:00
 *
 */

export function formateIosDate(ptime) {
  //
  return new Date(ptime.replace(/-/g, "/")).getTime();
}
/**
 * 获取字符串的字符长度
 * @param {*} str
 */

export function gblen(str) {
  const _str = String(str);

  let len = 0;

  for (let i = 0; i < str.length; i++) {
    if (_str.charCodeAt(i) > 127 || _str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }

  return len;
}
/**
 * 金额处理，是整数展示整数，如果是一位小数，就展示6.6,如果是两位小数就展示  6.5, 没有6.00 或者6.60的情况
 * @param {*} price 金额
 */

export const formatPrice = (price) => {
  let newPrice = "";

  if (String(price).indexOf(".") !== -1) {
    newPrice = price;
  } else if (price % 100 === 0) {
    newPrice = `${Number(price / 100)}.00`;
  } else if (price % 10 === 0) {
    newPrice = `${Number(price / 100)}0`;
  } else {
    newPrice = price / 100;
  }

  return newPrice;
};
/**
 * 解析 h5 链接关联小程序时，传入的原声链接
 */

export function parseH5RelateQuery(rawUrl) {
  return rawUrl
    .split("?")[1]
    .split("&")
    .reduce((pre, keyValue) => {
      const [key, value] = keyValue.split("=");
      pre[key] = value;
      return pre;
    }, {});
}
/** 为url添加变量.
 * @param {String} url
 * @param {String|Object} name
 *    为字符串类型时参数作为新增参数的名称，第三个参数不能缺省
 *    为对象类型时参数为要增加的参数集合，属性为参数名称，值为参数值
 * @param {String} value 变量值
 * @return {String} 新的url
 */

export function urlAddParam(url, name, value) {
  // 分割url，arr[1] 为头部，arr[2]为参数，arr[3]为hash

  /* eslint-disable */
  const arr = url.match(/([^\?#]*\??)([^#]*)?(#.*)?/);
  let prefix = arr[1];
  const param = arr[2];

  if (param) {
    prefix += `${param}&`;
  } else if (arr[1].indexOf("?") === -1) {
    prefix += "?";
  }

  let newParam = "";

  if (typeof name === "object") {
    // eslint-disable-next-line guard-for-in
    for (const key in name) {
      newParam += `&${key}=${encodeURIComponent(name[key])}`;
    }

    newParam = newParam.substr(1);
  } else {
    newParam = `${name}=${encodeURIComponent(value)}`;
  }

  return prefix + newParam + (arr[3] || "");
}
/**
 * 限制字符串长度，显示...  todo 提出
 * @str {*} 字符串
 * @max {*} 最大字符长度
 */

export function limitStringWithEllipsisFn(str, { max }) {
  str = String(str);

  if (str.length > max) {
    return `${str.substr(0, max)}...`;
  }

  return str;
}
/**
 * 获取当前页面路径
 * @returns
 */

export function getCurrentRouter() {
  const arr = getCurrentPages() || [];
  const len = arr.length;
  return len > 0 ? arr[len - 1].route : "";
}
/**
 * 返回上一个页面，没有则重定向到首页
 * @returns
 */

export function goBackPreviousPage() {
  if (getCurrentPages().length > 1) {
    anyui.navigateBack({
      delta: 1,
    });
  } else {
    anyui.redirectTo({
      url: "",
    });
  }
}
/**
 * 返回memoryCache中的apdidToken
 */

export function getAppIdToken() {
  return "";
}
