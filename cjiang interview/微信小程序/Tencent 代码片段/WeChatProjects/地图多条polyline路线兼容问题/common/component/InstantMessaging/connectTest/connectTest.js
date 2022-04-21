import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { mapState } from "@alife/anyui-wx-framework/vuex";
import { mapMutations } from "@alife/anyui-wx-framework/vuex";
createComponent(
  createOptions({
    name: "connectTest",
    props: {},
    data: {
      currentY: 20,
      currentX: 20,
      startX: 0,
      startY: 0,
    },
    computed: {
      ...mapState("home", ["socketConnectFlag"]),

      bubbleStyle() {
        return {
          transform: `translateX(${this.currentX}) translateY(${this.currentY})`,
        };
      },
    },
    watch: {},

    created() {
    },

    methods: {
      ...mapMutations("home", ["setSocketConnectFlag"]),

      touchStart(e) {
        const touch = e.touches[0] || e.changedTouches[0] || {};
        this.startY = touch.clientY;
        this.startX = touch.clientX;
      },

      touchMove(e) {
        const touch = e.touches[0] || e.changedTouches[0] || {};
        const currentY = touch.clientY;
        const currentX = touch.clientX;
        this.currentY = currentY - this.startY + "px";
        this.currentX = currentX - this.startX + "px";
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "socketConnectFlag", "bubbleStyle"];
  return opts;
}
