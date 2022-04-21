import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_setStorageSync from '@alife/anyui-wx-api/lib/setStorageSync.js';
import _a_u_getStorageSync from '@alife/anyui-wx-api/lib/getStorageSync.js';
import _a_u_removeStorageSync from '@alife/anyui-wx-api/lib/removeStorageSync.js';
anyui._wrapApi('setStorageSync', _a_u_setStorageSync)
anyui._wrapApi('getStorageSync', _a_u_getStorageSync)
anyui._wrapApi('removeStorageSync', _a_u_removeStorageSync)
import { HAS_POPUP_AUTH } from "./Constant.js";
import { HAS_AUTHED } from "./Constant.js";
import { AUTH_CODE } from "./Constant.js";
import { AMAP_USER_INFO } from "./Constant.js";
import { LOGIN_CACHE_KEYS } from "./Constant.js";
class Cache {
  static _setStorage(key, value) {
    anyui.setStorageSync({
      key,
      data: value,
    });
  }

  static _getStorage(key) {
    const result = anyui.getStorageSync({
      key,
    });

    if (result && result.success) {
      return result.data;
    } else {
      return null;
    }
  }

  static _removeStorage(key) {
    anyui.removeStorageSync({
      key,
    });
  }

  static _addLoginCacheKeys(key) {
    const cacheKeys = this._getStorage(LOGIN_CACHE_KEYS) || [];

    if (cacheKeys.length === 0) {
      cacheKeys.push(LOGIN_CACHE_KEYS);
    }

    const cacheSet = new Set([...cacheKeys, key]);

    this._setStorage(LOGIN_CACHE_KEYS, [...cacheSet]);
  }

  static _deleteLoginCacheKeys(key) {
    const cacheKeys = (this._getStorage(LOGIN_CACHE_KEYS) || []).filter(
      (k) => k !== key
    );

    this._setStorage(LOGIN_CACHE_KEYS, cacheKeys);
  }

  static clear() {
    (this._getStorage(LOGIN_CACHE_KEYS) || []).forEach((key) =>
      this._removeStorage(key)
    );
  }

  constructor(key) {
    this.key = key;
  }

  set(value) {
    Cache._setStorage(this.key, value);

    Cache._addLoginCacheKeys(this.key);
  }

  get() {
    return Cache._getStorage(this.key);
  }

  remove() {
    Cache._removeStorage(this.key);

    Cache._deleteLoginCacheKeys(this.key);
  }

  is() {
    return Boolean(this.get());
  }
}

export const hasPopupZhimaAuthCache = new Cache(
  HAS_POPUP_AUTH.has_popup_zhima_auth
);
export const hasPopupLifeMsgAuthCache = new Cache(
  HAS_POPUP_AUTH.has_popup_life_msg_auth
);
export const hasAuthedZhimaCache = new Cache(HAS_AUTHED.has_authed_zhima);
export const authCodeCache = new Cache(AUTH_CODE.user_amap_auth_code);
/**
 * @example object
 *  {
 *      userId: string,
 *      mobile: string,
 *      sessionId: string,
 *      token: string,
 *      alipayUserId: string,
 *      alipayMobile: string
 *  }
 */

export const userInfoCache = new Cache(AMAP_USER_INFO);
export default Cache;
