import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "LocationAuthDialog",
    props: {},
    data: {
      isShowAuthDialog: false,
    },
    computed: {},
    watch: {},

    created() {
    },

    mounted() {},

    methods: {
      handleClose() {
        this.isShowAuthDialog = false;
      },

      handleOpenSetting(res) {
        // const authSetting = lodash.get(res, 'detail.authSetting', {});
        // console.log('yuliang openSetting authSetting', authSetting);
        this.isShowAuthDialog = false;
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "isShowAuthDialog"];
  return opts;
}
