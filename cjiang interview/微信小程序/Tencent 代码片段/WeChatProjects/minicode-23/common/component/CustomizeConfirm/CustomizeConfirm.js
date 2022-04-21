import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CustomizeConfirm",
    props: {
      leftBtnText: {
        type: String,
        default: "确定",
      },
      rightBtnText: {
        type: String,
        default: "取消",
      },
      leftCallBack: {
        type: Function,
        default: () => {},
      },
      rightCallBack: {
        type: Function,
        default: () => {},
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
    },
    data: {},
    methods: {
      /**
       * 处理左侧事件
       */
      leftClick() {
        this.leftCallBack();
        this.closeConfirm();
      },

      /**
       * 处理右侧事件
       */
      rightClick() {
        this.rightCallBack();
        this.closeConfirm();
      },

      /* 点击关闭按钮 */
      handleClose() {
        this.$emit("onConfirmClose");
      },

      /**
       * 关闭弹窗
       */
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
    "__slotObj",
    "leftBtnText",
    "rightBtnText",
  ];
  return opts;
}
