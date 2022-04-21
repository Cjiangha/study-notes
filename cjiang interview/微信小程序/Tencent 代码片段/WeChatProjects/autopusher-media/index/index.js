Page({
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher')
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  /**
   * 音量变化
   */
  audioVolumeNotify(e) {
    console.warn('volumeNow',e,e.detail.volume)
    // this.setData({
    //   'config.volume': e.detail.volume
    // })
  },
  bindStart() {
    this.ctx.start({
      success: res => {
        console.log('start success')
      },
      fail: res => {
        console.log('start fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindPreview(){
    this.ctx.startPreview({
      success: (e) => {
        wx.showModal({
          cancelColor: 'cancelColor',
          title:`成功_预览摄像头`
        })
      },
      fail: (e) => {
        wx.showModal({
          cancelColor: 'cancelColor',
          title:`失败_预览摄像头`
        })
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindSwitchCamera() {
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  }
})