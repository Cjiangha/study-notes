
const data = require("./data.js");
const tools = require("../mode/tools.js");
// 变量
const variable = {
  dataType: tools.dataAll(data),//保存数据类型，默认全选
  titleNumArr: [0, 0]//记录 数组第0位存上一个题号，第1位存当前题题号
}
Page({
  data: {
    title: 'Hello World',
    oInput:"",
    isNav:false//是否显示选题菜单
  },
  onLoad (options) {
    tools.readerPage(data,variable.dataType,variable.titleNumArr,this)
    tools.equipment(this)
  },
  //事件处理函数
  onDocument(){
    if(this.data.isNav){
      this.setData({
        isNav: false
      })
    }
  },
  //列表显示隐藏按钮事件
  navBtnEvent(){
    this.setData({
      isNav: !this.data.isNav
    })
  },
  //input输入事件
  eventInput(e){
    this.setData({
      oInput: e.detail.value
    })
  },
  //键盘回车事件处理函数
  eventKeyDown (e) {
      tools.teacher(variable.dataType, variable.titleNumArr, this);
      this.setData({
        focus:true
      })
  },
  //下一题按钮点击事件处理函数
  eventNextBtnClick () {
    tools.teacher(variable.dataType, variable.titleNumArr,this);
  },
  //上一题按钮点击事件处理函数
  eventPreviousClick () {
    tools.addData(variable.dataType, variable.titleNumArr, this, variable.titleNumArr[1]);
  },
  // 下拉列表事件处理函数
  eventNavClick (e) {
    console.log(e.target,e.target.id)
    let dataObj = tools.renderObj(data);
    let value = e.target.id;
    for (let prop in dataObj) {
      if (value === prop) {
        variable.dataType = dataObj[prop];
        tools.addData(variable.dataType, variable.titleNumArr, this);
        this.setData({
          tiNum: value === "all" ? `一共有${variable.dataType.length}题可以随机` : `${prop}类型的题有${variable.dataType.length}道可以随机`
        })
      }
    }
  }
})