// pages/product/productDetail.js

//获取应用实例
const app = getApp()

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
  saveShareImage() {

    this.setData({
      saveShareImageLoading: true
    })

    let wxml ,style;
    // 获取控件
    this.widget = this.selectComponent('.widget')
    // 此处输出 this.widget 会出现开发工具和预览不一样的效果
    console.log('输出canvas控件对象', this.widget)
    // 绘制
    const p1 = this.widget.renderToCanvas({
      wxml,
      style
    })
    console.log('输出p1', p1)
    p1.then(
      (res) => {
        
      },
      (error) => {
        console.log('输出绘制画板内容失败', error)
        wx.showModal({
          content: '绘制失败'
        })
        this.setData({
          saveShareImageLoading: false
        })
      });
  },
  
  
})

