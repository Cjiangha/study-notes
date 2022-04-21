const app = getApp()

Page({
  data: {
    checked1: true
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    wx.navigateTo({
      url: '../index2/index2',
    })
  },
  toggle1(){
      this.setData({
        checked1: !this.data.checked1
      })
  },
  change1(){
      console.log('switch 1 change')
  }
})
