<template>
  <div>
    <div class="title-bar">
      <h2>个人中心</h2>
    </div>
    <div class="page-for-center wrapper">
      <div class="box-userinfo">
        <Cell />
      </div>
    </div>
  </div>
</template>
<script>
/* 按钮直接点击进去到注册页。 */ 
import Cell from "../components/Cell.vue";

export default {
  components: { Cell }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.css";

@function s($n) {
  @return ($n / 2) / 18.75 + rem;
}

.title-bar {
  background: #1d1d1d;
  background-image: linear-gradient(#1d1d1d, #181818);
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 199;
  h2 {
    color: #fff;
    font-size: 18px;
    line-height: 20px;
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
.page-for-center {
  padding: s(14.5) s(12.5) 0;
  background-image: url("../assets/images/bg-layout.png");
  height: 100%;
  width: 100%;
  // background-size: 5rem;
  box-sizing: border-box;
  min-height: 100vh;
}
</style>