/* eslint-disable no-undef */
import Taro from '@tarojs/taro';

function promiseApi(api) {
  return (opt = {}, self) => {
    return new Promise((resolve, reject) => {
      if (!api) rejects('暂无该api');
      api(
        {
          ...opt,
          success: res => resolve(res),
          fail: err => reject(err),
        },
        self
      );
    });
  };
}

// Taro

// 登录
export const wxLogin = promiseApi(Taro.login);
// 用户信息
export const wxGetUserProfile = promiseApi(Taro.getUserProfile);
// 用户信息 -即将废弃
export const wxGetUserInfo = promiseApi(Taro.getUserInfo);
// 当前是否企业微信环境
export const wxGetSystemInfo = promiseApi(Taro.getSystemInfo);
// 黏贴
export const wxSetClipboardData = promiseApi(Taro.setClipboardData);
// 调起摄像机
export const wxChooseImage = promiseApi(Taro.chooseImage);
// 文件上传
export const wxUploadFile = promiseApi(Taro.uploadFile);
// 获取地理位置
export const wxGetLocation = promiseApi(Taro.getLocation);
// 获取地理位置
export const wxChooseLocation = promiseApi(Taro.chooseLocation);
// 清楚全部缓存
export const wxClearStorage = promiseApi(Taro.clearStorage);
// 获取图片
export const wxGetImageInfo = promiseApi(Taro.getImageInfo);
// 获取视频
export const wxGetVideoInfo = promiseApi(Taro.getVideoInfo);
// 生成图片链接
export const wxCanvasToTempFilePath = promiseApi(Taro.canvasToTempFilePath);
// 获取权限
export const wxGetSetting = promiseApi(Taro.getSetting);
// 保存图片到相册
export const wxSaveImageToPhotosAlbum = promiseApi(Taro.saveImageToPhotosAlbum);
// 保存视频到相册
export const wxSaveVideoToPhotosAlbum = promiseApi(Taro.saveVideoToPhotosAlbum);
// 权限 authorize
export const wxAuthorize = promiseApi(Taro.authorize);
// 手动设置权限
export const wxOpenSetting = promiseApi(Taro.openSetting);
// 下载资源到本地
export const wxDownloadFile = promiseApi(Taro.downloadFile);
//获取通讯地址
export const wxGetAddress = promiseApi(Taro.chooseAddress);
// 支付
export const wxRequestPayment = promiseApi(Taro.requestPayment);
