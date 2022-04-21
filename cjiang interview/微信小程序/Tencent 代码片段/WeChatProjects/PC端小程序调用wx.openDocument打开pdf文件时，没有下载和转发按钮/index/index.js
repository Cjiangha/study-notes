const app = getApp()

Page({
  data: {

  },
  onLoad() {
    
  },
  openDocument(){
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'https://fr-signature-1254728086.cos.ap-shanghai.myqcloud.com/original_pdf/wfy/g3pa0cg0n0.pdf?q-sign-algorithm=sha1&q-ak=AKIDEGqHWdieP2VknT1MTM0Unvtd7MPCl34p&q-sign-time=1635403532;1635662732&q-key-time=1635403532;1635662732&q-header-list=host&q-url-param-list=&q-signature=8b2653df7228ad0c49006e497a72c83b2c304453',
      success: function (res) {
        const filePath = res.tempFilePath
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        wx.openDocument({
          filePath: filePath,
          showMenu: true,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  }
})
