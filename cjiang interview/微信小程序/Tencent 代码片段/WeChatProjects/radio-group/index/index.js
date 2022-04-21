
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioCheckVal: 0,
    moneyvalue: '',
    money: '',
    postmoney: 5,
    wechatid: '',
    signature: '',
    path: 'https://testpay.quanminktv.cn/minipro?kbooth_id=2032788455&storeid=3&party_id=10572',
    store_id: '',
    party_id: 10606,
    kbooth_id: 2032788455,
    hidden: true
  },
  sendmoney: function (e) {
    var that = this
    that.setData({
      radioCheckVal: null,
      postmoney: ''
    })
  },
  checkInputText: function (text) {
    var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g; if (reg.test(text)) { //正则匹配通过，提取有效文本
      text = text.replace(reg, '$2$3$4');
    } else { //正则匹配不通过，直接清空
      text = '';
    } return text; //返回符合要求的文本（为数字且最多有带2位小数）
  },
  moneyvalue: function (e) {
    console.log(e)
    var that = this
    var postmoney = e.detail.value
    var y = String(postmoney).indexOf(".") + 1;//获取小数点的位置
    var count = String(postmoney).length - y;//获取小数点后的个数
    if (y > 0) {
      console.log("这个数字是小数，有" + count + "位小数");
      var spostmoney = parseFloat(postmoney)
      var twomoney = spostmoney.toFixed(2)
      that.setData({
        postmoney: twomoney,
      })
    } else {
      that.setData({
        postmoney: postmoney,
      })
    }
    console.log(that.data.postmoney)
    return that.checkInputText(e.detail.value);//检查输入文本，限制只能为数字并且数字最多带2位小数
  },
  radioCheckedChange: function (e) {
    console.log(e)
    var that = this
    that.setData({
      radioCheckVal: e.detail.value,
      moneyvalue: ''
    })
    if (e.detail.value == 0) {
      that.setData({
        postmoney: 5
      })
    } else if (e.detail.value == 1) {
      that.setData({
        postmoney: 10
      })
    } else if (e.detail.value == 2) {
      that.setData({
        postmoney: 20
      })
    } else if (e.detail.value == 3) {
      that.setData({
        postmoney: 99
      })
    } else if (e.detail.value == 4) {
      that.setData({
        postmoney: 199
      })
    } else if (e.detail.value == 5) {
      that.setData({
        postmoney: 299
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("红包=======options")
    console.log(options)
    var that = this
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
    wx.hideShareMenu()
    var that = this
    that.setData({
      radioCheckVal: 0,
    })
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
function GetQueryString(name) {
  var str_after = '?' + wsthat_gl.data.path.split('?')[1];
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = str_after.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]); return null;
}