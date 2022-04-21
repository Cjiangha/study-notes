import { createComponent } from "@alife/anyui-wx-framework/index.js";

const iconWarning =
  "https://gw.alicdn.com/imgextra/i1/O1CN01y4k4eg1OyzibLFyQm_!!6000000001775-2-tps-144-144.png";

createComponent(
  createOptions({
    name: "OrderConfirm",
    props: {
      leftBtnText: {
        type: String,
        default: "确定",
      },
      rightBtnText: {
        type: String,
        default: "",
      },
      showConfirm: {
        type: Boolean,
        default: false,
      },

      /* 右上角关闭按钮 */
      closable: {
        type: Boolean,
        default: false,
      },

      /* 标题 */
      title: {
        type: String,
        default: "标题",
      },

      /* 描述 */
      desc: {
        type: String,
        default: "描述",
      },

      /* 右上角关闭按钮 */
      showIcon: {
        type: Boolean,
        default: false,
      },
    },
    data: {
      iconWarning,
    },
    methods: {
      /**
       * 处理左侧事件
       */
      leftClick() {
        this.$emit("onLeftCallBack");
        this.closeConfirm();
      },

      /**
       * 处理右侧事件
       */
      rightClick() {
        this.$emit("onRightCallBack");
        this.closeConfirm();
      },

      /* 点击关闭按钮 */
      handleClose() {
        this.$emit("onConfirmClose");
      },

      /**
       * 关闭弹窗
       */
      // eslint-disable-next-line no-empty-function
      closeConfirm() {},
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "__ready__",
    "showConfirm",
    "closable",
    "showIcon",
    "iconWarning",
    "title",
    "desc",
    "leftBtnText",
    "rightBtnText",
  ];
  return opts;
}
