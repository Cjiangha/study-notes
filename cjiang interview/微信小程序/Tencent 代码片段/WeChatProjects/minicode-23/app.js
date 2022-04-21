import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
import _a_u_redirectTo from '@alife/anyui-wx-api/lib/redirectTo.js';
import _a_u_confirm from '@alife/anyui-wx-api/lib/confirm.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
anyui._wrapApi('redirectTo', _a_u_redirectTo)
anyui._wrapApi('confirm', _a_u_confirm)
import _pageMap from "./_anyui/pageMap.js";
wx._pageMap = _pageMap;
wx._routePathEncode = true;
import { createApp } from "@alife/anyui-wx-framework/index.js";
import Login from "./common/login/Login.js";
import { useTypeCache } from "./common/cache/Cache.js";
import { scanTaxiCache } from "./common/cache/Cache.js";
import { unifySchemeSourceCache } from "./common/cache/Cache.js";
import { applicationOnshowCache } from "./common/cache/Cache.js";
import { initImSupportConfig } from "./common/im/initImSupportConfig";
import { _getCurrentPages } from "@alife/anyui-wx-framework/index.js";
import { usePageEvent } from "@alife/anyui-wx-framework/index.js";
import Environment from "./common/environment";
import { pageEntryMonitor } from "./common/monitor/pageMonitor";
import { pageExitMonitor } from "./common/monitor/pageMonitor";


const navigateTo = anyui.navigateTo;

anyui.navigateTo = (...args) => {
  const { length } = _getCurrentPages() || {};
  let maxRouteDepth = 10;
  maxRouteDepth = 5;

  if (length >= maxRouteDepth) {
    anyui.redirectTo(...args);
  } else {
    navigateTo(...args);
  }
}; // 每个页面的created都会执行的逻辑

usePageEvent("created", function () {
  // 函数内获取到的this是每个页面的实例
  pageEntryMonitor && pageEntryMonitor.apply(this);
}); // 每个页面的beforeDestroy都会执行的逻辑

usePageEvent("beforeDestroy", function () {
  // 函数内获取到的this是每个页面的实例
  pageExitMonitor && pageExitMonitor.apply(this);
});
createApp(
  createOptions({

    onLoad() {
    
    },

    onLaunch(options) {
      
      applicationOnshowCache.set(true);
      if (options && options.query) {
        if (options.query.useType === "scanTaxi") {
          scanTaxiCache.set({
            ...options.query,
            sub_mini_program_type:
              options.query.sub_mini_program_type || "yangzhao",
          });
          useTypeCache.set("scanTaxi");
        } else if (options.query.gd_from) {
          unifySchemeSourceCache.set(options.query.gd_from);
        }
      }

      Login.checkLoginStatus().then((res) => {
      }); // 初始化 im 配置参数

      const initImPromise = initImSupportConfig(); // 处理地址权限。调用后，如果为授权且当前页面有 LocationAuthDialog 组件

      /* 性能打点 在接口请求后 */

      Promise.all([
        initImPromise,
      ]).then(() => {
       
      });
    },

    onShow(options) {
      try {
        applicationOnshowCache.set(true);
        
      } catch (error) {
        // eslint-disable-next-line no-empty
      }



      wx.onMemoryWarning((level) => {
        const subTag = level || "memoryWarning";
      });
    },

    onHide() {
      applicationOnshowCache.set(false);
    },

    /**
     * 同步代码错误上报
     */
    onError(msg) {

      this.showErrorToastInTest("onError", msg);
    },

    showErrorToastInTest(title = "ERROR", content = "") {
      const env = Environment.getEnvironment() || "test"; // 非正式环境下（含预发）,需要将错误暴露出来

      if (env !== "public") {
      
      }
    },

    /**
     * 异步代码错误上报
     */
    onUnhandledRejection() {
      try {
        const { type = "onUnhandledRejection", reason } = arguments[0] || {};
        const { message, stack } = reason || {};

        this.showErrorToastInTest(
          "onUnhandledRejection",
          `type-${type}-message-${message}-error-${JSON.stringify(
            arguments[0]
          )}`
        );
      } catch (error) {
        const errStr = error.toString ? error.toString() : "没有toString方法";

        this.showErrorToastInTest(
          "onUnhandledRejection",
          "异步代码错误无法解析"
        );
      }
    },

    onPageNotFound(res) {

      anyui.redirectTo({
        url: "/commonBiz/pageNotFound/page/index",
      });
    },

    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__"];
  return opts;
}
