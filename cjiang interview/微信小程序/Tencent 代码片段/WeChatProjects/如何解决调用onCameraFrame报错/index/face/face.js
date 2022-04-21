// pages/face/face.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcamera: true,
    bgcolor: '#F2F2F2',
    colorArray: ['#F2F2F2', '#F56B79', '#74B2FF'],
    current: 0,
    tipsText: '请显示正脸',
    tempImg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()

  },

  changes() {
    this.data.bgcolor = this.data.colorArray[this.current]
  },

  initData() {
    // #ifdef MP-WEIXIN
    wx.initFaceDetect({
      success: res => {
        console.log(res)
        const context = wx.createCameraContext()
        const listener = context.onCameraFrame((frame) => {
          console.log(frame.data instanceof ArrayBuffer, frame.width, frame.height)
          wx.faceDetect({
            frameBuffer: frame.data,
            width: frame.width,
            height: frame.height,
            enablePoint: true,
            enableConf: true,
            enableAngle: true,
            enableMultiFace: true,
            success: (faceData) => {
              console.log(faceData)
              let face = faceData.faceInfo[0]
              if (faceData.x == -1 || faceData.y == -1) {
                this.tipsText = '检测不到人脸'
              }
              if (faceData.faceInfo.length > 1) {
                this.tipsText = '请保证只有一人做认证'
              } else {
                if (face.angleArray.pitch >= 0.1 || face.angleArray.roll >= 0.1 || face.angleArray.yaw >= 0.1) {
                  this.tipsText = '请平视摄像头'
                } else if (face.confArray.global <= 0.8 || face.confArray.leftEye <= 0.8 || face.confArray.mouth <= 0.8 || face.confArray.nose <= 0.8 || face.confArray.rightEye <= 0.8) {
                  this.tipsText = '请勿遮挡五官'
                } else {
                  this.tipsText = '人脸认证成功'

                  // 这里可以写自己的逻辑了
                }
              }
            },
            fail: (err) => {
              console.log(err)
              if (err.x == -1 || err.y == -1) {
                this.tipsText = '检测不到人脸'
              } else {
                this.tipsText = '网络错误，请退出页面重试'
              }
            }
          })
        })
        listener.start()
      },
      fail: res => {
        console.log(res)
      }
    })

    // #endif

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
    setInterval(() => {
      if (this.current > 2) {
        this.current = 0
      }
      this.changes()
      this.current++
    }, 2000)
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