const app = getApp()

Page({
  data: {

  },
  onLoad() {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    const selector = wx.createSelectorQuery()
      selector.select('#test-canvas').fields({ node: true, size: true }).exec((canvasRes) => {
        console.log(canvasRes)
        const canvas = canvasRes[0].node
        this.canvas = canvas
        this.canvasContext = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = 400 * dpr
        canvas.height = 500 * dpr
        this.canvasContext.scale(dpr, dpr)
        this.createImageCnt = 0
      })
  },
  canvasEventCallback (event) {
    let image
    for (let i = 0; i <= 10000; i += 1) {
      this.createImageCnt += 1
      image = this.canvas.createImage()
      image.src = 'https://bizaladdin-image.baidu.com/0/pic/5c8ecfdee4be3273403024586b96a606.jpg'
    }
    this.canvasContext.strokeStyle = '#ff00ff'
    // this.canvasContext.drawImage(image, 0, 0, 256, 256)
    console.log('???')
    this.canvasContext.clearRect(0, 0, 500, 500)
    this.canvasContext.rect(5, 5, 256, 256)
    this.canvasContext.strokeText(this.createImageCnt, 50, 50, 100)
  }
})
