export const request=(params)=>{
  return new Promise((resolve,reject)=>{
      wx.request({
       ...params,
       success:(result)=>{
           resolve(result);
       },
       fail:(err)=>{
           reject(err);
       }
      });      
  })
}

Page({
  data:{
    leftMenuList: [],
    rightContent: [],
    somerightContent: [],
    menuwidth: '50%',
    currentIndex: 0,
    scrollTop: 0,
    canload: true,
    isnotfull: true
 },
  Cates: [],

  onLoad: function (options){
    this.getCates();
  },

  getCates() {
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    request({
      url: "http://39.100.254.178:3000/program/disease"
    })
    .then(result => {
      console.log(result.data);
      wx.hideLoading();
      if(result.data.code !== 200){
        const tip = result.data.message
        console.log(tip)
        wx.showToast({
          title: tip,
          icon: 'none',
          duration: 2000,
          mask: 'true'
        })
      }
      else{
        this.Cates = result.data.obj;
        let leftMenuList = this.Cates.map(v=>v.name);
        let rightContent = this.Cates[0].children;
        let somerightContent = [];
        for(var i = 0; i<rightContent.length && i < 1; i ++){
          somerightContent.push(rightContent[i])
        }
        const menuwidthnum = 100 / leftMenuList.length
        const menuwidth = menuwidthnum + '%'
        this.setData({
          leftMenuList,
          rightContent,
          menuwidth,
          somerightContent
        })
      }
    },
    resolve => {
      wx.hideLoading()
      wx.showToast({
        title: '加载失败',
        icon: 'error',
        duration: 2000,
        mask: 'true'
      })
      console.log(resolve)
    })
  },

  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    let somerightContent = [];
    for(var i = 0; i<rightContent.length && i < 1; i ++){
      somerightContent.push(rightContent[i])
    }     
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
      somerightContent,
      isnotfull: true
    })
  },

 
  checkDetail(e){
    wx.navigateTo({
      url: '/pages/detail/detail',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.currentTarget.dataset })
      }
    })
  },

  onPullDownRefresh(){
    this.setData({
      leftMenuList: [],
      rightContent: [],
      menuwidth: '50%',
      currentIndex: 0,
      scrollTop: 0
    })
    this.getCates();
    wx.stopPullDownRefresh()
  },

  tobottom() {
    var _this = this;
    if(_this.data.somerightContent.length === _this.data.rightContent.length){
      _this.setData({
        isnotfull: false
      })
    }
    else{
      if(_this.data.canload){
        wx.showLoading({
          title: '加载中'
        })
        var length = _this.data.somerightContent.length
        let thissomerightContent = [];
        for(var i = 0; i<_this.data.rightContent.length && i < length+1; i ++){
          thissomerightContent.push(_this.data.rightContent[i])
        }  
        _this.setData({
          somerightContent: thissomerightContent,
          canload: false
        })
        setTimeout(() => {
          _this.setData({
            canload: true
          })
          wx.hideLoading()
        }, 1000);
      }
    }
  },

  loadmore(){
    this.tobottom()
  },

  imageLoad(){
  }

})