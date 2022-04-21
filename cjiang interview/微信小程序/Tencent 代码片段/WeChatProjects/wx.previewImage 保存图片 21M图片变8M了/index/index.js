const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  previewIname: function(){
    console.info("点击查看大图");

    wx.previewImage({
      current:"https://designos.oss-cn-shenzhen.aliyuncs.com/order/20220218/59b9f3c9e19c4af8be75b10e73bc0884.jpg",
      urls: ["https://designos.oss-cn-shenzhen.aliyuncs.com/order/20220218/6f07a3297c644cfc8ec178441c1cec0f.jpg", "https://designos.oss-cn-shenzhen.aliyuncs.com/order/20220218/59b9f3c9e19c4af8be75b10e73bc0884.jpg"],
    })
  }
})
