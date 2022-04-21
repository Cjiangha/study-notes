const app = getApp()

Page({
  data: {
      top:0
  },
  scroll:function(){
    this.index+=10;
    this.setData({
        top:this.index
    })
  },
  onLoad: function () {
    this.index = 0;
  },
})
