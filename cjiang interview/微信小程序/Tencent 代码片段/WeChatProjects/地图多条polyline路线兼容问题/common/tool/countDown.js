/**
 * 倒计时
 * @constructor
 * @param {Number} totalTime - 倒计时总时间
 * @param {Function} progressCb - 倒计时过程中的回调
 * @param {Function} completeCb - 倒计时结束后的回调
 * @param {Number} step - 倒计时间隔 默认1000 单位ms
 *  @param {Number} endTime - 倒计时最后的结束时间（有可能倒计时不是倒计在1S）
 */
export default class CountDown {
  constructor(totalTime, progressCb, completeCb, step = 1000, endTime = 0) {
    this.totalTime = totalTime;
    this.progressCb = progressCb;
    this.completeCb = completeCb;
    this.step = step;
    this.endTime = endTime;

    this._doCountDown(
      this.totalTime,
      this.progressCb,
      this.completeCb,
      this.step,
      this.endTime
    );
  }

  _doCountDown(totalTime, progressCb, completeCb, step, endTime) {
    if (totalTime > endTime) {
      progressCb && progressCb(totalTime);
      const newTime = totalTime - step;
      this.timeout = setTimeout(() => {
        this._doCountDown(newTime, progressCb, completeCb, step, endTime);
      }, step);
    } else {
      completeCb && completeCb();
    }
  }

  clear() {
    clearTimeout(this.timeout);
  }
}
