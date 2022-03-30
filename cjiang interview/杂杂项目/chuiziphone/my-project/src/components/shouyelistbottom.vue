<template>
  <div class="home-box">
    <article class="guess_y_like">
      <h3>猜你喜欢</h3>
    </article>
    <div class="guesslike-wrap">
      <ul>
        <li v-for="(i,index) in listdata" :key="index">
          <div class="item-cover">
            <img :src="i.images" />
          </div>
          <article class="item-title">
            <h3>{{i.skuName}}</h3>
          </article>
          <article class="item-bottom-info">
            <aside class="item-price">
              <span class="yuan">￥</span>
              <span class="price">{{i.originalPrice}}</span>
              <span class="orignal">
                <span class="yuan">￥</span>
                {{i.discountPrice}}
              </span>
            </aside>
            <aside class="item-promotion-tags">
              <span class="tag">优惠券</span>
            </aside>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listdata: [],
      scroll:''
    };
  },
  methods: {
    // async getdata() {
    //   await this.$axios.get("http://localhost:3000/list").then(({ data }) => {
    //     window.console.log(data);
    //     this.listdata = data;
    //   });
    // }
       menu() {
    this.scroll = document.body.scrollTop;
    console.log(this.scroll)
   },
    async getdata(){
      // await this.$axios.get('https://shopapi.smartisan.com/mobile/skulist?page=1').then(({data})=>{
         await this.$axios.get('api/mobile/skulist?page=1').then(({data})=>{
         this.listdata = data.data.skuInfo;
          console.log('--------guess----------',data.data.skuInfo)
      })
    }
  },
  created() {
    this.getdata();
  },
  mouted(){
     window.addEventListener('scroll', this.menu)
  },
  computed: {
    computedata() {
      return this.listdata.slice(0, 10);
    }
  }
};
</script>
<style lang="scss" scoped>
@function s($n) {
  @return ($n / 2) / 18.75 + rem;
}

// @function s($px) {
//   $rem: 37.5px;
//   @return ($px/ $rem) + rem;
// }

img {
  width: 100%;
}
.home-box {
  margin-top: s(14.5);
  padding-top: s(14.5);
  margin-bottom: s(62);
  position: relative;
  .guess_y_like {
    position: relative;
    padding: 0 0 0.7rem 1rem;
    cursor: pointer;
    h3 {
      font-size: s(16.6);
      font-weight: 700;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .guesslike-wrap {
    ul {
      width: calc(100% - 1.2rem);
      margin: 0 auto;
      height: 100%;
      overflow: scroll;
      display: flex;
      flex-flow: row wrap; //可以换行
      align-content: flex-start;
      li {
        width: s(150);
        flex: 0 0 calc(50% - 0.15rem);
        // margin-bottom: 0.8rem;
        margin-right: s(5);
        margin-bottom: s(25);
        .item-cover {
          height: s(150);
          position: relative;
          display: block;
          margin: 0 auto;
          //   border-radius: 0.4rem;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.03);
        }
        img {
          mix-blend-mode: multiply;
          width: 100%;
          height: 100%;
        }
        .item-title {
          margin: 0.3rem 0 0.1rem;
          padding: 0 0.3rem;
          h3 {
            //   font-size: .65rem;
            font-size: s(13.5);
            font-weight: 600;
            // line-height: 0.9rem;
            line-height: s(18.4);
            color: rgba(0, 0, 0, 0.7);
            width: 100%;
            margin: 0;
            white-space: nowrap; //不换行
            text-overflow: ellipsis; //超过宽度范围出现省略号
            overflow: hidden; //超出隐藏
          }
        }
        .item-bottom-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.3rem;
          .item-price {
            font-family: Arial;
            // font-size: 0.7rem;
            font-weight: bolder;
            color: #d44d44;
            .yuan {
              font-family: Arial;
              font-size: s(14);
              //   font-size: 0.7rem;
              font-weight: bolder;
              color: #d44d44;
            }
            .price {
              font-family: Arial;
              //   font-size: 0.7rem;
              font-size: s(14);
              font-weight: bolder;
              color: #d44d44;
            }
            .orignal {
              position: relative;
              margin-left: 5px;
              // font-size: 0.5rem;
              font-size: s(10.5);
              color: #ccc;
              font-weight: 400;
              text-decoration: line-through;
              .yuan {
                font-size: s(11.4);
                color: #cccccc;
              }
            }
          }
          .item-promotion-tags {
            font-size: s(10.5);
            font-weight: bolder;
            position: relative;
            display: inline-block;
            padding: s(2.5) s(8.3);
            border-radius: 0.6rem;
            border-radius: s(10.5);
            color: #d56159;
            .tag {
              position: relative;
              display: inline-block;
              border-radius: s(10.5);
              color: #d56159;
              background: #f6ebea;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>