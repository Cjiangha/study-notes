import { createComponent } from "@alife/anyui-wx-framework/index.js";

let scrollTimer = 0;
createComponent(
  createOptions({
    name: "PreferenceNav",
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      isShowLately: {
        type: Boolean,
        default: false,
      },
      defaultIndex: {
        type: Number || String,
        default: 0,
      },
    },

    data() {
      return {
        isClick: false,
        scrollLeft: 0,
        // 处理滚动
        current: 0,
      };
    },

    created() {
      this.current = this.defaultIndex;
    },

    methods: {
      handleScroll(e) {
        if (scrollTimer) {
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            this.scrollLeft = e.detail.scrollTop;
          }, 50);
        } else {
          scrollTimer = setTimeout(() => {
            this.scrollLeft = e.detail.scrollTop;
          }, 50);
        }
      },

      handleSelect(index, item) {
        this.isClick = true;
        this.current = index;
        this.fixScrollLeft(index);
        this.$emit("onSelect", index, item);
      },

      fixScrollLeft(index) {
        let scrollLeft = this.scrollLeft;
        const len = this.list.length;
        const mid = Math.ceil(len / 2);
        const step = 100; // 滚动步长

        if (index > mid) {
          scrollLeft = +(index - mid) * step;
        }

        if (index < mid && scrollLeft > mid * step) {
          scrollLeft = -(mid - index) * step;
        }

        if (index === 0) {
          scrollLeft = 0;
        }

        this.scrollLeft = scrollLeft;
      },
    },
    computed: {
      navStyle() {
        if (this.list.length > 4) {
          return {
            marginLeft: "16rpx",
            marginRight: "16rpx",
            beforeLine: "",
            showMash: true,
            nav3: "",
          };
        }

        return {
          marginLeft: "28rpx",
          marginRight: "28rpx",
          beforeLine: "before-line",
          showMash: false,
          nav3: "nav3",
        };
      },
    },
  })
);

function createOptions(opts = {}) {
  {
    opts.methods.handleSelect1 = function (e) {
      this.handleSelect(
        e.currentTarget.dataset.bindtapparams0,
        e.currentTarget.dataset.bindtapparams1
      );
    };
  }
  opts.$renderKeys = [
    "__ready__",
    "isShowLately",
    "isClick",
    "scrollLeft",
    "scroll",
    "list",
    "current",
    "navStyle",
  ];
  return opts;
}
