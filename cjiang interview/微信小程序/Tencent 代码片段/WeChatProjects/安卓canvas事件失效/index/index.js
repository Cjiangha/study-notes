var context = null;// 使用 wx.createContext 获取绘图上下文
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
wx.getSystemInfo({
   success: function (res) {
      canvasw = res.windowWidth;//设备宽度
      canvash = res.windowHeight; //设备高度
      
   }
   
});
 
Page({
 canvasIdErrorCallback: function (e) {
  console.error(e.detail.errMsg)
 },
 //绘制开始
 
 canvasStart: function (event) {
   console.log(event)
   isButtonDown = true;
   arrz.push(0);
   arrx.push(event.changedTouches[0].x);
   arry.push(event.changedTouches[0].y);

 },
 ontouch(e){
    console.log(e)
 },
 //绘制过程
 canvasMove: function (event) {
   //  console.log(event)
  if (isButtonDown) {
   arrz.push(1);
   arrx.push(event.changedTouches[0].x);
   arry.push(event.changedTouches[0].y);
  };
 
  for (var i = 0; i < arrx.length; i++) {
   if (arrz[i] == 0) {
    context.moveTo(arrx[i], arry[i])
   } else {
    context.lineTo(arrx[i], arry[i])
   };
  };
  context.clearRect(0, 0, canvasw, canvash);
 
  context.setStrokeStyle('#000000');
  context.setLineWidth(4);
  context.setLineCap('round');
  context.setLineJoin('round');
  context.stroke();
 
  context.draw(false);
 },
 canvasEnd: function (event) {
  isButtonDown = false;
 },
 cleardraw: function () {
  //清除画布
  arrx = [];
  arry = [];
  arrz = [];
  context.clearRect(0, 0, canvasw, canvash);
  context.draw(true);
 },
 //导出图片
 getimg: function () {
  if (arrx.length == 0) {
   wx.showModal({
    title: '提示',
    content: '签名内容不能为空！',
    showCancel: false
   });
   return false;
  };
  //生成图片
  const self = this
  wx.canvasToTempFilePath({
   canvasId: 'canvas',
   success: function (res) {
    
    // wx.saveImageToPhotosAlbum({
    //  filePath: res.tempFilePath,
    //  success(res) {
    //   console.log(res)
    //   wx.showToast({
    //    title: '保存成功',
    //   });
    //  },
    //  fail(err) {
    //   console.log(err)
    //  }
    // })
    //将照片存入服务器
    wx.uploadFile({
     url: 'https://file.chinarai.cn/api/upload/pic', //接口地址
     filePath: res.tempFilePath,
     name: 'file',
     formData: {               
      'user': 'test'
     },
     success: function (res) {
        let imgUrl = JSON.parse(res.data).path
        console.log(imgUrl)
        self.goBack(imgUrl)
     },
     fail: function (res) {
      console.log(res);
     },
     complete: function (res) {
     }
    });
   }
  })
 
 },
 /**
  * 页面的初始数据
  */
 data: {
    type: ''
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
   wx.login({
      success(e){
         console.log(e)
      },
      fail(e){
         console.log(e)
      },
      complete:e=>{
         console.log(e)
      }
   })

  // 使用 wx.createContext 获取绘图上下文 context
 
  context = wx.createCanvasContext('canvas');
  context.beginPath()
  context.setStrokeStyle('#000000');
  context.setLineWidth(4);
  context.setLineCap('round');
  context.setLineJoin('round');
   
  this.data.type = options.type
 },
 onShow(){
    wx.showToast({
        title: '请使用手指在屏幕上签字',
        icon: 'none',
        duration: 2500
    })
 },
 goBack(url){

      let pages = getCurrentPages()
      let perPage = pages[pages.length - 2]
      let obj = {
         type: this.data.type,
         imgUrl: url
      }
      perPage.returnBackScaleInfo(obj)
      this.cleardraw()
      wx.navigateBack()
    
 },
 goBackNo(){
    wx.navigateBack()
    this.cleardraw()
 },
 onUnload(){
   this.cleardraw()
 }
 
})