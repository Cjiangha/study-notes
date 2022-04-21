import { createComponent } from "@alife/anyui-wx-framework/index.js";

import * as lodash from "../../../../../common/tool/lodashUtil";
const loading =
  "https://gw.alicdn.com/imgextra/i2/O1CN01ZZ3cfk1FIYR51jIh1_!!6000000000464-1-tps-96-96.gif";

// const chace = {
//   count: -1,
// };
createComponent(
  createOptions({
    name: "Card",
    props: {
      currentRouteId: {
        type: String,
        default: "",
      },
      routesData: {
        type: Object,
        // eslint-disable-next-line no-empty-function
        default: () => {
          // eslint-disable-next-line no-unused-expressions
          return {};
        },
      },
      status: {
        type: String,
        default: "suc", // suc：成功, err: 失败，需要重试，loading：加载中
      },
    },

    data() {
      return {
        cardHegiht: "250px",
        index: 0,
        loading,
      };
    },

    // eslint-disable-next-line no-empty-function
    created() {},

    mounted() {
      this.index = lodash.get(this.routesData, "defaultChoose", 0);
    },

    computed: {
      routesList() {
        const item = lodash.get(this.routesData, "item", []);
        return item;
      },

      btnText() {
        return lodash.get(
          this.routesData,
          `item[${this.index}].routeChooseButtonContent`,
          "确认路线"
        );
      },

      tipsData() {
        const tipDescription = lodash.get(
          this.routesData,
          `item[${this.index}].tipDescription`,
          "请选择送驾路线"
        );
        const tipTagType = lodash.get(
          this.routesData,
          `item[${this.index}].tipTagType`,
          "IMAGE"
        );
        const tipTag = lodash.get(
          this.routesData,
          `item[${this.index}].tipTag`,
          "https://gw.alicdn.com/imgextra/i3/O1CN01V2XCCE1fZCtzB7EUX_!!6000000004020-2-tps-40-40.png"
        );
        return {
          tipDescription,
          tipTagType,
          tipTag,
        };
      },

      bgStyle() {
        const tipSkin = lodash.get(
          this.routesData,
          `item[${this.index}].tipSkin`,
          "none"
        );
        return {
          bgColor: tipSkin,
        };
      },

      defaultChoose() {
        return lodash.get(this.routesData, "defaultChoose", 0);
      },
    },
    methods: {
      handleSelect(index, item) {
        this.index = index;
        this.$emit("onSelect", index, item);
      },

      handleOk() {
        this.$emit("onOk");
      },

      handleReload() {
        this.$emit("onReload");
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.methods["handleSelect_custHd_1"] = function (e) {
    this.handleSelect(...e.detail.$event);
  };

  opts.$renderKeys = [
    "__ready__",
    "bgStyle",
    "status",
    "tipsData",
    "proputil",
    "defaultChoose",
    "routesList",
    "currentRouteId",
    "btnText",
    "cardHegiht",
    "loading",
  ];
  return opts;
}
