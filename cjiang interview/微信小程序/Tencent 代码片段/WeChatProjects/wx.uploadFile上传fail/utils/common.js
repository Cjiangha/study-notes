var app = getApp();
var util = require("./util.js");
// 保留当前页面,普通跳转方式
var navGo = (ev) => {
  let url = ev.currentTarget.dataset.url;
  let title = ev.currentTarget.dataset.title ? ev.currentTarget.dataset.title : '';
  let id = ev.currentTarget.dataset.id ? ev.currentTarget.dataset.id : '';
  let start = ev.currentTarget.dataset.start ? ev.currentTarget.dataset.start : '';
  let type = ev.currentTarget.dataset.type ? ev.currentTarget.dataset.type : '';
  if (url) {
    wx.navigateTo({
      url: `${url}?id=${id}&title=${title}&start=${start}&type=${type}`,
    });
  }
}
//关闭当前页面，跳转
var redGo = (ev) => {
  let url = ev.currentTarget.dataset.url;
  let title = ev.currentTarget.dataset.title ? ev.currentTarget.dataset.title : '';
  let id = ev.currentTarget.dataset.id ? ev.currentTarget.dataset.id : '';
  let start = ev.currentTarget.dataset.start ? ev.currentTarget.dataset.start : '';
  let type = ev.currentTarget.dataset.type ? ev.currentTarget.dataset.type : '';

  wx.redirectTo({
    url: `${url}?id=${id}&title=${title}&start=${start}&type=${type}`,
  });
}
// 需要验证跳转方式
var navGoCheck = (ev) => {
  let eid = app.globalData.EnterpriseID;
  let stid = ev.currentTarget.dataset.stid ? ev.currentTarget.dataset.stid : '';
  let id = ev.currentTarget.dataset.id ? ev.currentTarget.dataset.id : '';
  let url = ev.currentTarget.dataset.url;
  let type = ev.currentTarget.dataset.type ? ev.currentTarget.dataset.type : '';
  let data = {
    eid: eid,
    stid: stid
  };
  util.getReq("/service.ashx?type=CheckOffer", data, function(res) {
    if (res.res) {
      wx.navigateTo({
        url: `${url}?id=${id}&type=${type}`,
      });
    } else {
      wx.showModal({
        title: '提示',
        content: res.msg,
      })
    }
  });
}
// 跳转用方法
var navGoBack = (ev) => {
  wx.navigateBack({
    delta: 1
  });
};
var navRelaunch = (ev) => {
  let currentPages = getCurrentPages();

  let url = ev.currentTarget.dataset.url;
  // console.log(url.indexOf(currentPages[currentPages.length - 1].route));
  if (url.indexOf(currentPages[currentPages.length - 1].route) >= 0) {

  } else {
    wx.reLaunch({
      url: `${url}`,
    });
  }
};
// 轮播图跳转
var navGoByUrl = (ev) => {
  let url = ev.currentTarget.dataset.url;
  if (url) {
    wx.navigateTo({
      url: `/${url}`
    });
  }
}
// 
module.exports = ({
  navGo: navGo,
  redGo: redGo,
  navGoBack: navGoBack,
  navRelaunch: navRelaunch,
  navGoCheck: navGoCheck,
  navGoByUrl: navGoByUrl
});