import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "ActionModal",
    props: {
      actionContent: {
        type: Object,
        default: {},
      },
      actionShow: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onCloseAction() {
        this.$emit("hideActionModal");
      },
    },
    data: {},
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["onCloseAction_custHd_1"] = function (e) {
    this.onCloseAction(...e.detail.$event);
  };

  opts.methods["onCloseAction_custHd_2"] = function (e) {
    this.onCloseAction(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "proputil", "actionShow", "actionContent"];
  return opts;
}
