const app = getApp()

Page({
  data: {
    systemInfo:wx.getSystemInfoSync(),
    isPlay:false
  },
  onLoad() {
    
  },
  onVideoPlay:function(){
    this.setData({isPlay:true})
    this.videoContext = wx.createVideoContext('video')
    this.videoContext.requestFullScreen();
    this.videoContext.play();
  },
  onVideoEnded:function(){
    this.setData({isPlay:false})
    this.videoContext.stop();
    this.videoContext.exitFullScreen();
  }
})
