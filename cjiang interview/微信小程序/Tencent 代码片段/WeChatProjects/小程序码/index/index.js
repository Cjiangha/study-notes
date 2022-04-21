const app = getApp()

Page({
  data: {

  },
  load(res){
    console.log('res',res)
  },
  onLoad() {
    wx.getLocalIPAddress({
      success (res) {
        console.log('getLocalIPAddress',res)
      }
    })

    wx.getSystemInfo({
      success (res) {
        console.log(res)
        // res.screenHeight = 100
        console.log(res)
      }
    })

     // 取消监听
    // wx.offNetworkWeakChange()

  },
})
