const app = getApp()

Page({
  data: {
    // 定时器
    interval: null,
  },
  onLoad() {
    const that = this
    this.data.interval = setInterval(function () {
      that.test()
    }, 1000 * 5)
  },
  test() {
    console.log('任务')
    const manager = wx.getBackgroundAudioManager()
    manager.title = '响铃'
    manager.singer = '暂无'
    manager.coverImgUrl = ' '
    // 设置了 src 之后会自动播放
    manager.src = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202103/14039.mp3'
    manager.onPlay(() => {
      console.log('播放开始')
    })
    manager.onEnded(() => {
      console.log('播放结束')
      manager.src = ''
    })
    manager.onError((e) => {
      console.log(e)
      console.log('播放错误')
      manager.src = ''
    })
  },
  onUnload() {
    if (this.data.interval) {
      clearInterval(this.data.interval)
    }
  },
})
