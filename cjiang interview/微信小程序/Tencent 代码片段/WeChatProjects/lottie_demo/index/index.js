const app = getApp();
import lottie from "lottie-miniprogram";
const { Loading } = require('../custom-loading/loading');

Page({
  data: {},
  onLoad() {
    // this.init();
  },
  init() {
    if (this.inited) {
      return;
    }
    wx.createSelectorQuery()
      .selectAll("#lottie_demo")
      .node((res) => {
        const canvas = res[0].node;
        const context = canvas.getContext("2d");
        canvas.width = 50;
        canvas.height = 50;
        lottie.setup(canvas);
        this.ani = lottie.loadAnimation({
          loop: true,
          autoplay: false,
          animationData: require("../json/loading_data.js"),
          // animationData: require("../json/data.js"),
          rendererSettings: {
            context,
          },
        });
        this.inited = true;
      })
      .exec();
  },
  play() {
    this.ani.play();
  },
  pause() {
    this.ani.pause();
  },
  show() {
    // this.setData({
    //   showLoading: true,
    // });
    // this.init();
    Loading.show();
  },
  hide() {
    // this.setData({
    //   showLoading: false,
    // });
    Loading.clear();
  },
});
