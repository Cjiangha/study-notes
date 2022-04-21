const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')

    backgroundAudioManager.onPlay(() => {
      console.log('开始播放')
    })

    // 报错事件
    backgroundAudioManager.onError((res) => {
      console.error("onError:");
      console.error("errMsg:"+res.errMsg)
      console.error("errCode:"+res.errCode)
    })

    backgroundAudioManager.onCanplay(() => {
      console.log('onCanplay')
      
    })

    
  },

  play:function(){
    backgroundAudioManager.title = "录音";
    backgroundAudioManager.src = "https://www.sybc-tech.cn/api/mini/file/signExt/346"
  }
})
