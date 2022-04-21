const app = getApp()

Page({
  data: {
    fileUrlList: [
      "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220307/%E6%9E%AB%E6%B8%A1%E5%93%81%E7%89%8C%E4%BC%81%E4%B8%9A%E6%96%87%E5%8C%96-%E9%99%88%E9%B9%8F1646624814511.pdf",
      // "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220307/枫渡品牌企业文化-陈鹏1646624814511.pdf",
      "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220307/%E9%94%A6%E6%B1%9F%EF%BC%88%E4%B8%AD%E5%9B%BD%E5%8C%BA%EF%BC%89%E4%BC%81%E4%B8%9A%E6%96%87%E5%8C%96-%E9%99%88%E9%B9%8F1646625082127.pdf",
      // "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220307/锦江（中国区）企业文化-陈鹏1646625082127.pdf",
      "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220324/%E6%9E%AB%E6%B8%A1%E8%BF%90%E8%90%A5%E7%AE%A1%E7%90%86%E7%90%86%E5%BF%B52022011648111265350.pdf",
      // "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220324/枫渡运营管理理念2022011648111265350.pdf",
      "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220307/%E6%9E%AB%E6%B8%A1%E5%A4%A7%E5%AD%A62-%E6%9E%AB%E6%B8%A1%E6%94%B6%E7%9B%8A&%E8%90%A5%E9%94%80%E7%AE%A1%E7%90%86%E4%BD%93%E7%B3%BB-%E6%9D%8E%E9%87%91%E5%8B%8B1646627786544.pdf",
      // "https://univ-fontoo.jinjianghotels.com.cn/img/fengdu/20220307/枫渡大学2-枫渡收益&营销管理体系-李金勋1646627786544.pdf",
    ]
  },
  previewFile(event) {
    console.log("下载的文件url:" + event.currentTarget.dataset.url)
    wx.showLoading({
      title: '打开文件中..',
      mask: true
    })
    wx.downloadFile({
      url: event.currentTarget.dataset.url,
      success: function (res) {
        console.log('下载文档成功', res)
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功', res)
            wx.showToast({
              title: '打开文档成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res){
            console.log('打开文档失败', res)
            wx.showToast({
              title: '打开文档失败',
              icon: 'error',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log('下载文档失败', res)
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})
