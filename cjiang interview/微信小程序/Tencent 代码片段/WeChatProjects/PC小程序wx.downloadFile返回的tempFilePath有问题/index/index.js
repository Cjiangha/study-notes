const app = getApp()

Page({
  data: {

  },
  preview() {
    wx.downloadFile({
      url: 'https://i.qz.fkw.com/wxAppFileDownload.jsp?fileUrl=https://21.s80i.faiusr.com/62/101/AFAIABA_GAAgoZ2TkAYo1eGJmwEwADgA.xls',
      success: function (res) {
        console.log("res",res)
        const filePath = res.tempFilePath
        console.log("filePath",filePath)
        wx.openDocument({
          filePath: filePath,
          fileType: 'xls',
          success: function (res) {
            console.log('打开文档成功')
          },
          fail(error) {
            console.log(error)
            console.log('失败')
          }
        })
      }
    })
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})
