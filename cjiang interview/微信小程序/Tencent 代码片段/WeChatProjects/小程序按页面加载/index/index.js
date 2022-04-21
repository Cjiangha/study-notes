/*
  虚拟列表+节流+分页请求的优化
    // 场景：当遇到列表的内容超过最大的容量的时候，滚动条滚动到相应的位置之后，会加载loading 
             并按需进行加载相应的内容
       比如，现在列表中有4个list，每一次滚动到最底部的时候，我们需要加载多2个list。

       wx.getSystemInfoSync() // 获取到屏幕的height
       wx.createSelectorQuery().select('#scrollContainer').boundingClientRect() 的function回调可以拿到

*/ 
const app = getApp()

Page({
  data: {
    text:[1,2,3,4,5,6,7,8,9,10,11,12,13],
    containSize:0,
    isScrollStatus:true,
    contentHeight:0,
     teacherinformation:[{
       id:1,
       place:'实验中心',
       professionalTitle:'高级实验师',
       name:'王小姐',
       gemder:'女',
       ischoose:true
     },{
       id:2,
      place:'实验中心',
      professionalTitle:'高级实验师',
      name:'王小姐',
      gemder:'女',
      ischoose:true
    },{
      id:3,
      place:'实验中心',
      professionalTitle:'高级实验师',
      name:'王小姐',
      gemder:'女',
      ischoose:true
    },{
      id:4,
      place:'实验中心',
      professionalTitle:'高级实验师',
      name:'王小姐',
      gemder:'女',
      ischoose:true
    }]
  },
  upupup(e){
    console.log(e)
  },

  onPageScroll(e){
    console.log(e)
  },
  onReady() {
      this.getContainSize();
  },

  getContainSize() {
    // boundingClientRect 拿到的值是所见的可视区的相应的返回值
    wx.createSelectorQuery().select('#scrollContainer').boundingClientRect(function (rect) {
      rect.id // 节点的ID
      rect.dataset // 节点的dataset
      rect.left // 节点的左边界坐标
      rect.right // 节点的右边界坐标
      rect.top // 节点的上边界坐标
      rect.bottom // 节点的下边界坐标
      rect.width // 节点的宽度
      rect.height // 节点的高度
      console.log(rect)
    }).exec((option) => {
      // console.log(~~(option[0].height / this.data.oneHeight) + 2);
      console.log(option)
      // 该容器的高度 、 this
      this.setData({
        oneHeight:20+ 374
      })
      // 加2  加两个list
      let Size  = ~~(option[0].height / this.data.oneHeight) + 2;
      this.setData({
        containSize:Size
      })
      console.log('Size',Size,this.data.containSize)
        // 容器的高度
      let Size  = option[0].height
      this.setData({
        contentHeight:option.height
      })
    })
  },
 




})
