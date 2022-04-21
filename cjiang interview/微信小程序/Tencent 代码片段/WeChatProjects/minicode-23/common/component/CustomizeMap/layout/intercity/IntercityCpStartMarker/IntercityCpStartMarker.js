import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "IntercityCpStartMarker",
    props: {
      customizeParams: Object,
    },
    data: {},
    computed: {},
    watch: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "customizeParams", "proputil"];
  return opts;
}
