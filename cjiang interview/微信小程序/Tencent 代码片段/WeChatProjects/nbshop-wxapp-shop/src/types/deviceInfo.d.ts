type SystemInfo = {
  screenWidth: number; //屏幕宽度
  screenHeight: number; //屏幕高度
  statusBarHeight: number;
  windowHeight: number;
  platform: string;
  windowWidth: number;
  navBarHeight: number;
  capsulePosition: IRect;
  system: string;
  ios: boolean; //是否是IOS
  pixelRatio: number;
  SDKVersion: string;
  brand: string;
  version: string;
  model: string;
};

type IRect = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};
export interface IDeviceInfo {
  // state
  systemInfo: SystemInfo;
  isIpx: boolean;
  navBarHeight: number;
  isQW: boolean;
  isVersion: boolean;
  isProfile: boolean;
  //action
  setSystemInfo: (val: any) => void;
  commitIsIpx: (val: boolean) => void;
  setNavBarHeight: (val: number) => void;
  commitIsQW: (val: boolean) => void;
}
