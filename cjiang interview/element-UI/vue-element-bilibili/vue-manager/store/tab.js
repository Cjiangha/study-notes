export default{
    state:{
        isCollapse:false
    },
    mutations:{
        collapsemenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}