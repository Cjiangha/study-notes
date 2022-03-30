<template>
  <van-search placeholder="请输入搜索关键词" v-model="value" @click="toSearchresult()"/>
</template>

<script>
// 搜索框
import Vue from "vue";
import { Search } from "vant";
Vue.use(Search);
// 轮播图
import "vant/lib/index.css";

export default {
  data() {
    return {
      value: ""
    };
  },
  methods:{
    toSearchresult(){
      console.log(111)
       this.$router.push('/searchresult')
    }
  },
};
</script>

<style >
.active {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.search-bar-wrap .search-bar {
  padding: 6px 10px;
  width: 305px;
  height: 28px;
  background: #f5f5f5;
  border: 1px solid #e9e9e9;
}
.van-field__left-icon .van-icon::before {
  width: 13px;
  height: 13px;
  opacity: 0.5;
}
.van-search__content {
  border-radius: 10px;
  width: 305px;
  height: 28px;
}
.van-field__control {
  font-size: 10px;
  padding: 0 0 0 7px;
}
</style>