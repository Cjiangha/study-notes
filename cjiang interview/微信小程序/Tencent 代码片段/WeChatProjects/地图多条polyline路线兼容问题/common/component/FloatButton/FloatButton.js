import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "FloatButton",
    props: {
      // 按钮样式
      style: {
        type: Object,
        default: () => {
          return {};
        },
      },

      /**
       * 按钮定位
       * @top
       * @right
       * @bottom
       * @left
       */
      position: {
        type: Object,
        default: () => {
          return {
            top: 0,
            right: 0,
          };
        },
      },

      /**
       * 按钮名称
       */
      title: {
        type: String,
        default: "",
      },
      /**
       * 点击事件 @onClick="XXX"
       * @event Object 点击的 target 对象
       */
    },
    data: {
      phone: "",
      isDisable: false, // 是否禁用
    },

    created() {},

    methods: {
      /**
       * 点击按钮回调
       */
      handleClick(event) {
        if (!this.isDisable) {
          this.isDisable = true;
          this.$emit("onClick", event);
          setTimeout(() => {
            this.isDisable = false;
          }, 100);
        }
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "position", "style", "title"];
  return opts;
}
