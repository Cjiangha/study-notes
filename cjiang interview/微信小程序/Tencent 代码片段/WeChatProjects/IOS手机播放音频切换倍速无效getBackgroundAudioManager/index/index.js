const app = getApp()
let innerAudioContext = wx.getBackgroundAudioManager()

Page({
  data: {
        // 倍速
        ratePlay: ['X 1', 'X1.25', 'X 1.5', 'X 2', 'X0.8'],
        ratePlayStr: 'X 1',
        // 倍速数值
        ratePlayNum: [1, 1.25, 1.5, 2, 0.8],
        // 倍速的下标值
        rateNum: 0,
        playTimeNum: 0,
  },
  ddd(){
    wx.request({
      url: 'https://movie.douban.com/j/search_tags?=movie&source=index',
      method:'GET',
      header:{
        "Content-Type":"json"
      },
      complete(e){
        console.log(e)
        wx.requestSubscribeMessage({
          tmplIds: ['0GMQddjNagTlfwP8r-nPPxJt2w-BUzjRX2ec5Yu1BdE'],
          success (res) {
            console.log(res)
           }
        })
      }
    })
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    setTimeout(() => {
      wx.requestSubscribeMessage({
        tmplIds: ['0GMQddjNagTlfwP8r-nPPxJt2w-BUzjRX2ec5Yu1BdE'],
        success (res) {
          console.log(res)
         }
      })
    }, 10000);
  },

  async clickBeginListen() {
    innerAudioContext.src = 'https://6d69-ming-tt86j-1301733922.tcb.qcloud.la/news_audio/H202110061905053_1633519468.mp3'
    innerAudioContext.title = 't'
    innerAudioContext.playbackRate = 1
    innerAudioContext.play()
  },
  clickRateAudio() {
    // 倍速
    //  ratePlay: ['X 1', 'X 1.25', 'X 1.5', 'X 2'],
    // 倍速的下标值
    //  rateNum: 0,
    let { ratePlay, rateNum, ratePlayNum, playTimeNum } = this.data
    rateNum += 1
    if (rateNum == 5) {
      rateNum = 0
    }
    this.setData({
      rateNum,
      ratePlayStr: ratePlay[rateNum],
    })
    console.log(ratePlayNum[rateNum]);
    innerAudioContext.playbackRate = ratePlayNum[rateNum]
    setTimeout(() => {
      innerAudioContext.seek(playTimeNum)
    }, 300)
  },
})
