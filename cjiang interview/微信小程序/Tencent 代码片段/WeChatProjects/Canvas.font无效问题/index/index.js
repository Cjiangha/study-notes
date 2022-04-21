//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    let self = this;
    //let defaultHeadUri = Constants.DefaultData.header;
    
    let num = 0; //下载图片计数器
    //选取画板
    let ctx = wx.createCanvasContext('posterCanvas');
    // ctx.clearRect(0, 0, 480, 480); //清空画板
    ctx.setFillStyle('#fff')
    ctx.setTextBaseline("top");
    ctx.setFillStyle('#000')//文字颜色：默认黑色
    ctx.setFontSize(14)//设置字体大小，默认10
    ctx.font = `40px KaiTi`//设置字体大小，默认10
    ctx.fillText("你看看字体 有没有效果",60, 15, 250)//绘制文本
    ctx.fillText("开发工具有效！真机无效",60, 80, 250)//绘制文本
    ctx.draw()
  },
})
