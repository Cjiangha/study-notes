import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "ImPopup",
    props: {},
    data: {
      instanceShow: false,
      messageShow: false,
      animationTime: 200,
      // 动画时间，单位ms
      message: {},
      // 消息数据
      timer: null,
    },
    computed: {
    },

    mounted() {
    },

    beforeDestroy() {
    },

    methods: {
      openPopup() {
      },

      closePopup() {
      },

      monitorMessage(data) {
      },

      setCountDown() {
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods["closePopup_custHd_1"] = function (e) {
    this.closePopup(...e.detail.$event);
  };

  opts.methods["messagePopupReset_custHd_2"] = function (e) {
    this.messagePopupReset(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "instanceShow",
    "proputil",
    "message",
    "messageShow",
    "animationTime",
  ];
  return opts;
}
