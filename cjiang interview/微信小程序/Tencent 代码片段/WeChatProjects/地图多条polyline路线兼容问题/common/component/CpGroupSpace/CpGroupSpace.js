import { createComponent } from "@alife/anyui-wx-framework/index.js";

import * as lodash from "../../tool/lodashUtil";
createComponent(
  createOptions({
    name: "CpGroupSpace",
    props: {
      index: {
        type: Number,
        default: -1,
      },
      useTypeTaxi: {
        type: Boolean,
      },
    },
    computed: {
      show() {
        const originCpGroupList = lodash.get(
          this.$store,
          "state.cp.cpList.originCpGroupList",
          []
        );
        return this.index < originCpGroupList.length - 1; // 最后一个分组不展示分界线
      },

      mini() {
        // 出租车剥离开
        if (this.useTypeTaxi) {
          if (!this.show) {
            return false;
          }

          const originCpGroupList = lodash.get(
            this.$store,
            "state.cp.cpList.originCpGroupList",
            []
          );
          const nextGroup = lodash.get(originCpGroupList, this.index + 1);
          const currentGroup = lodash.get(originCpGroupList, this.index);

          if (!nextGroup || !currentGroup) {
            return false;
          }

          return (
            (currentGroup.amapRideType === "gd_express" &&
              nextGroup.amapRideType === "gd_taxi") ||
            (currentGroup.amapRideType === "gd_taxi" &&
              nextGroup.amapRideType === "gd_express")
          );
        }

        return false;
      },
    },
    data: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["mini", "__ready__", "show"];
  return opts;
}
