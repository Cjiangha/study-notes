import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_request from '@alife/anyui-wx-api/lib/request.js';
anyui._wrapApi('request', _a_u_request)
import Environment from "../environment.js";
import { DATA_LOG_PAGE_ID } from "./dataLogConfig";
const reportUrl =
  Environment.getEnvironment() === "public"
    ? "https://awaken.amap.com/ws/h5_log"
    : "https://oss.testing.amap.com/ws/h5_log";
let source;
source = "wxmini";
const dataLog = {
  report: function (page, click, params = {}) {
    return anyui.request({
      url: reportUrl,
      data: {
        page,
        // 页面id
        source,
        // 微信还是支付宝
        click,
        // 操作
        ...params,
      },
      header: {
        "content-type": "application/json", // 默认值
      },

      success(res) {
        // do some
      },
    });
  },
};
export { DATA_LOG_PAGE_ID };
export default dataLog;
