const app = getApp()

Page({
  data: {

  },
  onLoad() {
    // 调用此api后，底部导航的顶部黑线颜色会非常黑
    wx.setTabBarStyle({
      selectedColor: '#333333',
      // borderStyle: 'black'  // 同时设置这个值就是正常的
    })
  },
})
