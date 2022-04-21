import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CpFixedPriceDescPopup",
    props: {
      ruleDesc: {
        type: Object,
        default: () => {
          return null;
        },
      },
    },
    data: {
      showPopup: false,
      title: "",
      subTitle: "",
      tipsArray: [],
      btnStyle: {
        width: "auto",
        flex: "1",
        "margin-left": "32rpx",
        "margin-right": "32rpx",
        "margin-top": "32rpx",
        background: "none",
        "background-image": "linear-gradient(90deg, #1A66FF 0%, #1A8CFF 100%)",
      },
      btnTextStyle: {
        "font-size": "28rpx",
      },
    },
    methods: {
      /**
       * 展示
       */
      show(data) {
        this.title = data.title;
        this.subTitle = data.subTitle;
        this.tipsArray = data.tipsArray;
        this.showPopup = true;
      },

      /**
       * 处理关闭事件
       */
      onClose() {
        this.$emit("onClose");
        this.showPopup = false;
        this.title = "";
        this.subTitle = "";
        this.tipsArray = [];
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["onClose_custHd_1"] = function (e) {
    this.onClose(...e.detail.$event);
  };

  opts.methods["onClose_custHd_2"] = function (e) {
    this.onClose(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "showPopup",
    "btnStyle",
    "btnTextStyle",
    "title",
    "subTitle",
    "tipsArray",
  ];
  return opts;
}
