const app = getApp()

Page({
  data: {

    addmissage: '选的位置',
    // markers	 Array	标记点
    title:'',
    latitude: 23.12908,
    longitude: 113.26436,
    scale: 10,
    screenHeight:(wx.getSystemInfoSync()).windowHeight,
    markers:[],
    customCalloutMarkerIds: [],
    hideModal:true, //模态框的状态  true-隐藏  false-显示
    animationData:{},//
  
  },
  // 显示遮罩层
  markertap: function () {
    var that=this;
    that.setData({
      hideModal:false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation 
    setTimeout(function(){
      that.fadeIn();//调用显示动画
    },200)   
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that=this; 
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function(){
      that.setData({
        hideModal:true
      })      
    },720)//先执行下滑动画，再隐藏模块
    
  },

  //动画集
  fadeIn:function(){
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })    
  },
  fadeDown:function(){
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),  
    })
  }, 
  
  onLoad() {
    wx.navigateTo({
      url: '../index2/index2',
    })
    
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
   var that=this;
   var markJaon='[{"id":0,"parkId":6,"parkType":1,"name":"海珠琶洲停车场","vacancy":37,"address":"广东省广州市海珠区琶洲会展创意园","distance":14.17,"iconPath":"../image/dian.png","imageUrl":"../image/carFull.png","color":"#16B120","latitude":23.088555973406994,"longitude":113.39114207346574,"width":1,"height":1,"callout":{"content":37,"color":"#16B120","fontSize":"32rpx","anchorY":"34px","textAlign":"center","display":"ALWAYS"},"customCallout":{"display":"ALWAYS"}}]';
      that.setData({
      markers:JSON.parse(markJaon)
      })
      
     
  },
  
})
