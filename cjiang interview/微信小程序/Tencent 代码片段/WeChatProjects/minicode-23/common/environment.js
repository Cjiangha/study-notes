import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
import _a_u_redirectTo from '@alife/anyui-wx-api/lib/redirectTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
anyui._wrapApi('redirectTo', _a_u_redirectTo)
/*
 * @Author: your name
 * @Date: 2020-12-01 10:22:45
 * @LastEditTime: 2021-01-22 18:26:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /taxi/common/environment.js
 */
// todo: 是否重新定义？

/**
 *
 * 分包直接引用environment，app.vue中那一份给主包使用
 *
 */
const navigateTo = anyui.navigateTo;

anyui.navigateTo = (...args) => {
  const { length } = getCurrentPages() || {};
  let maxRouteDepth = 10;
  maxRouteDepth = 5;

  if (length >= maxRouteDepth) {
    anyui.redirectTo(...args);
  } else {
    navigateTo(...args);
  }
};
/**
 * buildEnvironment 在构建时会被替换成传入的环境变量
 * test 测试环境
 * pre 预发环境
 * public 正式环境
 */

let env = "" || "test";

if (env === "prod") {
  env = "public";
}

export default class Environment {
  /**配置环境
   *测试环境 对应 appid 2018071760670315
   *正式环境 对应 appid 2018070960585195
   *预发环境 对应 appid 2018070960585195
   */
  // 上线checklist
  // 1. 环境改了吗
  // 2. 出租车mock数据关了吗
  // 3. 小程序正式/开发切换了吗
  // 4. 版本号修改
  static getEnvironment() {
    // return 'mockTest'; // mock环境测试网
    // return 'local';
    // return 'mock';
    return env; // return 'pre'; //预发环境
    // return 'public';  //正式环境
  }
  /**是否是测试环境 */

  static isTestNetwork() {
    return this.getEnvironment() === "test";
  }
  /**是否输出debug日志 */

  static isDebug() {
    // return true;
    return false;
  }
}
export const ENV_ENUM = {
  test: "test",
  pre: "pre",
  public: "public",
};
