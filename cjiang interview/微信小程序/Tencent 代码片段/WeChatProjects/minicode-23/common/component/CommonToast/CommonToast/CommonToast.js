import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CommonToast",
    props: {},
    data: {
      content: "toast",
      isShow: false,
    },
    computed: {},
    methods: {
      //展示
      show({ content = "toast", duration = 2000 }) {
        this.content = content;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, duration);
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "isShow", "content"];
  return opts;
}
