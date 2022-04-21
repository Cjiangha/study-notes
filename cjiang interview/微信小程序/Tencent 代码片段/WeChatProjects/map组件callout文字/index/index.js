
// 引入SDK核心类
var QQMapWX = require('../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [
      {
        id: "sanxiang/sanxiang",  //这里是写目录，用于导航跳转
        latitude: 40.006267,  //维度
        longitude: 116.8453,  //经度
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{  //坐标点击弹出框
          content:"项目名称: 三湘印象·森林海尚城  \r\n均价 19999 元/㎡\r\n户型：63-136 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"20rpx",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },      
      },
      {
        id: "ruijing/ruijing",  //这里是写目录，用于导航跳转
        latitude: 39.913160,  //维度
        longitude: 116.818347,  //经度
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{  //坐标点击弹出框
          content:"项目名称: 御东•瑞璟  \r\n均价 28000 元/㎡\r\n户型：83-139 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },      
      },
      {
        id: "gangzhonglv/gangzhonglv",  //这里是写目录，用于导航跳转
        latitude: 39.913917,  //维度
        longitude: 116.801824,  //经度
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{  //坐标点击弹出框
          content:"项目名称: 港中旅•海泉湾二期  \r\n均价 22500 元/㎡\r\n户型：88-140 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },      
      },
      {
        id: "jiadu/jiadu",
        latitude: 40.045292,
        longitude: 116.832098,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 嘉都•嘉华苑  \r\n均价 22000 元/㎡\r\n户型：88-117 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "jiuli/jiuli",
        latitude: 39.996619,
        longitude: 116.78812,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 甜城•九里香堤  \r\n均价 24000 元/㎡\r\n户型：97-118 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "zhongxing/zhongxing",
        latitude: 39.988399,
        longitude: 116.781232,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 中兴和园二期  \r\n均价 25000 元/㎡\r\n户型：56-125 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "shuixie/shuixie",
        latitude: 40.030539,
        longitude: 116.824789,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 顺泽•水榭花城  \r\n均价 20700 元/㎡\r\n户型：57-133 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "shengheng/shengheng",
        latitude: 39.944177,
        longitude: 116.823435,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 盛恒时代  \r\n均价 23000 元/㎡\r\n户型：68-87 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "zhonghefu/zhonghefu",
        latitude: 39.962731,
        longitude: 116.806242,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 神威•中和府  \r\n均价 23500 元/㎡\r\n户型：97-142 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "biguiyuan/biguiyuan",
        latitude: 39.96704,
        longitude: 116.775385,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 碧桂园•时代城  \r\n均价 23000 元/㎡\r\n户型：85-115 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "junjing/junjing",
        latitude: 39.912682,
        longitude: 116.815931,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 御东•珺璟  \r\n均价 26000 元/㎡\r\n户型：89-138 ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
      {
        id: "tianyangcheng4/tianyangcheng4",
        latitude: 39.919973,
        longitude: 116.823153,
        iconPath: "/images/icon/residence.png",
        width: 30,
        height: 30,
        callout:{
          content:"项目名称: 天洋城 4代  \r\n均价 23000 元/㎡\r\n户型：69-169  ㎡\r\n点击查看详情",
          bgColor:"#fff",
          padding:"5px",
          borderRadius:"2px",
          borderWidth:"1px",
          borderColor:"#07c160",
          textAlign: "left",
        },
      },
    ]

  },
  // regionchange(e) {
  //   console.log(e.type)
  // },
  // markertap(e) {
  //   console.log(e.detail.markerId)
  // },
  // controltap(e) {
  //   console.log(e.detail.controlId)
  // },

// 跳转到项目详情
  pointTap: function(e){
    // console.log(e)
    // console.log(e.markerId)
    wx.navigateTo({
      url: '../../pages/house/' + e.markerId,
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showToast({
      title: '请稍后',
      icon: 'loading',
      duration: 500
    })
    
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'PP6BZ-QFJR2-EVYUK-CKSI2-2JZ6Z-STBXX',
      table_id:'5ef9cd8192eec6667a85bb97'
    });
    this.mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '【环京网】环京区域专业房产平台，海量信息，省时省心！',   
    }
  }
})