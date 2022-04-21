const app = getApp()
Page({
  data: {
    ispl:false,
    keyHeight:0,
  },
  onLoad(){
    wx.onKeyboardHeightChange(res=>{
      var keyHeight = res.height;
      this.setData({keyHeight});
    })
  },
  preventD: function() {
    return
  },
  reportStr(){
    this.setData({ispl:true})
  },
  hideKeyworld(){
    this.setData({ispl:false})
  }
})
