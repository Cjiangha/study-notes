const app = getApp()
Page({
  data: {
    rate: 1
  },
  onLoad: function (options) {

    let type = options.type
    this.innerAudioContext = wx.createInnerAudioContext()
    if (type == 1) {
      this.innerAudioContext.src = 'http://haya-cloud.oss-cn-shanghai.aliyuncs.com/oneLight/1645681784381culture.mp3'
    }else if(type==2){
      this.innerAudioContext.src = 'http://haya-cloud.oss-cn-shanghai.aliyuncs.com/oneLight/1636362673254mpmpmpmpmp.mp3'
    }

    
    console.log(this.innerAudioContext)


  },
  onUnload(){
    this.innerAudioContext.stop()
    this.innerAudioContext.destroy()
  },
  seed() {

    this.innerAudioContext.playbackRate = 2
    this.innerAudioContext.pause();
 
    let that = this
    that.innerAudioContext.onCanplay(() => {
      // 必须。可以当做是初始化时长
      that.innerAudioContext.duration;

      setTimeout(() => {
        that.innerAudioContext.seek(Number(that.innerAudioContext.currentTime))
      }, 500)
    })

    setTimeout(() => {
      that.innerAudioContext.play();
      console.log(this.innerAudioContext)
    }, 600)
   
  },
  play() {

    this.innerAudioContext.play();
  }
})