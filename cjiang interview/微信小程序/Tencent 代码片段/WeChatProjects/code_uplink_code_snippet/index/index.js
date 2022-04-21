const app = getApp()

Page({
  data: {

  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
  choiceMedia () {
    wx.chooseMedia({
      count: 9, // 默认9
      mediaType: ['image', 'video'], //文件类型
      sourceType: ['album', 'camera'], //图片和视频选择的来源相册、相机
      maxDuration: 30, //拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册。
      sizeType: ['original', 'compressed'], //仅对 mediaType 为 image 时有效，是否压缩所选文件
      camera: 'back', //默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效 , 默认‘back’后置
      success(res) {
        console.log(res);
      },
      fail(err){
        console.error(err);
      }
    });
  },
})
