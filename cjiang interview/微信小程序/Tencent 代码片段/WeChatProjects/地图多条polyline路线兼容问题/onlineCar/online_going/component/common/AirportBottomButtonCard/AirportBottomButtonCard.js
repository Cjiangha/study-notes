import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_redirectTo from '@alife/anyui-wx-api/lib/redirectTo.js';
import _a_u_navigateBack from '@alife/anyui-wx-api/lib/navigateBack.js';
anyui._wrapApi('redirectTo', _a_u_redirectTo)
anyui._wrapApi('navigateBack', _a_u_navigateBack)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { mapGetters } from "@alife/anyui-wx-framework/vuex";
import { mapMutations } from "@alife/anyui-wx-framework/vuex";
import { HOME_TAB_KEYS } from "../../../../../common/dataConfig";
import * as lodash from "../../../../../common/tool/lodashUtil";
createComponent(
  createOptions({
    name: "AirportBottomButtonCard",
    props: {
      btnText: {
        type: String,
        default: "",
      },
      fontStyle: {
        type: Object,
        default: () => null,
      },
      taxiDefaultHandle: {
        type: Boolean,
        default: false,
      },
      showCurrentLocationIcon: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapGetters("going", {
        storeIsAirportTransferOrder: "isAirportTransferOrder",
        storeOrderDetail: "orderDetail",
        storeSource: "source",
        storeIsReserveOrder: "isReserveOrder",
      }),
    },
    methods: {
      ...mapMutations("home", {
        storeSetActiveTab: "setActiveTab",
      }),
      ...mapMutations("airportComponent", {
        storeUpdateAirportComponentData: "updateAirportComponentData",
      }),

      btnClick() {
        if (this.taxiDefaultHandle) {
          const gdServiceId = lodash.get(this.storeOrderDetail, "gdServiceId");

          if (gdServiceId === 5) {
            const startInfo = lodash.get(this.storeOrderDetail, "startInfo");
            const endInfo = lodash.get(this.storeOrderDetail, "endInfo"); //远程特惠点击重新打车后跳转城际运力

            anyui.redirectTo({
              url: "/intercity/intercity_cp/page/IntercityCp",
              query: {
                startPoi: JSON.stringify({
                  lat: startInfo.startLat,
                  lon: startInfo.startLon,
                  name: startInfo.startName,
                  poiid: startInfo.startPOI,
                }),
                endPoi: JSON.stringify({
                  lat: endInfo.endLat,
                  lon: endInfo.endLon,
                  name: endInfo.endName,
                  poiid: endInfo.endPOI,
                }),
              },
            });
            return;
          }

          let departTime = lodash.get(this.storeOrderDetail, "departTime");

          if (!isNaN(departTime) && `${departTime}`.length === 13) {
            // 运力接口要求传10位的时间戳……
            departTime = Math.round(departTime / 1000);
          }

          if (this.storeIsAirportTransferOrder) {
            // 首页切换到接送机
            this.storeSetActiveTab(HOME_TAB_KEYS.airport); // 接送切换到接机还是送机

            this.storeUpdateAirportComponentData({
              key: "isJj",
              value: gdServiceId === 3, // 3 接机 4送机
            });

            if (this.storeSource === "travelList") {
              anyui.navigateBack({
                delta: 30,
              }); // 30 原代码逻辑，为了返回到首页
            } else {
              anyui.navigateBack();
            }
          } else {
            const query = {
              gdServiceId,
            };

            if (this.storeIsReserveOrder && departTime) {
              Object.assign(query, {
                departTime,
              });
            }

            anyui.redirectTo({
              url: "/onlineCar/online_cp/page/CpIndexPage",
              query,
            });
          }

          return;
        }

        this.$emit("btnClick");
      },
    },
    data: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = [
    "__ready__",
    "showCurrentLocationIcon",
    "__slotObj",
    "fontStyle",
    "btnText",
  ];
  return opts;
}
