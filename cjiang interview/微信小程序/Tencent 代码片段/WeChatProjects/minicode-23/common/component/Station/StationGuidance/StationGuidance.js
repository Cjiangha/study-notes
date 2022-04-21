import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "StationGuidance",
    props: {
      pickerData: {
        type: Array,
        default: () => [],
      },
      selectValue: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        pickerVisible: true,
      };
    },

    watch: {
      /* picker是原生组件，如果 PickerViewColumn里的元素有变化，或者数组 pickerData 数组长度有变化，
      可能会导致下标和数据对应不上的问题。需要重新触发渲染才会显示正常。
      例子：selectValue 是[1] pickerData数组长度从 1变为2，此时不会选中第二项，而重新渲染则ok
    */
      pickerData() {
        this.pickerVisible = false;
        this.$nextTick(() => {
          this.pickerVisible = true;
        });
      },
    },
    computed: {},
    methods: {
      /**
       * @description: pciker 变化时触发
       */
      handlePickerChange(e) {
        const value = e.detail.value;
        const val = this.pickerData[value[0]];
        this.$emit("onPickerChange", value, { ...val });
      },
    },
  })
);

function createOptions(opts = {}) {
  {
    opts.methods.bindchangehandlePickerChange = function (e) {
      const val = e.detail.value;
      if (
        (typeof val === "number" ||
          (typeof val === "string" && val.trim() !== "")) &&
        !isNaN(val)
      ) {
        e.detail.value = 1 * val;
      }
      if (/^true$/.test(val)) {
        e.detail.value = true;
      }
      if (/^false$/.test(val)) {
        e.detail.value = false;
      }
      this.handlePickerChange(e);
    };
  }
  opts.$renderKeys = [
    "__ready__",
    "__slotObj",
    "pickerVisible",
    "selectValue",
    "pickerData",
  ];
  return opts;
}
