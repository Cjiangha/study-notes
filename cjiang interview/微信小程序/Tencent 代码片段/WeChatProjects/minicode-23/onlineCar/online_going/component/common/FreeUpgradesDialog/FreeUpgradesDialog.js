import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { freeUpgradesDialogFatigue } from "../../../../../common/cache/Cache";
import dataLog from "../../../../../common/dataLog/dataLog.js";
import { DATA_LOG_PAGE_ID } from "../../../../../common/dataLog/dataLog.js";
import User from "../../../../../common/login/User";
createComponent(
  createOptions({
    name: "FreeUpgradesDialog",
    props: {
      amapOrderId: {
        type: String,
        default: "",
      },
      status: {
        type: Number,
        default: 0,
      },
      popupInfo: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data: {
      canShow: false,
      // 用于延迟显示弹窗， 用于弹窗背景图片请求+渲染，
      isClose: false,
      bgImg:
        "https://img.alicdn.com/imgextra/i2/O1CN01UIHxPV1J5y3GtxCO4_!!6000000000978-2-tps-1077-1548.png",
    },

    mounted() {
      setTimeout(() => {
        this.canShow = true;
      }, 200);
    },

    computed: {
      show() {
        const { type, fatigue = {} } = this.popupInfo || {};

        if (
          type === 2 &&
          fatigue.type === 1 &&
          this._getFatigueCount() < (fatigue.times || 0) &&
          !this.isClose &&
          this.canShow
        ) {
          const { userId = "" } = User.getUserInfo() || {};
          dataLog.report(DATA_LOG_PAGE_ID.onlinePage, "B010", {
            status: this.status,
            order_id: this.amapOrderId,
            userid: userId,
          });
          return true;
        }

        return false;
      },

      content() {
        const content = (this.popupInfo || {}).content || {};
        (content.detailContent || []).forEach((item) => {
          item.text = item.text.replace(
            /style=(["'])/gi,
            (match, p1) => `style=${p1}position: relative;top: 1px;`
          );
        });
        return content;
      },

      button() {
        return ((this.popupInfo || {}).button || [])[0] || {};
      },
    },
    methods: {
      _getFatigueKey() {
        const { id } = this.popupInfo || "";
        return `${id}_${this.amapOrderId}`;
      },

      _getFatigueCount() {
        const key = this._getFatigueKey();

        return (freeUpgradesDialogFatigue.get() || {})[key] || 0;
      },

      onCloseAction() {
        this.isClose = true;
        const records = freeUpgradesDialogFatigue.get() || {};
        freeUpgradesDialogFatigue.set({
          ...records,
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
    "content",
    "bgImg",
    "button",
  ];
  return opts;
}
