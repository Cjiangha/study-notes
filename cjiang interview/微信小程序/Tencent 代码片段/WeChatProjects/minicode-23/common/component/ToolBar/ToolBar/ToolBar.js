import { createComponent } from "@alife/anyui-wx-framework/index.js";

import dataLog from "../../../dataLog/dataLog.js";
import { DATA_LOG_PAGE_ID } from "../../../dataLog/dataLog.js";
import { statusMap } from "../CommonToolBarHelper.js";
import { buttonidJSON } from "../CommonToolBarHelper.js";
import { sendMessageGuide } from "../../../cache/Cache.js";
createComponent(
  createOptions({
    name: "ToolBar",
    props: {
      toolList: {
        type: Array,
        default: [],
      },
      moreToolList: {
        type: Boolean,
        default: false,
      },
      status: {
        type: Number,
        default: 0,
      },
      isSingle: {
        type: Boolean,
        default: false,
      },
      unreadAmount: {
        // 未读消息数量
        type: Number,
        default: 0,
      },
      showMessageGuide: {
        // 是否展示消息新手引导
        type: Boolean,
        default: false,
      },
    },
    data: {
      isShowChoosePathGuide: true,
    },
    computed: {
      displayUnread() {
        return this.unreadAmount <= 99 ? this.unreadAmount : "99+";
      },

      isShowPathGuide() {
        const messageGuide = sendMessageGuide.get();

        if (
          !this.showMessageGuide ||
          (this.showMessageGuide && messageGuide === 1)
        ) {
          return this.isShowChoosePathGuide;
        }

        return false;
      },
    },

    mounted() {
      // console.log(this.moreToolList);
    },

    methods: {
      toolClick(emitClick, item) {
        if (emitClick === "choosePath") {
          this.isShowChoosePathGuide = false;
        }

        this.$emit(emitClick, item);

        if (this.status === 112) {
          dataLog.report(DATA_LOG_PAGE_ID.onlineOverPayed, "B002", {
            click_type: buttonidJSON[emitClick] || "",
          });
        } else if (this.status === 106) {
          dataLog.report(DATA_LOG_PAGE_ID.onlineOverPaying, "B003", {
            click_type: buttonidJSON[emitClick] || "",
          });
        } else {
          dataLog.report(DATA_LOG_PAGE_ID.onlinePage, "B001", {
            statusid: statusMap[this.status] || "",
            buttonid: buttonidJSON[emitClick] || "",
          });
        }
      },

      shareLinkClick() {
        if (this.status === 112) {
          dataLog.report(DATA_LOG_PAGE_ID.onlineOverPayed, "B002", {
            click_type: 2,
          }); // #ifdef ALIMINI

          dataLog.report(DATA_LOG_PAGE_ID.onlineOverPayed, "B003", {
            click_type: 2,
          });
        } else if (this.status === 106) {
          dataLog.report(DATA_LOG_PAGE_ID.onlineOverPaying, "B003", {
            click_type: 2,
          }); // #ifdef ALIMINI

          dataLog.report(DATA_LOG_PAGE_ID.onlineOverPaying, "B004", {
            click_type: 2,
          });
        } else {
          dataLog.report(DATA_LOG_PAGE_ID.onlinePage, "B001", {
            statusid: statusMap[this.status] || "",
            buttonid: 2,
          });
        }
      },
    },
  })
);

function createOptions(opts = {}) {
  {
    opts.methods.toolClick1 = function (e) {
      this.toolClick(e.currentTarget.dataset.bindtapparams0);
    };
  }
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };
  {
    opts.methods.toolClick2 = function (e) {
      this.toolClick(
        e.currentTarget.dataset.bindtapparams0,
        e.currentTarget.dataset.bindtapparams1
      );
    };
  }
  {
    opts.methods.toolClick3 = function (e) {
      this.toolClick(e.currentTarget.dataset.bindtapparams0);
    };
  }
  {
    opts.methods.toolClick4 = function (e) {
      this.toolClick(e.currentTarget.dataset.bindtapparams0);
    };
  }
  opts.$renderKeys = [
    "isSingle",
    "__ready__",
    "toolList",
    "unreadAmount",
    "displayUnread",
    "showMessageGuide",
    "proputil",
    "isShowPathGuide",
    "moreToolList",
  ];
  return opts;
}
