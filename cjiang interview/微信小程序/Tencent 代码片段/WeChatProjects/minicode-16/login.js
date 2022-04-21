// pages/login/login.js
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeInput: true,
    hotelName: "",
    userName: "",
    password: "",
    hotelData: [],
    disabled:false,
    hotelNameShow:false,
    hotelObj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  delete(e) {
    let {
      type
    } = e.currentTarget.dataset;
    this.setData({
      [type]: ''
    })
    if (!this.data.hotelName) {
      this.setData({
        hotelNameShow:false
      })
    }
  },

  /**
   * 密码框显示or隐藏
   */
  showOrHide() {
    let typeInput = this.data.typeInput
    this.setData({
      typeInput: !typeInput
    })
  },

  /**
   * 登录
   */
  formSubmit() {
    let _this = this;
    _this.setData({
      disabled:true
    })
    console.log(_this.data.disabled)
    wx.login({
      success(res) {
        if (res.code) {
          App._post_form('ireveapplet/user/userCheck', {
            hotelId: _this.data.hotelObj.hotelId, //酒店ID
            hotelName:  _this.data.hotelName, //酒店名
            userLoginName: _this.data.userName, //登录名
            password: _this.data.password, //密码
            appletCode: res.code //appcode
          }, (result) => {
            console.log(result, 999);
            if (result.result == 1) {
              wx.setStorageSync('token', result.model.token);
              wx.setStorageSync('hotelName', result.model.hotelName);
              console.log(123);
              wx.reLaunch({
                url: '../index/index'
              })
            }else {
              wx.showToast({
                title: result.failReason,
                icon: 'error',
                duration: 2000
              })
            }
            _this.setData({
              disabled:false
            })
          })
        } else {
          _this.setData({
            disabled:false
          })
          console.log('登录失败！' + res.errMsg)
        }
      }
    })



  },

  /**
   * 酒店名输入事件
   */
  hotelInput(e) {
    let _this = this;
    _this.setData({
      hotelName: e.detail.value,
      hotelNameShow:true,
    })
    if (e.detail.value == '') {
      _this.setData({
        hotelNameShow:false,
      })
    }
    App._get('ireveapplet/authuser/queryLikeHotel', {
      hotelName: e.detail.value //用户ID
    }, (result) => {
      console.log(result, 123);
      if (result.result == 1) {
        _this.setData({
          hotelData: result.model
        })
      } else {
        wx.showToast({
          title: result.failReason,
          icon: 'error',
          duration: 2000
        })
      }
    })
  },

   /* 点击选中酒店 */
   hotles(e) {
    let _this = this;
    let item = e.currentTarget.dataset.item
    console.log(item, 99);
    _this.setData({
      hotelName:item.hotelName,
      hotelObj:item,
      hotelNameShow:false
    },function(){
      console.log(_this.data.hotelName,666);
    })
  },

  /**
   * 登录名输入事件
   */
  loginInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  /**
   * 密码输入事件
   */
  pwsInput(e) {
    this.setData({
      password: e.detail.value
    })
  }
})