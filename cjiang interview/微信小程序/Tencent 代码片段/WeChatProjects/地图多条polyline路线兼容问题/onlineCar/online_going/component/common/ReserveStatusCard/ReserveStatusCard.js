import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { mapGetters } from "@alife/anyui-wx-framework/vuex";
import * as lodash from "../../../../../common/tool/lodashUtil";
createComponent(
  createOptions({
    name: "ReserveStatusCard",
    computed: {
      ...mapGetters("going", {
        storeOrderDetail: "orderDetail",
      }),

      title() {
        return lodash.get(this.storeOrderDetail, "reserveSucess", "") || "";
      },

      reserveDate() {
        return lodash.get(this.storeOrderDetail, "reserveDate", "") || "";
      },

      reserveTime() {
        return lodash.get(this.storeOrderDetail, "reserveTime", "") || "";
      },
    },
    data: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "title", "reserveDate", "reserveTime"];
  return opts;
}
