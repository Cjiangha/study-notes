import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_showToast from '@alife/anyui-wx-api/lib/showToast.js';
anyui._wrapApi('showToast', _a_u_showToast)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "GoingRefreshIcon",
    methods: {
      refreshIconClick() {
        const curTime = new Date().valueOf();

        if (
          this.lastClickTime &&
          curTime - this.lastClickTime >= 400 &&
          curTime - this.lastClickTime < 5000
        ) {
          if (this.showToast) {
            return;
          }

          this.showToast = true;
          anyui.showToast({
            content: "重算路径与当前一致，稍后再试",
          });
          setTimeout(() => {
            this.showToast = false;
          }, 2000); // toast展示2s
        }

        this.lastClickTime = curTime;
      },
    },
    data: {},
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["refreshIconClick_custHd_1"] = function (e) {
    this.refreshIconClick(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "proputil"];
  return opts;
}
