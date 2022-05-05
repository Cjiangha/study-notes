import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 抛出Vuex的仓库
export default new Vuex.Store({
  state: {
    counter: 10,
    // 新定义一个obj
    obj: {}
  },
  getters: {
    pownercount(state) {
      return state.counter * state.counter
    }
  },
  // 同步方法
  mutations: {
    add(state) {
      return state.counter += 1
    },
    reduce(state) {
      return state.counter -= 1
    },

    // 修改state中的obj
    getparam(state, Object) {
      state.obj = Object
    }
  },
  // 异步方法
  actions: {
    getparamsync(context, Object) {
      // 模拟异步请求，延时3s
      setTimeout(() => {
        /*
          actions#
          类型: { [type: string]: Function }
                
          在 store 上注册 action。处理函数总是接受 context 作为第一个参数，payload 作为第二个参数（可选）。
             context api 对应的方法
            * state, // 等同于 `store.state`，若在模块中则为局部状态
            * rootState, // 等同于 `store.state`，只存在于模块中
            * commit, // 等同于 `store.commit`
            * dispatch, // 等同于 `store.dispatch`
            * getters, // 等同于 `store.getters`
            * rootGetters // 等同于 `store.getters`，只存在于模块中

        */
        // 通过commit提交一个名为getparam的mutation
        //action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
        context.commit('getparam', Object)
      }, 3000)
    }
  },
  modules: {
    // 如果有多个可以在这里独立分隔为多个模块
    a: {
    // App中调用{{ $store.state.a }}
      state: {
        name: 'vue'
      },
    // 其余组建中调用与外侧调用一致
      mutations: {},
      actions: {},
      getters: {}
    },
    b: {

    }
  }
});