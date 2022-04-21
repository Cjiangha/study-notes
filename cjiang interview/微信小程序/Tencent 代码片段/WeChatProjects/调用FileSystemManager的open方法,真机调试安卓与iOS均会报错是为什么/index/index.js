const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  makeFile(){

    console.log('触发了',wx.env.USER_DATA_PATH )
    const fs = wx.getFileSystemManager();
    fs.open({
      filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
      flag:'a+',
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.error(res)
      }
    })
  }
})
