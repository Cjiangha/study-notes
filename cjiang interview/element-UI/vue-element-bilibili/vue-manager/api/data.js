import axios from "./axios";

export const getMenu = (param)=>{
    return axios.request({
        url:'/permission/getMenu',
        methods:'post',
        data:param
    })
}

//查询
export const getData = ()=>{
    return axios.request({
        url:'/home/getData',
        method: 'get'
    })
}

//查询
export const getUser = (params)=>{
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

//删除
export const delUser = (params)=>{
    return axios.request({
        url: '/user/del',
        method: 'post',
        params
    })
}
