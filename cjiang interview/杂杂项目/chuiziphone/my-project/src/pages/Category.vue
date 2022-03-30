<template>
  <div id="template">
    <div class="category-wrap">
      <Search />
      <ListTreeSelect>
        <!-- <van-image v-if="activeIndex === 1" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <van-image v-if="activeIndex === 2" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <van-image v-if="activeIndex === 3" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
          <van-image v-if="activeIndex === 4" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <van-image v-if="activeIndex === 5" src="https://img.yzcdn.cn/vant/apple-1.jpg" />-->
      </ListTreeSelect>
    </div>
  </div>
</template>

<script>
import Search from "../components/search";
import ListTreeSelect from "../components/ListTreeSelect";
// const axios = require("axios");
export default {
  components: { Search, ListTreeSelect },
  data() {
    return {
      restaurants: []
    };
  },
  methods: {
    // getdata() {
    //   this.$axios
    //     .get("http://shopapi.smartisan.com/mobile/classify")
    //     .then(({ data }) => {
    //       // this.restaurants = this.restaurants.concat(data);
    //       // this.restaurants = [...this.restaurants, ...data];
    //       window.console.log(data);
    //       // 加载状态结束
    //       // this.loading = false;
    //       // 数据全部加载完成
    //       // if (this.restaurants.length >= 10) {
    //       //   this.finished = true;
    //       // }
    //     });
    // }
  },
  created() {
    // window.console.log(this.getdata());
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.css";
@function s($n) {
  @return ($n / 2) / 18.5 + rem;
}

#template {
  display: flex;
  flex-direction: row;
  //搜索框
  .category-wrap {
    flex: 13.2;
    width: 100%;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 2.7rem);
  }

  // 搜索框固定
  .van-search {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    box-shadow: 0 1px 0 rgba(102, 102, 102, 0.1);
    // border-bottom: 1px #ccc solid;
  }
  .top {
    height: s(54);
    width: 100%;
  }
  .middle {
    height: auto;
    // height: calc(100% - 2.4rem);
    width: 100%;
  }
  .bottom {
    flex: 1.2;
    height: s(54);
  }
}
</style>