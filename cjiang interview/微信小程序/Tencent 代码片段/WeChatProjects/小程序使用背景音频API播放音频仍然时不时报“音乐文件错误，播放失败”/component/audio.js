const backgroundAudioManager = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audio: {type: Array, value: []},   // 接收音频信息
    show: {type: Boolean, value: false}  //是否显示
  },

  /**
   * 组件的初始数据
   */
  data: {
    btn: '播放',
    audio_info: {
    },  // 音频信息
    duration: 0,  //音频总时长 单位：s
    current: 0, // 当前进度条位置
    seeked: false,  // 是否拖动状况
    playSpeed: ['1x', '1.25x', '1.5x', '1.75x', '2x'],  
    playbackRate: [1, 1.25, 1.5, 1.75, 2],  //播放速度
    playbackRate_index: 0,  
    playStyle: 1, // 播放方式 1-从之前听过的地方接着播放，2-从头播放
    paused: true  // 是否处于暂停状态
  },

  ready: function() {
    // 初始化播放器相关事件
    this.audioPlay_init();

    if(this.data.audio.length > 0) {
      this.setData({audio_info: this.data.audio[0]})
    }

  },

  observers: {
    duration: function(newValue) {
      console.log('observers duration= ' + newValue);
    },
    audio: function(newValue) {
      if(newValue.length > 0) {
        this.setData({audio_info: newValue[0]})
      }

      this.set_audio_play(this.data.playStyle)
    },
    show: function(newValue) {
      if(!newValue) {
        backgroundAudioManager.stop();
        this.setData({paused: true})
      }
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    audioPlay_init: function() {
      // 设置播放速度
      backgroundAudioManager.playbackRate = this.data.playbackRate[this.data.playbackRate_index];

      backgroundAudioManager.onPlay(() => {
        this.setData({paused: false})
      })

      backgroundAudioManager.onPause(() => {
        this.setData({paused: true})
      })

      backgroundAudioManager.onStop(() => {
        this.setData({paused: true})
      })

      // 结束播放事件
      backgroundAudioManager.onEnded(() => {
        this.setData({paused: true});

        backgroundAudioManager.title = this.data.audio_info.title;
        backgroundAudioManager.coverImgUrl = this.data.audio_info.coverImageUrl;
        backgroundAudioManager.src = this.data.audio_info.src;
        backgroundAudioManager.epname = this.data.audio_info.epname;
        backgroundAudioManager.singer = this.data.audio_info.singer;
        backgroundAudioManager.play();
      })

      // 监听播放进度更新事件
      backgroundAudioManager.onTimeUpdate(() => {
        if(!this.data.seeked && !this.data.paused) {

          this.data.duration = parseInt(backgroundAudioManager.duration);
          this.data.current = parseInt(backgroundAudioManager.currentTime);

          if(this.data.current != 0) {
            try{
              wx.setStorageSync('audio_' + this.data.audio_info.id, this.data.current);
            }catch(e){}
            
          }

        }
      })
    },
    set_audio_play(playStyle) {
      if(this.data.audio_info.src && backgroundAudioManager.src != this.data.audio_info.src) {
        backgroundAudioManager.stop();
        backgroundAudioManager.title = this.data.audio_info.title;
        backgroundAudioManager.coverImgUrl = this.data.audio_info.coverImageUrl;
        backgroundAudioManager.src = this.data.audio_info.src;
        backgroundAudioManager.epname = this.data.audio_info.epname;
        backgroundAudioManager.singer = this.data.audio_info.singer;
        backgroundAudioManager.seek(0);

        if(playStyle == 1) {
          try{
            var _seek = wx.getStorageSync('audio_' + this.data.audio_info.id);
            if(_seek - 5 > 0) {
              backgroundAudioManager.seek(_seek - 5);
            }
          } catch(e){}
        }

        backgroundAudioManager.play();
        
        this.setData({paused: false, btn: '暂停'})
      }
      if(!this.data.audio_info.src) {
        backgroundAudioManager.stop();
        this.setData({paused: true});
      }

     },
     // 播放按钮事件
     play: function() {
      this.setData({ playStyle: 1});
      this.set_audio_play(this.data.playStyle);

      if(this.data.paused) {
        backgroundAudioManager.play();
        this.setData({
          btn: '暂停',
          paused: false
        })
        
      } else {
        backgroundAudioManager.pause();
        this.setData({
          btn: '播放',
          paused: true
        })
      }
     }
  }
})
