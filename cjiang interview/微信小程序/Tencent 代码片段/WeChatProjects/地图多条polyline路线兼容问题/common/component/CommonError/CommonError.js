import { createComponent } from "@alife/anyui-wx-framework/index.js";

const notLoginImg =
  "https://gw.alicdn.com/imgextra/i2/O1CN01WqdohW1G5YoVHLwEW_!!6000000000571-2-tps-248-248.png";
const commonErrorImg =
  "https://gw.alicdn.com/imgextra/i2/O1CN01QEAdZi1mtXjzkCYBx_!!6000000005012-2-tps-248-248.png";

createComponent(
  createOptions({
    name: "CommonError",
    props: {
      wrapClass: {
        type: Object,
        default: () => {
          // do some
        },
      },
      wrapStyle: {
        type: Object,
        default: () => {
          // do some
        },
      },
      img: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      desc: {
        type: String,
        default: "",
      },
      btnText: {
        type: String,
        default: "刷新重试",
      },
      isNotLogin: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      imgSrc() {
        if (this.img) {
          return this.img;
        }

        if (this.isNotLogin) {
          return notLoginImg;
        }

        return commonErrorImg;
      },
    },
    methods: {
      btnClick() {
        this.$emit("btnClick");
      },
    },
    data: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["btnClick_custHd_1"] = function (e) {
    this.btnClick(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "wrapClass",
    "__ready__",
    "wrapStyle",
    "imgSrc",
    "__slotObj",
    "title",
    "desc",
    "isNotLogin",
    "proputil",
    "btnText",
  ];
  return opts;
}
