const app = getApp()

Page({
  data: {
    videoUrl: "",
    video1:"https://baijiayun-wangxiao-public.oss-cn-beijing.aliyuncs.com/zhiya/AI%20formal/PMtySoft/tiku/AI%E9%9D%A2%E8%AF%95%E5%A5%97%E9%A2%98%EF%BC%88%E6%B5%8B%E8%AF%95%EF%BC%89-%E9%80%9A%E7%94%A8%E4%BA%A7%E5%93%81%E5%B2%97-%E6%B8%A9%E6%9F%94%E7%89%88-%E9%A2%98%E7%9B%AE2.mp4",
    video2:"https://baijiayun-wangxiao-public.oss-cn-beijing.aliyuncs.com/zhiya/AI%20formal/PMtySoft/tiku/AI%E9%9D%A2%E8%AF%95%E5%A5%97%E9%A2%98%EF%BC%88%E6%B5%8B%E8%AF%95%EF%BC%89-%E9%80%9A%E7%94%A8%E4%BA%A7%E5%93%81%E5%B2%97-%E6%B8%A9%E6%9F%94%E7%89%88-%E9%A2%98%E7%9B%AE1.mp4"
  },
  onReady() {
    this.videoContext = wx.createVideoContext('video')
  },
  onShow(){
    this.setData({
      videoUrl:this.data.video1
    })
    this.videoContext = wx.createVideoContext('video')
    this.videoContext.requestFullScreen({ direction: 0 })
  },
  videoEnd(){
    this.setData({
      videoUrl:this.data.video2
    })
  },
})
