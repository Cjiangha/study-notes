Page({
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher')
    this.recorderManager = wx.getRecorderManager()
    this.recorderManager.onStart(() => {
      console.log('监听录音开始')
    })
    this.recorderManager.onError((errMsg) => {
      console.log('监听录音报错', errMsg)
    })
    this.recorderManager.onStop((res) => {
      console.log('监听录音结束') 
    })
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
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
  begin(){
    this.recorderManager.start({
      duration: 5000,
      sampleRate: 16000, // 采样率
      numberOfChannels: 1,
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