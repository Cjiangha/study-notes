/*
  虚拟列表+节流+分页请求的优化
    // 场景：当遇到列表的内容超过最大的容量的时候，滚动条滚动到相应的位置之后，会加载loading 
             并按需进行加载相应的内容
       比如，现在列表中有4个list，每一次滚动到最底部的时候，我们需要加载多2个list。


*/ 

const app = getApp()

Page({
  data: {
    text:[1,2,3,4,5,6,7,8,9,10,11,12,13],
    containSize:0,
    isScrollStatus:true,
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
  // onReady() {
  //     this.getContainSize();
  // },

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
    })
  },
 



  // 定义滚动行为事件方法
  handleScroll(data) {
    if (this.data.isScrollStatus) {
      this.data.isScrollStatus = false;
      // 节流，设置一个定时器，1秒以后，才允许进行下一次scroll滚动行为
      let mytimer = setTimeout(() => {
        this.data.isScrollStatus = true;
        clearTimeout(mytimer);
      }, 17)

      this.setDataStartIndex(data);
    }
  },


  // 




  // 执行数据设置的相关任务， 滚动事件的具体行为
  // setDataStartIndex(data) {
  //   // console.log("scroll active")
  //   this.data.startIndex = ~~(data.detail.scrollTop / this.data.oneHeight);
  //   // 通过scrollTop滑动后距离顶部的高度除以每个元素的高度，即可知道目前到第几个元素了
  //   this.setData({
  //     showDataList: this.data.allDatalist.slice(this.data.startIndex, this.data.endIndex)
  //   })
  //   // 动态截取实际拥有10000条数据的数组中下标为startIndex到endIndex的数组出来呈现在前端页面上

  //   // 容器最后一个元素的索引
  //   if (this.data.startIndex + this.data.containSize <= this.data.allDatalist.length - 1) {
  //     this.setData({
  //       endIndex: (!this.data.allDatalist[this.data.endIndex]) ? this.data.allDatalist.length - 1 : this.data.startIndex + this.data.containSize
  //       // 滚动到底部了吗，是的话那就将endIndex设置为9999，不然的话设置为startIndex+视口最大容量
  //     })
  //   } else {
  //     console.log("滚动到了底部");
  //     this.data.pageNumNow++;
  //     // 例如一次性从数据库拿10条数据赋值到allDataList，如果滚动到底部(即allDataList所有数据都已经呈现了)，那就再次向服务器发送请求获取数据库中的下10条数据
      
  //     this.addMes(); // 该函数内就写你实际向数据库请求时的代码，请求成功后拼接到allDataList即可
  //     console.log(this.data.allDatalist.length)
  //   }
  // },
})
