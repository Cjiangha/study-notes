import { createComponent } from "@alife/anyui-wx-framework/index.js";

// import ConnectTest from '@common/component/InstantMessaging/connectTest.vue';

/*
  -------- 注意 ----------
  default.vue 内部的组件会在所有的页面注册
  -------- 注意 ----------
*/
createComponent(
  createOptions({
    name: "default",

    data() {
      return {
        // extraAppInfo: [], // app额外的信息
      };
    },

    mounted() {
      // this.initElves();
    },

    methods: {
      // async initElves() {
      //   const commonParam = await getCommonParam();
      //   if (commonParam) {
      //     const list = Object.entries(commonParam).map(([name, value]) => ({ name, value }));
      //     this.extraAppInfo = [
      //       { title: '公参', list },
      //     ];
      //   }
      // },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "__slotObj"];
  return opts;
}
