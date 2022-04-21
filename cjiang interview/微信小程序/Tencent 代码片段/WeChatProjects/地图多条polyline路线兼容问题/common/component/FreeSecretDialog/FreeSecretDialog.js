import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_showToast from '@alife/anyui-wx-api/lib/showToast.js';
anyui._wrapApi('showToast', _a_u_showToast)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "FreeSecretDialog",
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      /** 开启免密 */
      openFreeSecret() {
      },

      handleClose() {
        this.$emit("updateFreeSecretDialogState", false);
      },
    },
    data: {},
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "proputil", "show"];
  return opts;
}
