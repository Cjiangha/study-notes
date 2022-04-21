App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.getMenuQry();
  },

  /*获取tabbar*/
  async getMenuQry(){
    let list = [
      {ChannelName: "000", ChannelImg: "pufaWechat/2B5DBAC9897311EC91CEA3303B2AC29C.jpg", ActiveImg: "pufaWechat/2B7EFE6B897311EC91CEE9A3AE63E324.jpg"},
      {ChannelName: "111", ChannelImg: "pufaWechat/56DD7100897311EC91CE175B578E2DD2.png", ActiveImg: "pufaWechat/5701C1E2897311EC91CED12B3B3EB1D3.png"},
      {ChannelName: "222", ChannelImg: "pufaWechat/75679654897311EC91CE7140C037006C.gif", ActiveImg: "pufaWechat/7581AE06897311EC91CEC9603B002D5E.gif"},
    ];
    for( let i=0 ; i<3 ; i++ ){
      if( list[i].ChannelName && list[i].ChannelImg ){
        console.log("第"+i+"个："+list[i].ChannelName+","+list[i].ChannelImg)
        wx.setTabBarItem({
          index: i,
          text: list[i].ChannelName,
          iconPath: 'https://mlmdacdntest.spdb.com.cn/oss/product-wechat/'+list[i].ChannelImg,
          selectedIconPath: 'https://mlmdacdntest.spdb.com.cn/oss/product-wechat/'+list[i].ActiveImg,
          success:function(){
            console.log(i)
          }
        })
      }
    }
  },

  globalData: {
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {},

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {},

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {},
});