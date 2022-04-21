const app = getApp()

Page({
  data: {
    scale:10,
    longitude: 121.35688,
    latitude: 31.111172,
    markerList: [{
        "id": 1,
        "name": " 上海临港松江科技城",
        "areaName": "九亭镇&新桥镇",
        "address": "莘砖公路518号",
        "evaluGrade": "市级特色、五星级",
        "longitude": "121.316019",
        "latitude": "31.092595",
        "coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/127547fb-74d6-4877-9a1e-3ed64a3d33e1.jpg",
        "jumpPath": "bmZHYQ"
      }, {
        "id":2,
        "name": "G60电子信息国际创新产业园",
        "areaName": "经济开发区",
        "address": "文翔东路58号",
        "evaluGrade": "市级特色",
        "longitude": "121.294435",
        "latitude": "31.019473",
        "coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/3cd26a22-ea54-4c57-a4b9-afd52223cf94.png"
      }, {
        "id":3,
        "title": "G60佘山智能制造园区",
        "areaName": "佘山镇",
        "address": "强业路801弄",
        "evaluGrade": "培育型",
        "longitude": "121.185649",
        "latitude": "31.112243",
        "coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/e0bf90fa-6e74-4b54-816c-3953b2ffae62.jpg",
        "jumpPath": ""
      }, {
        "id": 4,
        "title": "G60生物医药产业基地",
        "areaName": "经济开发区",
        "address": "广富林路5000号",
        "evaluGrade": "市级特色",
        "longitude": "121.145038",
        "latitude": "31.041644",
        "coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/a81ad634-dd8c-4856-8fbe-5f6db03f3e98.png"
      }, {
        "id": 5,
        "title": "M创工坊·泗泾科技创新中心",
        "areaName": "泗泾镇",
        "address": "永强路68号",
        "evaluGrade": "培育型",
        "longitude": "121.303232",
        "latitude": "31.0884",
        "coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/779a7519-7229-4d4f-a269-8a0b938d4a0c.jpg"
      }, {
        "id": 6,
        "title": "创异工房",
        "areaName": "洞泾镇",
        "address": "沈砖公路6000号",
        "evaluGrade": "四星级",
        "longitude": "121.259612",
        "latitude": "31.09205",
        "coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/8dea68e1-fe6c-47ff-9f1e-eff68bb9a10c.jpg"
      },
     
    ],
    polygons: [{
        points: [{
            "longitude": 121.323856,
            "latitude": 31.162934
          },
          {
            "longitude": 121.319454,
            "latitude": 31.157784
          },
          {
            "longitude": 121.278269,
            "latitude": 31.152843
          },
          {
            "longitude": 121.277012,
            "latitude": 31.144175
          },
          {
            "longitude": 121.287486,
            "latitude": 31.139958
          },
          {
            "longitude": 121.280991,
            "latitude": 31.133248
          },
          {
            "longitude": 121.265734,
            "latitude": 31.136393
          },
          {
            "longitude": 121.258523,
            "latitude": 31.126997
          },
          {
            "longitude": 121.258048,
            "latitude": 31.132349
          },
          {
            "longitude": 121.246988,
            "latitude": 31.134158
          },
          {
            "longitude": 121.23942,
            "latitude": 31.130487
          },
          {
            "longitude": 121.245322,
            "latitude": 31.129293
          },
          {
            "longitude": 121.24453,
            "latitude": 31.125395
          },
          {
            "longitude": 121.236827,
            "latitude": 31.125703
          },
          {
            "longitude": 121.236445,
            "latitude": 31.117787
          },
          {
            "longitude": 121.224094,
            "latitude": 31.115141
          },
          {
            "longitude": 121.221154,
            "latitude": 31.116727
          },
          {
            "longitude": 121.227989,
            "latitude": 31.139094
          },
          {
            "longitude": 121.208285,
            "latitude": 31.135687
          },
          {
            "longitude": 121.200571,
            "latitude": 31.13713
          },
          {
            "longitude": 121.20163,
            "latitude": 31.14094
          },
          {
            "longitude": 121.194722,
            "latitude": 31.138182
          },
          {
            "longitude": 121.181961,
            "latitude": 31.143481
          },
          {
            "longitude": 121.179916,
            "latitude": 31.129401
          },
          {
            "longitude": 121.18512,
            "latitude": 31.120672
          },
          {
            "longitude": 121.17432,
            "latitude": 31.117868
          },
          {
            "longitude": 121.174914,
            "latitude": 31.108864
          },
          {
            "longitude": 121.166451,
            "latitude": 31.108317
          },
          {
            "longitude": 121.164649,
            "latitude": 31.100655
          },
          {
            "longitude": 121.154398,
            "latitude": 31.101841
          },
          {
            "longitude": 121.155162,
            "latitude": 31.090471
          },
          {
            "longitude": 121.112591,
            "latitude": 31.111937
          },
          {
            "longitude": 121.105701,
            "latitude": 31.100867
          },
          {
            "longitude": 121.097973,
            "latitude": 31.099334
          },
          {
            "longitude": 121.099508,
            "latitude": 31.08357
          },
          {
            "longitude": 121.118385,
            "latitude": 31.075946
          },
          {
            "longitude": 121.127814,
            "latitude": 31.058916
          },
          {
            "longitude": 121.101816,
            "latitude": 31.057275
          },
          {
            "longitude": 121.101146,
            "latitude": 31.053642
          },
          {
            "longitude": 121.090673,
            "latitude": 31.065035
          },
          {
            "longitude": 121.080967,
            "latitude": 31.056896
          },
          {
            "longitude": 121.096213,
            "latitude": 31.04481
          },
          {
            "longitude": 121.093103,
            "latitude": 31.040714
          },
          {
            "longitude": 121.100285,
            "latitude": 31.033409
          },
          {
            "longitude": 121.096411,
            "latitude": 31.026439
          },
          {
            "longitude": 121.085535,
            "latitude": 31.025499
          },
          {
            "longitude": 121.104208,
            "latitude": 31.007997
          },
          {
            "longitude": 121.099167,
            "latitude": 30.973071
          },
          {
            "longitude": 121.095557,
            "latitude": 30.974246
          },
          {
            "longitude": 121.097491,
            "latitude": 30.965637
          },
          {
            "longitude": 121.068723,
            "latitude": 30.954912
          },
          {
            "longitude": 121.06034,
            "latitude": 30.956515
          },
          {
            "longitude": 121.051029,
            "latitude": 30.969365
          },
          {
            "longitude": 121.043114,
            "latitude": 30.969424
          },
          {
            "longitude": 121.043514,
            "latitude": 30.957512
          },
          {
            "longitude": 121.036251,
            "latitude": 30.957087
          },
          {
            "longitude": 121.03321,
            "latitude": 30.947111
          },
          {
            "longitude": 121.027909,
            "latitude": 30.945832
          },
          {
            "longitude": 121.031853,
            "latitude": 30.939775
          },
          {
            "longitude": 121.025292,
            "latitude": 30.909062
          },
          {
            "longitude": 121.034394,
            "latitude": 30.902731
          },
          {
            "longitude": 121.04033,
            "latitude": 30.904498
          },
          {
            "longitude": 121.042316,
            "latitude": 30.899412
          },
          {
            "longitude": 121.080831,
            "latitude": 30.905951
          },
          {
            "longitude": 121.095141,
            "latitude": 30.902462
          },
          {
            "longitude": 121.098782,
            "latitude": 30.906612
          },
          {
            "longitude": 121.089017,
            "latitude": 30.915296
          },
          {
            "longitude": 121.100396,
            "latitude": 30.926458
          },
          {
            "longitude": 121.105121,
            "latitude": 30.920136
          },
          {
            "longitude": 121.121444,
            "latitude": 30.919964
          },
          {
            "longitude": 121.119715,
            "latitude": 30.910385
          },
          {
            "longitude": 121.110849,
            "latitude": 30.901031
          },
          {
            "longitude": 121.113449,
            "latitude": 30.897425
          },
          {
            "longitude": 121.12354,
            "latitude": 30.902858
          },
          {
            "longitude": 121.141262,
            "latitude": 30.901333
          },
          {
            "longitude": 121.139054,
            "latitude": 30.919609
          },
          {
            "longitude": 121.156644,
            "latitude": 30.909966
          },
          {
            "longitude": 121.158206,
            "latitude": 30.920292
          },
          {
            "longitude": 121.171262,
            "latitude": 30.914683
          },
          {
            "longitude": 121.186474,
            "latitude": 30.915403
          },
          {
            "longitude": 121.211031,
            "latitude": 30.921274
          },
          {
            "longitude": 121.222993,
            "latitude": 30.930755
          },
          {
            "longitude": 121.240653,
            "latitude": 30.925148
          },
          {
            "longitude": 121.246196,
            "latitude": 30.908777
          },
          {
            "longitude": 121.266938,
            "latitude": 30.906263
          },
          {
            "longitude": 121.266164,
            "latitude": 30.901712
          },
          {
            "longitude": 121.272975,
            "latitude": 30.900399
          },
          {
            "longitude": 121.274773,
            "latitude": 30.894821
          },
          {
            "longitude": 121.288409,
            "latitude": 30.896064
          },
          {
            "longitude": 121.289749,
            "latitude": 30.917385
          },
          {
            "longitude": 121.294942,
            "latitude": 30.918509
          },
          {
            "longitude": 121.301777,
            "latitude": 30.908457
          },
          {
            "longitude": 121.306499,
            "latitude": 30.912123
          },
          {
            "longitude": 121.336624,
            "latitude": 30.906744
          },
          {
            "longitude": 121.351547,
            "latitude": 30.912176
          },
          {
            "longitude": 121.356053,
            "latitude": 30.919741
          },
          {
            "longitude": 121.351155,
            "latitude": 30.930631
          },
          {
            "longitude": 121.362663,
            "latitude": 30.934758
          },
          {
            "longitude": 121.361212,
            "latitude": 30.944907
          },
          {
            "longitude": 121.365464,
            "latitude": 30.947227
          },
          {
            "longitude": 121.361101,
            "latitude": 30.972824
          },
          {
            "longitude": 121.358709,
            "latitude": 30.977858
          },
          {
            "longitude": 121.327365,
            "latitude": 30.980658
          },
          {
            "longitude": 121.326768,
            "latitude": 30.994478
          },
          {
            "longitude": 121.344247,
            "latitude": 31.013935
          },
          {
            "longitude": 121.333065,
            "latitude": 31.013338
          },
          {
            "longitude": 121.335725,
            "latitude": 31.062943
          },
          {
            "longitude": 121.343449,
            "latitude": 31.059136
          },
          {
            "longitude": 121.353436,
            "latitude": 31.061286
          },
          {
            "longitude": 121.363746,
            "latitude": 31.068353
          },
          {
            "longitude": 121.365478,
            "latitude": 31.077897
          },
          {
            "longitude": 121.372022,
            "latitude": 31.079873
          },
          {
            "longitude": 121.362757,
            "latitude": 31.099769
          },
          {
            "longitude": 121.351339,
            "latitude": 31.099262
          },
          {
            "longitude": 121.348538,
            "latitude": 31.106661
          },
          {
            "longitude": 121.35688,
            "latitude": 31.111172
          },
          {
            "longitude": 121.323856,
            "latitude": 31.162934
          }
        ],
      	"fillColor": "rgba(253,10,128,0.1)",
		"strokeColor": "rgba(253, 100,128,0.5)",
		"strokeStyle": "solid",
		"strokeWidth": 2,
        zIndex: 0,
      }


    ],
  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})
