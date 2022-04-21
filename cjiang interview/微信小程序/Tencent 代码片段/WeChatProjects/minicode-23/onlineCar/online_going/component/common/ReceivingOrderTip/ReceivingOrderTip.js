import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "ReceivingOrderTip",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data: {
      QAData: {
        question: "为什么我每次选择多车型同时呼叫，却总被高价车型接单呢？",
        answer:
          "高峰期叫车，低价车型自然不容易接单，但平台会优先帮你呼叫低价的车型哦",
      },
    },

    created() {
      this.setQAData();
    },

    methods: {
      onClose() {
        this.$emit("onClose");
      },

      onConfirm() {
        this.$emit("onConfirm");
      },

      async setQAData() {
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["onClose_custHd_1"] = function (e) {
    this.onClose(...e.detail.$event);
  };

  opts.methods["onConfirm_custHd_2"] = function (e) {
    this.onConfirm(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "proputil", "show", "QAData"];
  return opts;
}
