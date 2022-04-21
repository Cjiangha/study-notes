import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_redirectTo from '@alife/anyui-wx-api/lib/redirectTo.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('redirectTo', _a_u_redirectTo)
anyui._wrapApi('navigateTo', _a_u_navigateTo)
import { createComponent } from "@alife/anyui-wx-framework/index.js";
import { centToYuanString } from "../../../tool/tool.js";
import { TYPE_CAPACITY } from "../config.js";
const CarIntercityImage =
  "https://gw.alicdn.com/imgextra/i3/O1CN01MY69vi1S6jFp32umM_!!6000000002198-2-tps-96-96.png";

createComponent(
  createOptions({
    name: "index",
    props: {
      cpInfo: {
        type: Object,
      },
      index: {
        type: Number,
        default: -1,
      },
      startPointData: {
        type: Object,
      },
      endPointData: {
        type: Object,
      },
    },
    data: {
      startAdCode: "",
      CarIntercityImage,
    },
    computed: {
      price() {
        return centToYuanString(this.cpInfo.price || 0);
      },
    },

    async created() {
      const { lat, lon } = this.startPointData;
    },

    methods: {
      handleCall() {
        const { diversionType = TYPE_CAPACITY } = this.cpInfo;

        if (diversionType === TYPE_CAPACITY) {
          anyui.redirectTo({
            url: "/intercity/intercity_cp/page/IntercityCp",
            query: {
              startPoi: JSON.stringify(this.startPointData),
              endPoi: JSON.stringify(this.endPointData),
            },
          });
        } else {
          anyui.navigateTo({
            url: "/intercity/intercity_home/page/IntercityHome",
            query: {
              startAdCode: this.startAdCode,
            },
          });
        }
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
    "cpInfo",
    "CarIntercityImage",
    "price",
    "proputil",
    "index",
  ];
  return opts;
}
