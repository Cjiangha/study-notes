const app = getApp()

Page({
  data: {
    phoneWidth:0,
    phoneHeight:0,
    scrollTop: 0,
    msgList: [],
    inputInfo: '',
    myTimer: '',
    context:'',
  },
  onLoad() {
    this.init();
   // this.startDM();
  },onReady(){
    this.data.context = wx.createLivePusherContext("livePusher", this);
  },onPageScroll(e) {
    console.log('生命周期监听滚动值：', e)
  },statechange(e) {
        console.log('live-pusher code:', e.detail.code)
  },init(){
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                _this.data.phoneWidth = res.windowWidth;
                _this.data.phoneHeight = res.windowHeight;
                _this.setData({
                    phoneWidth: res.windowWidth,
                    phoneHeight: res.windowHeight
                })
            }
        });
  },startDM() {
    console.log("开启弹幕")
    clearInterval(this.data.myTimer)
    var _this = this;
    var num = 0;
    _this.data.myTimer = setInterval(function() {
        _this.data.inputInfo = "弹幕内容" + num;
        _this.sendBarrage();
        num++;
     }, 800);
    },stopDm() {
        console.log("清除定时器")
        clearInterval(this.data.myTimer)
    },
  // 弹幕滚动到底部,每次发送弹幕后需调用
letBarrageToButtom() {
    var _this = this;
    const query = wx.createSelectorQuery().in(this);
    query.select('.barrageItem').boundingClientRect(rect => {
        if (rect == null) {
            return;
        }
        var top = rect.height - 220;
        if (top > 0) {
            _this.data.scrollTop = toTop;
            _this.setData({
                scrollTop:toTop
            })
        } else {
            var toTop = (_this.data.msgList.length * rect.height + (rect.height * 10));
            this.data.scrollTop = toTop;
            _this.setData({
                scrollTop:toTop
            })
        }
    }).exec();
},
// 点击键盘右下角发送，发送弹幕
sendBarrage() {
    var _this = this;
    // 先判断要发送的信息是否为空，避免向后台发送无用信息
    if (this.data.inputInfo != '') {
        let barrage = {
            id: 20,
            barrageIcon: '新粉',
            barrageName: 'Admin',
            barrageContent: this.data.inputInfo,
            barrageMoreContent: ''
        }
        barrage = this.getNewline(barrage);
        this.data.msgList.push(barrage);
        _this.setData({
            msgList:_this.data.msgList
        })
        this.letBarrageToButtom();
    } else {
        return;
    }
},
// 裁切数字换行
getNewline(list) {
    let _listMsg = list.barrageContent;
    if (list.barrageName.length + list.barrageContent.length > 11) {
        list.barrageContent = _listMsg.slice(0, 11 - list.barrageName.length);
        list.barrageMoreContent = _listMsg.slice(11 - list.barrageName.length);
    }
    return list;
},
  
})
