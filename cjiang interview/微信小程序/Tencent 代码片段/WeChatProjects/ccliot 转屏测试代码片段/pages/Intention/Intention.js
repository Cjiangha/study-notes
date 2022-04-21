/**
 * 修改注意事项：
 */
var app = getApp()

Page({
 
  data: {

    // testImg: "../img/01.png", //测试数据:图片加载失败
    // testImg: "../../images/ceiling_lamp.png",//测试数据：图片加载成功
    StatusBar: app.globalData.StatusBar, //状态栏高度
    CustomBar: app.globalData.CustomBar, //手机信息栏高度
    ShareBar: app.globalData.ShareBar, //胶囊宽度
    maskView: app.globalData.tag.Params.RealLocationRequest || false, //蓝牙遮盖层
    // maskView: imaskCB, //蓝牙遮盖层
    maskView2: app.globalData.tag.Params.RealLocationRequest || false, //蓝牙遮盖层
    // maskView:true,//蓝牙遮盖层
    windowHeight: app.globalData.windowHeight, //设备展示区宽度
    // windowHeight: 'calc(100vh - '+app.globalData.CustomBar+'rpx)', //设备展示区宽度
    devIntention: "",
    devRule: '',
    indexG: 0,
    indexsP: 0,//测试数据
    angleP: 0, //设备精准位置
    boolPo: true,
    iCompass: false,//精准度超标true
    ax: '',
    beta: '',
    gamma: '', //精准轴
    disPro: false,
    disView: false,
    proValue: "",
    modalName: 'open',//二级界面
    modelValue: [],//二级界面数据
    myCanvas2: true,
    ImageInfo: {}, //意向组背景图片
    ImageInfo2: {},
    voiceHide: true,//语音隐藏
    recording: false,//正在录音
    bottomButtonDisabled: false,
    lastId: -1,    // dialogList 最后一个item的 id
    dialogList: [],//录音记录
    currentTranslate: {},// 当前录音
    translatorVisible: true, //语音界面隐藏
    armFalse: [false, '', ''],
 
    devPIimg: "",
    devPI: "",
    list: [],
    alphaArray: '',
    orientionMonitorFalse: true,//指向与滑动切换

    albumIndexG:0  //相册模式初始值
    ,albumHid:false,
    albumLongHid:true,
    aMultiple:app.globalData.aMultiple, //分屏数目
    aMultipleNum:1 //滑块限制数量
    ,orientionDisabled:true //横屏禁止开启罗盘义false
  },
 

  /**
   * 屏幕旋转
   */  
  onResize(res) {
    // res.size.windowWidth // 新的显示区域宽度
    // res.size.windowHeight // 新的显示区域高度
    // console.log(' 屏幕旋转 onResize  ',app.globalData)
    console.log(' 屏幕旋转 onResize  我是globaldata ',app.globalData)
    var that = this
    var dpr = 750 / res.size.windowWidth;/**像素比 */
    app.globalData.dpr = dpr
    app.globalData.windowHeight = res.size.windowHeight * dpr - app.globalData.CustomBar
    app.globalData.ShareBar = 105 * dpr

    that.setData({
      // StatusBar: app.globalData.StatusBar, //状态栏高度
      // CustomBar: app.globalData.CustomBar, //手机信息栏高度
      ShareBar: app.globalData.ShareBar, //胶囊宽度        
      windowHeight: app.globalData.windowHeight, //设备展示区宽度
      aMultiple: app.globalData.aMultiple,
      CustomBar: app.globalData.CustomBar,
    })
    console.log(res.size.windowWidth, '   ', res.size.windowHeight, res.size.windowWidth > res.size.windowHeight, 'res.size', res.size, app.globalData.aMultiple, '   屏幕转屏   ', app.globalData.StatusBar,
      app.globalData.CustomBar,
      app.globalData.ShareBar,
      app.globalData.windowHeight)

    console.log()

  }
});

