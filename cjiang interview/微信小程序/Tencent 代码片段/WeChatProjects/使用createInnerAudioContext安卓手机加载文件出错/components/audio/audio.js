Component({
  properties: {
    src: {
      type: String,
      value: '',
    },
    aid: {
      type: Number | String,
      value: '',
    },
    isDelButton: {
      type: Boolean,
      value: true,
    },
    isDelPopup: {
      type: Boolean,
      value: false,
    },
    delPopupText: {
      type: String,
      value: '您确认要删除这段语音吗？',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    autoplay: {
      type: Boolean,
      value: false,
    },
  },
  options: {
    styleIsolation: 'isolated',
  },
  data: {
    isPlay: false,
    currentTime: 0,
    duration: '',
    timer: null,
    pause: false,
    audioSrc: '',
  },
  methods: {
    // 点删除
    del() {
      if (this.properties.isDelPopup) {
        return wx.showModal({
          title: '提示',
          content: this.properties.delPopupText,
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#b2b2b2',
          confirmText: '确定',
          confirmColor: '#00B389',
          success: (result) => {
            if (result.confirm) {
              this.triggerEvent('delete', {
                type: 'audio',
                src: this.properties.src,
                fileId: this.properties.aid,
              })
            }
          },
        })
      }
      this.triggerEvent('delete', {
        type: 'audio',
        src: this.properties.src,
        fileId: this.properties.aid,
      })
    },
    // 点击或拖拽步进器切换到对应进度完成后的事件
    sliderChange({ detail }) {
      this.data.pause = true
      this.InnerAudioContext.seek(detail.value)
    },
    // slider 实时变化值
    sliderChanging({ detail }) {
      this.InnerAudioContext.pause()
      this.setData({
        currentTime: detail.value,
      })
    },
    // 播放语音
    play(isLoading = true) {
      if (this.properties.disabled) return null
      isLoading && wx.showLoading({
          title: '加载中',
          mask: true,
        })

      // audio 音频
      this.InnerAudioContext =wx.createInnerAudioContext()
      this.InnerAudioContext.src = this.data.audioSrc
      this.getTime()

      // 音频是否可以开始播放，不保证后面会流畅
      this.InnerAudioContext.onCanplay(() => {
        console.log('我正在播放了！！！！！！！！！')
        this.setData({
          isPlay: true,
        })
        this.InnerAudioContext.play()
        wx.hideLoading()
      })

      // 出错
      this.InnerAudioContext.onError((e) => {
        // wx.hideLoading()
        console.log(e)
        this.stopEvent()
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          mask: true,
        })
      })

      // 步进器操作完成
      this.InnerAudioContext.onSeeked(() => {
        this.data.pause = false
        this.InnerAudioContext.play()
      })

      // 暂停播放
      // this.InnerAudioContext.onPause(this.stopEvent.bind(this))

      // 监听播放进度更新
      this.InnerAudioContext.onTimeUpdate(() => {
        this.getTime()
      })

      // 自然播放结束
      this.InnerAudioContext.onEnded(this.stopEvent.bind(this))
    },
    // 播放操作
    playbackOperation() {
      console.log('playbackOperation')
      if (this.data.isPlay) {
        return this.stopEvent()
      }
      this.play()
    },
    // 获取当前播放时间
    getTime() {
      this.setData({
        currentTime: parseInt(this.InnerAudioContext.currentTime),
      })
    },
    // 停止播放并销毁
    stopEvent() {
      if (this.data.pause) return null
      this.setData({
        isPlay: false,
        currentTime: 0,
      })
      this.InnerAudioContext && this.InnerAudioContext.destroy()
    },
  },
  observers: {
    // 获取总时长
    src(link) {
      if (link) {
        this.properties.autoplay &&
          wx.showLoading({
            title: '加载中',
            mask: true,
          })
        this.data.audioSrc = link
        let innerAudioContext = wx.createInnerAudioContext()
        innerAudioContext.autoplay = true
        innerAudioContext.src = link
        innerAudioContext.onPlay(() => {
          innerAudioContext.pause()
          innerAudioContext.duration
          innerAudioContext.currentTime
          setTimeout(() => {
            this.setData({
              duration: parseInt(innerAudioContext.duration),
              currentTime: parseInt(innerAudioContext.currentTime),
            })
            wx.nextTick(() => {
              innerAudioContext.destroy()
              this.properties.autoplay && this.play(false)
            })
          }, 100)
        })
      }
    },
  },
  pageLifetimes: {
    hide() {
      this.stopEvent()
    },
  },
  lifetimes: {
    attached() {
      wx.setInnerAudioOption({
        mixWithOther: false,
        obeyMuteSwitch: false,
      })
    },
    detached() {
      this.InnerAudioContext && this.InnerAudioContext.destroy()
    },
  },
})
