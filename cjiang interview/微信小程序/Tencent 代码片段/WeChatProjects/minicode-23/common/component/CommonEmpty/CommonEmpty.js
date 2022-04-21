import { createComponent } from "@alife/anyui-wx-framework/index.js";

const defaultEmptyImg =
  "https://gw.alicdn.com/imgextra/i4/O1CN01AiBHr71gbKIIWq8Tr_!!6000000004160-2-tps-248-248.png";

createComponent(
  createOptions({
    name: "CommonEmpty",
    props: {
      wrapClass: {
        type: Object,
        default: () => {},
      },
      wrapStyle: {
        type: Object,
        default: () => {},
      },
      title: {
        type: String,
        default: "",
      },
      emptyImg: {
        type: String,
        default: defaultEmptyImg,
      },
      desc: {
        type: String,
        default: "",
      },
    },
    data: {},
    computed: {},
    methods: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "wrapClass",
    "__ready__",
    "wrapStyle",
    "emptyImg",
    "__slotObj",
    "title",
    "desc",
  ];
  return opts;
}
