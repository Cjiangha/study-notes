// components/custom-loading/custom-loading.js
import lottie from "lottie-miniprogram";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      // loading状态
      type: Boolean,
      value: false,
    },
  },
  observers: {
    loading(loading) {
      if (loading) {
        this.play();
      } else {
        this.pause();
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      if (this.inited) {
        return;
      }
      this.createSelectorQuery()
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
            animationData: require("../json/loading_data"),
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
  },
  lifetimes: {
    attached() {
      this.init();
    },
  },
});
