

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // baseImgUrl: config.imgUrl + '/simple/',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  upload: function () {
    let _this = this
    let baseUpload = wx.getStorageSync('fileInfo').visitPrefix
    let length = this.data.maxLength - this.data.imgList.length
    if (length <= 0) return false
    wx.chooseImage({
      count: length, //最多可以选择的图片张数
      sizeType: ['original', 'compressed'], //original原图，compressed压缩图
      sourceType: ['camera', 'album'], //album相册，camera相机
      success: res => {
        let tempFilePaths = res.tempFilePaths
        let temp = 0
        if (tempFilePaths && tempFilePaths.length > 0) {
          wx.showLoading({
            title: '上传图片中...',
            mask: true
          })
          var openId = wx.getStorageSync('ucode-session') ?
            wx.getStorageSync('ucode-session').openId :
            (wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').openId : '')
          tempFilePaths.map((v, k) => {
            debugger;
            wx.uploadFile({
              url: config.baseURL + config.fileUpload + '?openId=' + openId,
              filePath: v,
              name: 'file',
              header: {
                'content-type': 'multipart/form-data;charset=utf-8' //这里注意POST请求content-type是小写，大写会报错  
              },
              formData: {
                fileType: 'IMAGES'
              },
              success: res => {
                temp++
                if (temp == tempFilePaths.length) {
                  wx.hideLoading()
                }
                let resData = JSON.parse(res.data)
                let imageInfos = _this.data.imageInfos
                let imgList = _this.data.imgList
                if (resData.code == 200) {
                  let data = resData.data
                  imageInfos.push(data)
                  let image = ''
                  if (baseUpload.indexOf('/portal') != -1) {
                    image = baseUpload + data.relativeLocal + '/' + data.fileName
                  } else {
                    image = baseUpload + '/' + data.relativeLocal + '/' + data.fileName
                  }
                  imgList.push(image)
                  _this.setData({
                    imageInfos: imageInfos,
                    imgList: imgList
                  })
                  _this.getPath()
                }
              },
              fail: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '图片上传服务器异常,请重新上传！',
                  icon: 'none',
                  duration: 5000,
                })
              }
            })
          })
        }
      },
    })
  },
  // 得到图片路径
  getPath: function () {
    let imageInfos = this.data.imageInfos.length > 0 ? JSON.stringify(this.data.imageInfos) : null
    this.triggerEvent('getPath', {
      key: this.data.key,
      imgList: this.data.imgList,
      imageInfos: imageInfos
    })
  },
 
})