// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form1:{
      phone: '',
      password: '',
      verificationCode: ''
    },
    verificationCode: '',
    rules: [{
      name: 'phone',
      rules: [{required: true, message: '手机号为必填项'},{mobile: true, message: '手机号格式不对'}]
    },{
      name: 'password',
      rules: {required: true, message: '密码不能为空'}
    },{
      name: 'verificationCode',
      rules: {required: true, message: '验证码不能为空'}
    }],
    verificationFocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.generateVC();
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
  },
  login(e){
    this.selectComponent("#form1").validate((valid, errors)=>{
      if(!valid){
        const firstError = Object.keys(errors);
        this.setData({
          error: errors[firstError[0]].message
        })
      }else{
        let oldVC = this.data.verificationCode;
        let vsInput = this.data.form1.verificationCode.toLocaleUpperCase();
        oldVC = oldVC.replaceAll(' ', '');
        vsInput = vsInput.replaceAll(' ', '');
        if (oldVC != vsInput){
          this.setData({
            error: "验证码不正确，请重新输入"
          })
        }else{
          this.setData({
            [`form1.openId`]: wx.getStorageSync('openId')
          })
          wx.request({
            url: getApp().globalData.baseUrl + 'garbage/workerlogin',
            method: 'post',
            data: JSON.stringify(this.data.form1),
            success: (res)=>{
              if(res.statusCode == 200){
                if (res.data.status != 'S'){
                  wx.showToast({
                    icon: 'none',
                    title: res.data.message,
                  })
                }else{
                  getApp().globalData.userInfo = res.data.message;
                  getApp().globalData.companyId = res.data.message.companyId
                  wx.setStorageSync('userInfo', res.data.message);
                  wx.switchTab({
                    url: '/pages/message/index',
                  })
                }
              }else{
                wx.showToast({
                  title: '登录失败',
                  icon: 'error'
                })
              }
              
            },
            fail: (res)=>{
              console.info("login fail", res);
              wx.showToast({
                icon: 'error',
                title: '发生异常'
              })
            }
          })
        }
      }
    })
    
  },
  generateVC(){
    const codeLen = 4;
    const random = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    let code = '';
    for (let index = 0; index < codeLen - 1; index++) {
      code += random[Math.floor(Math.random() * 26)];
      code += ' ';
    }
    code += random[Math.floor(Math.random() * 26)];
    this.setData({
      verificationCode: code
    })
  },
  phoneEvent(e){
    this.setData({
      [`form1.phone`]: e.detail.value
    })
  },
  passwordEvent(e){
    this.setData({
      [`form1.password`]: e.detail.value
    })
  },
  verificationCodeEvent(e){
    this.setData({
      [`form1.verificationCode`]: e.detail.value
    })
  },
  pwNext(e){
    this.setData({
      verificationFocus: true
    })
  },
  verificationFocus(e){
    console.info("verificationFocus", e)
  },
  verificationBlur(e){
    console.info("verificationBlur", e)
  },
  pwFocus(e){
    console.info("pwFocus", e)
  },
  pwBlur(e){
    console.info("pwBlur", e)
  }
})