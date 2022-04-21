const app = getApp()
var recorderManager = null //录音对象
Page({
  data: {
    options: {
      duration: 600000, //指定录音的时长，单位 ms 最长十分钟
      sampleRate: 44100, //采样率 44100  64000 ~ 320000
      numberOfChannels: 2, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB 传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
      audioSource: 'auto',
    }, //参数
  },
  onLoad() {
    recorderManager = wx.getRecorderManager(); //实例化录音对象 
  },
  //开始录音
  startAudio() {
    var that=this;
    //开始录音
    console.log('开始录音', that.data.options)
    recorderManager.start(that.data.options);
    recorderManager.onStart(() => {});
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //结束录音
  endAudio() {
    var that=this;
    recorderManager.stop();
    recorderManager.onStop((res) => {
      //console.log("录音文件：",res.tempFilePath) 
      wx.uploadFile({
        filePath: res.tempFilePath,
        name: '录音',
        header:{"memberID":"1"},
        url: 'http://demo.powersunsoft.com:20112/ReadWeb/public/wxMiniAppHandler.ashx?command=getAudioFile',
        success:(res)=>{
        var  data = JSON.parse(res.data)
          console.log("录音文件路径：",data.data)
          that.setData({
            audioFileUrl:data.data
          })
        }
      })
    })
  }
})