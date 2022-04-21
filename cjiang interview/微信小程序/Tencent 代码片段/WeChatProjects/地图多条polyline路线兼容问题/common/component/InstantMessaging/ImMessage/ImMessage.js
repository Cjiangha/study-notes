import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { defaultDriverHeadImg } from "../../ToolBar/CommonToolBarHelper";
let FirstClintY = ""; // 初次滑动Y坐标

let MoveY = 0; // 记录滑动中Y坐标

let SlipDirection = ""; // 滑动方向

createComponent(
  createOptions({
    name: "ImMessage",
    props: {
      animationTime: {
        type: Number,
        default: 200,
      },
      messageShow: {
        type: Boolean,
        default: false,
      },
      message: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data: {
      translateY: "-100%",
      defaultHeadImg: defaultDriverHeadImg,
    },
    computed: {
      messageStyle() {
        return {
          transition: `transform ${this.animationTime}ms`,
          transform: `translateY(${this.translateY})`,
        };
      },

      displayAvatar() {
        if (this.message.contentType === 1) {
          return this.message.driverPicUrl || this.defaultHeadImg;
        }

        return "https://gw.alicdn.com/imgextra/i3/O1CN015W0aIY20AZWVvltk4_!!6000000006809-2-tps-129-129.png";
      },

      displayName() {
        return this.message.contentType === 1
          ? this.message.driverNickName
          : "";
      },
    },
    watch: {
      messageShow(show) {
        if (show) {
          this.messagePopupReset();
        } else {
          this.messagePopupPackUp();
        }
      },
    },
    methods: {
      enterIMH5() {
        const {
          amapOrderId,
          cid,
          driverNickName,
          driverImSwitch,
          driverPicUrl,
          cpOrderId,
          driverAppUid,
          orderTagInterlinkOrderFinish,
          userType,
        } = this.message;
        anyui.navigateTo({
          url: "/commonBiz/web_view/page/InstantMessaging",
          query: {
            amapOrderId,
            cid,
            canSendMessage: 1,
            // 是否可以发送消息，端内push必定可以发送
            driver: JSON.stringify({
              name: driverNickName,
              imSwitch: driverImSwitch,
              appUid: driverAppUid,
              avatar: driverPicUrl,
            }),
            order: JSON.stringify({
              channel: "",
              // push的channel为空值
              userType,
              etravelOrderId: cpOrderId,
              interlinkOrder: orderTagInterlinkOrderFinish,
            }),
          },
          complete: () => {
            this.$emit("onClosePopup");
          },
        });
      },

      touchStart(e) {
        const touch = e.touches[0] || e.changedTouches[0] || {};
        FirstClintY = touch.clientY;
        MoveY = FirstClintY;
      },

      touchMove(e) {
        const touch = e.touches[0] || e.changedTouches[0] || {};
        const currentY = touch.clientY;

        if (MoveY < currentY) {
          // 向下滑动
          SlipDirection = "down";
        } else {
          // 向上滑动
          SlipDirection = "up";
        }

        MoveY = currentY;
        const diffY = currentY - FirstClintY;

        if (diffY < 0) {
          this.translateY = `${diffY}px`;
        }
      },

      touchEnd() {
        if (SlipDirection === "up") {
          // 判断如果是向上滑动，弹窗收起
          this.$emit("onClosePopup");
        } else {
          // 如果是向下滑动，弹窗复原
          this.messagePopupReset();
        }
      },

      // 消息弹窗复原
      messagePopupReset() {
        this.translateY = "0%";
      },

      // 消息弹窗拉起
      messagePopupPackUp() {
        this.translateY = "-100%";
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "__ready__",
    "messageStyle",
    "displayAvatar",
    "displayName",
    "message",
  ];
  return opts;
}
