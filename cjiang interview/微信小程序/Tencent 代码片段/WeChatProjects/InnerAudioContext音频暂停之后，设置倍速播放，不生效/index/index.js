const app = getApp()
Page({
  data: {
    rate: 1
  },
  onLoad: function (options) {

    this.innerAudioContext = wx.createInnerAudioContext()

    this.innerAudioContext.src = 'http://haya-cloud.oss-cn-shanghai.aliyuncs.com/oneLight/1636362673254mpmpmpmpmp.mp3'
    this.innerAudioContext.playbackRate = 0.98
  
    this.innerAudioContext.onPlay((res) => {
      console.log('播放')

    })
    this.innerAudioContext.onPause((res) => {
      console.log('暂停')
      this.setData({
        rateCurrentTime: this.innerAudioContext.currentTime
      })
    })
  },
  onUnload() {
    this.innerAudioContext.destroy()
  },
  seed() {

    this.innerAudioContext.playbackRate = 2
    this.innerAudioContext.pause();

    let that = this
    that.innerAudioContext.onCanplay(() => {
      // 必须。可以当做是初始化时长
      that.innerAudioContext.duration;
      setTimeout(() => {
        that.innerAudioContext.seek(Number(that.data.rateCurrentTime))
        console.log('快进播放')
      }, 500)
    })


    setTimeout(() => {
      that.innerAudioContext.play();
      console.log(this.innerAudioContext.playbackRate)
    }, 800)

  },
  play() {

    if (this.innerAudioContext.paused) {
      this.innerAudioContext.play();
    } else {
      this.innerAudioContext.pause()
    }
    console.log(this.innerAudioContext.playbackRate)
  }

})