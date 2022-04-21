import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "LocalLoading",
    props: {
      loadingTip: {
        type: String,
        default: "加载中…",
      },
    },
    data: {},
    computed: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "__slotObj", "loadingTip"];
  return opts;
}
