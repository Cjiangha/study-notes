import * as lodash from "../tool/lodashUtil";
/**
 * 超时时间
 */

const TIMEOUT = 5000;
let entryTime = 0;
let pageEntryFlag = 0;
/**
 * 页面进入
 */

export function pageEntryMonitor() {
  // 页面打开上报pv
  entryTime = new Date().getTime();
  pageEntryFlag = entryTime;

  if (wx && wx.getPerformance) {
    // eslint-disable-next-line no-undef
    const performance = wx.getPerformance();
    const observer = performance.createObserver((entryList) => {
      const duration = lodash.get(entryList.getEntries(), "[0].duration"); // 会多次触发，只处理第一次

      if (this.performanceTriggered) {
        return;
      }

      this.performanceTriggered = true;
      this.whiteScreenMonitorIsblank = duration > TIMEOUT;
    });
    observer.observe({
      entryTypes: ["render"],
    });
  }
}
/**
 * 页面销毁
 */

export function pageExitMonitor() {
  //第二个参数仅在离开页面存在
  const exitTime = new Date().getTime();
  
}
/**
 * 判断是否有内容展示
 */

function hasShowContent() {
  return new Promise((resolve) => {
    try {
      this.createSelectorQuery()
        .selectAll(".anyui_view")
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret[0]) {
            resolve(ret[0].length > 2); // 认为view节点多于2个为正常不白屏
          } // 默认认为有内容展示
          else {
            resolve(true);
          }
        });
    } catch (error) {
      resolve(true);
    }
  });
}
