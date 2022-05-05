<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ count }}:计算属性</p>

    <!-- <p>{{ powerconter }}:新状态 </p> -->
    <!-- 点击count的值会自增1,调用的两种方式  -->
    <button @click="$store.commit('add')">点我增加</button>
    <!-- 在methods中定义的方法  -->
    <button @click="addcount()">addcount</button>
    <!-- mapMutations 调用 -->
    <button @click="reduce()">-</button>
    <!-- 触发action事件 -->
    <button @click="getVal()">使用action模拟一个宏任务</button>
    <p>{{ this.$store.state.obj }}</p>
  </div>
</template>
<script>
// 引入 mapMutations
import { mapMutations } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    count() {
      return this.$store.state.counter;
    },
    powerconter() {
      return this.$store.getters.pownercount;
    },
  },
  methods: {
    addcount() {
      this.$store.commit("add");
    },
    // 还可以通过在组件中引入vuex的mapMutations直接注册
    ...mapMutations(["reduce"]),
    getVal() {
      alert('···点击后延迟3秒渲染数据····')
      let name = "cjiang";
      let age = "26";
      let sex = "man";
      //1.通过dispatch将方法getParamSync和多个参数{name,age,sex}传递给actions
      this.$store.dispatch("getparamsync", { name, age, sex });
    },
  },
};
</script>

