const app = getApp()
const wxml2canvas = require('./wxml2canvas.js')
Page({
  data: {
    img:'https://wanyu-1305468308.cos.ap-nanjing.myqcloud.com/2021/10/19/qunziwy68681634623219453hk2euhn1khviggs7.jpg',
    text:'图片画图的文字'
  },
  downloadImg() {
  return new Promise((reslove, reject) => {
    wx.downloadFile({
      url: this.data.img,
      success: (res) => {
        let image = res.tempFilePath
        this.setData({
          img: res.tempFilePath
        })
        reslove(image)
      },
    })
  })
},  
drawCanvas() {
  var that = this
  try {
    const wrapperId = '#wrapper'
    const drawClassName = '.draw'
    const canvasId = 'canvas-map'
    wxml2canvas(wrapperId, drawClassName, canvasId).then(() => {
      wx.showToast({
        title: '图片生成中',
        icon: 'none',
        mask: true,
        duration: 1000,
      })
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'canvas-map',
          success: function (res) {
            console.log(res.tempFilePath, 'res.tempFilePath')
            that.setData({
              shareImg: res.tempFilePath,
            })
            console.log(that.data.shareImg);
          },
          fail: function (err) {
            console.log(err, 'err')
            wx.showToast({
              title: '图片生成出错了哦',
              icon: 'none',
              mask: true,
              duration: 2000,
            })
          }
        })
      }, 1000);
    })
  } catch (e) {
    console.log(e, '出问题了吗')
  } finally {
    wx.hideLoading()
  }
},
async getProductTopicDetail() {
  await this.downloadImg()
},
  onLoad() {
    this.getProductTopicDetail()
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  
})
