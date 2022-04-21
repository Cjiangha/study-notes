const app = getApp()

Page({
  data: {
    canvasInfo:{},
  },
  onLoad() {
    this.createChart();
  },
  createChart(){
    // 选择器的语法与jQuery语法相同
    let query = wx.createSelectorQuery().in(this);
    query.select('#columnarCanvas').boundingClientRect();
    query.exec((res) => {
      let canvasInfo = {};
      canvasInfo.width = res[0].width;
      canvasInfo.height = res[0].height;
      this.setData({
        canvasInfo: canvasInfo
      })
      this.drawColumnar();
    })
  },
  drawColumnar() {
    let ctxColumnar = null;
    wx.createSelectorQuery()
      .select("#columnarCanvas")
      .context((res) => {
        ctxColumnar = res.context;
        const grd = ctxColumnar.createLinearGradient(20, 20, 40, 40);
        grd.addColorStop(0,'#48A2FF');
        grd.addColorStop(1,'#0024BD');
        ctxColumnar.fillStyle = grd;
        ctxColumnar.fillRect(20, 20, 20, 20);
        ctxColumnar.draw();
      })
      .exec();
  },
})
