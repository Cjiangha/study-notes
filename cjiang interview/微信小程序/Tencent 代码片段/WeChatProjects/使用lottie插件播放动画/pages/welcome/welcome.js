// pages/welcome/welcome.js
const app=getApp();
import * as lottie from 'lottiejs-miniapp';

Page({
  /**
   * 页面的初始数据 
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.chooseImage({

      count: 3, // 默认9

sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有

      sourceType: this.isUseFile ? ['album', 'camera'] : ['camera'] // 可以指定来源是相册还是相机，默认二者都有

    }).then((res) => {

let tempFilePaths = res.tempFilePaths

let imageInfo = wx.getImageInfo({

      src: tempFilePaths[0]

    })

    wx.saveImageToPhotosAlbum({

      filePath: imageInfo.path,

      success: (re) => {

        console.log(re)

        toast('保存至手机成功')

      },

      fail: (res) => {

        console.log(res)

        toast(res)

      },

      complete: () => {

      }

    })

})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery().select('#lottiejs-canvas').fields({node: true, size: true}).exec(res => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
  
  
      const dpr = wx.getSystemInfoSync().pixelRatio;
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
  
  
      lottie.setup(canvas);
      lottie.loadAnimation({
        loop: true,
        autoplay: true,
        //animationData: animationData,
        path: 'https://pc.pushia.com:9001/fileLib/imgs/wlyyz/%E5%AE%89%E5%8D%93nfc%E9%AA%8C%E8%AF%81/data.json',
        rendererSettings: {
          context: ctx,
        },
      });
    });
  },

 
})