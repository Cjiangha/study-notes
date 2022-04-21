const app = getApp()

Page({
  data: {
    keyList: []
  },
  onLoad() {

  },
  click: function () {
    var that = this;
    const userCryptoManager = wx.getUserCryptoManager()
    userCryptoManager.getLatestUserKey({
      success: res => {
        const {
          encryptKey,
          iv,
          version,
          expireTime
        } = res
        var keyLists = that.data.keyList;
        var times = that.toDate(expireTime)
        keyLists.push({
          encryptKey,
          times
        });
        that.setData({
          keyList: keyLists
        })
        console.log(that.data.keyList)
        // console.log(encryptKey, iv, version, expireTime)
      }
    })

  },
  toDate: function (number) {

    var date = new Date(number);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var Min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var Sec = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return (Y + M + D + H + Min + Sec);
  }
})