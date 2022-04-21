// image-cropper/image-cropper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  methods: {
 
  },
     /**
     * 上传图片
     */
    upload() {
      console.log('chooseMedia被唤起了')
      wx.chooseMedia({
        count: 1,
        mediaType: ['image', 'video'],
        sourceType: ['album'],
        sizeType: ['original'],
        success(res) {
          console.log(res)
        }
      })
    },
})