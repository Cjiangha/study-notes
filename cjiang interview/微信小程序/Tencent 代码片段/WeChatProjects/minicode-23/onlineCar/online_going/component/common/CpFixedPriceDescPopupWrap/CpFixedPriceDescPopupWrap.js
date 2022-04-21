import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { mapGetters } from "@alife/anyui-wx-framework/vuex";
import * as lodash from "../../../../../common/tool/lodashUtil";
createComponent(
  createOptions({
    name: "CpFixedPriceDescPopupWrap",
    computed: {
      ...mapGetters("going", {
        storeOrderDetail: "orderDetail",
      }),

      specialPriceDesc() {
        if (this.storeOrderDetail && this.storeOrderDetail.specialPriceDesc) {
          return this.storeOrderDetail.specialPriceDesc;
        }

        return {};
      },
    },
    methods: {
      show() {
        const cpFixedPriceDescPopupRef = this.$refs.cpFixedPriceDescPopup;
        cpFixedPriceDescPopupRef &&
          cpFixedPriceDescPopupRef.show({
            title: lodash.get(this.specialPriceDesc, "explain") || "",
            subTitle: lodash.get(this.specialPriceDesc, "priceExplain") || "",
            tipsArray: lodash.get(this.specialPriceDesc, "descArray") || [],
          });
      },
    },
    data: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["_saveRef1"] = function (ref) {
    if (!this.$refs) {
      this.$refs = {};
    }
    ref = ref.detail[0];
    this.$refs["cpFixedPriceDescPopup"] = ref.$anyui;
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "proputil"];
  return opts;
}
