var express = require('express');
var router = express.Router();
const { find, insert, deletes, update } = require('../db/db');
router.get('/list', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    let data = await find('list')//查询list表格
    res.json(data);
});
router.post('/detail', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    let query = req.query;
    let params = req.body
    // console.log(params)
    let gid = Number(params.gid);
    // console.log(gid)
    let data = await find('list', {
        'id': gid
    })
    // console.log(data.length);
    res.json(data);
});
//注册
router.post('/reg', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    let query = req.query;
    let params = req.body;
    var username = String(params.username);
    var password = String(params.password);
    var phone = Number(params.phone);
    var result = {};
    // console.log(gid)
    let data = await find('user', {
        'username': username
    })
    // console.log(data);
    if (data.length > 0) {
        result = { message: "该用户名（手机号）已经存在", code: 1 }
    } else {
        result = { message: "插入成功", code: 0 }
        let data1 = await insert('user', [{
            'username': username,
            'password': password,
            'phone': phone
        }])

    }
    res.json(result);
});
//账号登录
router.post('/login', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');//允许跨域
    //获取url中的请求参数
    var query = req.query
    var params = req.body //请求体中的数据
    // console.log(params)
    var username = params.username;
    var password = params.password;
    // console.log(username, password);
    let data = await find('user', { 'username': username, 'password': password });
    // console.log(data.length);
    var result = {};
    if (data.length) {
        result = { message: "登录成功", code: 0 }
    } else {
        result = { message: "账号密码错误", code: 1 }
    }
    res.json(result);
});
//购物车
router.post('/car', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');//允许跨域
    //获取url中的请求参数
    var query = req.query
    var params = req.body //请求体中的数据
    console.log(params)
    var username = params.username;
    console.log(username);
    let data = await find('car', { 'username': username })
    res.json(data);
});
//购物车删除商品
router.post('/del', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');//允许跨域
    //获取url中的请求参数
    var query = req.query
    var params = req.body //请求体中的数据
    console.log(params)
    var username = params.username;
    var gid = String(params.gid);
    console.log(gid);
    let data = await deletes('car', {
        'username': username,
        'gid': gid
    })
    var result = {};
    if (data) {
        result = '删除成功呢'
    } else {
        result = '删除失败'
    }
    res.send(result);
});
//修改商品的数量
router.post('/modified', async function (req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');//允许跨域
    //获取url中的请求参数
    var query = req.query
    var params = req.body //请求体中的数据
    console.log(params)
    var username = params.username;
    var num = String(params.num);
    var gid = String(params.gid);
    console.log(gid);
    let data = await update('car', {
        'username': username,
        'gid': gid
    }, {
        'num': num
    })
    var result = {};
    if (data) {
        result = '更新修改成功呢'
    } else {
        result = '更新修改失败'
    }
    res.send(result);
});






module.exports = router;