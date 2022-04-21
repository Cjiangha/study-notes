// pages/test/test.js
var QRCode = require('../../utils/weapp-qrcode')
const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const code_w = 300 / rate;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'https://wxtest.drcbank.com?nameCard=徐勇',
    code_w,
    qrVisible: false,
    qrVisible1: false,
    scrollTop: 0,
    canvasImageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  creatDialog() {
    new QRCode('canvas1', {
      text: this.data.text,
      image: '',
      width: code_w,
      height: code_w,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
      callback:(e)=>{
        this.setData({
          canvasImageUrl: e.path,
        })
      }
    })
    this.setData({
      qrVisible1: true,
    })
  },
  creatDialogScorll() {
    this.setData({
      scrollTop: 700
    })
  },
  creatQR() {
    new QRCode('canvas', {
      text: this.data.text,
      image: '',
      width: code_w,
      height: code_w,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    this.setData({
      qrVisible: true
    })
  },
  //获取是否可以保存权限
  getSettingSaveCanvas() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          console.log(res)
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                //成功获取权限
                resolve(true)
              },
              fail() {
                reject(false)
              }
            })
          } else {
            resolve(true)
          }
        }
      })
    })
  },
  savePic1: function () {
    this.getSettingSaveCanvas().then(() => {
      wx.canvasToTempFilePath({
        canvasId: 'canvas1',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(result) {
              wx.showToast({
                title: '图片保存成功！',
              })
            }
          })
        },
        fail(err) {
          wx.showToast({
            icon: 'error',
            title: '图片保存失败'
          })
        }
      })
    }).catch(() => {
      wx.showToast({
        icon: 'error',
        title: '无图片写入权限'
      })
    })
  },
  savePic: function () {
    this.getSettingSaveCanvas().then(() => {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        success: function (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(result) {
              wx.showToast({
                title: '图片保存成功！',
              })
            }
          })
        },
        fail(err) {
          wx.showToast({
            icon: 'error',
            title: '图片保存失败'
          })
        }
      })
    }).catch(() => {
      wx.showToast({
        icon: 'error',
        title: '无图片写入权限'
      })
    })
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