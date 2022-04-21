const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  yuYue() {
    wx.navigateToMiniProgram({
      shortLink: '#小程序://腾讯文档/腾讯文档/Z5VLxwQCmfbsRmb',
      appId:'wxd45c635d754dbf59',
      path:'pages/detail/detail.html?url=https%3A%2F%2Fdocs.qq.com%2Fform%2Fpage%2FDVHJxbHN2dFBMd0Zr.',
      extraData:{
        url:'https%3A%2F%2Fdocs.qq.com%2Fform%2Fpage%2FDVHJxbHN2dFBMd0Zr.'
      }
    })
  },
})
