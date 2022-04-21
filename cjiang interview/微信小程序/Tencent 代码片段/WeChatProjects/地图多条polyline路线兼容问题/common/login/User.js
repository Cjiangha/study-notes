import { userInfoCache } from "./module/Cache.js";
import { authCodeCache } from "./module/Cache.js";
import { hasAuthedZhimaCache } from "./module/Cache.js";
class User {
  static isLogin() {
    const { userId, mobile, sessionId } = this.getUserInfo() || {};
    return Boolean(userId && mobile && sessionId);
  }

  static isUserAuthed() {
    return authCodeCache.is();
  }

  static hasAuthedZhima() {
    return hasAuthedZhimaCache.is();
  }

  static getAuthCode() {
    return authCodeCache.get();
  }

  static getUserInfo() {
    return userInfoCache.get() || null;
  }

  static setUserInfo(partialInfo) {
    userInfoCache.set({ ...(this.getUserInfo() || {}), ...partialInfo });
  }

  static clearUserInfo() {
    // 清除前先判断是否有值，无值就不需要清除了，防止多次调用clearUserInfo方法多次触发LOGOUT_SUCCESS事件
    if (this.getUserInfo()) {
      userInfoCache.remove();
    }
  }
}

export default User;
