import { createComponent } from "@alife/anyui-wx-framework/index.js";

const successIcon = "/onlineCar/online_going/images/success_icon_empty.png";
const warningIcon =
  "/onlineCar/online_going/images/warning_icon_empty_yellow.png";

const iconMap = {
  success: successIcon,
  warning: warningIcon,
};
createComponent(
  createOptions({
    name: "TopOrderStatusCard",
    props: {
      iconType: {
        type: String,
        default: "warning",
      },
      mainTitle: {
        type: String,
        default: "",
      },
      subTitle: {
        type: String,
        default: "",
      },
    },
    computed: {
      imgSrc() {
        return iconMap[this.iconType] || iconMap.warning;
      },
    },
    data: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "imgSrc", "mainTitle", "subTitle"];
  return opts;
}
