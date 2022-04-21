import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "SecondSelectRouteSure",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      subtitle: {
        type: String,
        default: "",
      },
      bgUrl: {
        type: String,
        default:
          "https://gw.alicdn.com/imgextra/i2/O1CN01OmGSkv1VgOwuAjtf3_!!6000000002682-2-tps-565-361.png",
      },
      btnText: {
        type: String,
        default: "确认",
      },
      btnCancelText: {
        type: String,
        default: "取消",
      },
    },
    data: {
      isClose: false,
      isTip: true,
    },
    computed: {},
    methods: {
      onCancelAction() {
        this.$emit("onCancel");
      },

      onOkAction() {
        this.$emit("onOk", this.isTip);
      },

      handleTip() {
        this.isTip = !this.isTip;
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
    "proputil",
    "show",
    "isTip",
    "btnCancelText",
    "btnText",
  ];
  return opts;
}
