Page({
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log(res)
      },
      fail(gg){
        console.log('stopRecord--'.gg)
      }
    })
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
        console.log(res)
      },
      fail(gg){
        console.log('stopRecord--'.gg)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})