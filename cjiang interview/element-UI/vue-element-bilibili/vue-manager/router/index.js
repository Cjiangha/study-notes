import VueRouter from "vue-router";
import Vue from "vue";
// import Main from '../view/Main'


const routes = [{
        path: '/',
        name: 'Main',
        component:()=>import('../view/Main.vue'),
        // component: Main,
        children: [{
                path: '/home',
                name: 'home',
                component: () =>import('../view/Home/Home.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () =>import('../view/User/User.vue')
            }
        ]
    },

]

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

console.log(router)

export default router