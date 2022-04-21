import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "index",
    props: {
      visible: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: "DIALOG_PICTURE_CARD",
      },
      popupInfo: {
        type: Object,
        default: {
          buttonText: "我知道了",
          description: "为保护您的隐私安全，上车时请用虚拟尾号与司机确认身份1",
          title: "虚拟尾号",
        },
      },
    },
    data: {},
    computed: {},
    watch: {},
    methods: {
      handleOk() {
        this.$emit("onOk");
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods["handleOk_custHd_1"] = function (e) {
    this.handleOk(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "type", "proputil", "visible", "popupInfo"];
  return opts;
}
