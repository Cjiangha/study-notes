function getRandomColor () {
  const rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')

    wx.openChannelsLive({
      finderUserName: 'sphvpgP4SMjqiyZ',
      success:res=>{
        console.log(res);
      },
      fail:res=>{
        console.log(res);
      }
    })
  },
  inputValue: '',
    data: {
    src: '',
    danmuList:
      [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
    },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  errorFunc: function(err){
    console.log(err,"======视频播放失败")
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  bindPlay: function() {
    this.videoContext.play()
  },
  bindPause: function() {
    this.videoContext.pause()
  },
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  gotoVideo: function(){

wx.openChannelsLive({
  finderUserName: 'videoID',
  success: res => {
      console.log('openChannelsLive成功', res)
  },
  fail: res => {
      console.log('openChannelsLive-fail', res)
      if (res.errMsg !== 'openChannelsLive:fail cancel') {
          Toast.show({
              icon: 'none',
              content: '系统开小差了，请稍后试试~'
          })
      }
  }
})
  }
})