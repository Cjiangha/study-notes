import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "SafeCenterIcon",
    props: {},
    methods: {
      /* 跳转到 安全中心事件 */
      handleClick(e) {
        this.$emit("safeClick", e);
      },
    },
    data: {},
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__"];
  return opts;
}
