Page({
    onLoad: function () {
        var _this = this;
        var str = 'http://jwgl.thxy.edu.cn/yzm?d'
        // console.log('时间戳为：', new Date().getTime());​
        wx.downloadFile({
          url: str,
          success: function (res) {
            console.log(res);
            _this.setData({
              header: {
                'cookie': res.header['Set-Cookie'],
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36 Edg/96.0.1054.29'
              }
            });
            _this.setData({
              img: res.tempFilePath
            })
          }
        })
      },


})
