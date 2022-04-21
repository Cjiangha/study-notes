const app = getApp()

Page({
  data: {
    imgList: [{
        "uid": 1629702926646,
        "name": "DSC_0467.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173155/DSC_0467.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926647,
        "name": "DSC_0476.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173202/DSC_0476.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926648,
        "name": "DSC_0497.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173208/DSC_0497.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926649,
        "name": "DSC_0500.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173213/DSC_0500.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926650,
        "name": "DSC_0504.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173219/DSC_0504.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926651,
        "name": "DSC_0508.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173227/DSC_0508.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926652,
        "name": "DSC_0515.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173233/DSC_0515.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926653,
        "name": "DSC_0517.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173238/DSC_0517.jpg",
        "status": "success"
      },
      {
        "uid": 1629702926654,
        "name": "DSC_0464.jpg",
        "url": "http://pinzafile.oss-cn-shanghai.aliyuncs.com/data_center/pic//20210819173244/DSC_0464.jpg",
        "status": "success"
      }
    ]
  },
  onLoad() {
    let imgList = []
    this.data.imgList.forEach(elements => {
      var show = elements.url.indexOf('http:')
      if (show != -1) {
        imgList.push(elements.url.replace('http:', 'https:'))
      } else {
        imgList.push(elements.url)
      }
    })
    wx.previewImage({
      current: imgList[0], // 当前显示图片的http链接
      urls: imgList, // 需要预览的图片http链接列表
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
})