<template>
  <div>
    <form>
      <input type="text" placeholder="请输入用户名" class="username" v-model="username"  v-on:blur="this.useryanzheng" />
      <p class="usernametishi" style="display:none;"></p>
      <input type="password" placeholder="请输入密码" class="password" v-model="password" v-on:blur="this.passwordyanzheng" />
      <p class="passwordtishi"></p>
      <input type="button" class="btn" value="登录" v-on:click="this.qingqiu" />
    </form>
  </div>
</template>

<script>
import qs from "qs";
import Vue from 'vue';
import { Toast,Field } from 'vant';
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
    //1.高亮
    select() {
      this.istrue = !this.istrue;
      window.console.log(this.istrue);
    },
    // 1、飞空判断，正则判断
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
          str = `<i class="i-error"></i>密码长度必须为6-20位`;
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
      this.$axios.post("http://localhost:3000/login", params).then(({ data }) => {
          if (this.username === "" || this.password === "") {
            Toast("账号或密码不能为空");
          } else {
            // 求全发送到后台的的数据
            if (data == 0) {
              // 为零密码错误
              // window.console.log(data);
              // Toast("密码错误");
            } else {
              this.userToken = this.username; //Bearer令牌是。。。
              // 将用户token保存到vuex中
              // this.changeLogin({ Authorization: this.userToken });
              this.$router.push("/");
              window.alert("登陆成功");
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
@function s($n) {
  @return ($n / 2) / 18.725 + rem;
}
.username,
.password {
  margin-bottom: 20px;
  margin-top: 20px;
  border: 2px solid #ccc;
}
.btn {
  margin-top: 20px;
  width: 200px;
  height: 50px;
}
</style>