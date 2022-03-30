<template>
  <div class="My-danyuan">
    <div>
        <router-link to='/login_register' style="color:black;width:100%;height:100%;">
      <van-cell label-class="sobig" size="sobig" is-link value center>
        <img :src="logo" style="width:55px;height:55px;    border-radius: 50%;" />
        <span
          style="
                 margin-left:20px;
                 font-size:0.50rem;
                 font-weight:bolder;
                top: 50%;
                width: 2.66rem;
                height: 2.66rem;"
        >登录/注册</span>
      </van-cell>
    </router-link>
    </div>
    <van-cell size="hh">
      <van-grid clickable :column-num="4">
        <van-grid-item icon="balance-list" text="全部订单" to="/" />
        <van-grid-item icon="bag" text="代付款" to="/" />
        <van-grid-item icon="new-arrival" text="待收货" to="/" />
        <van-grid-item icon="column" text="售后" url="/vant/mobile.html" />
      </van-grid>
    </van-cell>
    <div class="m-top">
      <van-cell title="地址管理" size="large" is-link center />
      <van-cell title="我的优惠券" size="large" is-link center />
      <van-cell title="优先邀请码" size="large" is-link center />
    </div>
    <div class="m-top">
      <van-cell title="以旧换新" size="large" is-link center />
      <van-cell title="常见问题" size="large" is-link center />
      <van-cell title="服务支持" size="large" is-link center />
    </div>
    <div class="m-top mm">
      <van-cell title="意外碎屏保修服务" size="large" is-link center />
      <van-cell title="延长保修服务" size="large" is-link center />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Cell, CellGroup } from "vant";
Vue.use(Cell).use(CellGroup);
import { Row, Col } from "vant";
Vue.use(Row).use(Col);
import { Grid, GridItem } from "vant";
Vue.use(Grid).use(GridItem);
export default {
  data() {
    return {
      logo: require("../assets/images/touxiang.png")
    };
  }
};
</script>


<style lang="scss" scoped>
@function s($n) {
  @return ($n / 2) / 18.75 + rem;
}
.My-danyuan {
  margin-top: s(50);
}
.m-top {
  margin-top: s(15);
  position: relative;
  overflow: hidden;
  border-radius: 0.4rem;
  background: #fff;
  margin-bottom: 0.7rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
    0 18px 20px -10px rgba(0, 0, 0, 0.03), 0 18px 20px -10px rgba(0, 0, 0, 0.03),
    0 10px 20px -10px rgba(0, 0, 0, 0.03);
}
.van-cell--sobig {
  height: s(100);
}
.van-cell {
  position: relative;
}

.van-cell--large {
  height: 62.5px;
}
.van-cell__title span {
  text-align: left;
  text-align: center;
}
.mm {
  margin-bottom: 100px;
}
.van-cell__title,
.van-cell__value {
  text-align: left;
}

.van-image__loading {
  height: s(55.5);
  width: s(55.5);
  border-radius: 50%;
}

.van-image__error,
.van-image__img,
.van-image__loading {
  width: 100px;
  height: 100px;
  // position: absolute;
  // left: -s(10);
}
// .van-icon .van-image img {
//   width: 100px;
//   height: 50px;
// }

.My-danyuan img {
  width: 100px;
  height: 50px;
}
</style>