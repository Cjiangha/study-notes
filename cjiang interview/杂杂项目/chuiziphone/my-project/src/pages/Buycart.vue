<template>
  <div id="big">
    <div class="buycart">
      <h2>购物车</h2>
    </div>
    <div class="middle">
      <div class="empty-container">
        <div class="img-container"></div>
        <h3>购物车暂无商品</h3>
        <p _ngcontent-c8>添加到购物车的商品将会显示在这里</p>
        <a href="###" class="buy-btn login">登录</a>
        <a href="###" class="buy-btn box-border">现在选购</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {}
};
</script>

<style lang="scss" scoped>
.buycart {
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
.middle {
  .empty-container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    .img-container {
      width: 88px;
      height: 114px;
      background: url("../assets/images/buylogo.png") no-repeat top;
      background-size: 88px auto;
      margin: 0 auto;
    }
    h3 {
      color: rgba(0, 0, 0, 0.15);
      margin: 25px 0 9px;
      font-size: 18px;
    }
    p {
      font-size: 11px;
      text-align: center;
      color: rgba(0, 0, 0, 0.15);
    }
    .buy-btn.login {
      box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.2),
        0 0 1px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2);
      background: #5e8bdd;
      background: linear-gradient(#6f94e8, #5178df);
      border-radius: 6px;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15);
      color: #fff;
    }
    .buy-btn {
      display: inline-block;
      width: 142px;
      height: 40px;
      line-height: 40px;
      font-size: 10px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.6);
      margin: 16px 1px 0;
      background: linear-gradient(rgba(0, 0, 0, 0.01), hsla(0, 0%, 100%, 0.01));
      box-shadow: inset 0 2px 4px hsla(0, 0%, 100%, 0.3);
    }
  }
}
</style>


