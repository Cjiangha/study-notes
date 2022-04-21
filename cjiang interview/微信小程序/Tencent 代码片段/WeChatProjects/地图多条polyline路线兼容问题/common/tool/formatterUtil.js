export default {
  /**
   * 距离格式化 将数字米 转换成待单位的 xx米或  xx公里保留一位小数
   * @param {Number} meter  单位米
   */
  formatDistance(meter) {
    let distance = "";

    if (meter < 1000) {
      distance = `${meter}米`;
    } else {
      distance = `${Math.round((meter / 1000) * 10) / 10}公里`;
    }

    return distance;
  },

  /**
   * 转换 米 -> 千米
   * 例如：getTransformedKmVal(1233) -> ['1', '公里']
   * getTransformedKmVal(233) -> ['233', '米']
   *
   * @param {Number} meter  单位米
   * @param {Number} toFixexNum  保留几位小数
   */
  getTransformedKmVal(meter, toFixexNum = 0) {
    let distance = meter;
    let unit = "米";

    if (meter < 1000) {
      distance = meter;
      unit = "米";
    } else {
      distance = parseFloat(meter / 1000).toFixed(toFixexNum);

      if (distance - parseInt((distance * 10) / 10, 10) === 0) {
        distance = parseInt((distance * 10) / 10, 10);
      }

      unit = "公里";
    }

    return {
      display: distance + unit,
      distance,
      unit,
    };
  },

  /**
   * 转换 米 -> 千米
   * 例如：getTransformedKmNum(1233) -> ['1', '公里']
   * getTransformedKmNum(233, 3) -> ['0.233', '公里']
   *
   * @param {Number} meter  单位米
   * @param {Number} toFixexNum  保留几位小数
   */
  getTransformedKmNum(meter, toFixexNum = 0) {
    let distance = meter;

    if (distance > 0) {
      if (meter < 1000) {
        distance = (meter / 1000).toFixed(toFixexNum);
      } else {
        distance = parseFloat(meter / 1000).toFixed(toFixexNum);

        if (distance - parseInt((distance * 10) / 10, 10) === 0) {
          distance = parseInt((distance * 10) / 10, 10);
        }
      }
    }

    return {
      display: distance + "公里",
      distance,
    };
  },

  /**
   * formatMoment 将 秒 转化成 时分秒
   * @param {*} timestamp
   */
  formatMoment(second) {
    let time = "00";
    let minutes = Math.round(second / 1000 / 60);
    !minutes && (minutes = 1);

    if (minutes >= 60) {
      // 大于1小时
      let hours = Math.floor(minutes / 60);
      minutes %= 60; // 求余算分钟

      time = minutes > 0 ? `${hours}小时${minutes}分` : `${hours}小时`;
    } else {
      time = `${minutes}分钟`;
    }

    return time;
  },

  /**
   * 给 str 左侧补 0 至 fillLength 位
   * @param {String} str 目标字符串
   * @param {number} fillLength 需要 fill 到的位数
   * @returns
   */
  _fillZero(str, fillLength = 0) {
    return str.toString().padStart(fillLength).replace(/\s/g, "0");
  },

  /**
   * @description 根据时间戳获取日期对象
   * @param {*} timestamp
   * @return {
   *  year: 年
   *  month: 月
   *  day: 日
   *  hours: 时
   *  minutes: 分
   *  seconds: 秒
   *  week: 周
   *  time: 时间戳
   * }
   */
  getDateObject(timestamp) {
    let data;

    if (!timestamp) {
      data = new Date();
    } else {
      data = new Date(timestamp);
    }

    return {
      year: data.getFullYear(),
      month: data.getMonth() + 1,
      day: data.getDate(),
      hours: data.getHours(),
      minutes: data.getMinutes(),
      seconds: data.getSeconds(),
      week: data.getDay(),
      milliseconds: data.getMilliseconds(),
      time: data.getTime(),
    };
  },

  /**
   * @description 根据时间戳 按照固定格式返回格式化后的日期
   * @export
   * @param {*} timestamp
   * @param {string} formatString - 默认值 Y/M/D h:m:s.S
   * @param {boolean} isNeedFillZero - 默认值 false
   * @return {string}
   */
  timeFormat(
    timestamp,
    formatString = "Y/M/D h:m:s.S",
    isNeedFillZero = false
  ) {
    const dateObj = this.getDateObject(timestamp);
    const { year, month, day, hours, minutes, seconds, milliseconds } = dateObj;
    const fillLength = isNeedFillZero ? 2 : 0;
    const result = formatString
      .replace(/Y/, () => year)
      .replace(/M/, () => this._fillZero(month, fillLength))
      .replace(/D/, () => this._fillZero(day, fillLength))
      .replace(/h/, () => this._fillZero(hours, fillLength))
      .replace(/m/, () => this._fillZero(minutes, fillLength))
      .replace(/s/, () => this._fillZero(seconds, fillLength))
      .replace(/S/, () => this._fillZero(milliseconds, 0));
    return result;
  },

  /**
   * 预约时间格式化 今天/明天/后天/**月**日 **:**
   * @param {*} timestamp
   * @return {string}
   */
  reserveTimeFormat(timestamp) {
    if (!timestamp) {
      return "";
    }

    let time = timestamp;

    if (`${timestamp}`.length === 10) {
      // 如果是10位到秒级需转换成毫秒
      time = time * 1000;
    }

    const nearDateArr = ["今天", "明天", "后天"];
    const targetDateObj = this.getDateObject(time);
    const curDateObj = this.getDateObject(new Date().getTime()); // const targetDate = new Date(`${targetDateObj.year}-${targetDateObj.month}-${targetDateObj.day}`);

    const targetDate = new Date(
      +targetDateObj.year,
      +targetDateObj.month - 1,
      +targetDateObj.day
    ); // const curDate = new Date(`${curDateObj.year}-${curDateObj.month}-${curDateObj.day}`);

    const curDate = new Date(
      +curDateObj.year,
      +curDateObj.month - 1,
      +curDateObj.day
    );
    const sub = parseInt(targetDate - curDate) / 1000 / 60 / 60 / 24;
    const dateText =
      nearDateArr[sub] ||
      `${this._fillZero(targetDateObj.month, 2)}月${this._fillZero(
        targetDateObj.day,
        2
      )}日`;
    return `${dateText} ${this._fillZero(
      targetDateObj.hours,
      2
    )}:${this._fillZero(targetDateObj.minutes, 2)}`;
  },
};
