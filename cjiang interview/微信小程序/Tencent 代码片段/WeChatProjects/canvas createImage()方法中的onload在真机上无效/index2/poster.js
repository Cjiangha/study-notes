
// components/poster/poster.js
const posterWidth = 800
const posterHeight = 1292
const app = getApp()
const userInfo = wx.getStorageSync('userInfo')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    posterLoading: false,
    posterImg: '',
    // bgSrc: '/packageC/pages/static/cre_img.png'
  },
  lifetimes:{
    ready () {
      // const query = wx.createSelectorQuery().in(this);
      // query.select('.poster-canvas')
      // .fields({ node: true, size: true })
      // .exec(this.init.bind(this))
      wx.createSelectorQuery().in(this).select('.poster-canvas')
        .fields({ node: true, size: true })
        .exec(this.init.bind(this))
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init (res) {
      const width = res[0].width
      const height = res[0].height
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      console.log(ctx);
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      this.createPoster (ctx,canvas)
    },
    saveAction () {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.posterImg, 
        success: function (res) {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
        },
        fail: (err)=>{
          console.log(err)
        }
      })
    },
    // 绘制文字
    drawText: function (ctx, obj) {
      ctx.save();
      ctx.fillStyle = obj.color || '#222'
      let size = obj.size || 25;
      if( obj.bold != false ){
        ctx.font = `bold ${size}px Arial`
      }else{
        ctx.font = `${size}px Arial`
      }
      ctx.textAlign = obj.align || 'left';
      ctx.textBaseAlign = obj.baseline || 'bottom';
      ctx.fillText(obj.text, obj.x, obj.y);
      ctx.restore();
    },
    //获取文本折行
    getTextLine: function (ctx,obj) {
      if(obj.bold){
        ctx.font = `bold ${size}px Arial`
      }else{
        ctx.font = `${size}px Arial`
      }
      let arrText = obj.text.split('');
      let line = '';
      let arrTr = [];
      for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = ctx.measureText(testLine);
        var width = metrics.width;
        if (width > obj.width && i > 0) {
          arrTr.push(line);
          line = arrText[i];
        } else {
          line = testLine;
        }
        if (i == arrText.length - 1) {
          arrTr.push(line);
        }
      }
      return arrTr;
    },
    // 绘制换行文本
    textWrap: function (ctx, obj) {
      let tr = this.getTextLine(ctx,obj);
      for (var i = 0; i < tr.length; i++) {
        if (i < obj.line) {
          var txt = {
            x: obj.x,
            y: obj.y + (i * obj.height),
            color: obj.color,
            size: obj.size,
            align: obj.align,
            baseline: obj.baseline,
            text: tr[i],
            bold: obj.bold
          };
          if (i == obj.line - 1) {
            txt.text = txt.text.substring(0, txt.text.length - 1) + '...';
          }
          this.drawText(ctx, txt);
        }
      }
    },
    //生成海报
    createPoster(context,canvas) {
      this.setData({
        posterLoading: true
      })
      const posterW = posterWidth
      const posterH = posterHeight
      const bg = canvas.createImage()
      bg.src = '1.png'
      wx.getImageInfo({
        src: '1.png',
        complete: (res) => {
          console.log(res);
        },
        fail: (res) => {},
        success: (result) => {
          console.log(result);
        },
      })
      console.log(bg);
      bg.onerror = (err) => {
        console.log(456,err);
      }
      bg.onload = () => {
        console.log('bg loaded')
        const stamp = canvas.createImage()
        stamp.src = '1.png'
        stamp.onload = ()=>{
          console.log('stamp loaded')
          context.drawImage(bg, 0, 0, posterW, posterH)
          let dateObj = app.utils.formatTime(new Date())
          // 绘制日期文字
          this.drawText(context, {
            text: `${dateObj.year}年${dateObj.month}月${dateObj.day}日 获得此勋章`,
            color: '#fff',
            align:'center',
            size: 33,
            x: posterW/2,
            y: 100
          })
          
          // 先生/女士
          let textY = 830
          let primaryColor = "#23990c"
          let left1 = 120
          this.drawText(context, { text: `${userInfo.nickName}`,color:primaryColor, x: left1+50, y: textY-10})
          this.drawText(context, { text: `(先生/女士)`, x: left1+200, y: textY})
          context.fillStyle="#23990c"
          context.fillRect(left1, 830, 190, 4)
          // 第二行
          let left2 = 120
          let textY2 = textY+55
          this.drawText(context, { text: '感谢您购买', x: left2, y: textY2})
          this.drawText(context, { text: '七龙珠监测平台服务', color:primaryColor, x: left2+130, y: textY2})
          this.drawText(context, { text: '(室内空气检测)', x: left2+360, y: textY2})
          // 第三行
          let left3 = 250
          let textY3 = textY+100
          this.drawText(context, { text: '本次服务将有', x: left3, y: textY3})
          this.drawText(context, { text: '5元', color:primaryColor, x: left3+155, y: textY3})
          this.drawText(context, { text: '爱心基金', x: left3+198, y: textY3})
          // 第四行
          let textY4 = textY+145
          this.drawText(context, { text: '通过北京大爱清尘公益基金会', align:'center', x: posterW/2, y: textY4})
          // 第五行
          let textY5 = textY+190
          this.drawText(context, { text: '捐赠给尘肺病家庭', color:primaryColor, align:'center', x: posterW/2, y: textY5})
          // 第六行
          let textY6 = textY+235
          this.drawText(context, { text: '您的参与使社会得以凝聚更多的善意', align:'center', x: posterW/2, y: textY6})
          // 第七行
          let textY7 = textY+280
          this.drawText(context, { text: '让垫底星光汇聚成人间星河', align:'center', x: posterW/2, y: textY7})
          // 第八行
          let textY8 = textY+325
          this.drawText(context, { text: '点亮每一个需要的角落', align:'center', x: posterW/2, y: textY8})
          // 第九行
          let textY9 = textY + 370
          this.drawText(context, { text: '尽我所能 温暖人间', align:'center', x: posterW/2, y: textY9})
          // 绘制印章
        
          let stampW = 240
          let dStampW = 230
          context.drawImage(stamp, 0, 0, stampW, stampW, posterW-dStampW, posterH-dStampW, dStampW, dStampW)
          // console.log(canvas.createImage())
          // var timer = setTimeout(() => {
            wx.canvasToTempFilePath({
              canvas: canvas,
              success: (res) => {
                console.log(res)
                // clearTimeout(timer)
                this.setData({
                  posterImg: res.tempFilePath,
                  posterLoading: false
                })
                console.log(555);
              },
              fail: function(res) {
                  clearTimeout(timer)
                  console.log(res);
              }
            });
          // },500)
          
        }
      }
    },
  }
})
