const app = getApp()

Page({
  data: {
    ctx: {}
  },

  onLoad() {
    this.setData({ ctx: wx.createCameraContext() })
  },

  // 测试函数
  test() {
    // const { ctx } = this.data;
    // // console.log(ctx)
    // // console.log('ctx', ctx);
    // // console.log('takePhoto', ctx.takePhoto);
    // ctx.takePhoto({
    //   quality: 'normal',
    //   success: (res) => {
    //     console.log('success', res)
    //   },
    //   fail: (res) => {
    //     console.log('fail', res)
    //   },
    //   complete: (res) => {
    //     console.log('complete', res)
    //   }
    // })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath
        })
      }
    })



  }
})
