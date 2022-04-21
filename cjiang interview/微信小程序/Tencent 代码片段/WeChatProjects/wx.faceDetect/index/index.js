const app = getApp()

Page({
  data: {

  },
  onLoad() {

  },
  imageUrlToArrBuffer(filePath) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: filePath,
        success: (res) => {
          wx.getFileSystemManager().readFile({
            filePath:res.tempFilePath,
            encoding: 'base64',
            success: function (data) {
              resolve(wx.base64ToArrayBuffer(data.data));
            }
          });
        }
      })
    });
  },
  async handleClick() {
    console.log('click')
    let imgInfo = {
      src: 'http://api.book.com/web/down/20220314/101/31EC221855EF66B7.jpg',
      width: 420,
      height: 346
    }
    let frameBuffer = await this.imageUrlToArrBuffer(imgInfo.src);
    let params = {
      frameBuffer,
      width: imgInfo.width,
      height: imgInfo.height,
      enablePoint: true
    };
    debugger;
    wx.initFaceDetect({
      success: () => {
        console.log('initFaceDetect')
        wx.faceDetect({
          ...params,
          success: (res) => {
            console.log('success', res)
            wx.stopFaceDetect();
          },
          fail: (err) => {
            console.log('fail', err)
            wx.stopFaceDetect();
          }
        })
      }
    })
  }
})