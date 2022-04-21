const app = getApp()

Page({
  data: {},
  onJump() {
    wx.navigateToMiniProgram({
      appId: 'wx91d27dbf599dff74',
      // 1.注释掉下面的success 
      // 2.点击页面按钮后, 再点击弹窗中的"取消"
      // 3.控制台报错 Unhandled promise rejection { errMsg: "navigateToMiniProgram:fail cancel" }
      // success() {}

      // 尝试更换基础库版本 2.4.4~2.21.2  均无效
      complete(e){
        console.log(e)
      }
    })

    // wx.navigateToMiniProgram({
    //   appId: 'wx91d27dbf599dff74',
    // }).then(res => console.log('res: ', res))

  },
  onLoad() {

  },
})
