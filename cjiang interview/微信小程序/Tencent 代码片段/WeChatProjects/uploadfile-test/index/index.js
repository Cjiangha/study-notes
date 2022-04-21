const app = getApp()
const log = require('../utils/log.js');

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  uploadPic(){
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log("选择图片：", res);
        //启动上传等待中...
        wx.showToast({
          title: "正在上传...",
          icon: "loading",
          mask: true,
          duration: 10000
        });
        var uploadImgCount = 0;
        var tempFilePaths = res.tempFilePaths;

        for (var i = 0, h = tempFilePaths.length; i < h; i++) {

          var params = {
            url: "https://gerberwxapp.mmuugg.com/api/v1/coupons/uploadReceiptsImageFileTest",
            filePath: tempFilePaths[i],
            name: "uploadfile_receiptsimage",
            formData: {
              userId: "D2E6CC8A-5627-487E-BA35-CA5EC7F973B9",
              couponsId: "110"
            }
          }

          wx.uploadFile({
            url: params.url,
            filePath: params.filePath,
            name: params.name,
            formData: params.formData,
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function(res) {
              uploadImgCount++;
              try {
                var data = JSON.parse(res.data);
                console.log("服务器返回内容：", data);
                log.error('代码片段测试'+','+JSON.stringify(res)+'，传参：'+JSON.stringify(params))
                if (data.Code === 0) {//上传图片失败后立马调取其他
                  wx.hideToast();
                  // 上传成功
                  wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: false,
                  });
                  return;
                }
                if(data.Code === 1) {
                  //如果是最后一张,则隐藏等待中
                  if (uploadImgCount == tempFilePaths.length) {
                    wx.hideToast();
                  }
                  // 上传成功
                  wx.showModal({
                    title: "提示",
                    content: "上传成功",
                    showCancel: false,
                  });
                }
              } catch (error) {
                console.log('接口报错')
                log.error('代码片段测试'+','+JSON.stringify(res)+'，传参：'+JSON.stringify(params))
              }


            },
            fail: function(res) {
              wx.hideToast();
              wx.showModal({
                title: "提示",
                content: "上传图片失败",
                showCancel: false,
                success: function(res) {}
              });
            }
          });
        }
      }
    });
  },
})
