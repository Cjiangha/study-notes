Page({
  data: {
    saleStaticList: [{
      id: 1,
      name: '小屋',
      img: '',
      wechat: 'YXX123',
      payType: '微信支付',
      status: 0,
      shopName: '电视机器',
      shopSize: '10*100.00',
      shopPrice: '1000',
      partName: '张三 ',
      partImg: '/images/wx_man.jpg',
      partWechat: '微信昵称',
      saleTime: '2022/02/13'
    }, ], //列表数据

    isShowChangeModel: false,
    selectType: 2,
    items: [{
        value: 'USA',
        name: '美国'
      },
      {
        value: 'CHN',
        name: '中国',
        checked: 'true'
      },
      {
        value: 'BRA',
        name: '巴西'
      },
      {
        value: 'JPN',
        name: '日本'
      },
      {
        value: 'ENG',
        name: '英国'
      },
      {
        value: 'FRA',
        name: '法国'
      }
    ],

  },

  onLoad(){
    wx.downloadFile({
      url: 'https://6669-file-6gxgpszoc3fc266b-1308639227.tcb.qcloud.la/image/测试.pdf',
      success(res) {
        const filePath = res.tempFilePath;
        // Toast.show(filePath);
        wx.openDocument({
          filePath,
          fileType: 'pdf',
          success(resChild) {
            console.log('打开文档成功');
            console.log(resChild);
          },
          fail(err) {
            Toast.show('打开文档失败');
            Toast.show(err);
          },
        });
      },
      fail(err) {
        Toast.show('下载失败');
        Toast.show(err);
      },
    })
  },

  // 穿透事件
  move() {},
  // 转交 停用 
  changeClose(e) {
    let {
      type,
      id
    } = e.currentTarget.dataset
    this.setData({
      isShowChangeModel: !this.data.isShowChangeModel
    })
    if (this.selectComponent('#select'))
      this.selectComponent('#select').optionTap2()

  },
  // 获取合伙人转交管家名称
  change(e) {
    console.log(e)
  },
  // 转交 停用 
  toAction(e) {
    let {
      type,
      id
    } = e.currentTarget.dataset
    this.setData({
      isShowChangeModel: false,
      selectType: type
    })
  },
})