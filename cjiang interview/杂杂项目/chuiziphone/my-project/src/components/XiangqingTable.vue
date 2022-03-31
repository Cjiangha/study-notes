<template>
  <van-tabs type="card" background="#bfbfbf" border="true" sticky="1">
    <!-- <van-tab :title="i" v-for="i in arr" :key="i"> -->
    <van-tab title="标签 1">
      <xiangqingswipter />
    </van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
  </van-tabs>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab).use(Tabs);
import xiangqingswipter from "../components/xiangqingswipter.vue"; //轮播图
export default {
  components: {
    xiangqingswipter
  },
  data() {
    return {
      arr: ["商品", "详情", "参数", "推荐"]
    };
  },
  created() {
    window.console.log(this.arr);
  }
};
</script>
<style lang="scss" scoped>
</style>
