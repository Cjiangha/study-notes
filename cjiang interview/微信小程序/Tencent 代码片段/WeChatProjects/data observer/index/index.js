Component({
    // 属性定义（详情参见下文）
    // properties: {
    //   numberA,
    //   numberB,
    //   sum // 简化的定义方式
    // },
  observers: {
    'numberA, numberB': function (numberA, numberB) {
      this.setData({
        sum: numberA + numberB
      })
    }
  },  
  attached: function () {
    this.setData({
      numberA: 1,
      numberB: 2,
    })
  }
})
