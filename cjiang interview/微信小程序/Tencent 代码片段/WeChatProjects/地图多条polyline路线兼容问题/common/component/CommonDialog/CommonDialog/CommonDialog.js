import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CommonDialog",
    props: {
      visible: {
        //是否显示 Dialog
        type: Boolean,
        default: false,
      },
      mask: {
        //是否需要遮罩层
        type: Boolean,
        default: true,
      },
      closeOnClickMask: {
        //是否可以通过点击 modal 关闭 Dialog
        type: Boolean,
        default: false,
      },
      customClass: {
        //Dialog 的自定义类名
        type: String,
        default: "",
      },
      title: {
        //Dialog 的标题，也可通过slot传入，属性优先级别>slot
        type: String,
        default: "",
      },
      content: {
        //Dialog 的内容，也可通过slot传入，属性优先级别>slot
        type: String,
        default: "",
      },
      viewType: {
        //Dialog 的底部按钮个数，可支持配置1个或者2个，默认为2个，>2个时支持slot自定义
        type: Number,
        default: 2,
      },
      okText: {
        //Dialog 的底部按钮文案，viewType:1时按钮文案，或者viewType：2时右侧按钮文案
        type: String,
        default: "确定",
      },
      cancelText: {
        //Dialog 的底部按钮文案，viewType：2时左侧按钮文案
        type: String,
        default: "取消",
      },
    },
    data: {},
    computed: {},
    watch: {},
    methods: {
      /**
       * Dialog 的底部按钮绑定事件，viewType：2时左侧按钮绑定事件
       */
      handleCancel() {
        this.$emit("onCancel");
      },

      /**
       * Dialog 的底部按钮绑定事件，viewType:1时按钮绑定事件，或者viewType：2时右侧按钮绑定事件
       */
      handleOk() {
        this.$emit("onOk");
      },

      /**
       * 是否可以通过点击 modal 关闭 Dialog
       */
      handleModalCancel() {
        if (this.closeOnClickMask) {
          this.handleCancel();
        }
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "__ready__",
    "visible",
    "mask",
    "customClass",
    "title",
    "__slotObj",
    "content",
    "viewType",
    "cancelText",
    "okText",
  ];
  return opts;
}
