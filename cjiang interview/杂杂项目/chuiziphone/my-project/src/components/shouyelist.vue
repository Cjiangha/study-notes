<template>
  <div class="list1">
    <slot />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../assets/css/base.css";
@function vw($px) {
  @return ($px / 375) * 100vw;
}

@function s($n) {
  @return ($n / 2) / 18.725 + rem;
}

.list1::before {
  display: inline-block;
  position: absolute;
  content: "";
  top: 0;
  left: s(12.5);
  width: calc(100% - 1.25rem);
  height: 1px;
  border-top: 1px dotted #e9e9e9;
}
.list1 {
  padding-top: s(17);
  height: s(375);
  position: relative;
  .list-banner1 {
    width: s(350);
    height: s(104);
  }
  .list-div {
    width: 100%;
    height: s(218);
    position: absolute;
    overflow: auto;
    top: s(112);
    ul {
      display: flex;
      padding: 0 s(10);
      .listitem {
        flex-shrink: 0;
        float: left;
        margin-right: s(6);
        width: s(150);
        border-radius: 10px;
        .grey_div {
          background: #f7f7f7;
          height: s(150);
          border-radius: 10px;
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            mix-blend-mode: multiply; //正片叠底
          }
        }
        .title {
          margin: s(6.25) 0 s(2.3);
          padding: 0 set(6.25);
          text-align: left;
          font-size: s(13);
          color: rgba(0, 0, 0, 0.7);
          box-sizing: border-box;
          height: s(50);
          width: 100%;
          margin: auto;
          h2 {
            padding: s(6.25) 0 s(2.1);
            font-weight: bolder;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis; //   2、溢出文本显示省略号：
            display: -webkit-box; //3、主要是控制父容器里面子元素的排列方式 ：
            -webkit-line-clamp: 2; //4、实现限制文字显示多行，多余的用... ：
            -webkit-box-orient: vertical; //5、属性规定框的子元素应该被水平或垂直排列。
          }
        }
        p::after {
          content: "";
          display: block;
          height: 0px;
          overflow: hidden;
          clear: both;
          visibility: hidden;
        }
        p {
          padding: 0 s(6);
          display: flex;
          span {
            color: #d44d44;
            display: inline-block;
            vertical-align: middle;
            font-weight: bolder;
            float: left;
          }
          span:nth-child(1) {
            font-size: s(11.45);
          }
          span:nth-child(2) {
            font-size: s(14.45);
          }
          b {
            vertical-align: middle;
            float: right;
            position: relative;
            display: inline-block;
            padding: s(2) s(8) s(2);
            border-radius: s(2);
            font-size: s(10);
            color: #d56159;
            background: #f6ebea;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>