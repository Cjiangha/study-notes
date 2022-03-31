<template>
  <div class="wrapper">
    <div class="title-bar">
      <p class="close">
        <router-link to="/main/My" href="###">X</router-link>
      </p>
      <h2>注册页面</h2>
    </div>
    <div class="content">
      <ul class="common-form">
        <li class="country-region">
          <span class="icon"></span>
          <span class="cr">国家和地区</span>
          <span role="button" class="country ng-binding" title="中国">中国</span>
        </li>
        <li class="username">
          <!-- <span class="icon">
            <i>手机号</i>
          </span>-->
          <span class="ccc ng-binding" ng-bind="ccc">+86</span>
          <input
            type="text"
            placeholder="手机号"
            name="username"
            v-model="username"
            v-on:change="phoneyz()"
          />
        </li>
        <li class="password">
          <input
            type="password"
            placeholder="密码"
            name="password"
            v-model="password"
            v-on:change="passwordyz()"
          />
        </li>
        <li class="verification">
          <van-cell-group>
            <van-field
              v-model="yanzheng"
              v-on:change="shuru()"
              center
              clearable
              label="请输入验证码"
              placeholder="请输入短信验证码"
            >
              <van-button slot="button" size="small" type="primary">{{c}}</van-button>
            </van-field>
          </van-cell-group>
        </li>

        <div class="btn-wrapper">
          <div class="btn btn-primary disabled">
            <a @click="yonghuming">
              <!-- <router-link role="button" :to="this.istrue?'/login':'/login_register'"></router-link> -->
              登录
            </a>
          </div>
        </div>
      </ul>
      <p class="wenzi">
        <span class="registercloud">未注册的手机号验证后将自动注册</span>
        <router-link href="###" class="toLogin" :to="'/login'">
        账号密码登录
        </router-link>
      </p>
    </div>

    <div class="contry-list">
      <span class="delta-country"></span>
      <ul class="listbox">
        <li class></li>
      </ul>
    </div>

    <ul class="login-three ng-scope" ng-if="!isMiniprogram">
      <li class="text" style="display:none;">其他账号登录：</li>
      <li role="button" class="wechat" ng-click="wechatLogin()"></li>
      <li role="button" class="weibo" ng-click="weiboLogin()"></li>
      <li role="button" class="qq" ng-click="qqLogin()"></li>
      <li role="button" class="alipay" ng-click="alipayLogin()"></li>
    </ul>
    <div class="bottom" style></div>
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import { Field, Button } from "vant";
// 验证码表单
Vue.use(Field).use(Button);
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      c: 1,
      username: "", //用户名值
      password: "", //密码值
      yanzheng: "", //验证码值
      yanzhengtrue: false, //验证码是否错误
      passwordtrue: false, //密码是否错误
      phonetrue: false, //手机是否错误
      istrue:false,
      str: ""
    };
  },
  methods: {
    back() {
      this.$route.go(-1);
    },
    gotoluyou() {
      this.$route.push("/login");
    },
    // 验证用户是否被注册过了。
    async yonghuming() {
      window.console.log(this.username, this.password);
      let _ = this;
      let params = {
        username: this.username,
        password: this.password
      };
      params = qs.stringify(params);
      if (this.username == "" && this.password == "") {
        Toast("输入的用户名和密码为空");
      } else if (this.phonetrue == false) {
        Toast("输入的用户名格式错误");
      } else if (this.passwordtrue == false) {
        Toast("密码格式错误");
      } else if (this.yanzhengtrue == false) {
        Toast("验证码错误");
      } else {
        //格式都没有错误
        await this.$axios
          .post("http://localhost:3000/reg", params)
          .then(({ data }) => {
            window.console.log(data.code);
            if (data.code == 1) {
              Toast("用户名已经存在");
              _.isture = false;
            } else {
              Toast("注册成功");
              _.istrue = true;
              window.console.log(_.istrue);
              this.$router.push("/login");
              // this.str = "/login";
              // window.console.log(this.str);
            }
          });
      }
    },

    yanzhengma() {
      let a = 0;
      let str = "";
      for (let i = 0; i < 4; i++) {
        a = parseInt(Math.random() * 10); //0-9
        str = String(a) + str;
      }
      this.c = str;
      window.console.log(a, this.c);
    },
    shuru() {
      if (this.yanzheng == this.c) {
        this.yanzhengtrue = true;
      } else {
        this.yanzhengtrue = false;
        Toast("验证码错误");
      }
    },

    phoneyz() {
      //用户名正则：手机号码
      var reg = /^1[3-9]\d{9}$/;
      var istrue = reg.test(this.username);
      if (this.username) {
        //判断是否有值
        if (!istrue) {
          this.phonetrue = false;
          Toast("用户名格式错误，必须为手机号码");
        } else {
          //输入手机号码正确
          this.phonetrue = true;
        }
      } else {
        Toast("用户名空");
      }
    },

    passwordyz() {
      // 6 --20位
      var reg = /^\S{6,20}$/;
      var istrue = reg.test(this.password);
      if (this.password) {
        //判断是否有值
        if (!istrue) {
          //判断是否为
          Toast("亲，密码长度位6 - 20位，不能包含空格");
          this.passwordtrue = false;
        } else {
          //输入手机号码正确
          this.passwordtrue = true;
        }
      } else {
        Toast("密码为空");
      }
    }
    /* 
      注册的思路 :  判断用户名是否被注册了——非空（提示输入的信息为空）—— 密码是否为
      位以上，用户名是否为手机号码，    */

    // chuan(){
    //   // let params = {
    //   //   username: this.username,
    //   //   password: this.password
    //   //   };
    //     this.$axios.get("http://localhost:3000/register").then(( data ) => {
    //       window.console.log(data);
    //       // if(this.username){
    //       // }
    //   });
    // }
  },
  created() {
    this.yanzhengma();
    // this.shuru();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.css";
@function s($n) {
  @return ($n / 2) / 18.725 + rem;
}
.wrapper {
  text-align: center;
}
a {
  color: #5079d9;
  cursor: pointer;
  text-decoration: none;
  -moz-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.wrapper {
  background-image: url("../assets/images/bg-layout.png");
  min-width: inherit;
  height: 100%;
  min-height: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // 验证码
  .van-cell-group .van-field__button {
    font-size: 14px;
    color: #000;
    background: linear-gradient(#fcfcfc, #f7f7f7);
    box-shadow: none;
    height: 46px;
    line-height: 46px;
    background: 0 0;
    border: 1px solid #d1d1d1;
    font-size: 14px;
    color: #000;
  }
}
.title-bar {
  background: #1d1d1d;
  background-image: linear-gradient(#1d1d1d, #181818);
  height: 50px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 199;
  .close {
    left: s(15);
    position: absolute;
    font-size: 16px;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    a {
      color: white;
    }
  }
  h2 {
    color: #fff;
    font-size: 18px;
    line-height: 24px;
    padding: 16px 0 0;
    font-weight: bolder;
    text-align: center;
    position: absolute;
    top: 0;
    left: 60px;
    right: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.content {
  margin: 14px 12px 0;
  font-size: 16px;
}
.common-form {
  list-style: none;
  .country-region {
    position: relative;
    background-color: #fff;
    margin: 0 0 12px;
    overflow: hidden;
    line-height: 46px;
    height: 46px;
    opacity: 1 !important;
    border-radius: 4px;
    box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
      -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
    .icon {
      background: url("../assets/images/bg-white.png") repeat-x;
      border-radius: 6px 0 0 6px;
      border-right: 1px solid #d7d7d7;
      width: 32px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .cr {
      position: absolute;
      left: s(16);
      line-height: 44px;
      display: inline-block;
      text-align: center;
      font-size: 16px;
    }
    .country {
      position: absolute;
      right: 10px;
      font-size: 15px;
      line-height: 44px;
      display: inline-block;
      max-width: 76px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
      text-align: right;
      background-image: url("../assets/images/jiantou.png");
      background-size: auto 9px;
      background-repeat: no-repeat;
      background-position: 80% center;
      cursor: pointer;
      z-index: 100;
    }
  }
  .username {
    position: relative;
    background-color: #fff;
    margin: 0 0 12px;
    overflow: hidden;
    line-height: 33px;
    height: 46px;
    opacity: 1 !important;
    border-radius: 4px;
    box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
      -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
    .ccc {
      position: absolute;
      left: s(18);
      top: 0;
      height: 100%;
      line-height: 46px;
    }
    input {
      padding-left: 55px;
      background: 0 0;
      border: 0;
      box-sizing: border-box;
      font-size: 14px;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .password {
    position: relative;
    background-color: #fff;
    overflow: hidden;
    line-height: 33px;
    height: 46px;
    opacity: 1 !important;
    border-radius: 4px;
    box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
      -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
    input {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      font-size: 15px;
    }
  }
  .verification {
    position: relative;
    background-color: #fff;
    margin: 0 0 12px;
    overflow: hidden;
    line-height: 33px;
    height: 46px;
    opacity: 1 !important;
    border-radius: 4px;
    box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
      -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
  }
  .btn-wrapper {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    .btn {
      border-radius: 6px;
      height: 53px;
      line-height: 53px;
      box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.8);
      background: linear-gradient(#6788d0, #4364bb);
      padding: 1px;
      box-sizing: border-box;
      a {
        display: inline-block;
        background: linear-gradient(#6f94e8, #5178df);
        font-size: 18px;
        text-shadow: 0 -1px rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 51px;
        line-height: 51px;
        color: white;
        filter: saturate(50%);
      }
    }
  }
}

.wenzi {
  margin-top: 22px;
  .registercloud {
    color: #7f7f7f;
    font-size: 14px;
    display: inline-block;
    float: left;
    line-height: 18px;
    display: inline-block;
  }
  .toLogin {
    font-size: 14px;
    display: inline-block;
    line-height: 18px;
    float: right;
  }
}

.login-three {
  bottom: 50px;
  position: fixed;
  margin: 0 auto;
  width: 124px;
  margin-right: -62px;
  right: 50%;
  li.text {
    background-image: none;
    margin-left: 0;
    width: auto;
    color: #bbb;
    font-size: 100%;
    cursor: default;
    color: #999;
  }
  li {
    float: left;
  }
  li.weibo {
    background-image: url("../assets/images/loginlogo.png");
    background-size: auto 40px;
    background-position: -59px 0;
    width: 42px;
    height: 40px;
    margin: 0 10px;
  }
  li.qq {
    background-image: url("../assets/images/loginlogo.png");
    background-size: auto 40px;
    background-position: -119px 0;
    width: 42px;
    height: 40px;
    margin: 0 10px;
  }
}

.bottom {
  height: calc(100% - 400px);
}
</style>