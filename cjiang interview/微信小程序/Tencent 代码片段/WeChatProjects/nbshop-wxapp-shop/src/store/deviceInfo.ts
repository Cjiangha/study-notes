import { IDeviceInfo } from '@/types/deviceInfo';
import { observable, action } from 'mobx';


// 获取系统信息

class DeviceInfoStore implements IDeviceInfo {
  @observable public systemInfo = {
    windowHeight: 0,
    pixelRatio: 1,
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    platform: '',
    windowWidth: 0,
    navBarHeight: 0,
    capsulePosition: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    },
    system: '',
    ios: false,
    SDKVersion: '',
    brand: '',
    version: '',
    model: '',
  };
  // 是不是iphoneX
  @observable isIpx = false;
  // 顶部高度
  @observable navBarHeight = 0;
  // 是否企微
  @observable isQW = true;

  // 基础库版本号是否大于2.9.0
  @observable isVersion = false;

  // 基础库大于2.10.4
  @observable isProfile = false;

  @action
  setSystemInfo(data = {}) {
    this.systemInfo = Object.assign({}, this.systemInfo, data);
    this.systemInfo.ios = !!(this.systemInfo.system.toLowerCase().search('ios') + 1);
    this.isVersion = compareVersion(this.systemInfo.SDKVersion, '2.10.0') > 0;
    this.isProfile = compareVersion(this.systemInfo.SDKVersion, '2.10.4') > 0;
    console.log(`当前基础库版本：${this.systemInfo.SDKVersion}`);
  }
  commitIsIpx(isIpx: boolean) {
    this.isIpx = isIpx;
  }
  setNavBarHeight(val: number) {
    this.navBarHeight = val;
  }
  commitIsQW(isQW: boolean) {
    this.isQW = isQW;
  }
}

export default new DeviceInfoStore();


// 版本号比较
function compareVersion(vs1: string, vs2: string): number {
  const v1 = vs1.split('.');
  const v2 = vs2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}