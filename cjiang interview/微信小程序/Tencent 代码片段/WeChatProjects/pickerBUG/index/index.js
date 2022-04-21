const app = getApp()

Page({
  data: {
    parameters: {
      issueDate: ''
    },
    endDate: ''
  },
  onShow() {
    var that = this
    that.setData({
      endDate: this.getNowTime(),
    })
    console.log(that.data.endDate)
  },
  datePicker: function (e) {
    var that = this
    that.setData({
      'parameters.issueDate': e.detail.value,
    })
  },
  // 获取今天日期
  getNowTime() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth(); //得到月份
    var date = now.getDate(); //得到日期
    month = month + 1;
    month = month.toString().padStart(2, "0");
    date = date.toString().padStart(2, "0");
    var defaultDate = `${year}-${month}-${date}`;
    return defaultDate;

  },
})
