import VueRouter from "vue-router";
import Vue from "vue";
// import Main from '../view/Main'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
                path: '/',
                name: 'home',
                component: () =>import('../view/Home/Home.vue')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () =>import('../view/Mall/Mall.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () =>import('../view/User/User.vue')
            },
            {
                path: '/dialag',
                name: 'dialag',
                component: () =>import('../view/Dialag/Dialag.vue'),
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('../view/other/pageOne.vue')
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('../view/other/pageTwo.vue')
            },
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