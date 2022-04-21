// functionPage/functionPage/addHeadline/addHeadline.js
const app = getApp()
const ctx = wx.createCanvasContext('canvasIn' , this);


Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedID:0,               // 拖拽选中那个 id
    selectedIndex:0,            // 拖拽选中那个 Index
    FontID:0,                   // 字体ID  typefaceArr 选中的是那个
    minFont:12,                 // 最小字体
    maxFont:50,                 // 最大字体
    fontSize:20,                // 现在显示的字体
    fontColor:'',               // 字体颜色
    fontColorID:0,              // 默认字体颜色     
    establishTextArrId:2,       // 创建textArr 标题id
    trigeminyImage:null,     
    textArr:[
      {
        id:0,                                     // id
        text:"",                                  // 文字内容
        fontColor:'#ffffff',                      // 字体颜色
        fontSize:20,                              // 字体大小
        fontFamily:"Microsoft YaHei",             // 字体格式
        direction:'all',                          // 移动状态
        scaleValue:1,                             // 缩放比例
        textWidth:140,                            //  盒子长
        textHeight:30,                            //  盒子高
        r:0,                                      //  盒子半径
        headline:'请输入标题',                     //  默认标题
        _tx:0,                                    //  盒子移动了的值
        _ty:0,                                    //  盒子移动了的值
        x:0,                                      //  盒子现在的的值 x
        y:0                                       //  盒子现在的的值 y
      },
      {
        id:1,
        text:"",
        fontColor:'#ffffff',
        fontSize:20,
        fontFamily:"Microsoft YaHei",
        direction:'all',
        scaleValue:1,
        textWidth:140,
        textHeight:30,
        r:0,
        headline:'请输入标题',
        _tx:0,
        _ty:0,
        x:0,
        y:0
      }
    ],

  },












  /**
   *  组件缩放标题
   */
  zoom(e){

  },

  /**
   * 方法缩放标题
   */
  ZoomTitle(e){
    console.log( 88888 , e.touches[0] );
  },



  dragTitle(e){
    console.log(55555,e);
  },


  /**
   * 点击选中文字
   */
  textMove(e  ){
    console.log(1111 , e );
    // this.textArr[]
    this.setData({
      selectedID:e.currentTarget.dataset.item.id,
      selectedIndex:e.currentTarget.dataset.index
    })
  },

  doChange:function(e){
    console.log("拖动中~" , e);

    this.data.textArr[e.currentTarget.dataset.index].x = e.detail.x;
    this.data.textArr[e.currentTarget.dataset.index].y = e.detail.y;

    this.setData({
      selectedID:e.currentTarget.dataset.item.id,
      textArr:this.data.textArr,
      selectedIndex:e.currentTarget.dataset.index
    })
  },

  /**
   * 删除标题
   */
  deleteTitle(e){
    console.log(111111 ,e.currentTarget.dataset.index);
    this.data.textArr.splice(e.currentTarget.dataset.index , 1)
    console.log(this.data.selectedIndex , 'this.data.selectedIndex' ,this.data.textArr ,'this.data.textArr');

      this.data.selectedIndex = 0 
      this.data.selectedID = this.data.textArr[this.data.selectedIndex].id
      this.setData({
        textArr:this.data.textArr,
        selectedID:this.data.selectedID,
        selectedIndex:this.data.selectedIndex
      })
  },

  /**
   * 添加标题
   */
  addTitle(){
    console.log(99999);
    let ss = {
      id:this.data.establishTextArrId,
      text:"",
      fontColor:'#000000',
      fontSize:20,
      fontFamily:"Microsoft YaHei",
      direction:'all',
      scaleValue:1,
      textWidth:140,
      textHeight:30,
      r:0,
      headline:'请输入标题',
      _tx:0,
      _ty:0,
      x:0,
      y:0
    }
    this.data.textArr.push(ss);
    this.setData({
      textArr:this.data.textArr,
      establishTextArrId : this.data.establishTextArrId + 1
    })
    console.log(this.data.textArr , 'this.data.textArr');
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    console.log(app.globalData.trigeminyImage , 'trigeminyImage');
    that.setData({
      trigeminyImage:`https://peiyin-file.gzguda.com/accountManagementParticipateActivities/meimu.jpg`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})