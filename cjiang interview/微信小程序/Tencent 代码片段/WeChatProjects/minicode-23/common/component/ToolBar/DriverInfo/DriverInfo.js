import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "DriverInfo",
    props: {
      driverInfo: {
        type: Object,
        default: {
          avatar: "",
          brandName: "",
          name: "",
          licensePlate: "",
        },
      },
    },
    data: {},
    computed: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "driverInfo"];
  return opts;
}
