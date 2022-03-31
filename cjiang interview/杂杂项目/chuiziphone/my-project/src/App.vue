<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive>   -->
  </div>
</template>

<script>
import "vant/lib/index.css";
// require("./assets/js/postcss.config.js");

export default {
  name: "app",
  created() {},
  components: {},
    watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  font-size: 12px;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

/* 搜索框 */
.van-tabbar--fixed {
  box-shadow: 0 -11px 32px rgba(0, 0, 0, 0.08);
}
</style>


