// logs.js

Page({
  data: {
    logs: []
  },
  onLoad() {
  
  },
  onShow(){
    wx.showLoading({
			title: '正在查询',
		});
  }
})
