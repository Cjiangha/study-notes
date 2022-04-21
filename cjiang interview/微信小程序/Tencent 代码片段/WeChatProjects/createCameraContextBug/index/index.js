// const app = getApp()

Page({
  data: {
    
  },
  onShow() {
    
    this.setData({
      ctx: null,
      timer: null,
      recordArr: [],
      totalTime: 15,
      btnShow: true,
      src: '',
      videoSrc: ''
    })
    
    
  },
  onUnload() {
    clearInterval(this.data.timer)
  },
  tingzhi(){
    this.data.ctx.stopRecord({
      compressed: true,
      success: (res) => {
        console.log('停止 录制 返回的数据 ', res);
        this.data.recordArr.push(res.tempVideoPath)
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath,
          recordArr: this.data.recordArr
        })
        console.log('this.data.recordArr', this.data.recordArr);
        
        if (this.data.totalTime >= 0) this.startRecord()
      },
      fail: (err) => {
        console.log('停止 录制 错误, 错误信息，',err);
        if (this.data.totalTime >= 0) this.startRecord()
      }
    })
  },  
  startTimer() {
    this.setData({
      btnShow: false
    })
    
    this.data.timer = setInterval(() => {
      
      if (this.data.totalTime % 10 == 0) this.mainControl()
      this.data.totalTime--
      this.setData({
        totalTime: this.data.totalTime
      })
      if (this.data.totalTime <= 0) clearInterval(this.data.timer)
    }, 1000)
  },
  async mainControl() {
    await this.stopRecord()
  },
  async sleep(ms = 100) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  },
  async startRecord() {
    if (!this.data.ctx) {
      let ctx = wx.createCameraContext()
      this.setData({
        ctx: ctx
      })
      // await this.sleep(2000)
    }
    
    this.data.ctx.startRecord({
      success: (res) => {
        console.log('开始 录制 !',res)
      },
      fail: (err) => {
        console.log('开始 录制 错误 错误信息', err);
        
      }
    })
  },
  stopRecord() {
    if (this.data.totalTime >= 0) {
      this.startRecord()
      return
    } 
    this.data.ctx.stopRecord({
      compressed: true,
      success: (res) => {
        console.log('停止 录制 返回的数据 ', res);
        this.data.recordArr.push(res.tempVideoPath)
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath,
          recordArr: this.data.recordArr
        })
        console.log('this.data.recordArr', this.data.recordArr);
        
        if (this.data.totalTime >= 0) this.startRecord()
      },
      fail: (err) => {
        console.log('停止 录制 错误, 错误信息，',err);
        if (this.data.totalTime >= 0) this.startRecord()
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})