<template>
   <!-- <form>
      <input type="text" placeholder="请输入用户名" class="username" v-model="username"  v-on:blur="this.useryanzheng" />
      <p class="usernametishi" style="display:none;"></p>
      <input type="password" placeholder="请输入密码" class="password" v-model="password" v-on:blur="this.passwordyanzheng" />
      <p class="passwordtishi"></p>
      <input type="button" class="btn" value="登录" v-on:click="this.qingqiu" />
    </form> -->

  <div class="wrapper">
    <div class="title-bar">
      <p class="close">
        <a href="###" style="close" @click = "tiaozhuan">X</a>
      </p>
      <h2>短信验证码登录</h2>
    </div>
    <div class="content">
      <ul class="common-form">
        <li class="country-region">
          <span class="icon"></span>
          <span class="cr">国家和地区</span>
          <span role="button" class="country ng-binding" title="中国">中国</span>
        </li>

        <div class="phone-pw">
          <li class="username">
            <!-- <span class="icon">
            <i>手机号</i>
            </span>-->
            <span class="ccc ng-binding" ng-bind="ccc">+86</span>
            <!-- <input type="text" placeholder="手机号" name="username" /> -->
            <input type="text" placeholder="手机号" class="username" v-model="username"  v-on:blur="this.useryanzheng" />
                <p class="usernametishi" style="display:none;"></p>
          </li>

          <li class="password">
            <input type="password" placeholder="请输入密码" class="password" v-model="password" v-on:blur="this.passwordyanzheng" />
               <p class="passwordtishi"></p>
          </li>
        </div>

        <div class="btn-wrapper">
          <div class="btn btn-primary disabled">
             <input type="button" class="btn" value="登录" v-on:click="this.qingqiu" />
              <!-- <a role="button">登录</a> -->
          </div>
        </div>
      </ul>
      <div class="wenzi">
        <div class="auto">
          <span class="islogin checkbox" :class="{checkboxactive : istrue }" @click="select"></span>
          <span class="font-common f1">自动登录</span>
        </div>

        <span class="font-common">
          <a>短信验证登录</a>
        </span>
        <span class="font-common">
          <a>忘记密码</a>
        </span>
      </div>
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
import Vue from "vue";
import { Field ,Toast} from "vant";
import qs from 'qs';
// 验证码表单
Vue.use(Field);
Vue.use(Toast);
export default {
  data() {
    return {
      istrue: false,
      username:'',
      password:''
    };
  },
  methods: {

    tiaozhuan(){
      this.$router.push('/login_register');
    },
    /* 选择高亮 */
    select() {
      this.istrue = !this.istrue;
      window.console.log(this.istrue);
    },
    /* 1、非空判断，正则判断*/
    useryanzheng() {
      let input1 = document.querySelector(".username"); //用户名
      let tishi1 = document.querySelector(".usernametishi"); //提示
      var istrue1 = false;
      var reg = /^1[3-9]\d{9}$/;
      var value = input1.value;
      var istrue = reg.test(value);
      if (value) {
        if (!istrue) {
          //正则验证错误
          tishi1.style = `display:block`;
          tishi1.innerHTML = `<i class="i-error"></i>用户名不是手机！亲，请重新输入！`;
          istrue1 = false;
        } else {
          //输入正确
          istrue1 = true;
        }
      }
      return istrue1;
    },
    /* 密码提示 */
    passwordyanzheng(str) {
      let input2 = document.querySelector(".password"); //密码
      let tishi2 = document.querySelector(".passwordtishi"); //提示
      var istrue2 = false;
      var value = input2.value;
      //密码长度  6 - 20    不能包含空格
      var reg = /^\S{6,20}$/;
      var istrue = reg.test(value);
      if (value) {
        if (!istrue) {
          tishi2.style = "display:block;";
          // str = `<i class="i-error"></i>密码长度必须为6-20位`;
          Toast('密码长度必须为6-20位');
          tishi2.innerHTML = str;
          istrue2 = false;
        } else {
          //输入正确
          //   tishi2.style = "display:none;";
          str = ``;
          tishi2.innerHTML = ``;
          istrue2 = true;
        }
      }
      return istrue2;
    },

    /* 登陆成功跳转页面，可以退出(查cookie是否含有该用户)
     * 如果是在注册页、首页跳转到登陆页；本来就在登陆页：登陆成功就跳转到首页 : window.open(url) location.href=url
     * 如果是非登陆页登陆的，跳转回上一页(localstorage存上一页路径)
     */
    qingqiu() {
      let params = {
        username: this.username,
        password: this.password
      };
      params = qs.stringify(params);
      this.$axios
        .post("http://localhost:3000/login", params)
        .then(({ data }) => {
          if (this.username === "" || this.password === "") {
            // Toast("账号或密码不能为空");
          } else {
            // 求全发送到后台的的数据
            if (data == 0) {
              //为零密码错误
              // window.console.log(data);
              // Toast("密码错误");
            } else {
              // this.userToken = this.username; //Bearer令牌是。。。
              // // 将用户token保存到vuex中
              // this.changeLogin({ Authorization: this.userToken });
              Toast('登录成功');
              this.$router.push('/');
            }
          }
          window.console.log(data);
          //把返回的值进行结构，为一个对象，
        })
        .catch(error => {
          window.console.log(error);
        });

      // let token = localStorage.getItem("Authorization");
      // // window.console.log(token);
      // if (token) {
      //   alert("你已经登陆过了");
      //   this.$router.go(-1);
      // } else {
      // }
    }
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
    border: 1px solid #ccc;
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
  .username::after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ebebeb;
    -webkit-transform: scaleY(0.667);
  }
  .username {
    position: relative;
    background-color: #fff;
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
      color: rgb(185, 206, 185);
    }
  }
  .phone-pw {
    border: 1px #ccc solid;
  }
  .btn-wrapper {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    margin-top: 20px;
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
  margin: 14px 12px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  line-height: 13.5px;
  height: 13.5px;
  position: relative;
  .checkbox {
    position: absolute;
    top: -4px;
    display: inline-block;
    width: 22px;
    height: 22px;
    background-position: 0 -25px;
    background-size: 22px auto;
    background-image: url("../assets/images/logingou.png");
  }
  .checkboxactive {
    background-position: 0 0;
  }
  .font-common {
    font-weight: 14px;
    color: #7f7f7f;
    a {
      color: #7f7f7f;
      font-size: 14px;
    }
  }
  .auto {
    display: flex;
    .f1 {
      padding-left: 30px;
    }
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