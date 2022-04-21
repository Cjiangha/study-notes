const app = getApp()

Page({
  data: {

  },
  onLoad() {
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
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      promise 
    }
  },
  onShareTimeline () {
    return {
      title: `abc`,
      query: ``,
      imageUrl:'http://mmbiz.qpic.cn/mmbiz_png/noF2H9nbRENG4XQSQcUs59J1oytmtomiapDk9ibicfHLeX3iageMa1c6LrjANsfkC80YCiccgQ6uuI9gYQc5oVfEz0g/0?wx_fmt=png'
    }
  }
})
