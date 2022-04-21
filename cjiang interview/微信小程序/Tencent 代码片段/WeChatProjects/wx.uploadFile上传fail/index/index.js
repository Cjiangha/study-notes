const app = getApp()


import util from '../utils/util';

Page({
  data: {
    imgArr: [],
    CarPassApplyFormData: [],
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  chooseImg: function (ev) {
    let imgArr = this.data.imgArr;
    let that = this;
    if (imgArr.length >= 9) {
      wx.showModal({
        title: '提示',
        content: '单次上传已达上限',
      });
    } else {
      let count = 9 - imgArr.length;
      wx.chooseImage({
        count: count,
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach((item, index) => {
            imgArr.push({
              src: res.tempFilePaths[index]
            });
          })
          that.setData({
            imgArr: imgArr
          });
        },
      })
    }
  },
  del: function (e) {
    var t = this;
    let imgArr = t.data.imgArr;
    var idx = e.currentTarget.dataset.index;
    imgArr = imgArr.filter((ele, index) => {
      return index != idx
    })
    t.setData({
      imgArr: imgArr
    });
  },
  CarPassApply: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    var t = this;
    var formData = e.detail.value;


    var imgArr = t.data.imgArr;

    let data = {
      ID: "ID",
      Type: 0
    }
    try {
      console.log("图片上传");
      util.uploadMore2(imgArr, 0, imgArr.length, t, [], `${app.globalData.apiUrl}/Home/CarPassFileUpload`, data, function (res) {
        t.setData({
          imgArr: []
        });
      });
    } catch (error) {
      console.log('上传图片错误' + error);
    }
  },
})
