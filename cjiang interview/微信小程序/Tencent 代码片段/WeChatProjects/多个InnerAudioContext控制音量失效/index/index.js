const app = getApp()
const a = wx.createInnerAudioContext();
const b = wx.createInnerAudioContext();
const c = wx.createInnerAudioContext();


Page({
  data: {

  },
  onLoad() {
   
    a.loop = true
    b.loop = true
    c.loop = true
    a.src = 'https://lsy-utils.oss-cn-beijing.aliyuncs.com/1.mp3'
    b.src = 'https://lsy-utils.oss-cn-beijing.aliyuncs.com/2.mp3'
    c.src = 'https://lsy-utils.oss-cn-beijing.aliyuncs.com/3.mp3'
  },
  slider(e){
    if(e.currentTarget.dataset.id == 0){
      a.volume = e.detail.value/10
    }else if(e.currentTarget.dataset.id == 1){
      b.volume = e.detail.value/10
    }else if(e.currentTarget.dataset.id == 2){
      c.volume = e.detail.value/10
    }
    console.log(a.volume,b.volume,c.volume)
  },
  play(){
    a.play();
    b.play();
    c.play();
  }
})
