<template>
  <div>
    <div class="bigbuy">
      <div class="header-mobile">
        <div class="title-bar">
          <!-- <a class="nav-back">返回</a> -->
          <h2>购物车</h2>
        </div>
        <a class="nav-edit">编辑</a>
      </div>

      <!--优惠券  -->
      <div class="receive-coupon">
        <i class="left"></i>
        <label>点击领取优惠券</label>
        <i class="right"></i>
      </div>

      <!-- 每一个item -->
      <div class="cart-item">
        <div class="checkbox-container">
          <ul>
            <span class="m-blue-checkbox-new"></span>
          </ul>
        </div>
        <div class="item-wrapper">
          <div class="item-thumb">
            <img
              height="90"
              width="90"
              src="https://resource.smartisan.com/resource/a668d1a5f41b04ece82d76ded1e94d3a.jpg?x-oss-process=image/resize,w_270/format,webp"
            />
          </div>
          <div></div>
          <div class="item-info-container">
            <span class="colorful-tag red">限时优惠</span>
            <div class="item-info">
              <h4>坚果 QuickCharge 4+ 快速充电器</h4>
              <p class="item-attrs">
                <span>
                  <span>白色</span>
                </span>
              </p>
              <div class="discount-price">
                <span class="price">
                  <span>
                    <i>¥</i>
                    <span>58.00</span>
                  </span>
                </span>
                <span class="sum smartisan-icon">3</span>
                <p class="original-price">
                  <i>¥</i>
                  <span>59.00</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoodAction />
    </div>
    <GoodAction />
    <Tabble />
  </div>
</template>

<script>
import GoodAction from "../components/GoodAction";
import Tabble from "../components/Tabble";
export default {
  components: {
    GoodAction,
    Tabble
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.css";
@import "../assets/css/base.scss";
body {
  font-family: Helvetica Neue, Helvetica, Arial, SCREEN GP Sans SC, sans-serif;
}
html {
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

.bigbuy {
  position: relative;
}
.header-mobile {
  position: relative;
  height: 50px;
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
  .nav-edit {
    padding: 13px 10px 0;
    right: 10px;
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

  .nav-edit::after {
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
}

//领取优惠券
.receive-coupon {
  height: auto;
  top: 50px;
  z-index: 99;
  background: #ffe7e5;
  min-height: s(70);
  color: #d04f48;
  display: flex;
  align-items: center; //字体剧中
  justify-content: space-between; //左中右
  padding-left: 14px;
  padding-right: 6px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 5px 13px rgba(0, 0, 0, 0.22),
    0 5px 13px rgba(0, 0, 0, 0.22);
  border-bottom: 3px solid #ccc;
  .left {
    display: block;
    position: relative;
    width: s(27);
    height: s(27);
    background: url("../assets/images/buyyouhuilogo.png");
    background-size: cover;
  }
  label {
    left: s(53);
    position: absolute;
    font-size: s(15);
    font-weight: 700;
    height: s(60);
    line-height: s(60);
    color: #d04f48;
  }
  .right {
    display: block;
    position: relative;
    width: s(20);
    height: s(20);
    background: url("../assets/images/buyright-jt.png");
    background-size: cover;
  }
}
.cart-item {
  margin-top: s(10);
  align-items: center;
  display: flex;

  // 选择
  .checkbox-container {
    width: 44px;
    flex: 0 0 44px;
    text-align: center;
    line-height: 0;
    ul {
      text-align: center;
      line-height: 0;
      span {
        position: relative;
        display: inline-block;
        width: 23px;
        height: 23px;
        background: url("../assets/images/gou.png") no-repeat;
        background-size: 100% auto;
        background-position: 0 -80px;
      }
    }
  }
  // 商品
  .item-wrapper {
    display: flex;
    align-items: center;
    .item-thumb {
      img {
        width: s(90);
        height: s(90);
      }
    }
    .item-info-container {
      text-align: left;
      .colorful-tag {
        color: #cc3e39;
        background: #ffe7e5;
        border-color: #f0948d;
        padding: 3px 5px 5px 3px;
        font-size: 10px;
        font-weight: 700;
        border-radius: 10px;
        z-index: 89;
        white-space: nowrap;
        display: inline-block;
        text-align: center;
      }
      h4 {
        font-size: 12px;
        font-weight: bolder;
        color: #000;
      }
      .item-attrs {
        font-size: 10px;
        color: #7f7f7f;
        overflow: hidden;
        margin: 7px 0;
      }
      .discount-price {
        display: flex;
        align-items: center;
        font-size: 12px;
        .price {
          color: #d44d44;
          font-weight: 700;
          top: -4px;
          span {
            display: inline;
          }
        }
        .sum {
          color: #999;
          position: relative;
          padding-left: 14px;
          margin-left: 6px;
          display: inline-block;
          vertical-align: top;
        }
        .sum::before {
          content: "x";
          position: absolute;
          left: 0;
          bottom: -1px;
        }
        .original-price {
          font-size: 0.6rem;
          color: #7f7f7f;
          position: relative;
          margin-left: 20px;
          font-size: 12px;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>