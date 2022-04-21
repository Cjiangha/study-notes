var WxParse = require('../../wxParse/wxParse.js')
Page({
  data: {

  },
  e(e){
    console.log(e)
  },
  onLoad() {
    var that = this
    var content = '<p><video class="edui-upload-video  vjs-default-skin video-js" controls="" preload="none" width="420" height="280" src="http://yzhpubqiniu01.yuanzhihang.com//16359380491702.png" data-setup="{}"><source src="http://yzhpubqiniu01.yuanzhihang.com//16359380491702.png" type="video/png"/></video></p>'
    WxParse.wxParse('content', 'html', content, that, 5);
  },
})