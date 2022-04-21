import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { carTipsPopupInfoFatigue } from "../../../../../common/cache/Cache";
import { replaceColor } from "../../../../../common/tool/richTool";
createComponent(
  createOptions({
    name: "TipsPopup",
    props: {
      popupInfo: {
        type: Object,
        default: {},
      },
      amapOrderId: {
        type: String,
        default: "",
      },
    },
    computed: {
      show() {
        const { type, fatigue = {} } = this.popupInfo || {};

        if (
          type === 1 &&
          fatigue.type === 1 &&
          this._getFatigueCount() < (fatigue.times || 0) &&
          !this.isClose
        ) {
          return true;
        }

        return false;
      },

      richTipsTitle() {
        return replaceColor(this.contentData.title || "");
      },

      contentData() {
        return (this.popupInfo || {}).content || {};
      },

      buttonData() {
        return ((this.popupInfo || {}).button || [])[0] || {};
      },
    },
    data: {
      isClose: false,
    },
    methods: {
      _getFatigueKey() {
        const { id } = this.popupInfo || {};
        return `${id}_${this.amapOrderId}`;
      },

      _getFatigueCount() {
        const key = this._getFatigueKey();

        return (carTipsPopupInfoFatigue.get() || {})[key] || 0;
      },

      onCloseAction() {
        this.isClose = true;
        carTipsPopupInfoFatigue.set({
          [this._getFatigueKey()]: this._getFatigueCount() + 1,
        });
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
    "contentData",
    "richTipsTitle",
    "buttonData",
  ];
  return opts;
}
