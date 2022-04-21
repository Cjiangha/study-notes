const app = getApp()

Page({
  data: {
    audioList:['https://duanshifu.oss-cn-beijing.aliyuncs.com/video/20220225/tempUploadAudio.1.mp3.mp3', 
               'https://duanshifu.oss-cn-beijing.aliyuncs.com/picture/20220224/1645674419842.mp3',
               'https://duanshifu.oss-cn-beijing.aliyuncs.com/file/20220224/202202240959401368.mp3'
              ],
    backgroundAudioPlayer: null,
    isAudioPlaying: false,
    isAudioWaiting: false,
    currentAudioPlayIndex: 0,
    currentTime: 0,
    duration: 0,
    currentTimeShow: '00:00:00',
    durationShow: '00:00:00',
    progress: 0,
    startSeek: false,
  },
  onLoad() {
    this.configAudioPlayer()
    this.setData({isAudioPlaying: true})
    this.playCurrentAudio()
  },
  // 初始化音乐播放器
  configAudioPlayer: function () {
    var that = this
    
    this.data.backgroundAudioPlayer = wx.getBackgroundAudioManager()
    this.data.backgroundAudioPlayer.onPlay((res) => {
      // that.setData({
      //   isAudioPlaying: true,
      //   isAudioWaiting: false
      // })
      console.log('backgroundAudioPlayer onPlay')
    })
    this.data.backgroundAudioPlayer.onPause((res) => {
      // that.setData({
      //   isAudioPlaying: false
      // })
      console.log('backgroundAudioPlayer onPause')
    })
    this.data.backgroundAudioPlayer.onStop((res) => {
      that.setData({
        isAudioPlaying: false
      })
      console.log('backgroundAudioPlayer onStop')
    })
    this.data.backgroundAudioPlayer.onEnded((res) => {
      that.setData({
        isAudioWaiting: true
      })
      that.playNextAudio()
      console.log('backgroundAudioPlayer onEnded')
    })
    this.data.backgroundAudioPlayer.onPrev(() => {
      that.setData({
        isAudioWaiting: true
      })
      that.playPreviousAudio()
      console.log('backgroundAudioPlayer onPrev')
    })
    this.data.backgroundAudioPlayer.onNext(() => {
      that.setData({
        isAudioWaiting: true
      })
      that.playNextAudio()
      console.log('backgroundAudioPlayer onNext')
    })
    this.data.backgroundAudioPlayer.onCanplay(() => {
      that.setData({
        isAudioWaiting: false
      })
      console.log('backgroundAudioPlayer onCanplay')
    })
    this.data.backgroundAudioPlayer.onWaiting(() => {
      that.setData({
        isAudioWaiting: true
      })
      console.log('backgroundAudioPlayer onWaiting')
    })
    this.data.backgroundAudioPlayer.onError((error) => {
      that.setData({
        isAudioPlaying: false,
        isAudioWaiting: false
      })
      console.log('backgroundAudioPlayer onError')
    })
    this.data.backgroundAudioPlayer.onTimeUpdate(() => {
      that.data.duration = that.data.backgroundAudioPlayer.duration
      that.data.currentTime = that.data.backgroundAudioPlayer.currentTime

      var currentTimeShow = that._formatTime(that.data.currentTime)
      var durationShow = that._formatTime(that.data.duration)
      var progress = that.data.currentTime / that.data.duration * 100
      that.setData({
        durationShow: durationShow,
        currentTimeShow: currentTimeShow,
        progress: progress
      })

      // console.log(`currentPlayTime:${that.data.backgroundAudioPlayer.currentTime}---currentDuration:${that.data.backgroundAudioPlayer.duration}`)
      // if (that.data.duration > 0 && that.data.currentTime >= parseInt(that.data.duration)) {
      //   that.data.isAudioWaiting = true
      //   that.playNextAudio()
      //   console.log('backgroundAudioPlayer onTimeEnded')
      // }
    })
  },

  playPreviousAudio: function () {
    if (this.data.currentAudioPlayIndex <= 0 || !this.data.audioList.length) {
      wx.showToast({
        icon: 'none',
        title: '暂无上一首',
      })
      return
    }
    var currentAudioPlayIndex = this.data.currentAudioPlayIndex -= 1
    this.setData({
      currentAudioPlayIndex
    })
    this.playCurrentAudio()
  },

  playNextAudio: function () {
    if (this.data.currentAudioPlayIndex >= this.data.audioList.length - 1 || !this.data.audioList.length) {
      wx.showToast({
        icon: 'none',
        title: '暂无下一首',
      })
      return
    }
    var currentAudioPlayIndex = this.data.currentAudioPlayIndex += 1
    this.setData({
      currentAudioPlayIndex
    })
    this.playCurrentAudio()
  },

  playCurrentAudio: function () {
    if (!this.data.backgroundAudioPlayer) {
      this.configAudioPlayer()
    }
    var url = this.data.audioList[this.data.currentAudioPlayIndex]
    if (this.data.backgroundAudioPlayer.src != url) {
      this.data.backgroundAudioPlayer.title = `Music-${this.data.currentAudioPlayIndex + 1}`
      this.data.backgroundAudioPlayer.epname = 'epname'
      // this.data.backgroundAudioPlayer.coverImgUrl = ''
      this.data.backgroundAudioPlayer.src = url
    }else {

    }
    // this.data.backgroundAudioPlayer.play()
  },

  onClickedPlay: function () {
    if (this.data.isAudioWaiting){
      return
    }
    var isAudioPlaying = !this.data.isAudioPlaying;
    this.setData({isAudioPlaying})
    if (this.data.isAudioPlaying) {
      this.data.backgroundAudioPlayer.play()
    }else {
      this.data.backgroundAudioPlayer.pause()
    }
  },

  onClickedPrevious: function () {
    if (this.data.currentAudioPlayIndex <= 0 || !this.data.audioList.length) {
      wx.showToast({
        title: '暂无上一首音乐',
      })
      return
    }
    this.data.isAudioWaiting = true
    this.playNextAudio()
  },

  onClickedNext: function () {
    if (this.data.currentAudioPlayIndex >= this.data.audioList.length - 1 || !this.data.audioList.length) {
      wx.showToast({
        icon: 'none',
        title: '暂无下一首音乐',
      })
      return
    }
    this.data.isAudioWaiting = true
    this.playNextAudio()
  },
  
  onSeekBegin: function () {
    this.setData({
      startSeek: true
    })
  },

  onDrag: function (e) {
    let progress = e.detail.value
    let currentTime = this.data.duration / 100 * progress
    this.setData({
      currentTime: currentTime
    })
  },

  onSeek: function (e) {
    let progress = e.detail.value
    let currentTime = this.data.duration / 100 * progress
    this.data.backgroundAudioPlayer.seek(currentTime)
    this.setData({
      startSeek: false
    })
    if (!this.data.isAudioPlaying) {
      this.data.backgroundAudioPlayer.resume()
    }
  },
  
  // 图片加载失败处理
  onImageError: function () {
    var datas = this.data.datas
    datas[this.data.currentPlayIndex].picurl = '/image/placeholder.png';
    this.setData({
      datas:datas
    })
  },

  //格式化播放时间
  _formatTime: function (interval) {
    interval = interval | 0
    const hour = this._pad(interval / 60 / 60 | 0)
    const minute = this._pad(interval / 60 | 0)
    const second = this._pad(interval % 60)
    return `${hour}:${minute}:${second}`
  },
  _pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }

  
})
