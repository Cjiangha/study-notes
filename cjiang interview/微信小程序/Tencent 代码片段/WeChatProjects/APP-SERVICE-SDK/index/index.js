const app = getApp()

Page({
  data: {

  },
/**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const {list} = this.data;
    return {
      title: list.title,
      path: `/pages/Graphicmaterial/Graphicmaterial?id=${list.id}&code=88`  //这个地址需要把页面路径拼接的参数发送出去,直写页面地址的话，别人进入会是空的页面
    }
  },
  onShareTimeline: function(res){
    // const {list} = this.data;
    return {
      title: 1212, //字符串  自定义标题
      query: `id=${list.id}&code=88`,  //页面携带参数
      // imageUrl:'https://msd.zpvisa.cn/bacco/app/download?file_id=615425cc83ac23111bbb3981'
    }
  }
})
