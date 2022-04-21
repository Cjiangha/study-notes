// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexData: {},
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
    console.log(this.data.indexData)
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
  onShareAppMessage: function () {

  },


  goEdit(res) {
    let indexData = this.data.indexData
    indexData.choosen = res.currentTarget.dataset.choosen ? res.currentTarget.dataset.choosen : null
    indexData.type = res.currentTarget.dataset.type ? res.currentTarget.dataset.type : 'normal'
    indexData.inputtype = res.currentTarget.dataset.inputtype ? res.currentTarget.dataset.inputtype : 'text'
    indexData.maxlength = res.currentTarget.dataset.maxlength ? res.currentTarget.dataset.maxlength : '140'
    if(!indexData[indexData.choosen]){
      indexData[indexData.choosen] = null
    }
    this.setData({ indexData: indexData,})
    console.log(this.data)
    //wx.showToast({ icon: 'loading', duration: 300, })
    setTimeout(function() {
      wx.navigateTo({
        url: '../test/test',
      })
    }, 100)
    
  },
})