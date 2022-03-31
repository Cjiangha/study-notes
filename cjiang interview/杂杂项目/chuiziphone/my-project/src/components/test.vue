<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="load"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import Vue from "vue";
import { List, Cell, PullRefresh,Toast } from "vant";
Vue.use(List);
Vue.use(Cell);
Vue.use(PullRefresh);
Vue.use(Toast);
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 50) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>
