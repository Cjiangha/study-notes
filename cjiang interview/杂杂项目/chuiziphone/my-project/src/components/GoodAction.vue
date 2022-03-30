<template>
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" @click="onClickIcon" text="客服" />
    <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
    <van-goods-action-button type="warning" text="加入购物车" @click="tiao" />
    <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
  </van-goods-action>
</template>

<script>
/* 
  详情页跳转到购物车页面
  */ 
import Vue from "vue";
import { GoodsAction, GoodsActionIcon, GoodsActionButton,Toast  } from "vant";

Vue.use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Toast )
  ;
export default {
  methods: {
    // onClickIcon() {
    //   Toast("点击图标");
    // },
    onClickButton() {
      Toast("点击按钮");
    },
    tiao(){
      this.$router.push('/buy');
    },
    onClickIcon(){
      console.log(1)
    }
  }
};
</script>