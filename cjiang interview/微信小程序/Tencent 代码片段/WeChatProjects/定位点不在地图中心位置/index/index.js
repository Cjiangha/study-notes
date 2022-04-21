const app = getApp()

Page({
  data: {
    height: '',
    latitude:'',
    longitude:''
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onShow(){
    wx.getLocation({
      type: "gcj02",
      success: (resLoc)=> {
        console.log(resLoc)
        this.setData({
          latitude:resLoc.latitude,
          longitude:resLoc.longitude
        })
      }
    })
  },
  onReady() {
    console.log('a')
    wx.getSystemInfo({
      //获取设备信息
      success: (res) => {
        console.log("小程序基础库版本为：" + res.SDKVersion)
        this.setData({
          height: res.windowHeight
        })
        console.log(this.data.height)
      }
    })
  },
})
