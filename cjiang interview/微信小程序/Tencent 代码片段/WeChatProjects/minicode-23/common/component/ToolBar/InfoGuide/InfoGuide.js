import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { sendMessageGuide } from "../../../cache/Cache.js";
import { choosePathGuide } from "../../../cache/Cache.js";
const textMap = {
  sendMessage: "现在可以和对方发消息了",
  choosePath: "点击选择送驾路线",
};
createComponent(
  createOptions({
    name: "InfoGuide",
    props: {
      type: {
        type: String,
        default: "",
      },
    },

    data() {
      return {
        showGuide: false, // 疲劳度级别展示与否
      };
    },

    computed: {
      text() {
        return textMap[this.type];
      },
    },
    watch: {},

    mounted() {
      let firstGuide = 0;

      if (this.type === "sendMessage") {
        firstGuide = sendMessageGuide.get();
      } else if (this.type === "choosePath") {
        firstGuide = choosePathGuide.get();
      }

      if (firstGuide !== 1) {
        this.showGuide = true;

        if (this.type === "sendMessage") {
          sendMessageGuide.set(1);
        }

        if (this.type === "choosePath") {
          choosePathGuide.set(1);
        }
      }
    },

    methods: {
      hideGuide() {
        this.showGuide = false;
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "showGuide", "text", "proputil"];
  return opts;
}
