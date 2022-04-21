const app = getApp()

Page({
  data: {
    a:'a.wxml'
  },
  onReady(){
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.font = "50px 宋体"
				ctx.fillText('123456789文字文字文字', 0, 50)
      })
  }
})
