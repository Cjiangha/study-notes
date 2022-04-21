import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_showLoading from '@alife/anyui-wx-api/lib/showLoading.js';
import _a_u_hideLoading from '@alife/anyui-wx-api/lib/hideLoading.js';
import _a_u_showToast from '@alife/anyui-wx-api/lib/showToast.js';
import _a_u_confirm from '@alife/anyui-wx-api/lib/confirm.js';
anyui._wrapApi('showLoading', _a_u_showLoading)
anyui._wrapApi('hideLoading', _a_u_hideLoading)
anyui._wrapApi('showToast', _a_u_showToast)
anyui._wrapApi('confirm', _a_u_confirm)
import Auth from "./module/Auth.js";
import { LOGIN_SUCCESS } from "./module/Constant.js";
import { WX_REGISTER } from "./module/Constant.js";
import { LoginEvent } from "./module/Constant.js";
import { wxAuthCheckRequest } from "./module/request/Request.js";
import { wxAuthLoginRequest } from "./module/request/Request.js";
import { ErrEnum } from "./module/request/Request.js";
import User from "./User.js";
import * as lodash from "../tool/lodashUtil";
import { wxOpenIdCache } from "../cache/Cache.js";
class Login {
  /**
   * 判断当前是否已经登录，如果登录则直接返回登录成功，如果未登录，则调用正常登录逻辑
   * @return {boolean} 表示是否登录成功
   */
  static async checkAndLogin() {
    if (User.isLogin()) {
      return true;
    }

    const res = await this.login();
    return res && User.isLogin();
  }
  /**
   * 微信小程序登录流程
   */

  static async login() {

    if (this.authCode) {
      return this._wxLogin();
    }

    await this.getRegisterStatus(true);
    return this._wxLogin();
  }
  /**
   * 微信小程序注册流程
   */

  static register(encryptedData, iv) {

    if (this.authCode && encryptedData && iv) {
      const mobileInfo = {
        encryptedData,
        iv,
      };
      return this._wxLogin({
        mobileInfo,
      });
    }
  }
  /**
   * 检查并
   */

  static async checkLoginStatus() {
    
  }
  /**
   *
   * 小程序清除登录态
   */

  static unRegisterLogin() {
    User.clearUserInfo();
    this.getRegisterStatus(true);
  }
  /**
   * 获取auth_code，并用auth_code查询账号是否已经注册过
   * @param {*} force 强制重新获取auth_code，并用auth_code查询账号是否已经注册过
   */

  static async getRegisterStatus(force) {
    if (!force && this.isRegistered !== undefined) {
      return this.isRegistered;
    }
    /* 缓存 promise, 达到执行多次，而接口只会触发一次 */

    if (!this._requestObj) {
      this._requestObj = this._authCheck();
    }

    const res = await this._requestObj;

    if (this._requestObj) {
      this._requestObj = null;
    }

    if (res && res.code === 1) {
      const { is_bind_mobile, is_register, auth_id } = lodash.get(
        res,
        "data",
        {}
      ); // 存微信端用户openid

      wxOpenIdCache.set(auth_id);
      const isRegistered = is_register === 1;
      const isBindMobile = is_bind_mobile === 1; // 已注册 && 已绑手机

      if (isRegistered && isBindMobile) {
        this.isRegistered = true;
        LoginEvent.$emit(WX_REGISTER, this.isRegistered);
      } else {
        this.isRegistered = false;
        LoginEvent.$emit(WX_REGISTER, this.isRegistered);
      }
    } else {
    }

    return this.isRegistered;
  }

  static async _authCheck() {
    this.authCode = await Auth.auth();
    return wxAuthCheckRequest({
      ts: new Date().getTime(),
      auth_code: this.authCode,
      grant_type: "authorization_code",
    });
  }
  /**
   * 支付宝账户登录、注册流程
   * @param {*} mobileInfo { encryptedData, iv, } 手机信息
   * @param {*} force 强制绑定：1 不强制绑定：0 tip:不强制绑定时，code=10084的情况下会弹窗让用户确认
   */

  static async _wxLogin({ mobileInfo, force = 1, retryCount = 0 } = {}) {
    // retryCount>0 代表重试流程。retryCount === 0 代表第一次请求，仅在第一次请求show loading
    if (retryCount === 0) {
      anyui.showLoading({
        mask: true,
        content: "帐号信息校验中",
      });
    }

    const params = {
      ts: new Date().getTime(),
      auth_code: this.authCode,
      force,
    }; // 有 mobileInfo 代表注册，否则代表登录。添加注册需要的手机信息

    if (mobileInfo) {
      params.mobile_info = encodeURIComponent(JSON.stringify(mobileInfo));
    }

    const res = await wxAuthLoginRequest(params);
    const code = lodash.get(res, "code", -1);
    const data = lodash.get(res, "data", {});

    if (res && code === 1 && data) {
      /* 微信的auth code 过期时间是5分钟 且只能用一次 临时先清空 以解决这个bug https://aone.alibaba-inc.com/v2/project/1085769/bug/34773725  */
      this.authCode = "";
      anyui.hideLoading();
      const { sessionid, uid, mobile } = data;
      User.setUserInfo({
        sessionId: sessionid || "",
        userId: uid || "",
        mobile: mobile || "",
      });
      anyui.showToast({
        content: "登录成功",
      });
      LoginEvent.$emit(LOGIN_SUCCESS); // 有 mobileInfo 代表注册，否则代表登录。通知注册成功

      if (mobileInfo) {
        // 通知注册成功
        this.isRegistered = true;
        LoginEvent.$emit(WX_REGISTER, this.isRegistered);
      }

      return res;
    } // authCode失效 重新获取code -> authcheck -> authlogin
    else if (code === 10019) {
      // 超过最大重试次数,停止重试
      if (retryCount > 3) {
        anyui.hideLoading();
        anyui.showToast({
          content: "登录失败，请重试",
        });
        return;
      }

      await this.getRegisterStatus(true);

      const _params = arguments[0] || {};

      _params.retryCount = ++retryCount;
      return this._wxLogin(_params); // 解决重复登录 未直接跳到裂变活动首页的问题
    } else if (code === 10084) {
      anyui.hideLoading();
      anyui.confirm({
        title: "提示",
        content: "新手机号被其他授权绑定（需要强制绑定）",
        confirmButtonText: "绑定",
        cancelButtonText: "取消",
        success: async (result) => {
          if (result && result.confirm) {
            await this.getRegisterStatus(true);

            const _params = arguments[0] || {}; // 强制登录

            _params.force = 1;

            this._wxLogin(_params);
          }
        },
      });
    } else {
      anyui.hideLoading();
      anyui.showToast({
        content: `登录失败：${ErrEnum.wxAuthLogin[code] || "未知错误"}，请重试`,
      });
    }
  }
} // 初始化判断微信小程序是否已经注册

Login.getRegisterStatus();
export { LOGIN_SUCCESS, WX_REGISTER, LoginEvent };
export default Login;
