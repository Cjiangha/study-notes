
import { formatTime } from "./utils";
import dateTimePicker from "./dateTimePicker";
const app = getApp()

Page({
  login(){

    console.log('login')

    wx.getUserProfile({

      desc: '完善用户信息',

      success(res){

        console.log('ok',res)

      },

      fail(res){

        console.log('fail',res)

      }

    })

  },
  data: {
    defaultDateTimeKey: [],
    dateTimeArray: [],
    datetime: '',
    minDate: '2021-11-1 00:00',
    maxDate: '2022-02-28 23:59',
  },
  onLoad() {
    this.initDateTimePickerData()
  },

  // 设置 年月日 时分秒 picker选择器的初始化数据
  initDateTimePickerData() {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.minDate, this.data.maxDate);
    console.log(obj)
    const defaultDateTimeKey = obj.dateTime
    const dateTimeArray = obj.dateTimeArray
    defaultDateTimeKey.pop()  // 删除秒
    dateTimeArray.pop()  // 删除秒
    this.setData({ defaultDateTimeKey, dateTimeArray });
    console.log( defaultDateTimeKey, dateTimeArray)
    // console.log(this.data)
  },

  // 时间 - 确认
  onDateConfirm(e) {
    const datetimeKey = e.detail.value
    const arr = this.data.datetimeArr ? this.data.datetimeArr : this.data.dateTimeArray
    const datetime = arr[0][datetimeKey[0]] + '-' + arr[1][datetimeKey[1]] + '-' + arr[2][datetimeKey[2]] + ' ' + arr[3][datetimeKey[3]] + ':' + arr[4][datetimeKey[4]] + ':00'
    this.setData({ datetime, datetimeKey })
    this.initDateTimePickerData()
  },
  // 时间 - 取消
  onDateCancel() {
    if (!this.data.datetime) {
      this.setData({ datetimeArr: null });
      this.initDateTimePickerData()
    } else {
      var obj = dateTimePicker.dateTimePicker(this.data.minDate, this.data.maxDate, this.data.datetime);
      const datetimeKey = obj.dateTime
      const datetimeArr = obj.dateTimeArray
      datetimeKey.pop()  // 删除秒
      datetimeArr.pop()  // 删除秒
      this.setData({ datetimeKey, datetimeArr });
    }
  },
  // 时间 - 改变选中项
  onDateTimeChange(e) {
    let params = {
      e,
      dateArr: this.data.datetimeArr ? this.data.datetimeArr : this.data.dateTimeArray,
      arr: this.data.datetimeKey ? this.data.datetimeKey : this.data.defaultDateTimeKey,
      minDate: this.data.minDate,
      maxDate: this.data.maxDate
    }
    let datetimeArr = dateTimePicker.getDateTimeChange(params)
    datetimeArr.pop()  // 删除秒
    this.setData({ datetimeArr });
  },
})
