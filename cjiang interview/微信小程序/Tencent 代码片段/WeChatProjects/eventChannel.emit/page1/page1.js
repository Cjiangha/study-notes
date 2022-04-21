// page1/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goPage2(){
    wx.navigateTo({
      url: '../page2/page2',
      events:{
        dataFromPage2:data=>{
          console.log("=====> 收到来自page2的数据: ",data);
          
        },
        dataFromPage3:data=>{
          console.log("=====> 收到来自page3的数据: ",data);
          
        }
      }
    })
  }
})