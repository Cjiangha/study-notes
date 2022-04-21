import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { mapGetters } from "@alife/anyui-wx-framework/vuex";
import * as lodash from "../../../../../common/tool/lodashUtil";
const shapeImg = "/onlineCar/online_going/images/shape.png";
const carImg = "/onlineCar/online_going/images/car.png";

createComponent(
  createOptions({
    name: "AirportTransferStatusCard",
    props: {
      title: {
        type: String,
        default: "",
      },
      showCarImg: {
        type: Boolean,
        default: false,
      },
      scheduledTime: {
        type: String,
        default: "",
      },
      tip: {
        type: String,
        default: "",
      },
      showNoticeBtn: {
        type: Boolean,
        default: false,
      },
    },
    data: {
      carImg,
      shapeImg,
    },
    computed: {
      ...mapGetters("going", {
        storeOrderDetail: "orderDetail",
      }),

      selectedCpList() {
        if (!this.storeOrderDetail || this.storeOrderDetail.status !== 101) {
          return [];
        }

        return this.storeOrderDetail.multiCP || [];
      },
    },
    methods: {
      noticeBtnClick() {
        anyui.navigateTo({
          url: "/onlineCar/airport_transportation/page/ServiceDes",
          query: {
            gdServiceId:
              lodash.get(this.storeOrderDetail, "gdServiceId", "") || "",
            cpSource:
              lodash.get(this.storeOrderDetail, "cpData.cpSource", "") || "",
            productType:
              lodash.get(this.storeOrderDetail, "cpData.productType", "") || "",
            rideType:
              lodash.get(this.storeOrderDetail, "cpData.rideType", "") || "",
            brandIconUrl:
              lodash.get(this.storeOrderDetail, "cpData.brandIconUrl", "") ||
              "",
            brandName:
              lodash.get(this.storeOrderDetail, "cpData.brandName", "") || "",
            numberOfSeats:
              lodash.get(this.storeOrderDetail, "cpData.numberOfSeats", "") ||
              "",
            source: "onlineGoing",
          },
        });
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "__ready__",
    "showCarImg",
    "carImg",
    "shapeImg",
    "title",
    "scheduledTime",
    "tip",
    "showNoticeBtn",
    "selectedCpList",
  ];
  return opts;
}
