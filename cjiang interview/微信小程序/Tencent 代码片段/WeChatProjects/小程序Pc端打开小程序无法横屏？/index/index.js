// pagesBasic/pages/levelScreen/flowChart/flowChart.js
const app = getApp();

Page({

   /**
    * 页面的初始数据
    */
   data: {
      src: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      wx.downloadFile({
         url: 'https://p0.meituan.net/scarlett/fadd222f22071f60735d6c0b380b022254775.png',
         success (res) {
           if (res.statusCode === 200) {
              console.log(res)
           }
         },
       fail(err) {
           console.log(err)
        }
       })
      let src = `https://www.baidu.com`
      this.setData({
         src
      })
      console.log(src)
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
   onShareAppMessage: function () {

   }
})
