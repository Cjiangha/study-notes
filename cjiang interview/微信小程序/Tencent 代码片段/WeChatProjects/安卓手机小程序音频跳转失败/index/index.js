const app = getApp()

Page({
  data: {
    video_url: 'https://yun-src.leju.com/2-2-CMZ7q1zu8D2yvaOYWQa0LxQSBy2Z5WwuDtxzZxEukR8Mo7U3LIakTbjlUf70McpnjT3clqYOmlSUoLly.mp3',
    play: false, // 播放按钮状态
    playRate: '1.0', // 倍速
    showTime: '00:00', // 当前播放时间
    allTime: '00:24', // 总时长
    playText: '倍速', // 倍速文案
    audioTime: 0, // 播放条value
    speed_list: [{text: '2.0x', val: '2.0'},{text: '1.5x', val: '1.5'},{text: '1.0x', val: '1.0'}, {text: '0.5x', val: '0.5'}], // 倍速选择
    platform: 'ios'
  },
  onLoad() {
    this.AudioContext = wx.createInnerAudioContext()
    this.AudioContext.src = this.data.video_url;
    this.AudioContext.onTimeUpdate(() => {
      let time = parseInt(100 * this.AudioContext.currentTime / this.AudioContext.duration)
      let min = parseInt(this.AudioContext.currentTime / 60);
      let sec = parseInt(this.AudioContext.currentTime % 60);
      //补零
      if (min.toString().length == 1) {
        min = `0${min}`
      }
      if (sec.toString().length == 1) {
        sec = `0${sec}`
      }
      console.log(new Date().getMinutes(), new Date().getSeconds())
      console.log('进度', this.AudioContext.currentTime + "  " + this.AudioContext.duration, +' ' + this.AudioContext.playbackRate)
      this.setData({
        'audioTime': time,
        'showTime': `${min}:${sec}`
      })
    })
    this.AudioContext.onSeeked(() => {
    console.log(222)
    console.log(this.AudioContext.currentTime)
    //this.AudioContext.play()
    })

    this.AudioContext.onEnded(() => {
      setTimeout(() => {
          this.setData({
            'play': false,                      
            'audioTime': 0,
            'showTime': '00:00',
          })
      }, 500);
    })
    this.getSystemInfo()
  },
  getSystemInfo() {
    let systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo.platform)
    this.setData({
      'platform': systemInfo.platform
    })
  },
  audioPause() {
    this.AudioContext.pause()
    this.setData({
      'play': false
    })
  },
  audioPlay({currentTarget: {dataset: { playRate, audioTime }}}) {
    console.log('playRate', playRate , 'audioTime', audioTime)
    this.AudioContext.pause()
    this.AudioContext.playbackRate = Number(playRate)
    setTimeout(() => {
      this.AudioContext.play()
    }, 200);
    this.setData({
      'play': true
    })
  }, 
  sliderChange({currentTarget: { dataset: {playRate} }, detail: {value}}) {
    let newVal = parseInt(this.AudioContext.duration * (value / 100))
    console.log(playRate)
    this.AudioContext.playbackRate = Number(playRate)
    if (this.platform != 'android') {
      this.AudioContext.pause()
      this.AudioContext.seek(Number(newVal))
    } else {
      this.AudioContext.play()
      this.AudioContext.pause()
      this.AudioContext.seek(newVal)
    }
    setTimeout(() => {
      this.AudioContext.play()
    }, 200);

    this.setData({
      'play': true
    })
  }, 
  sliderChangeIng() {
    this.AudioContext.pause()
  },
  showRateList({currentTarget: {dataset: { index }}}) {
    this.setData({
      'showRate': !this.data.showRate
    })
  },
  changeRate({currentTarget: {dataset: { text, rate }}}) {
    this.AudioContext.pause()
    this.AudioContext.playbackRate = Number(rate)
    setTimeout(() => {
      this.AudioContext.play()
    }, 200)
    this.setData({
      "showRate" : false,
      "playRate" : rate,
      "playText" : text
    })
},
})
