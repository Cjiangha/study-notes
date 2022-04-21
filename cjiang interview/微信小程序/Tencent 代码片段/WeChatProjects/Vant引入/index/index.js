const app = getApp()

Page({
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate: new Date().getTime(),
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
});