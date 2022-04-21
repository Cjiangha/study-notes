// page2/page2.js
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

  goPage3(){
    wx.navigateTo({
      url: '../page3/page3',
      events:{
        dataFromPage3:data=>{
          console.log("=====> 收到来自page3的数据: ",data);
          
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit('dataFromPage2', {
            data:data
          });

          wx.navigateBack();
        }
      }
    })
  }
})