// page/one/index.js
var app = getApp(); 
Page({
  per: 0.70,
  data: {
    focus: false,
    show: true,
    chose: 0
  },
  onLoad:function(options){
    this.setData({url: "https://kg-xcx.oss-cn-qingdao.aliyuncs.com/87aec9f070320139ab1300163e08e3ac.mp4?OSSAccessKeyId=LTAIxj2Yf7DGggYW&Expires=1634802321&Signature=ISktHYK9VyuUp2JDpUEAi4gmkio%3D" });
  },

  videoErrorCallback:function(e){
    console.log(e);
  }
  
   
})