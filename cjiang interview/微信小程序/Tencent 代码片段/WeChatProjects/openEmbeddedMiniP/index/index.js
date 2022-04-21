// [env]
// modile: HUAWEI P10 Plus （Android 8.0.0）
// wechat version: v8.0.15

// fill test appid
const APPID_A = 'this is a'
const APPID_B = 'wx2eec5fb00157a603'
const APPID_C = 'this is c'

Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    console.log('== onLoad ==')
  },
  navToB() {
    const navigateConfig = {
      appId: APPID_B,
    }
    wx.openEmbeddedMiniProgram(navigateConfig)


    // refe: https://developers.weixin.qq.com/miniprogram/dev/api/navigate/wx.openEmbeddedMiniProgram.html
    // 增加能力判断和基础库判断
    if (wx.canIUse('openEmbeddedMiniProgram') && compareVersion(wx.getAppBaseInfo().SDKVersion, '2.21.2') >= 0) {
      wx.openEmbeddedMiniProgram(navigateConfig)
    } else {
      wx.navigateToMiniProgram(navigateConfig)
    }
  },

  navToC() {
    const navigateConfig = {
      appId: APPID_C,
      path: `/pages/index/index`,
      envVersion: 'develop',
    }

    wx.navigateToMiniProgram(navigateConfig)
  }
})
