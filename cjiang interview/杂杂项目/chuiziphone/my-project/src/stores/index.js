import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        author: 'jing',
        search: {
            value: ''
        }
    },
    getters: {
        getAuthor(state) {
            return state.search
        }
    },
    // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，同步的
    mutations: {
        setAuthor(state, data) {
            state.search = data
        }
    },
    // 逼mutations多了  异步
    actions: {
        setAuthor(context, data) {
            context.commit('setAuthor', data)
        }
    }
})