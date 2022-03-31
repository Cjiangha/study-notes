//引入两个全局的
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Main from '../pages/Main.vue'
import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue';
import Buycart from '../pages/Buycart.vue';
import My from '../pages/My.vue';
import Xiangqing from "../pages/Xiangqing.vue";
import Buy from "../pages/Buy.vue";
import Loginr from "../pages/Loginandregister";
import Login from "../pages/Login";
import Loginstyle from '../pages/Loginstyle.vue';
import searchresult from '../pages/searchresult.vue'
import List from "../pages/list.vue";
import Test from "../pages/Loginstyle";

import test from "../components/test";

Vue.use(VueRouter)
const routes = [
    // 初始值的To默认有
    {
        path: '/',
        redirect: '/main/home'
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../pages/Main.vue'),
        children: [{
                path: 'home',
                name: 'home',
                component: Home,
                // 别名
                alias: 'h',
            },
            {
                path: 'category',
                name: 'category',
                component: Category
            },
            {
                path: 'Buycart',
                name: 'Buycart',
                component: Buycart
            }, {
                path: 'My',
                name: 'My',
                component: My
            }
        ]
    },
    {
        path: '/xiangqing',
        name: 'xiangqing',
        component: Xiangqing,
    }, {
        path: '/buy',
        name: 'buy',
        component: Buy
    },
    //登录和注册
    {
        path: '/login_register',
        name: 'login_register',
        component: Loginr
    },
    //登录
    {
        path: '/login',
        name: 'login',
        component: Loginstyle
    },

    {
        path: '/main/Category/List',
        name: 'List',
        component: List,
        meta: {
            keepAlive: false //不需要被缓存的组件
        }
    },

    {
        path: '/ ',
        name: 'test',
        component: Test,
    },
    {
        path: '/xiangqing/:id',
        name: 'xiangqing',
        component: Xiangqing,
    },
    {
        path: '/Loginstyle',
        name: 'Loginstyle',
        component: Login,
    },
    // searchresult  搜索页面
    {
        path: '/searchresult',
        name: 'searchresult',
        component: searchresult
    },

    // 测试页面
    {
        path: '/test',
        name: 'test',
        component: test
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router;