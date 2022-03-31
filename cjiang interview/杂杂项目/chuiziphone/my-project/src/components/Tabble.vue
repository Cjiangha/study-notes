<template>
  <van-tabbar
    style="z-index=9999"
    v-model="active"
    active-color="rgb(214,85,76)"
    inactive-color="#000"
  >
    <van-tabbar-item to="/main/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/main/Category" icon="bars">分类</van-tabbar-item>
    <van-tabbar-item to="/main/Buycart" icon="cart">购物车</van-tabbar-item>
    <van-tabbar-item to="/main/My" icon="map-marked">个人中心</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Icon);
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      }
    };
  }
  //   props:{
  //       active :
  //   }
};
</script>

<style >
.van-tabbar--fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
}
</style>