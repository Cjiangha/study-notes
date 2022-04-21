// pages/test/test.js
Page({
  data: {
      x:0,
      y:0,
      scale:1,
      cover_img:'https://cdn.nlark.com/yuque/0/2021/jpeg/280373/1640858084273-assets/web-upload/7a6b3af6-8c55-4bc3-8846-5bc7332f13f2.jpeg'
  },
   // 移动背景坐标改变
   move_change(event) {
    this.data.x = event.detail.x
    this.data.y = event.detail.y
  },
  //缩放视频改变
  scale_change(event){
    this.data.x = event.detail.x
    this.data.y = event.detail.y
    this.data.scale = event.detail.scale
  },
  //移动结束
  touchend(event){
    this.setData({
      x:this.data.x ,
      y:this.data.y ,
     scale:this.data.scale,
    })
    
  },

})