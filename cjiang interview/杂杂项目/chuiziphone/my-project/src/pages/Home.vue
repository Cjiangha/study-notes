<template>
  <div class="shouye" ref="shouye">
    <aside class="download-bar" v-if="this.closes">
      <img
        src="https://resource.smartisan.com/resource/87c6cd628ba73132a018c8c6c7e59737.png?x-oss-process=image/resize,w_884/format,webp"
      />
      <figure class="img-close" @click="close()"></figure>
    </aside>
    <!-- <button @click="show()">123</button> -->
    <header class="header">
      <img src="../assets/images/shouyelogo.png" />
    </header>
    <!-- <div class="search">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>-->
    <Search></Search>
    <div class="swipter">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="`${image}`" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 图片 -->
    <div class="banner">
      <img src="../assets/images/shouyebanner.webp" class="floor-banner-poster" />
    </div>
    <!-- 列表1——列表3 -->
    <List v-for="item in listimgurl" :key="item.title">
      <!-- banner图 -->
      <img :src="item.banner" class="list-banner1" />
      <div class="list-div">
        <ul class="clearfix list3">
          <li class="clearfix listitem" v-for="(i, index) in item.list" :key="index">
            <div class="grey_div">
              <img :src="i.url" alt />
            </div>
            <div class="title">
              <h2 v-text="i.title"></h2>
            </div>
            <p>
              <span>￥</span>
              <span>{{ i.price }}</span>
              <b class="tag">优惠券</b>
            </p>
          </li>
        </ul>
      </div>
    </List>
    <List>
      <img :src="list4.banner" class="list-banner1" />
      <div class="list-div list-small" style="width: 100%;overflow:hideden;;">
        <ul class="clearfix listsmall">
          <li
            @click="btn"
            class="clearfix listitem"
            v-for="(i, index) in list4.list"
            :key="index"
            style
            ref="companyStyle"
          >
            <div class="grey_div" style="width:100%;">
              <img :src="i.url" alt style="width:100%;height:100%;" />
            </div>
            <div class="title">
              <h2 v-text="i.title"></h2>
            </div>
            <p>
              <span style>￥</span>
              <span style>{{ i.price }}</span>
            </p>
          </li>
        </ul>
      </div>
    </List>
    <!-- 列表5 到 列表7 -->
    <List v-for="(item, index) in this.shanpinbottom" :key="index">
      <img :src="shanpinbottom[index][0].banner" class="list-banner1" />
      <div class="list-div list-small" style="width: 100%;overflow:hideden;;">
        <ul class="clearfix listsmall">
          <li
            @click="btn"
            class="clearfix listitem"
            v-for="(i, index) in item"
            :key="index"
            style
            ref="companyStyle"
          >
            <div class="grey_div" style="width:100%;">
              <img :src="i.images" alt style="width:100%;height:100%;" />
            </div>
            <div class="title">
              <h2 v-text="i.skuTitle"></h2>
            </div>
            <p>
              <span style>￥</span>
              <span style>{{ i.originalPrice }}</span>
            </p>
          </li>
        </ul>
      </div>
    </List>
    <!-- 列表8 -->
    <List>
      <img :src="this.list8.banner" class="list-banner1" />
      <div class="list-div">
        <ul class="clearfix list3">
          <li class="clearfix listitem" v-for="(i, index) in this.list8.list" :key="index">
            <div class="grey_div">
              <img :src="i.img" alt />
            </div>
            <div class="title">
              <h2 v-text="i.title"></h2>
            </div>
            <p>
              <span>￥</span>
              <span>{{ i.price }}</span>
              <b class="tag">优惠券</b>
            </p>
          </li>
        </ul>
      </div>
    </List>
    <div class="Listbottom">
      <Listbottom />
    </div>
  </div>
</template>
<script>
 import LcCity from 'lc-city-selector';

    var City = new LcCity();    // 创建实例化对象
    City.show();    // 执行show方法



import qs from "qs";
// 搜索框
import Vue from "vue";
import Search from "../components/search.vue";
import List from "../components/shouyelist.vue";
import Listbottom from "../components/shouyelistbottom.vue";

// 使用是用jquery进行操作
// const jQuery = require("jquery");
const axios = require("axios");
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// //   'X-API-TOKEN':'1382486_RLDYQTUh4SQ1qvVxFx0rSRtnpjYFRgcpxAzYXf69i0VRfv3zsmRcdepMcS1R'
// axios.defaults.headers.post['X-API-TOKEN'] = '1382486_RLDYQTUh4SQ1qvVxFx0rSRtnpjYFRgcpxAzYXf69i0VRfv3zsmRcdepMcS1R'
// import { Search } from "vant";
Vue.use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload);
// 轮播图
import "vant/lib/index.css";
import { Swipe, SwipeItem, Lazyload } from "vant";

export default {
  // 注册组件
  components: {
    Search,
    List,
    Listbottom
  },
  // 数据
  data() {
    return {
      closes: true,
      value: "",
      images: [
        require("../assets/images/lunbo1.webp"),
        require("../assets/images/lunbo2.webp"),
        require("../assets/images/lunbo3.webp"),
        require("../assets/images/lunbo4.webp")
      ],
      /*  首页列表的图片和内容  1-3楼*/
      listimgurl: [
        {
          list: [
            {
              url:
                "https://resource.smartisan.com/resource/f195e666e089d4e3775ce67d8e9523ce.png?x-oss-process=image/resize,w_498/format,webp",
              title: "坚果 Pro 3",
              price: 2899
            },
            {
              url:
                "https://resource.smartisan.com/resource/9934374dda26c292555dd1ec0887e17b.png?x-oss-process=image/resize,w_498/format,webp",
              title: "坚果 Pro 3",
              price: 3199
            },
            {
              url:
                "https://resource.smartisan.com/resource/f195e666e089d4e3775ce67d8e9523ce.png?x-oss-process=image/resize,w_498/format,webp",
              title: "坚果 Pro 3",
              price: 3199
            },
            {
              url:
                "https://resource.smartisan.com/resource/a4c73e549097c7f5cf2c5e0d87e56d13.png?x-oss-process=image/resize,w_498/format,webp",
              title: "坚果 Pro 3",
              price: 3199
            },
            {
              url:
                "https://resource.smartisan.com/resource/d159521e479b26f3c97a1e4f00a5aefd.jpg?x-oss-process=image/resize,w_498/format,webp",
              title: "smartisan  颈挂蓝牙耳机",
              price: 199
            },
            {
              url:
                "https://resource.smartisan.com/resource/8e822aa7cbab24fec7eacf0bbb2f6526.jpg?x-oss-process=image/resize,w_498/format,webp",
              title: "smartisan  颈挂蓝牙耳机",
              price: 29
            }
          ],
          banner:
            "https://resource.smartisan.com/resource/6e6d79e5c61a848d4224e1adac6ac300.png?x-oss-process=image/resize,w_1344/format,webp"
        },
        {
          list: [
            {
              url:
                "https://resource.smartisan.com/resource/9368c948ea81a5b8bc2efa165488ccc6.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "坚果 Pro 3 足迹保护套 人类首次公开使用乙醚",
              price: 49
            },
            {
              url:
                "https://resource.smartisan.com/resource/db1f9c8eadd0164a34e73465a34776a3.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "坚果 Pro 3 足迹保护套 德国天文学家开普勒出生",
              price: 49
            },
            {
              url:
                "https://resource.smartisan.com/resource/3e94ac101870deff0a0178c6a714bde7.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "坚果 Pro 3 足迹保护套 数学家哈密顿首次发现四元数",
              price: 49
            },
            {
              url:
                "https://resource.smartisan.com/resource/b93f8e0265cf372e774d0a76e32f2c0f.png?x-oss-process=image/resize,w_332/format,webp",
              title: "坚果 Pro 3 足迹保护套 克里斯蒂安·多普勒出生",
              price: 49
            },
            {
              url:
                "https://resource.smartisan.com/resource/31c8be42fbbabad10490835d953be356.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "坚果 Pro 3 足迹保护套 莫里斯·詹姆士·麦当劳出生",
              price: 49
            }
          ],
          banner:
            "https://resource.smartisan.com/resource/184b8081294133cb4f56272e2a22b389.png?x-oss-process=image/resize,w_1344/format,webp"
        },
        {
          list: [
            {
              url:
                "https://resource.smartisan.com/resource/3899737bb15dae97d261a080d3b9894d.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "足迹保护套 人类首次公开使用乙醚 for iPhone 11",
              price: 69
            },
            {
              url:
                "https://resource.smartisan.com/resource/b466c9c2f8948309a8d9e4a9d1a437ef.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "足迹保护套  英国科学杂志《自然》出版 for iPhone 11",
              price: 69
            },
            {
              url:
                "https://resource.smartisan.com/resource/5bcb5d70f8c17efb0a2b4f9852a03128.jpg?x-oss-process=image/resize,w_332/format,webp",
              title: "足迹保护套 克里斯蒂安·多普勒出生 for iPhone 11",
              price: 69
            },
            {
              url:
                "https://resource.smartisan.com/resource/f060313b58a72053a89e1309bac4c3ab.jpg?x-oss-process=image/resize,w_332/format,webp",

              title: "足迹保护套 莫里斯·詹姆士·麦当劳出生 for iPhone 11",
              price: 69
            },
            {
              url:
                "https://resource.smartisan.com/resource/5888f9b53cd1184ac32f2ae778cd7804.jpg?x-oss-process=image/resize,w_332/format,webp",
              title:
                "足迹保护套 莱卡成为第一只进入地球轨道的动物 for iPhone 11",
              price: 69
            }
          ],
          banner:
            "https://resource.smartisan.com/resource/2ac0e92a2dea54340cac7f93bfd61820.png?x-oss-process=image/resize,w_1344/format,webp"
        }
      ],
      /* 第4楼的数据*/
      list4: {
        list: [
          {
            url:
              "https://resource.smartisan.com/resource/f46b707ac60f2dc7e000fcbb764b8d9c.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/9f4cb6ffecd8d063bd1caaf0f8b57df5.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/3ed99332f7fc6531d1448140b7dc0e46.jpg?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/c35a34f96fdec77c08c7f2935af5a972.png?x-oss-process=image/resize,w_330/format,webp",

            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/7ea928359aae13eab37139824e416c0e.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },

          {
            url:
              "https://resource.smartisan.com/resource/1db1a8bfee3623fded41c9115b5a5335.jpg?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/68fcf404dafd3baaa2031343c4414021.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/87ea9f04e38d26a8eea1537c029a6bb2.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/7ea928359aae13eab37139824e416c0e.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          },
          {
            url:
              "https://resource.smartisan.com/resource/c4aec07a9b618d020b1f00b9ce9d3656.png?x-oss-process=image/resize,w_330/format,webp",
            title: "落栗 卫衣 圆领 开普勒轨道",
            price: 69
          }
        ],
        banner:
          "https://resource.smartisan.com/resource/8983e641bf48a573096521716227cc5c.png?x-oss-process=image/resize,w_1008/format,webp"
      },
      list8: {},
      /* style属性: */
      styleObject: {
        color: "red",
        fontSize: "13px"
      },
      /* list5-8楼数据*/
      shanpinbottom: [],
      grid1s: []
    };
  },
  methods: {
    btn() {
      // window.console.log(this.shanpinbottom[0]);
    },
    //控制顶部广告的关与开
    pTop() {
      if (this.closes === false) {
        this.$refs.shouye.style = " padding-top: null ";
      } else if (this.closes === true) {
        this.$refs.shouye.style = "padding-top: 1.3rem ";
      }
    },
    close() {
      this.closes = !this.closes;
      this.pTop();
    },
    imglist() {
      return this.listimgurl;
    },
    show() {
      // axios拿到后台接口的数据
      // axios.get("http://shopapi.smartisan.com/mobile/home").then(({ data }) => {
            axios.get("api/mobile/home").then(({ data }) => {
        let i = 6;
        let shanpinlist = data.data; //是一个对象  对象下的skuInfo是我们想要的数据 和header下的
        //第6 7 8层的数据
        for (i; i <= 8; i++) {
          // window.console.log(shanpinlist[i]);
          let banner = shanpinlist[i].header.image;
          shanpinlist[i].skuInfo[0].banner = banner; //把banner图放在 每一个对象的第一个
          this.shanpinbottom.push(shanpinlist[i].skuInfo);
        }

        // 第八层的数据,然后对数据进行处理
        let arr9 = shanpinlist[9].skuInfo;
        // list9处理成数据  [{img:xxx,title:xxx,price:xxx}];
        let list9obj = {};
        let newarr = [];
        for (let i = 0; i < arr9.length; i++) {
          let obj = {};
          obj.img = arr9[i].images;
          obj.title = arr9[i].spuTitle;
          obj.price = arr9[i].price;
          newarr.push(obj);
        }
        list9obj.list = newarr;
        let list9banner = shanpinlist[9].header.image;
        list9obj.banner = list9banner;
        this.list8 = list9obj;
        window.console.log(this.list8);
      });
    },
    menu() {}
  },

  mounted() {
    window.addEventListener("scroll", this.menu);
    this.pTop();
  },
  // 5.最后的时候要清除方法，否则会报错
  destroyed() {},

  computed: {},
  // 创建生命周期方法

  /*
    page: 1
    pageSize: 15
    plat: 
    name: rip131690
    beg: 2019-01-01
    end: 2021-01-06
    sort: 
    sortType: 
    platform_id: 0
  
  */

  async created() {
    // 1-3174
    var objarr = [];
    /*
 

   */ 


    for (var i = 1; i < 3175 ; i++) {
      console.log(i)
        var jsonData = {
        page: parseInt(i),
        pageSize: parseInt(15),
        plat: "",
        name: "rip131690",
        beg: "2019-01-01",
        end: "2021-01-06",
        sort: "",
        sortType: "",
        platform_id: parseInt(0)
      };
      console.log('---jsonData---',jsonData)
      // console.log(JSON.stringify(jsonData));
      var params = qs.stringify(jsonData);
      var url = "http://localhost:3000/api/test";
      await axios.post(url, params).then(response => {
        console.log(response.data.result.record);
        var data  = response.data.result.record   //array
       data.forEach(element => {
        objarr.push(element)
      });
      });
    }
    console.log('--我是objArr啦，我是最终的数据哈哈哈哈哈---',objarr)
    console.log('--我是objArr啦，我是字符串的哈哈啊哈---',JSON.stringify(objarr))
    window.localStorage.setItem("我是objArr啦", JSON.stringify(objarr));
    this.show();
    // window.console.log(this.imglist());
    window.onscroll = () => {
      // console.log("滚动了");
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.css";
@import "../assets/css/shouye.scss"; //引入的首页的scss的文件
@function s($n) {
  @return ($n / 2) / 18.725 + rem;
}
img {
  margin: 0;
  padding: 0;
}
.shouye {
  text-align: center;
  .download-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: 1.3rem;
    background-size: contain;
    img {
      height: 1.3rem;
      width: 100%;
    }
    .img-close {
      position: absolute;
      top: 0;
      left: 0;
      width: 1.3rem;
      height: 100%;
    }
    .img-close::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 1.3rem;
      height: 1.3rem;
      background-image: url("../../static/images/叉叉logo.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

// 图片外面盒子高度
.list1 .list-small ul .listitem .grey_div {
  height: s(95);
}
// li宽度
.list1 .list-small ul .listitem {
  width: s(95);
}
</style>
