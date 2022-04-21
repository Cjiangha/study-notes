import { createComponent } from "@alife/anyui-wx-framework/index.js";

import Login from "../../../login/Login.js";
import { WX_REGISTER } from "../../../login/Login.js";
import { LoginEvent } from "../../../login/Login.js";
import * as lodash from "../../../tool/lodashUtil";
import User from "../../../login/User.js";
createComponent(
  createOptions({
    name: "LoginWrapper",
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      style: {
        type: String,
        default: "",
      },
    },
    data: {
      isWXRegistered: -1, // 微信小程序是否已经注册标识 -1:状态为获取 true:已注册 false:未注册
    },
    computed: {},
    watch: {},

    async created() {
      // 获取是否已经注册微信
      this.isWXRegistered = (await Login.getRegisterStatus()) || false;
      LoginEvent.$on(WX_REGISTER, (val) => {
        this.isWXRegistered = val || false;
      });
    },

    mounted() {},

    methods: {
      async handleClick() {
        if (this.disabled) {
          this.$emit("disabledClick");
          return;
        } // 如果注册过，走微信登录流程

        if (this.isWXRegistered === true) {
          if (User.isLogin()) {
            this.$emit("loginClick");
          } else {
            // 防重复点击，登录请求中标识
            if (this._logging) {
              return;
            }

            this._logging = true;
            const res = await Login.login();
            this._logging = false;

            if (res) {
              this.$emit("loginClick");
            }
          }
        }
      },

      /**
       * 处理点击 微信授权弹窗
       */
      async handlerGetUserPhone(e) {
        if (this.disabled) {
          this.$emit("disabledClick");
          return;
        }

        const { encryptedData, iv } = lodash.get(e, "detail", {});

        if (encryptedData && iv) {
          const res = await Login.register(encryptedData, iv);

          if (res) {
            this.$emit("loginClick");
          }
        }
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "isWXRegistered",
    "__ready__",
    "style",
    "__slotObj",
    "disabled",
  ];
  return opts;
}
