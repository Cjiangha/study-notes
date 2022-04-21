import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_getAuthCode from '@alife/anyui-wx-api/lib/getAuthCode.js';
anyui._wrapApi('getAuthCode', _a_u_getAuthCode)
import Cache from "./Cache.js";
import { authCodeCache } from "./Cache.js";
let _Auth = null; // 条件编译 支付宝小程序的 Auth 逻辑 // 条件编译 微信小程序的 Auth 逻辑

_Auth = class WXAuth {
  static async auth() {
    const authCode = await this._authUserAmap();

    if (authCode) {
      authCodeCache.set(authCode);
    }

    return authCode;
  }

  static _authUserAmap() {
    return new Promise((resolve) => {
      anyui.getAuthCode({
        success(res) {
          if (res && res.authCode) {
            if (res.success && res.state) {
              Cache.clear();
            }

            resolve(res.authCode);
          } else {
            authCodeCache.remove();
            resolve("");
          }

        },

        fail(err) {
          authCodeCache.remove();
          resolve("");
        },
      });
    });
  }
};
export default _Auth;
