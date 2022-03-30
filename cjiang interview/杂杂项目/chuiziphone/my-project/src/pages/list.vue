<template>
  <div>
    <Title>
      <div class="title-bar">
        <a class="nav-back nav-common" @click="goback()">返回</a>
        <h2>商品列表</h2>
      </div>
    </Title>
    <van-loading type="spinner" color="#1989fa" :class="this.isShow ? 'show':'hide'" />
    <div class="load-more-container">
      <div class="list">
        <ul class="list-ul">
          <li class="box-listitem" v-for="item in listdata" :key="item.id" :data-id="item.id">
            <router-link class="box-line" :to="'/xiangqing/' + item.id">
              <div class="list-img">
                <img :src="item.imgurl" alt />
              </div>
              <div class="item-content">
                <div class="title">
                  <h5>{{item.title}}</h5>
                  <p>{{item.dec}}</p>
                </div>
                <div class="price">
                  <span class="yuan">￥</span>
                  <b>{{item.price.toFixed(2)}}</b>
                  <span class="origin-price">
                    <i>¥</i>
                    <span>{{item.deprice.toFixed(2)}}</span>
                  </span>
                </div>
              </div>
            </router-link>
          </li>
          <li class="no-paging" style="">全部加载完成</li>
        </ul>
      </div>
    </div>
    <Tabble />
  </div>
</template>

<script>
import Title from "../components/Title";
import Tabble from "../components/Tabble.vue";
import Vue from "vue";
import { Loading } from "vant";
Vue.use(Loading);

export default {
  data() {
    return {
      bb: [
        {
          id: 1,
          imgurl:
            "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg?x-oss-process=image/resize,w_252/format,webp",
          title: "坚果 弯头数据线（Type-C）",
          price: 100
        },
        {
          id: 2,
          imgurl:
            "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg?x-oss-process=image/resize,w_252/format,webp",
          title: "2",
          price: 102
        },
        {
          id: 3,
          imgurl:
            "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg?x-oss-process=image/resize,w_252/format,webp",
          title: "3",
          price: 103
        }
      ],
      // newsID: this.$route.query.id
      listdata: [],
      urlId: "",
      isShow: true
    };
  },
  components: {
    Title,
    Tabble
  },
  methods: {
    async getListdata() {
      console.log("-------id----" + this.$route.query.id);
      this.urlId = this.$route.query.id;
      console.log(this.urlId);
      /* axios 返回的数据是对象形式需要解构 */
      if (this.listdata.length === 0) {
        //数据为0
        this.isShow = true;
      }
      await this.$axios
        .get("http://localhost:3000/api/list", {
          params: {
            category_id: this.urlId,
            page: 1,
            num: 20,
            sort: "sort",
            channel_id: 1002,
            type: "shop"
          }
        })
        .then(({ data }) => {
          data.data.list.forEach(item => {
            // this.listdata.title = item.skuMobileTitle
            this.listdata.push({
              imgurl: item.spuInfo.images,
              title: item.spuInfo.spuTitle,
              dec: item.spuInfo.activeTitle,
              price: item.spuInfo.price - 0,
              deprice: item.spuInfo.discountPrice - 0
            });
          });
          this.isShow = false;

          // console.log('id的值为'+this.$route.query.id)
        });
    },
    goback() {
      this.$router.back(-1);
    },
    destroyedlistdata() {
      this.listdata = [];
    }
  },
  created() {},
  mounted() {
    this.getListdata();
  },
  unactivated() {
    this.destroyedlistdata();
  },
  destroyed() {
    this.destroyedlistdata();
  }
};
</script>

<style lang="scss" scoped>
@function s($n) {
  @return ($n / 2) / 18.75 + rem;
}
.hide {
  display: none;
}
.show {
  display: block;
}

//loading样式：
.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-15px) translateY(-15px);
}
.load-more-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
     margin-bottom: s(45);
  .list {
    > ul {
      display: flex;
      flex-direction: column;
    .no-paging{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: s(45);
    font-size: s(13.7);
    color: #999;
}


      .box-line {
        padding: s(12.5);
        border-bottom: 0.5px solid #ccc;
        display: flex;
        flex-direction: row;
        .list-img {
          width: s(120);
          height: s(120);
          margin-right: s(32);
          img {
            height: 100%;
          }
        }
        .item-content {
          color: #333;
          margin-top: s(26);
          position: relative;
          overflow: hidden;
          h5 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 700;
            font-size: s(12.5);
          }
          p {
            font-size: s(10.5);
            color: #7f7f7f;
            margin-top: s(6.25);
          }
        }
        .price {
          color: #d44d44;
          margin-top: s(26);
          .yuan {
            font-size: s(10.5);
          }
          b {
            font-size: s(12.5);
          }
          .origin-price {
            color: #7f7f7f;
            font-size: s(11);
            position: relative;
            ::after {
              content: "";
              display: block;
              height: 1px;
              background: #7f7f7f;
              position: absolute;
              top: 49%;
              -webkit-transform: translateY(-49%);
              transform: translateY(-49%);
              left: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
}
</style>