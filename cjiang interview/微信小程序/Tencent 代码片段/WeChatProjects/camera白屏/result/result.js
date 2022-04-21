const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tips: '',

    errMsgList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },
  reTake() {
    wx.navigateBack();
  },
  back() {
    wx.navigateBack();
  },
});
