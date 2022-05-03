<template>
  <div>
    <el-row class="home">
      <el-col :span="24" style="margin-bottom: 10px">
        <commonHomebreadcrumbs></commonHomebreadcrumbs>
      </el-col>
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <!-- <img src="../../src/assets/images/user.png" /> -->
            <img :src="userImage" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div>
            <div class="login-info">
              <p><span>上次登录的时间</span><span>2022/5/2 17:33</span></p>
              <p><span>上次登录的地点</span><span>广州</span></p>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col style="margin-top: 20px" :span="16">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-card style="height: 280px"> </el-card>
      <div class="graph">
        <el-card style="height: 260px"></el-card>
        <el-card style="height: 260px"></el-card>
      </div>

      <!-- <el-col :span="16"
        ><div class="grid-content bg-purple-light">
          <el-row class="home-right-top"> </el-row>
          <el-row class="home-right-middle"> </el-row>
          <el-row class="home-right-bottom">
            <el-col :span="12"></el-col>
            <el-col :span="12"></el-col>
          </el-row></div
      ></el-col> -->
    </el-row>
  </div>
</template>

<script>
// import CommonAside from "../../src/components/CommonAside.vue";
import commonHomebreadcrumbs from "../../src/components/commonHomebreadcrumbs.vue";
import {getData} from '../../api/data.js'

export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      userImage: require("../../src/assets/images/user.png"),
    };
  },
  components: {
    commonHomebreadcrumbs,
  },
  mounted() {
  //   this.$http.get('/user?ID=12345')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  // getMenu().then(res=>{
  //   console.log(res)
  // })

  getData().then(res=>{
    const {code,data} = res.data
    if(code === 20000){
      this.tableData = data.tableData
    }
    console.log(res)
  })
  },
};
</script>

<style lang="less">
// @import '../';
</style>