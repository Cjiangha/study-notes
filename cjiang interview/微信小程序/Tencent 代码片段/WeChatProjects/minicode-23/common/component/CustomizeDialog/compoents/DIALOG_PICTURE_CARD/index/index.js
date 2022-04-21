import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { replaceColor } from "../../../../../tool/richTool";
createComponent(
  createOptions({
    name: "index",
    props: {
      visible: {
        //是否显示 Dialog
        type: Boolean,
        default: false,
      },
      mask: {
        //是否需要遮罩层
        type: Boolean,
        default: true,
      },
      customClass: {
        //Dialog 的自定义类名
        type: String,
        default: "",
      },
      popupInfo: {
        type: Object,
        default: {
          buttonText: "我知道了",
          description: "为保护您的隐私安全，上车时请用虚拟尾号与司机确认身份",
          title: "虚拟尾号",
        },
      },
    },
    data: {
      _show: true,
    },
    computed: {
      richTipsTitle() {
        return replaceColor(this.popupInfo.title || "");
      },

      show() {
        return this.visible && this._show;
      },
    },
    watch: {},
    methods: {
      /**
       * Dialog 的底部按钮绑定事件
       */
      handleOk() {
        this._show = false;
        this.$emit("onOk");
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "show",
    "mask",
    "customClass",
    "proputil",
    "richTipsTitle",
    "popupInfo",
  ];
  return opts;
}
