export default{
    state:{
        isCollapse:false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null, //当前菜单添加的tab
    },
    mutations:{
        collapsemenu(state){
            state.isCollapse = !state.isCollapse
        },
        //  selectMenu(state,val) state->仓库的state
        // 我的理解：val->匹配的值  仓库state 与我们拿的路由值进行比较
        selectMenu(state,val){
            console.log('selectMenu',state,val)
            if(val.name !== 'home'){  // 当点击的不为home
                state.currentMenu = val
                // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引
                const result = state.tabsList.findIndex(item=>item.name === val.name)
                if(result === -1){ //点击不为home 且 val.name
                    console.log(val);
                }
            }else{//点击为home
                state.currentMenu = null
            }
        }
    }
}