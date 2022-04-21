import { globalData } from "@alife/anyui-wx-framework/index.js";
if (!globalData._MemorySpace) {
  globalData._MemorySpace = {};
  globalData._ExpireTimeSpace = {};
}

class MemoryCache {
  static Clear() {
    globalData._MemorySpace = {};
  }

  constructor(key) {
    this.key = key;
  }

  set(value, expireTime) {
    globalData._MemorySpace[this.key] = value; // 如果有过期时间，填写过期时间

    if (expireTime) {
      const now = new Date().getTime() / 1000;
      globalData._ExpireTimeSpace[this.key] = +expireTime + now;
    }

    return this;
  }

  get() {
    const expireTime = globalData._ExpireTimeSpace[this.key]; // 如果有过期时间，判断数据是否过期

    if (expireTime) {
      const now = new Date().getTime() / 1000;

      if (now > expireTime) {
        delete globalData._MemorySpace[this.key];
        delete globalData._ExpireTimeSpace[this.key];
        return undefined;
      }
    }

    return globalData._MemorySpace[this.key];
  }

  is() {
    return Boolean(this.get());
  }

  remove() {
    delete globalData._MemorySpace[this.key];
    return this;
  }
}

export default MemoryCache;
