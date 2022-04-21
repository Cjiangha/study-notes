const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },

  /**
   * minio
   */
  uploadFileMinio: function (e) {
    var that = this;
    console.log("uploadFileMinio start.");
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success: function (res) {
        const tempFilePaths = res.tempFiles;
        // 推送文件
        that.pushFile(tempFilePaths);
      }
    })
  },

  /**
   * 推送文件
   */
  pushFile: function (tempFilePaths, callback) {
    var that = this;
    var curFile = tempFilePaths[0];

    console.log("准备上传的文件=", curFile);

    // 加载数据
    wx.uploadFile({
      url: 'https://www.aoprint.cn/aopphp/aop-uploadFile.php',
      filePath: curFile.path,
      name: "file",
      formData: {
        openid: "oyfZt5UPCH-YgSFOgxhar0B8sVbs",
        fileName: curFile.name
      },
      success: function (res) {
        console.log("pushFile.res=", res);
        if (res.statusCode == 200) {
          var data = JSON.parse(res.data);
          if (data.result == true) {

            // 输出日志
            console.log("uploadedFile=", data);

          }
        }
      },
      fail: function (err) {
        console.error("wx.uploadFile.err=", err);
        wx.showModal({
          title: "提示您",
          content: '有异常：' + err.errMsg + '，请稍等',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })
      },
      complete: res => {
        // 结束加载
        if (typeof callback === "function") {
          callback();
        }
      }
    });
  },

})