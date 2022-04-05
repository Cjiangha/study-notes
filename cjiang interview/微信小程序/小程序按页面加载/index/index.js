/*
  虚拟列表+节流+分页请求的优化
    // 场景：当遇到列表的内容超过最大的容量的时候，滚动条滚动到相应的位置之后，会加载loading 
             并按需进行加载相应的内容
       比如，现在列表中有4个list，每一次滚动到最底部的时候，我们需要加载多2个list。

       滚动到最下方的时候，触发节流，防抖？


*/

const app = getApp()

Page({
  data: {
    text: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    containSize: 0,
    isScrollStatus: true,
    istrue: false,
    teacherinformation: [{
      id: 1,
      place: '实验中心',
      professionalTitle: '高级实验师',
      name: '王小姐',
      gemder: '女',
      ischoose: true
    }, {
      id: 2,
      place: '实验中心',
      professionalTitle: '高级实验师',
      name: '王小姐',
      gemder: '女',
      ischoose: true
    }, {
      id: 3,
      place: '实验中心',
      professionalTitle: '高级实验师',
      name: '王小姐',
      gemder: '女',
      ischoose: true
    }, {
      id: 4,
      place: '实验中心',
      professionalTitle: '高级实验师',
      name: '王小姐',
      gemder: '女',
      ischoose: true
    }]
  },
  upupup(e) {
    console.log(e)
  },

  //模拟ajax，获取到数据后
  add() {
    let listarr = this.data.teacherinformation
    new Promise((resolve,reject)=>{
      resolve(123)
      wx.showLoading({
        title: '滚动到最底部',
      })
      setTimeout(() => {
        listarr.push({
          id: 3,
          place: '实验中心',
          professionalTitle: '高级实验师',
          name: '王小姐',
          gemder: '女',
          ischoose: true
        }, {
          id: 3,
          place: '实验中心',
          professionalTitle: '高级实验师',
          name: '王小姐',
          gemder: '女',
          ischoose: true
        }, {
          id: 3,
          place: '实验中心',
          professionalTitle: '高级实验师',
          name: '王小姐',
          gemder: '女',
          ischoose: true
        }, {
          id: 3,
          place: '实验中心',
          professionalTitle: '高级实验师',
          name: '王小姐',
          gemder: '女',
          ischoose: true
        })
      }, 1000)
      this.setData({
        teacherinformation:listarr
      })
    }).then((res)=>{
      wx.hideLoading({
        success: (res) => {},
      })
    })
    console.log(listarr)
  },
  scrolltoLower() {
    console.log('滚动到最底部')
 
    this.throttle(this.add(),1000)
  
  },


  // 2、节流
  throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
      
      let that = this
      let _args = arguments
      let now = +new Date()
      //判断是否有last
      if (last && now < last + delay) {
        clearTimeout(deferTimer)
        deferTimer = setTimeout(() => {
          last = now
          debugger
          fun.apply(that, _args)
        }, delay);
      } else { //
        last = now
        fun.apply(that, _args)
      }
      
    }
  }

})