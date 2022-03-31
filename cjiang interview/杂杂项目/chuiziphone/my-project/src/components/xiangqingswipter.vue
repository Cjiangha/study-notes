<template>
  <!-- 商品轮播图 -->
  <div class="swipter">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@function s($n) {
  @return ($n / 2) / 18.75 + rem;
}
.van-swipe-item {
  width: 100%;
  height: s(256);
}
.van-swipe-item img {
  width: s(256);
  height: 100%;
  text-align: center;
}
</style>