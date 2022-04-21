import { imSupportConfigCache } from "../cache/Cache";

export const defaultConfig = {
  passengerSupportIm: true,
  passengerImSwitch: 17,
};
imSupportConfigCache.set(defaultConfig);
export const initImSupportConfig = async () => {

};
