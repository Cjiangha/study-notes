import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "index",
    data: {},
    computed: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__"];
  return opts;
}
