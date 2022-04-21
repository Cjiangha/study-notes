import { createComponent } from "@alife/anyui-wx-framework/index.js";

const checkoutSuccessImg = "/onlineCar/online_going/images/checkoutSuccess.png";
const checkoutImg = "/onlineCar/online_going/images/checkout.png";

createComponent(
  createOptions({
    name: "CheckBox",
    props: {
      item: {
        type: Object,
        default: {
          checkout: true,
        },
      },
      index: {
        type: Number,
        default: 0,
      },
      reasonCheckout: {
        type: Function,
        default: () => {},
      },
    },
    computed: {
      imageSrc() {
        return this.item.checkout ? checkoutSuccessImg : checkoutImg;
      },
    },
    methods: {
      checkClick() {
        // console.log("CheckBox item:", this.item)
        this.item.checkout = !this.item.checkout;
        this.reasonCheckout(this.index, this.item.checkout);
      },
    },
    data: {},
  })
);

function createOptions(opts = {}) {
  opts.$renderKeys = ["__ready__", "item", "imageSrc"];
  return opts;
}
