import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { replaceColor } from "../../../tool/richTool";
createComponent(
  createOptions({
    name: "ControlAreaPop",
    props: {
      /* 页面来源 */
      pageKey: {
        type: String,
        default: "",
      },

      /* 区域名称 */
      areaName: {
        type: String,
        default: "",
      },

      /* 区域描述 */
      des: {
        type: String,
        default: "",
      },

      /* 坐标点名称 */
      ponitName: {
        type: String,
        default: "",
      },
    },

    data() {
      return {
        isShow: true,
      };
    },

    computed: {
      areaDes() {
        return replaceColor(this.des);
      },
    },
    methods: {
      /**
       * @description: 点击确认上车点
       */
      hardleOk() {
        this.isShow = false;
        this.$emit("onOk");
      },

      /**
       * @description: 起点不在该区域，跳去search页面搜索
       */
      goSeach() {
        
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "isShow",
    "areaName",
    "areaDes",
    "ponitName",
  ];
  return opts;
}
