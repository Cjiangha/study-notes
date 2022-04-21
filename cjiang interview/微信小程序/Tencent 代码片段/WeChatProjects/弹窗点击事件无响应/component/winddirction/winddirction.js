// component/winddirction/wind.js
var  BleWriteManager=   require("../../manager/BleWriteManager.js")
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
// 弹窗显示控制：默认不显示
    isWind: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        /*
     * 公有方法
     */

    //隐藏弹框
    hideDialog() {
      console.log("========隐藏风向弹窗=============>")
        this._leavePupAnimation();
      },
  
  
      //展示弹框
      showDialog() {
        this._goIntoPupAnimation();
      },
  
      // 弹窗淡入动画设置
      _goIntoPupAnimation() {
        // 第1步：创建动画实例 
        let animation = wx.createAnimation({
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
        });
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation;
        // 第3步：执行第一组动画 
        animation.opacity(0).step();
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({
          updatePanelAnimationData: animation.export(),
          isWind: true //显示弹窗
        })
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function() {
          // 执行第二组动画 
          animation.opacity(1).step();
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({
            updatePanelAnimationData: animation,
          })
        }.bind(this), 200)
  
      },
  
      // 弹窗淡出动画设置
      _leavePupAnimation() {
        // 第1步：创建动画实例 
        let animation = wx.createAnimation({
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
        });
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation;
        // 第3步：执行第一组动画 
        animation.opacity(0).step();
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({
          updatePanelAnimationData: animation.export()
        })
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function() {
          // 执行第二组动画 
          animation.opacity(0).step();
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({
            updatePanelAnimationData: animation,
            isWind: false //隐藏弹窗
          })
        }.bind(this), 200)
},
//    设置主驾出风口对人吹模式
setDrvWindOutletBlowPessonModeStatus:  function(){
  let obj={type:5000,action:"setDrvWindOutletBlowPessonModeStatus",data:{signalVaule:1}}
  BleWriteManager.writeBLECharacteristicValue(obj)
},
//   设置主驾吹风口避人吹模式

setDrvWindOutletAvoidPessonModeStatus:  function(){
  let obj={type:5000,action:"setDrvWindOutletAvoidPessonModeStatus",data:{signalVaule:1}}
  BleWriteManager.writeBLECharacteristicValue(obj)
},
//    设置主驾出风口扫风模式

setDrvWindOutletSwingModeStatus:  function(){
  let obj={type:5000,action:"setDrvWindOutletSwingModeStatus",data:{signalVaule:1}}
  BleWriteManager.writeBLECharacteristicValue(obj)
},

    }
})
