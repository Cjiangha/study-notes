const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  onReady: function () {
       



    const queryTwo = wx.createSelectorQuery()
    queryTwo.select('#myCanvasTwo')
      .fields({ node: true, size: true })
      .exec((res) => {
          console.log(res)
        const canvas = res[0].node
        var ctx = canvas.getContext('2d')
        console.log(ctx)
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.clearRect(0,0,canvas.width,canvas.height);
      
        ctx.font="20px Georgia";
        ctx.fillText("Hello World!",10,50);
        ctx.font="30px Verdana";
        // 创建一个渐变
        var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        // 填充一个渐变
        ctx.fillStyle=gradient;
        ctx.fillText("Big smile!",10,90);
        ctx.fillText("Big smile!",10,120);
        ctx.fillText("Big smile!",160,90);
        // ctx.restore();
        ctx.save();
    


        const query = wx.createSelectorQuery()
        query.select('#myCanvas')
          .fields({ node: true, size: true })
          .exec((res) => {
              console.log(res)
            const canvas1 = res[0].node
            const ctx1 = canvas1.getContext('2d')
            console.log(ctx1)
            const dpr2 = wx.getSystemInfoSync().pixelRatio
            canvas1.width = res[0].width * dpr2
            canvas1.height = res[0].height * dpr2
            console.log(dpr2)
            console.log(ctx1)
            console.log(canvas1.width)
            console.log(canvas1.height)
            console.log(ctx)
            // ctx1.scale(dpr, dpr)
          
            ctx1.drawImage(ctx.canvas,0,0)
    
          })
      })
},
})
