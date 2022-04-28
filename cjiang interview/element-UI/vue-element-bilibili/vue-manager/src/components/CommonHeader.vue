<template>
  <div class="Headerdiv">
    <div class="l-content">
      <el-button size="mini" icon="el-icon-menu" @click="changeStatus"></el-button>
      <h4 style="color: #fff">首页</h4>
    </div>
    <div class="r-content">
      <!-- dropdown 默认为hover的状态 -->
      <el-dropdown>
        <img :src="imageUrl" class="user" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  // 报错 ： [Vue warn]: Do not use built-in or reserved HTML elements as component id: header  
  // header -> headers
  name: "headers",
  data() {
    return {
      imageUrl: require("../assets/images/user-default.png"),
    };
  },
  methods:{
    changeStatus(){
      this.$store.state.tab.isCollapse = !this.$store.state.tab.isCollapse
    }
  }
};
</script>

<style lang="less" scoped>
    .Headerdiv{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }   
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
    }
    .r-content{
        .user{
            widows: 40px;
            height: 40px;
            border: 50%;
        }
    }
</style>

