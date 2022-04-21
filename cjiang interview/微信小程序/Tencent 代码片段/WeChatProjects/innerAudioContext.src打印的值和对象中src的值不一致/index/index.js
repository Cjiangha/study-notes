const app = getApp()

Page({
  data: {
    innerAudioContext:null,
    index: 0,
    resPath:'https://resource.ew.com.cn/weeklyResource/0017804650/001780465000/'
  },
  onLoad(e) {
    console.log(e)
    console.log(wx.createTCPSocket())
    let that = this
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
    let src = that.data.resPath + that.data.index + '/question.mp3'
    that.playAudio(src)
    console.log('index',that.data.index)
  },
  onShow: function () {
    let that = this;
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     animationShowHeight = res.windowHeight;
    //   }
    // })
    that.audioPlay();

    // //进度条变化   
    // innerAudioContext.onTimeUpdate(() => {
    //   that.funtimeupdate();
    // })
  },
  onHide: function () {
    this.data.innerAudioContext.stop();
    this.data.innerAudioContext.destroy();
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.innerAudioContext.stop();
    this.data.innerAudioContext.destroy();
  },
  playAudio:function(src) {
    let that = this
    that.data.innerAudioContext = wx.createInnerAudioContext()
  //   if (wx.setInnerAudioOption) {
  //     wx.setInnerAudioOption({
  //      mixWithOther:false,
  //      obeyMuteSwitch: false,
  //      autoplay: true,
  //      success:function(e) {
  //        console.log("5555555555555555555555555555555555555")
  //      }
  //    })
  //  } else {
  //   that.data.innerAudioContext.obeyMuteSwitch = false;
  //   that.data.innerAudioContext.autoplay = true;
  //  }
    that.data.innerAudioContext.src = src

    that.data.innerAudioContext.onCanplay(function getDuration() {
      console.log("onCanplay事件")
      let timer = setInterval(function() {
        that.data.innerAudioContext.duration;
         if (that.data.innerAudioContext.duration) {
           let duration = that.data.innerAudioContext.duration
          //  that.setData({
          //    duration:that.fn1(parseInt(duration / 60), 2) + ':' + that.fn1(parseInt(duration % 60), 2)
          //  })
          clearInterval(timer);
         }
      }, 500);
    })

    that.data.innerAudioContext.onTimeUpdate(() => {
      console.log("onTimeUpdate事件")
      // that.funtimeupdate();
    })

    that.data.innerAudioContext.onEnded(() => {
      console.log('音频自然播放结束事件');
      that.funended();
    });

    that.data.innerAudioContext.onStop(()=> {
      console.log("onStop事件")
    })

    that.data.innerAudioContext.onError((res)=> {
       console.log("错误事件：",res.errMsg,res.errCode)
    })
    that.data.innerAudioContext.onPlay(()=>{
      console.log("onPlay事件：")
    })
  },
  audioPlay: function (src) {
    var that = this;
    that.data.innerAudioContext.playbackRate = 1.5
    //that.data.innerAudioContext.pause()
    that.data.innerAudioContext.play();
 
   console.log("倍速：",that.data.innerAudioContext.playbackRate)
   console.log("src:",that.data.innerAudioContext.src)
   console.log(that.data.innerAudioContext)
  },
  funended: function (e) {
    var that = this;

      that.data.index++;

      console.log("停止播放。。。。。。。。。。。。。。。。。。。。。")
      that.data.innerAudioContext.stop()

      that.data.innerAudioContext.src = that.data.resPath + that.data.index + "/question.mp3";
      setTimeout(function(){
        that.audioPlay();
      },200)
      // that.getdata();
      // that.getText();
  },

  onShareTimeline(){
    return{
      title:'123',
      query:'a=1&b=2',
      imageUrl:'http://mmbiz.qpic.cn/mmbiz_png/noF2H9nbRENG4XQSQcUs59J1oytmtomiapDk9ibicfHLeX3iageMa1c6LrjANsfkC80YCiccgQ6uuI9gYQc5oVfEz0g/0?wx_fmt=png'
    }
  },
  onShareAppMessage(){
    return{

    }
  }
})
