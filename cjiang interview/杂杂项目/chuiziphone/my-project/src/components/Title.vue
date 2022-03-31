<template>
  <div class="header-mobile">
    <!-- <a class="nav-back nav-common">返回</a>
    <div class="title-bar">
      <h2>购物车</h2>
    </div>
    <a class="nav-edit nav-common">编辑</a>-->
    <slot />
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.header-mobile {
  position: relative;
  height: 50px;
  z-index: 10;
  .title-bar {
    background: #1d1d1d;
    background-image: linear-gradient(#1d1d1d, #181818);
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
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
  // 返回
  .nav-common {
    padding: 13px 10px 0;
    background: #070707;
    background: linear-gradient(#131313, #070707);
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12px;
    height: 32px;
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .nav-common::after {
    background: #151515;
    background: linear-gradient(#2a2a29, #151515);
    box-shadow: inset 0 1px 1px hsla(0, 0%, 100%, 0.1),
      inset 0 0 1px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    content: " ";
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    z-index: -1;
  }

  .nav-back {
    left: 8px;
    z-index: 2;
    padding: 10px 10px 0 20px;
    text-align: center;
  }
  .nav-back::before {
    background: url("../assets/images/title-zuojiantou.png") no-repeat;
    background-size: cover;
    content: " ";
    height: 100%;
    width: 6px;
    position: absolute;
    top: 50%;
    left: 9px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .nav-edit {
    right: 10px;
  }
}
</style>