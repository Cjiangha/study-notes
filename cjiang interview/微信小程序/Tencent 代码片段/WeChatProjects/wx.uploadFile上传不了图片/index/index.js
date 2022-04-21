const app = getApp()

Page({
  data: {
    fileList: [], // 商品图
    imgPath: [], // 正式路径的图片数组
    imgUrl: 'https://img.spzlxlw.com/',
    url: 'https://ynsn.spzlxlw.com'
  },
  dd(){
    wx.getNetworkType({
      complete: (result) => {console.log(result)},
    })
  },
  onLoad() {
 
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
      }
     })
  },

  // 上传图片
  upImg() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.afterRead(tempFilePaths[0])
      }
    })
  },


  afterRead(tempFilePaths) {
    let that = this;
    wx.showLoading({
      title: '上传中...',
    })
    let {
      imgPath,
      fileList
    } = that.data;

    wx.uploadFile({
      url: `${that.data.url}/api/qdimg/imgupload`,
      filePath: tempFilePaths,
      name: 'pic',
      header: {
        "Content-Type": "multipart/form-data",
        'Authorization': wx.getStorageSync('token') || '',
        'Accept': 'application/vnd.gqstystem.v1+json'
      },
      success(res) {
        console.log('---上传成功--',res)
        wx.hideLoading()
        let obj = JSON.parse(res.data)
        switch (obj.code) {
          case 0:
            let img_url = obj.result;
            imgPath.push(img_url);
            fileList.push({
              url: that.data.imgUrl + img_url + '!img_400'
            });
            that.setData({
              fileList,
              imgPath
            });
            break;
          default:
            wx.showToast({
              title: String(res.data.msg),
            })
            break;
        }
      },
      fail(err) {
        wx.hideLoading()
        console.log('err', err);
      }
    });
  },
 

})