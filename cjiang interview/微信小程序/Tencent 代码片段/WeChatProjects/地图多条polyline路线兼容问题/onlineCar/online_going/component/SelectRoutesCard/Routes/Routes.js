import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "Routes",
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      selected: {
        type: Number,
        default: 0,
      },
      currentRouteId: {
        type: String,
        default: "",
      },
    },

    data() {
      return {
        current: 0,
        selectedRouteId: "",
      };
    },

    created() {
      this.current = this.selected;
      this.selectedRouteId = this.currentRouteId;
    },

    methods: {
      handleSelect(index, item, pathId) {
        this.selectedRouteId = pathId;
        this.current = index;
        this.$emit("onSelect", index, item);
      },
    },
    watch: {
      currentRouteId(value) {
        this.selectedRouteId = value;
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  {
    opts.methods.handleSelect1 = function (e) {
      this.handleSelect(
        e.currentTarget.dataset.bindtapparams0,
        e.currentTarget.dataset.bindtapparams1,
        e.currentTarget.dataset.bindtapparams2
      );
    };
  }
  opts.$renderKeys = ["__ready__", "list", "selectedRouteId"];
  return opts;
}
