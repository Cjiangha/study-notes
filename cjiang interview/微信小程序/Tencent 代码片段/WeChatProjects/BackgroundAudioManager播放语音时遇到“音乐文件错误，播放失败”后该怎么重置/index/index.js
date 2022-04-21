const app = getApp()

Page({
  data: {
    isShow: false, // 是否显示播放面板
    audio: []   // 传递给自定义组件的音频参数
  },
  onLoad() {

  },
  start: function() {
    this.setData({
      isShow: true,
      audio: [{
        title: 'demo1',
        coverImageUrl: 'https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/images/jie02.jpg?sign=00e5e68d81145037000a162e2220736a&t=1556345760',
        src: 'https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/song/%E6%88%91%E4%BB%AC%E9%83%BD%E4%B8%80%E6%A0%B7%20-%20%E5%BC%A0%E6%9D%B0.mp3?sign=008d62b6bea06a8a6814b5f284fac0ac&t=1556345730',
        epname: 'demo1',
        singer: 'demo1',
        id: '1001'
      }]
    })
  }
})
