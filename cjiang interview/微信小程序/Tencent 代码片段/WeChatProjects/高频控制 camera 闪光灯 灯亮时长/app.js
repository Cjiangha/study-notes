// app.js
App({
  wxappName:'',
  siteroot:"",
  loginTips:'请先验证登录',
  onLaunch() {
  },
  toast:function(title,time = 1000,mask = true,callback){
    wx.showToast({
      title: title,
      icon:'none',
      duration:time,
      mask:mask
    })

  },
  stringB:function strToBinary(str){
      let result = [];
      let arr = {
        0:'0000',
        1:'0001',
        2:'0010',
        3:'0011',
        4:'0100',
        5:'0101',
        6:'0110',
        7:'0111',
        8:'1000',
        9:'1001',
        'A':'1010',
        'B':'1011',
        'C':'1100',
        'D':'1101',
        'E':'1110',
        'F':'1111'
      };
      let list = str.split("");
      for(var i=0;i<list.length;i++){
          let item = list[i];
          let binaryStr = arr[item];
          result.push(binaryStr);
      }   
      return result
  },

  openLight(result){

  },
  lightCode:function(type = 1){
    let code = this.getCache("code");
    if(!code)
      return '';
    switch(type){
      case 1:
        code = `${code}1`;
        break;
      case 2:
        code = `${code}2`;
        break;
      case 3:
        code = `${code}3`;
        break;
      case 4:
        code = `${code}4`;
        break;
    }
    return code;
  },
  toast:function(title,time=1000,mask=true){
    wx.showToast({
      title: title,
      icon:'none',
      duration:time,
      mask:mask
    })
  },

  setCache:function(name,data){
    return wx.setStorage({key:name,data:data})
  },
  getCache:function(name){
    let value = null;
    try{
      value = wx.getStorageSync(name)
    }catch(e){
      value = 0
    }
    return value;
  },

  clearCache:function(name){
    return wx.clearStorage(name)
  },
  globalData: {
    userInfo: null
  }
})
