const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  tapPostscript(e) {
    let that = this;
    that.setData({
      anothermodalName: 'PostModal',
      plantextshow: true,
      post_title: '添加批注',
    })
  },
  hideanotherModal(e) {
    this.setData({
      anothermodalName: null,
    })
  },
  tapReply(e) {
    console.log(this.data.InputBottom);
    this.setData({
      InputBottom: 0,
    })
    let that = this;
    that.setData({
      is_reply: true,
      replyplacehoder: '回复@',
      post_title: '回复',
      anothermodalName: 'ReplyModal',
    })

  },
})
