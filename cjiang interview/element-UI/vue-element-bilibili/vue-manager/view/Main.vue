<template>
  <div>
    <el-container>
      <el-aside width="200px"> 
          <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../src/components/CommonAside.vue";

export default {
  data() {
    return {};
  },
  components: {
    CommonAside,
  },
};
</script>

<style lang="less">
    .el-header{
        background: #ccc;
    }

    .el-main{
        padding-top: 0;
    }
</style>