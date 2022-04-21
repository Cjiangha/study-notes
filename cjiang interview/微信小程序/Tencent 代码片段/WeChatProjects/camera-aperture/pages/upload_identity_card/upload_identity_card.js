// pages/upload_identity_card/upload_identity_card.js
Page({
  /**
  
  页面的初始数据
  
  */

  data: {

    src: '',

    show: false,

    type: 1

  },

  cancelBtn() {

    this.setData({
      show: false
    })

  },

  /**
  
  给上个页面返图片地址
  
  */

  saveImg() {

    let that = this

    let pages = getCurrentPages();

    let prevPage = pages[pages.length - 2];

    if(that.data.type == 1){

      prevPage.setData({

        upload_front: that.data.src,
  
      })

    }else if(that.data.type == 2){

      prevPage.setData({

        upload_verso: that.data.src,
  
      })

    }

    

    wx.navigateBack({

      delta: 1 // 返回上一级页面。

    })

  },

  takePhoto() {

    const ctx = wx.createCameraContext()

    const listener = ctx.onCameraFrame((frame) => {

      console.log(frame)

    })

    ctx.takePhoto({

      quality: 'high',

      success: (res) => {

        console.log(res)

        this.setData({

          src: res.tempImagePath,

          show: true

        })

        listener.stop({

          success: (res) => {

            console.log(res)

          },

          fail: (err) => {

            console.log(err)

          }

        })

      },

      fail: (err) => {

        console.log(err)

      }

    })

  },

  error(e) {

    console.log(e.detail)

  },

  /*
  
  生命周期函数–监听页面加载
  
  */

  onLoad: function (options) {

    //正面或反面（上个页面传值 1为正 2为反）

    this.setData({

      type:options.type

    })

  },
  /**
  生命周期函数–监听页面初次渲染完成
  
  */

  onReady: function () {


  },


  /**
  
  
  
  生命周期函数–监听页面显示
  
  */

  onShow: function () {


  },


  /**
  
  
  
  生命周期函数–监听页面隐藏
  
  */

  onHide: function () {


  },


  /**
  
  
  
  生命周期函数–监听页面卸载
  
  */

  onUnload: function () {


  },


  /**
  
  
  
  页面相关事件处理函数–监听用户下拉动作
  
  */

  onPullDownRefresh: function () {


  },


  /**
  
  
  
  页面上拉触底事件的处理函数
  
  */

  onReachBottom: function () {


  },


  /**
  
  
  
  用户点击右上角分享
  
  */

  onShareAppMessage: function () {


  }

})