const app = getApp()

Page({
  data: {

  },
  onLoad() {
    
  },
  gotoMap: () => {
    wx.navigateTo({
      url: '../map/map',
      events: {
      },
      success: () => {
        console.log('=====>跳转成功');
      }
    })
  }
})
