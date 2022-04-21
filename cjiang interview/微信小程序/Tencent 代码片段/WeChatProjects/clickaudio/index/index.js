const app = getApp()
var audio1;
var audio2;
Page({
  data: {

  },
  onLoad() {
    audio1 = wx.createInnerAudioContext({"useWebAudioImplement":true})
    audio1.volume = 1.0
    audio1.src = '/1.wav'

    audio2 = wx.createInnerAudioContext({"useWebAudioImplement":true})
    audio2.volume = 1.0
    audio2.src = '/2.wav'
  },

  play1:function() {
    //两个问题 (iphone 11 pro max工作正常； ipad pro 2020 11寸有两个问题，微信都是最新版：
    //1. 1.wav 和 2.wav 不同，iphone上播放是对的，ipad pro上播放的竟然是同一个声音？
    //2. 在ipad pro上有明显的严重延迟，在iphone上就没有延迟。
    
    audio1.play();
  },

  play2:function() {
    //两个问题 (iphone 11 pro max工作正常； ipad pro 2020 11寸有两个问题，微信都是最新版：
    //1. 1.wav 和 2.wav 不同，iphone上播放是对的，ipad pro上播放的竟然是同一个声音？
    //2. 在ipad pro上有明显的严重延迟，在iphone上就没有延迟。
    
    audio2.play();
  }
})
