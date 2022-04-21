// fhvideo/fhvideo-libs/pages/index/index.js
import config from './../../configs/config'
import fhvideo from './../../fhvideoV1.0.0'
import constant from './../../configs/constants'
import pageListener from './../../utils/pageListener'
var callTimer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    msg: '正在发起呼叫，请稍等...',
    localLang: '', //国际化设置
    hungClickable: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重置呼叫失败

    config.videoConfig.normalHungup = false;

    fhvideo.initFhParams();
    this.setData({
      localLang: config.fh_localLang.list //国际化
    })

    //40后按钮可点击
    callTimer = setTimeout(() => {
      this.setData({
        hungClickable: true
      })
    }, 40000)

  },
  onReady: function () {
    fhvideo.fhCallVideo();
    this.addPageListener();
  },

  addPageListener: function () {
    pageListener.on(constant.updateWaitMsg, (msgObj) => {
      var hintMsg = msgObj.hintmsg
      if (hintMsg) {
        config.checkTimeOut('logout')
        this.setData({
          msg: hintMsg
        })
      }

    })

    //呼叫成功
    pageListener.on(constant.callSuccess, (msgObj) => {
      callTimer && clearTimeout(callTimer);
      this.setData({
        hungClickable: true
      })
    })

  },

  //排队中挂断
  hangup: function () {
    if (this.data.hungClickable) {
      //正常挂断
      config.videoConfig.normalHungup = true;
      config.callRoute(constant.waitHungup, '会话未接通，客户端挂断')
    }

  },
  //物理按键或是优化返回
  onUnload() {
    //非正常挂断
    if (!config.videoConfig.normalHungup) {
      config.callRoute(constant.waitHungup, '会话未接通，客户端挂断')
    }
    // 注销倒计时
    config.checkTimeOut('logout')
  }
})