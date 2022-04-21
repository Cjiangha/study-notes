import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_setStorageSync from '@alife/anyui-wx-api/lib/setStorageSync.js';
import _a_u_getStorageSync from '@alife/anyui-wx-api/lib/getStorageSync.js';
import _a_u_removeStorageSync from '@alife/anyui-wx-api/lib/removeStorageSync.js';
import _a_u_clearStorageSync from '@alife/anyui-wx-api/lib/clearStorageSync.js';
anyui._wrapApi('setStorageSync', _a_u_setStorageSync)
anyui._wrapApi('getStorageSync', _a_u_getStorageSync)
anyui._wrapApi('removeStorageSync', _a_u_removeStorageSync)
anyui._wrapApi('clearStorageSync', _a_u_clearStorageSync)
class LocalCache {
  static _SetLocal(key, value) {
    anyui.setStorageSync({
      key,
      data: value,
    });
  }

  static _GetLocal(key) {
    const result = anyui.getStorageSync({
      key,
    });

    if (result && result.success) {
      return result.data;
    } else {
      return null;
    }
  }

  static _RemoveLocal(key) {
    anyui.removeStorageSync({
      key,
    });
  }

  static Clear() {
    anyui.clearStorageSync();
  }

  constructor(key) {
    this.key = key;
  }

  set(value) {
    LocalCache._SetLocal(this.key, value);

    return this;
  }

  get() {
    return LocalCache._GetLocal(this.key);
  }

  is() {
    return Boolean(this.get());
  }

  remove() {
    LocalCache._RemoveLocal(this.key);

    return this;
  }
}

export default LocalCache;
