

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
      isTagEdit: false, //标签编辑
      goodsDesc: '',//描述
      contactWay: true //联系方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  cc(){
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original'],
    //   sourceType: ['album', 'camera'],
    //   success (res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //     console.log('res---',res)
    //     console.log(tempFilePaths)
    //     that.setData({
    //       url:tempFilePaths
    //     })
    //   }
    // })
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
  
  // 标签编辑
  tagEdit(){
     this.setData({
        isTagEdit: !this.data.isTagEdit
     })
  },
  // 详细信息输入
	bindKeyTextarea(e) {
    console.log('bindinput')
		if (e.detail.value.length > 120) {
			wx.showToast({
				title: "最多输入120字符",
				icon: "none",
				duration: 2000,
			});
			this.setData({
				goodsDesc: e.detail.value.slice(0, 120),
			});
		} else {
			this.setData({
				goodsDesc: e.detail.value
			});
		}
  },
  // 联系方式选择
  contactWaySelect(){
     this.setData({
       contactWay: !this.data.contactWay
     })
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
    // return shareOptions()
  }
})