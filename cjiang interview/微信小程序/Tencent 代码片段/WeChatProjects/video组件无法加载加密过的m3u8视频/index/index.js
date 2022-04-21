const app = getApp()

Page({
  data: {
    url: "http://cd11-ccd1-2.play.bokecc.com/flvs/3C9EB18A11C4DDFC/2018-12-01/C7607CD7B1C4D1E29C33DC5901307461-10.m3u8?t=1634104449&key=7AF68D5F420216CA51C71E737E2D42E8&tpl=10&tpt=231"
  },
  onLoad() {

  },
  binderror(e){
    console.log('加载失败');
    console.log(e);
  }
})
