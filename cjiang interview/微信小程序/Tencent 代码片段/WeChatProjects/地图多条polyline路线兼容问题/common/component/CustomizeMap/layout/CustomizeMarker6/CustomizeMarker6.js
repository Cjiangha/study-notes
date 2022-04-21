import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CustomizeMarker6",
    props: {
      customizeParams: Object,
    },
    data: {},
    computed: {
      textStyle() {
        return `color:${this.customizeParams.textColor};font-size:${this.customizeParams.textSize}px;`;
      },

      imgStyle() {
        return `width:${this.customizeParams.iconWidth}px;height:${this.customizeParams.iconHeight}px;`;
      },
    },
    watch: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "customizeParams",
    "proputil",
    "imgStyle",
    "textStyle",
  ];
  return opts;
}
