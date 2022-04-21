const app = getApp()

Page({
  data: {

  },
  intoPage1: function () {
    var n = wx.env.USER_DATA_PATH + "/保存文本.txt", e = "文本";
    wx.getFileSystemManager().writeFile({
      filePath: n,
      data: e,
      //encoding: 'binary',
      success: function (res) {
        console.log("保存文档", res);

      }
    })
    wx.shareFileMessage({
      filePath: n,
      success() { },
      fail: console.error,
    })
  },
  onLoad() {

  },
})
