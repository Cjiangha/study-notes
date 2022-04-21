import { applicationOnshowCache } from "../cache/Cache.js";
/**
 * 定时器
 * @constructor
 * @param {any} obj - 可传入对象或回调方法
 * @param {number} time - 传入定时器时间，默认为0
 * @param {number} maxPollingTimes - 传入定时器执行最大次数
 * @param {number} maxPollingEndCallback - 定时器执行结束，即达到最大次数后 执行
 * @param {boolean} enableShowAndHideStrategy - 开启后，应用切后台之后停止 timer 的 callback 执行，默认开启
 */

export default class Timer {
  constructor(obj) {
    const param = {
      cb: arguments.length > 1 ? arguments[0] : obj.cb,
      time: arguments.length > 1 ? arguments[1] : obj.time,
      maxPollingTimes:
        arguments.length > 1 ? arguments[2] : obj.maxPollingTimes,
      maxPollingEndCallback:
        arguments.length > 1 ? arguments[3] : obj.maxPollingEndCallback,
      enableShowAndHideStrategy:
        arguments.length > 1 ? arguments[4] : obj.enableShowAndHideStrategy,
    };

    if (!param.cb) {
      throw new Error("callback can not be null");
    }

    this._enableShowAndHideStrategy =
      param.enableShowAndHideStrategy === undefined
        ? true
        : param.enableShowAndHideStrategy;

    this._cb = () => {
      if (this._enableShowAndHideStrategy && !applicationOnshowCache.get()) {
        return;
      }

      return param.cb();
    };

    this._time = param.time || 0;
    this._maxPollingTimes = param.maxPollingTimes || 0;
    this._maxPollingEndCallback = param.maxPollingEndCallback;
    this._pollingTimes = 0;
    this._current = null;
    this.isPolling = false;
  }

  _reset() {
    this.isPolling = false;
    this._pollingTimes = 0;
  }

  _polling() {
    if (this.isPolling) {
      this._pollingTimes++;

      if (
        this._pollingTimes > this._maxPollingTimes &&
        this._maxPollingTimes !== 0
      ) {
        this._maxPollingEndCallback && this._maxPollingEndCallback();
        this.stop();
      } else {
        this._current = setTimeout(async () => {
          await this._cb();

          this._polling();
        }, this._time);
      }
    }
  }

  async start() {
    this.isPolling = true;

    if (this._pollingTimes === 0) {
      this._pollingTimes++;
      await this._cb();
    }

    this._polling();
  }

  stop() {
    this._reset();

    clearTimeout(this._current);
    this._current = null;
  }
}
