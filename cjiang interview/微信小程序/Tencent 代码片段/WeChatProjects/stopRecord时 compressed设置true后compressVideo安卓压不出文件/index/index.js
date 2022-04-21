const app = getApp()

Page({
  data: {
    ctx: ''
  },
  onLoad() {
    console.log(wx.createTCPSocket())
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  startShard() {
    this.setData({
      ctx: wx.createCameraContext()
    })
    this.data.ctx.startRecord({
      timeoutCallback: () => {
      },
      success: (res) => {
        console.log('sucess~~~~',res)
        setTimeout(() => {
          this.stopShard()
        }, 15000)
      },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration:4000
        })
        console.log("========= 调用开始录像失败 ===========")
      }
    })
  },
  stopShard() {
    this.data.ctx.stopRecord({
      compressed: true,
      success: (res) => {
        console.log(res)
        wx.compressVideo({
          bitrate: 300,
          fps: 10,
          resolution: 0.3,
          src: res.tempVideoPath,
          success: (res) => {
            console.log('--res--',res)
          },
          fail: (err) => {
            console.log(err)
          }
        })
        this.startShard()
      },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration:4000
        })
        console.log("========= 调用结束录像失败 ===========")
      }
    })
  }
})
