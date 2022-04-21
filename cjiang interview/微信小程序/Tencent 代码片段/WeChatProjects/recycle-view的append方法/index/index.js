const app = getApp()
const createRecycleContext = require('miniprogram-recycle-view')
const getData = (page, size) =>{
    let num = (page - 1) * size + 1;
    let array = [];
    for (let index = 0; index < size; index++) {
      array.push({num});
      num++;
    }
    return array
}

Page({
  data: {
    page:1,
    size: 10,
  },
  onReady: function() {
    this.ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 375,
        height: 100
      }
    });
    // this.ctx.append(getData(this.data.page,this.data.size))
  },
  recycleScrollToBottom() {
    this.data.page += 1;
    // this.ctx.append(getData(this.data.page,this.data.size))
  }
})
