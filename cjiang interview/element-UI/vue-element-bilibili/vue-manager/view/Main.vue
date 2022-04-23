<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../src/components/CommonAside.vue";
import CommonHeader from "../src/components/CommonHeader.vue";

export default {
  data() {
    return {};
  },
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: rgb(51, 51, 51);
}

.el-main {
  padding-top: 0;
}
</style>