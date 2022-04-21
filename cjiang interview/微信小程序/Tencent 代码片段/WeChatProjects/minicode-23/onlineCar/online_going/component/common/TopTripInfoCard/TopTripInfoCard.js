import { createComponent } from "@alife/anyui-wx-framework/index.js";

import * as lodash from "../../../../../common/tool/lodashUtil";
const sesameImg =
  "https://gw.alicdn.com/imgextra/i1/O1CN01r673ra1t9veHSZBVg_!!6000000005860-2-tps-28-34.png";

createComponent(
  createOptions({
    name: "TopTripInfoCard",
    props: {
      mainTitle: {
        type: String,
        default: "",
      },
      subTitle: {
        type: String,
        default: "",
      },
      showOpenTipPopupBtn: {
        type: Boolean,
        default: false,
      },
    },
    data: {
      sesameIcon: "",
      sesameCreditDesc: "",
    },

    created() {
      this.setSesameInfo();
    },

    methods: {
      showTipPopup() {
        this.$emit("showTipPopup");
      },

      async setSesameInfo() {
        this.sesameIcon = zhimaIcon || sesameImg;
        const zhima = await getConfigForKey("zhima");

        if (zhima) {
          const isOpen = lodash.get(zhima, "resourceConfig.isOpen");

          if (isOpen) {
            this.sesameCreditDesc = lodash.get(
              zhima,
              "travelingConfig.message",
              ""
            );
          }
        }
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "__ready__",
    "mainTitle",
    "showOpenTipPopupBtn",
    "subTitle",
  ];
  return opts;
}
