import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_request from '@alife/anyui-wx-api/lib/request.js';
anyui._wrapApi('request', _a_u_request)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

import * as lodash from "../../../tool/lodashUtil";
createComponent(
  createOptions({
    name: "OrderChange",
    props: {
      orderDetail: {
        type: Object,
        default: {},
      },
    },
    data: {
      isShow: false,
      message: "请用易Q出行下单，否则无法接单",
    },
    computed: {},
    methods: {
      handleShow() {
        this.isShow = true;
      },

      handleHide() {
        this.isShow = false;
      },

      accepted() {
        console.log("OrderChange accepted");
        this.getOrderId("accepted");
      },

      arrived() {
        console.log("OrderChange arrived");
        this.getOrderId("arrived");
      },

      charging() {
        console.log("OrderChange charging");
        this.getOrderId("charging");
      },

      driverCanceled() {
        console.log("OrderChange driverCanceled");
        this.getOrderId("driverCanceled");
      },

      serviceCanceled() {
        console.log("OrderChange driverCanceled");
        this.getOrderId("serviceCanceled");
      },

      finished() {
        console.log("OrderChange finished");
        this.getOrderId("finished");
      },

      getOrderId(willStatus) {
        const status = lodash.get(this.orderDetail, "status", 0);
        console.log("OrderChange getOrderId status", status);
        let order_id;

        if (status === 101) {
          order_id = this.getOrderId101();
        } else {
          order_id = this.getOrderId103();
        }

        this.orderChangeRequest(order_id, willStatus);
      },

      getOrderId101() {
        console.log("OrderChange getOrderId101");
        let order_id;
        console.log(
          "OrderChange this.orderDetail",
          JSON.stringify(this.orderDetail)
        );
        const multiCP = lodash.get(this.orderDetail, "multiCP", []);
        console.log("OrderChange for multiCP", multiCP);

        for (let i = 0; i < multiCP.length; i++) {
          let item = multiCP[i];
          console.log("OrderChange for item", item);
          const brandName = lodash.get(item, "cpInfo.brandName", "");
          const cpCode = lodash.get(item, "cpInfo.cpCode", 0);
          console.log("OrderChange brandName:", brandName, ", cpCode:", cpCode);

          if (brandName === "易Q出行" || cpCode === 9050) {
            console.log(
              "OrderChange brandName lvl:",
              brandName,
              ", cpCode:",
              cpCode
            );
            const cpOrderId = lodash.get(item, "cpInfo.cpOrderId", "");
            order_id = cpOrderId;
            break;
          }
        }

        console.log("OrderChange getOrderId101 order_id:", order_id);
        return order_id;
      },

      getOrderId103() {
        console.log(
          "OrderChange getOrderId103 this.orderDetail",
          this.orderDetail
        );
        const cpOrderId = lodash.get(this.orderDetail, "cpData.cpOid", "");
        console.log("OrderChange getOrderId103 order_id cpOrderId:", cpOrderId);
        return cpOrderId;
      },

      orderChangeRequest(order_id, status) {
        if (!order_id) {
          this.message = "为获取到订单号，请用易Q出行下单";
          return;
        }

        const param = {
          order_id,
          status,
        };
        console.log("OrderChange param:", param);
        anyui.request({
          url: "http://apt.amap.test/etravel/order/change",
          method: "POST",
          data: param,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            accept: "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
          dataType: "text",
          success: (res) => {
            // my.alert({content: 'success'});
            console.log("OrderChange success res", res);
            this.requestResult(res);
          },
          fail: (res) => {
            console.log("OrderChange fail res", res);
            this.requestResult(res);
          },
          complete: (res) => {
            console.log("OrderChange complete res", res);
            this.requestResult(res);
          },
        });
      },

      requestResult(res) {
        const code = lodash.get(res, "data.code", []);

        if (code === 10000) {
          this.message = `状态改变成功，请等候5秒。code:${code}`;
        } else {
          this.message = `状态改变失败，请确定当前状态。code:${code}`;
        }

        setTimeout(() => {
          this.message = `请用易Q出行下单，否则无法接单。code:${code}`;
        }, 5000);
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "isShow", "message"];
  return opts;
}
