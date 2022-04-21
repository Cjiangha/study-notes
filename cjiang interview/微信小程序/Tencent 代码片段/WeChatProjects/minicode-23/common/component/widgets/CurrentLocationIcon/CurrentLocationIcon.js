import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CurrentLocationIcon",
    props: {
      className: {
        type: String,
        default: "",
      },
    },
    methods: {
      handleClick(e) {
        this.$emit("iconClick", e);
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
