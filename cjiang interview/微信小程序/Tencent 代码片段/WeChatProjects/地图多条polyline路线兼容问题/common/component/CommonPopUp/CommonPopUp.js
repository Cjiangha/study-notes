import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CommonPopUp",
    data: {
      coverViewHeight: 0,
    },
    props: {
      showCoverView: {
        type: Boolean,
        default: true,
      },
      show: {
        type: Boolean,
        default: false,
      },
      showSafeBottomSpan: {
        type: Boolean,
        default: true,
      },
      // 标题
      title: {
        type: String,
        default: "",
      },
      // 底部按钮名称
      btnName: {
        type: String,
        default: "",
      },
      wrapperStyle: {
        type: Object,
        default: () => {
          return {};
        },
      },
      // 按钮不可点击
      btnDisable: {
        type: Boolean,
        default: false,
      },
      btnStyle: {
        type: Object,
        default: () => {
          return {};
        },
      },
      btnTextStyle: {
        type: Object,
        default: () => {
          return {};
        },
      },

      /* popup的透传 popup默然是true 这里也默认写true */
      disableScroll: {
        type: Boolean,
        default: true,
      },
      // 按钮禁止滚动，主要为解决滑动按钮区域底部scroller滚动问题
      btnStyleDisableScroll: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      show() {
      },
    },
    methods: {
      getViewHeight(windowHeight) {
        setTimeout(() => {
          this.createSelectorQuery()
            .select("#popUp")
            .boundingClientRect()
            .exec((ret) => {
              if (ret.length && ret[0].height) {
                this.coverViewHeight = windowHeight - ret[0].height;
              }
            });
        }, 500);
      },

      /**
       * 处理关闭事件
       */
      handleClose() {
        this.$emit("onClose");
      },

      /**
       * 处理确认事件
       */
      handleConfirm() {
        if (this.btnDisable) {
          return;
        }

        this.$emit("onConfirm");
      },

      catchTouchMove() {
        return false;
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "show",
    "disableScroll",
    "wrapperStyle",
    "showCoverView",
    "coverViewHeight",
    "__slotObj",
    "title",
    "btnDisable",
    "btnName",
    "btnStyle",
    "btnStyleDisableScroll",
    "btnTextStyle",
    "showSafeBottomSpan",
  ];
  return opts;
}
