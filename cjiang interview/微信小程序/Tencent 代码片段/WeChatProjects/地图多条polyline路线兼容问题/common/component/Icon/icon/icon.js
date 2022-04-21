import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "icon",
    props: {
      type: {
        type: String,
        default: "",
      },
      color: {
        type: String,
        default: "",
      },
      style: {
        type: Object,
        default: {},
      },
      size: {
        type: String,
        default: "16px",
      },
    },
    data: {},
    computed: {
      customStyle() {
        const custom = { ...this.style, fontSize: this.size };

        if (this.color) {
          custom.color = this.color;
        }

        return custom;
      },
    },
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["type", "__ready__", "customStyle"];
  return opts;
}
