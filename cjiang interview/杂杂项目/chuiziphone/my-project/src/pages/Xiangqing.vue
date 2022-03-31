<template>
  <div class="xiangqing">
    <Title>
      <div class="title-bar">
        <a class="nav-back nav-common" @click="goback()">返回</a>
        <h2>详情页</h2>
      </div>
    </Title>
    <!-- 选项卡 -->
    <div class="big">
      <div class="select">
        <div class="titleitem change">
          <h2 class="zi">商品</h2>
        </div>
        <div class="titleitem">
          <h2 class="zi">详情</h2>
        </div>
        <div class="titleitem">
          <h2 class="zi">参数</h2>
        </div>
        <div class="titleitem">
          <h2 class="zi">推荐</h2>
        </div>
      </div>
    </div>
    <!-- 商品轮播图 -->
    <div class="swipter">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 商品价格 -->
    <div class="section-floor" v-if="detail[0] != null">
      <div class="title-content">
        <h2>{{detail[0].title}}</h2>
        <p class="ms">{{detail[0].des}}</p>
        <div class="jiage">
          <div class="price">
            <span>￥</span>
            <i>{{detail[0].price.toFixed(2)}}</i>
          </div>
          <div class="postage-price">满 99 元包邮</div>
        </div>
      </div>
      <!-- <div class="activities">
        <span class="youhui">优惠信息</span>
        <div class="activities-item">
          <div class="tag-wrapper">
            <h2 class="tag tag-red">领券</h2>
          </div>
          <div class="couponItem">
            <label _ngcontent-c25>【APP专享】10元锤子商城通用优惠券</label>
            <div>
              <span class="activities-title">2个优惠券</span>
            </div>
            <i class="arrow"></i>
          </div>
        </div>
      </div>-->
    </div>

    <div class="section-floor">
      <div class="title-content item-box-column">
        <p class="ms">已选版本</p>
        <div class="item-box">
          <p>
            <span class="attr-name">颜色：</span>
            <span class="attr-value">黑色</span>
          </p>
          <p>
            <span class="attr-name">容量：</span>
            <span class="attr-value">8G + 128GB</span>
          </p>
          <p>
            <span class="attr-name">数量：</span>
            <span class="attr-value">1</span>
          </p>
        </div>
      </div>
    </div>

    <div class="section-floor item-content">
      <div class="title-header box-line">
        <div class="title-wrapper">
          <h2>服务说明</h2>
        </div>
      </div>
      <div class="item-box-column box-line service-note">
        <ul>
          <li class="return-policy">7 天无理由退货</li>
          <li class="exchange-policy">15 天质量问题换货</li>
        </ul>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="title-header">
      <div class="title-wrapper">
        <h2>商品详情</h2>
      </div>
    </div>

    <!-- 用户评价 -->
    <div  class="section-floor comment" id="section-2">
      <div  class="title-header box-line">
        <div  class="title-wrapper arrow-right">
          <h2 >用户评价 （6141）</h2>
          <a >查看全部</a>
        </div>
      </div>
      <div  class="comment-info">
        <div  class="info-title">
          <img
            
            src="data:image/png;base64,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"
          />
          <span  class="mobile">182****4492</span>
          <!---->
          <span  class="star"></span>
          <span  class="star"></span>
          <span  class="star"></span>
          <span  class="star"></span>
          <span  class="star"></span>
          <!---->
        </div>
        <div  class="info-txt">
          <p >
            这是我的第一款锤锤手机，上手用了几天，手机的份量拿着挺舒服，现在拿起以前的手机都感觉不适应了，萝卜青菜各有所爱吧。
            一步功能确实给工作带来了很多便利，
            大爆炸的复制功能真的是很便捷，
            目前可惜的是胶囊功能还没有完全适应。
            坚果的系统真的没话说，确实有那种老罗说要收购苹果的气势，单从美观上来说，让我想起了当年用4S的感觉，真的是从现在千篇一律的屏幕图标上脱颖而出，就连家里的小仔也说好看。希望锤锤赶快补充商城的东西，很想赶快体验TNTgo带来的“变革”，加油锤锤，加油老罗！ps:老罗马上就还清债务，希望他还能继续自己的梦想，为有梦想的人干杯！
          </p>
        </div>
      </div>
      <!---->
    </div>

    <!-- <div class="bottom" style="width:100%;">
      <img src="../assets/images/pic.png" style="width:100%;" />
    </div>-->
    <div style="width:100px;height:100px;">{{id}}</div>
    <GoodAction />
    <!--     
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />-->
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import {} from "vant";
import { Sku } from "vant";
import { Row, Col, Swipe, SwipeItem } from "vant";
Vue.use(Swipe)
  .use(SwipeItem)
  .use(Row)
  .use(Col)
  .use(Sku);
import Title from "../components/Title";
import GoodAction from "../components/GoodAction";

export default {
  data() {
    return {
      images: [],
      id: this.$route.params.id, //将URL地址栏中传过来的ID值，挂载到data上，方便以后调用
      gid: "",
      detail: [],
      show: false,
      sku: {
        // 数据结构见下方文档
      },
      goods: {
        // 数据结构见下方文档
      },
      messageConfig: {
        // 数据结构见下方文档
      }
    };
  },
  methods: {
    btn() {
      return this.id[parseInt(Math.random() * 4)];
    },

    goback() {
      this.$router.back(-1);
    },

    /* 跳转的方法 */
    href() {
      let id = location.search;
      this.gid = id;
      window.console.log(this.gid);
      window.console.log(this.id);
    },
    // getDetal(goodId){
    //   // return this.goodId;
    //   // 从页面中获取到值进行传递
    //   window.console.log(location.search().slice(1));
    //   goodId = location.search();
    // }
    getData() {
      let params = {
        id: this.id
      };
      params = qs.stringify(params);
      this.$axios
        // .post("http://localhost:3000/xiangqinglist", params)
        .get(
          "api/product/skus?ids=100162801,100162802,100162803,100162804,100162805,100162806&with_stock=true&with_spu=true"
        )
        .then(({ data }) => {
          // this.detail = data;

          const chuizidata = data.data.list[0];
          console.log(chuizidata);
          this.images = chuizidata.shop_info.ali_images;
          this.detail[0] = {};
          this.detail[0].title = chuizidata.shop_info.title;
          this.detail[0].des = chuizidata.shop_info.sku_mobile_sub_title;
          this.detail[0].price = chuizidata.price;
        });
    }
  },
  created() {
    this.href();
    this.getData();
  },
  mouter() {
    this.goodId = this.$router.params.goodId;
    // this.getDetal(this.goodId);
    document.addEventListener("scroll", this.scrollMoreData, false);
  },
  components: {
    Title,
    GoodAction
  }
};
</script>

<style lang="scss" scoped>
@function s($n) {
  @return ($n / 2) / 18.75 + rem;
}
.xiangqing {
  text-align: center;
  font-size: 16px;
}
// .header-mobile .nav-back {
//   position: fixed;
//   top: 25px;
// }

.van-swipe-item {
  width: 100%;
  height: s(256);
}
.van-swipe-item img {
  width: s(256);
  height: 100%;
  text-align: center;
}

.van-row {
  margin-top: 50px;
  width: 420px;
  height: 60px;
}

.big {
  padding: s(6) s(9);
  background: rgb(242, 242, 242);
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.12);
  .select {
    display: flex;
    align-items: center;
    .titleitem {
      width: s(87);
      border: 1px solid #cdcdcd;
      height: s(15);
      line-height: s(15);
      padding: s(8) 0;
      position: relative;
      h2 {
        // display: inline-block;
        font-size: 15px;
        color: rgb(96, 96, 96);
        font-weight: bolder;
      }
      .active-area {
        position: absolute;
        left: 0;
        top: 0;
        background: rgb(177, 177, 177);
      }
    }
    .change {
      background: rgb(177, 177, 177);
      h2 {
        color: white;
      }
    }
  }
}

.section-floor {
  display: flex;
  flex-direction: column;
  // box-shadow: 1px 1px 1px #ccc;
  border-top: 4px #ccc solid;
  position: relative;
  h2 {
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  .title-content {
    padding: s(16) s(18);
    text-align: left;
    h2 {
      margin-bottom: s(3);
      font-size: s(15);
      color: #333333;
      text-align: left;
    }
    .ms {
      color: 7f7f7f;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .jiage {
      display: flex;
      justify-content: space-between;
      .price {
        display: flex;
        color: #d44444;
        span {
          font-size: s(12);
          margin-right: s(4);
        }
        i {
          font-size: s(14);
          font-weight: bold;
        }
      }
      .postage-price {
        font-size: 12px;
        color: #7f7f7f;
      }
    }
  }
  // 优惠券
  .activities {
    padding: s(16) s(18);
    text-align: left;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    .youhui {
      padding: 0 0 13px;
      font-size: 12px;
      color: #999999;
    }

    .activities-item {
      display: flex;
      flex-direction: row;
      .tag-wrapper {
        .tag {
          overflow: hidden;
          display: inline-block;
          text-align: center;
          padding: 2px 10px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 13px;
        }
        .tag-red {
          color: #d44d44;
          background: #fce9e8;
          border-color: #f0bab6;
        }
      }
      .couponItem {
        display: flex;
        justify-content: space-between;
        min-height: 18px;
        font-size: 13px;
        flex: 1;
        label {
          position: relative;
          display: block;
          word-break: break-all; //换行
          line-height: 1;
          width: s(180);
          height: s(25);
        }
        .activities-title {
          width: 100%;
          text-align: right;
          display: inline-block;
          color: #d44d44;
        }
        .arrow {
          display: inline-block;
          width: 6px;
          height: 10px;
          background: url("../assets/images/youjiantou.png");
          background-size: contain;
        }
      }
    }
  }

  //七天无理由退换货
  .item-box-column,
  .service-not {
    position: relative;
    padding: 0.8rem 0.8rem 0.6rem;
    ul {
      overflow: hidden;
      font-size: s(12);
      font-weight: 700;
      color: #333;
      line-height: 1.5;
      display: flex;
      flex-wrap: nowrap;
      li {
        padding-left: 1rem;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 0.3rem;
      }
    }
  }

  .item-box {
    font-size: 13px;

    p {
      line-height: 1.8;
      color: #333;
      display: table;
    }
  }

  //右箭头
  .item-box-column::before {
    content: "";
    display: block;
    position: absolute;
    right: 0.6rem;
    top: 50%;
    width: 6px;
    height: 10px;
    background: url("../assets/images/youjiantou.png") no-repeat 50%;
    background-size: contain;
  }
}

.title-header {
  position: relative;
  .title-wrapper {
    padding: 0 12px;
    h2 {
      height: 40px;
      line-height: 40px;
      font-weight: 700;
      font-size: 15px;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>