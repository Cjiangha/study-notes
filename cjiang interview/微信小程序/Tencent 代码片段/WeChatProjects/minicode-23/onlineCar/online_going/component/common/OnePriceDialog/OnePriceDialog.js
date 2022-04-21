import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "OnePriceDialog",
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
        default: "我知道了",
      },
      decsList: {
        type: Array,
        default: [],
      },
    },
    data: {
      isClose: false,
    },
    computed: {},
    methods: {
      onCloseAction(e) {
        this.$emit("onClick", e);
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
    "bgUrl",
    "subtitle",
    "decsList",
    "btnText",
  ];
  return opts;
}
