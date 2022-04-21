const app = getApp()

Page({
  data: {
    listPage:{
      page:0,
      page_count:1,
    },
    list:[],
  },
  getList(){
    // 模拟获取列表
    setTimeout(() => {
      this.setData({
        list:[1,2,3,4,5,6,7,8,9,0],
        listPage:{
          page:1,
          page_count:1,
        },
      })
    }, 1000);
  },
  onLoad: function () {
    this.getList();
  },
})
