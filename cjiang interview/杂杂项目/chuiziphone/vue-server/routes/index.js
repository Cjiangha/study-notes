var express = require('express');
var router = express.Router();
var querystring =require("querystring");
let axios = require("axios");
const {
  find,
  insert,
  del,
  update
} = require('../db/db');
/* GET home page. */
// 获取首页的列表页的数据
router.get('/list', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  // let data = await find('shouyelist');
  let data = await find('hahaha')
  res.json(data);
});



router.get('/InsertText', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data1 = await insert('user', [{
    'text': 'text2'
    // 'phone': phone
  }])

  res.json('success，插入成功！！！');
  console.log('插入成功！....')
});


//请求列表页的数据
router.get('/ll', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let url = "http://shopapi.smartisan.com/v1/search/goods-list?category_id=190&page=1&num=20&sort=sort&channel_id=1002&type=shop";
  await axios
    .get(url, {
      headers: {
        referer: "http://shopapi.smartisan.com",
        host: "shopapi.smartisan.com,"
      },
      params: req.query
    })
    .then((response) => {
      // window.console.log(data.data);
      // this.listtype = data.data;
      res.json(response.data);
      console.log(response);
    });
});

// 列表页的数据
router.get('/mylist', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('list')
  res.json(data);
});

// 详情页的数据的数据
router.post('/xiangqinglist', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let query = req.query;
  let params = req.body
  var id = Number(params.id);
  let data = await find('list', {
    id: id
  })
  console.log(data);
  res.json(data);
});

//注册接口
router.post('/reg', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let query = req.query;
  let params = req.body;
  var username = String(params.username);
  var password = String(params.password);
  // var phone = Number(params.phone);
  var result = {};
  console.log(username, password)
  let data = await find('user', {
    'username': username
  })
  console.log(data.length);
  if (data.length > 0) {
    result = {
      message: "该用户名（手机号）已经存在",
      code: 1
    }
  } else {
    result = {
      message: "插入成功",
      code: 0
    }
    let data1 = await insert('user', [{
      'username': username,
      'password': password,
      // 'phone': phone
    }])
  }
  res.json(result);
});

//登录
router.post('/login', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*'); //允许所有的请求跨域
  var query = req.query; //获取url中的请求参数
  var params = req.body; //请求体中的数据
  console.log(params);
  var username = params.username;
  var password = params.password;
  console.log(username, password);
  let data = await find('user', {
    'username': username,
    'passowrd': password,
  });
  var result;
  if (data.length > 0) {
    result = 1;
  } else {
    result = 0;
  }
  res.json(result); //返回到前端的数据
  // console.log(data);
});

// 获取搜索关键词的接口
router.get('/serachResult', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*'); //允许所有的请求跨域
  let url = "https://shopapi.smartisan.com/v1/search/hot-words";
  await axios
    .get(url)
    .then((response) => {
      res.json(response.data);
      console.log(response);
    });
});

// 
router.get('/api/list', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*'); //允许所有的请求跨域
  let url = "https://shopapi.smartisan.com/v1/search/goods-list";
  // let pp = {
  //   category_id: 144,
  //   page: 1,
  //   num: 20,
  //   sort: 'sort',
  //   channel_id: 1002,
  //   type: 'shop'
  // }
  await axios
    .get(url, {
      params: req.query
    })
    .then((response) => {
      res.json(response.data);
      console.log(response);
    });
});



router.post('/api/test', async function (req, res, next) {
  // req.append('X-API-TOKEN','1382486_RLDYQTUh4SQ1qvVxFx0rSRtnpjYFRgcpxAzYXf69i0VRfv3zsmRcdepMcS1R')
  // req.append('Content-Type','application/x-www-form-urlencoded')
  res.append('Access-Control-Allow-Origin', '*'); //允许所有的请求跨域
  // res.append('X-API-TOKEN','1382486_RLDYQTUh4SQ1qvVxFx0rSRtnpjYFRgcpxAzYXf69i0VRfv3zsmRcdepMcS1R')
  let url = "https://agent.ybagent10.com/agent/api_game";
  //   var jsonData = {
  //     'page': 1,
  //     'pageSize': 15,
  //     'plat': '',
  //     'name': 'rip131690',
  //     'beg': '2019-01-01',
  //     'end': '2021-01-06',
  //     'sort': '',
  //     'sortType': "",
  //     'platform_id': 0
  // };

  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post['X-API-TOKEN'] = '1382486_Nt2XVao8I0koPBwpk45k8T0Ju4YwGMchMAjCcKO1KvIcYOTlGnVLwfFzOW8r';
  var params = req.body
  console.log('queryString',querystring)
  var tmp=JSON.stringify(params);
  var doc = JSON.parse(tmp);
  console.log('params',doc)
  await axios
    // .post(url, {params:req.query})
    .post(url, doc)
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    });
});

module.exports = router;