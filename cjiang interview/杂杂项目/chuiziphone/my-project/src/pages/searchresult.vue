<template>
  <div class="searchresult">
    <div class="topsearch">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <h4>热门搜索</h4>
    <ul class="hotSearch">
      <li v-for="(item,index) in this.searchText" :key="index">{{item}}</li>
    </ul>
    
  </div>
</template>
<script>
import { Toast } from "vant";
const axios = require("axios");

export default {
  data() {
    return {
      value: "",
      searchText:[]
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      this.$router.back(-1);
      Toast("取消");
    },
    async getdata() {
      await this.$axios.get("http://localhost:3000/serachResult")
        .then(({ data }) => {
          console.log(data)
          //  data.hot.foreach((item)=>{
          //    this.searchText.push(item)
          //  })
          let length = data.hot.length
          console.log(data.hot)    
          for(var i = 0;i<length;i++){
            this.searchText.push(data.hot[i])
          }      
          console.log(this.searchText)
          });
    }
  },
  created(){
      this.getdata();
  }
};
</script>
<style lang="scss" scoped>
@function s($n) {
  @return ($n / 2) / 27.5 + rem;
}

.searchresult {
  ul {
      margin-left: s(15);
    > li {
      position: relative;
      font-size:s(18);
      font-weight: 700;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      padding: 0 16px 0;
      opacity: 1;
      -webkit-transition: opacity 0.15s ease-out;
      transition: opacity 0.15s ease-out;
      text-align: center;
      border-radius: s(15);
      color: #696969;
      margin: 0 4.16px 8.33px 0;
      color: #e78612;
      background-color: #fff7e4;
      ::before{
        content: "";
        position: absolute;
        top: 0;
        bottom: -42.85714%;
        left: 0;
        right: -42.85714%;
        border: 1px solid #ffca6d;
        border-radius: 1.8rem;
        -webkit-transform: scale(.7);
        transform: scale(.7);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
    li:last-child, li:first-child{
    color: #cd3f36;
    background-color: #ffe7e5;
        ::before{
          border: 1px solid #f1948c;
        }
    }
  }
  // 热门搜索
  h4 {
    font-size: s(22);
    line-height: 0.75rem;
    color: #8e8e8e;
    font-weight: 400;
    padding: s(35) 0 s(24) s(26);
  }
  .van-search {
    background-color: #f0f0f0;
    border-bottom: 2px #eaeaea solid;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }
  .van-search__content {
    border-radius: 17px;
    height: 100%;
    border: 2px #eaeaea solid;
  }
  .van-field__control {
    font-size: 15px;
    padding: 0 0 0 7px;
  }
  .van-search__content {
    display: inline-block;
    margin-right: 18px;
  }
  .van-search__action {
    padding: 0px 26px;
    border-radius: 5px;
    border: 2px #eaeaea solid;
    margin-right: 10px;
    color: #62627a;
  }
  .topsearch {
  }
}
</style>