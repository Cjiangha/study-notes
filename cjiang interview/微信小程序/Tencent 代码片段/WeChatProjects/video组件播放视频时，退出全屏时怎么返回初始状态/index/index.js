function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myvideo');
  },
  data: {
    files: {}
  },
  selectVideo(e) {
    wx.chooseVideo({
      success: file => {
        this.upload(file).then(res => {
          console.log(file);
          const files = {
            src: file.tempFilePath
          }
          this.setData({
            files
          })
        })
      }
    })
  },
  previewVideo(e) {
    this.videoContext.requestFullScreen();
    this.videoContext.play();
  },
  upload(file) {
    wx.showLoading({
      title: '正在上传...',
    })
    // 模拟上传
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.hideLoading();
        resolve({
          tempFilePath: 'https://sinochem-agri-fr.oss-cn-beijing.aliyuncs.com/wxmapfarm/1647482288338.mp4'
        });
      }, 100)
    })
  },
  fullscreenchange(e) {
    if (!e.detail.fullScreen) {
      console.log('暂停播放')
      this.videoContext.seek(0);
      this.videoContext.pause();
    }
  }
})