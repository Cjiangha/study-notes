const app = getApp()

Page({
  data: {

  },
  onLoad() {
    wx.getWeRunData({
      complete(e){
        console.log(e)
      }
    })
  //   wx.chooseImage({
  //   count: 1,
  //   sizeType: ['original', 'compressed'],
  //   sourceType: ['album', 'camera'],
  //   success (res) {
  //     // tempFilePath可以作为img标签的src属性显示图片
  //     const tempFilePaths = res.tempFilePaths
  //   }
  // })
    // wx.downloadFile({
    //   url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
    //   success: (res) => {
    //     wx.showShareImageMenu({
    //       path: res.tempFilePath
    //     })
    //   }
    // })
  },
})
