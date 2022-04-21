const app = getApp()
let mapCtx = null;
let waitInterval = null;
let _this;
let i = 0;
Page({
  data: {
    longitude: 106.699212,
    latitude: 26.582845,
    markers: [],
    dots:[],
    polyline: [],
  },
  onLoad() {
    mapCtx = wx.createMapContext("map");
    let step = `[{
      "orientation": "东",
      "cost": {
          "duration": "21",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "54",
      "instruction": "向东行驶54米右转",
      "polyline": "106.699206,26.582886;106.699753,26.582908"
  }, {
      "orientation": "南",
      "cost": {
          "duration": "50",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "90",
      "instruction": "向南行驶90米右转",
      "polyline": "106.699753,26.582908;106.699748,26.582174;106.699753,26.582088"
  }, {
      "road_name": "延安西路辅路",
      "orientation": "西",
      "cost": {
          "duration": "65",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "1",
          "tolls": "0"
      },
      "step_distance": "194",
      "instruction": "沿延安西路辅路向西行驶194米左转",
      "polyline": "106.699753,26.582088;106.699622,26.582101;106.699214,26.582079;106.698681,26.582053;106.697795,26.582031"
  }, {
      "road_name": "浣纱路",
      "orientation": "南",
      "cost": {
          "duration": "56",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "450",
      "instruction": "沿浣纱路向南行驶450米靠左沿主路行驶",
      "polyline": "106.697678,26.581736;106.697734,26.581493;106.697865,26.581068;106.697986,26.580699;106.69803,26.580521;106.69809,26.580239;106.698112,26.580122;106.698168,26.57977;106.698207,26.579392;106.698225,26.579201;106.69822,26.578589;106.698234,26.577947;106.698225,26.577695"
  }, {
      "road_name": "浣纱路",
      "orientation": "南",
      "cost": {
          "duration": "49",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "555",
      "instruction": "沿浣纱路向南行驶555米靠左沿主路行驶",
      "polyline": "106.698225,26.577695;106.698203,26.576198;106.698199,26.575924;106.698155,26.573754;106.698129,26.573372;106.698116,26.573229;106.69809,26.572669"
  }, {
      "road_name": "解放路",
      "orientation": "东南",
      "cost": {
          "duration": "117",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "1354",
      "instruction": "沿解放路向东南行驶1.4千米右转",
      "polyline": "106.69809,26.572669;106.69809,26.571788;106.69809,26.571502;106.69809,26.570803;106.69809,26.570729;106.698095,26.569844;106.698099,26.56941;106.698108,26.568424;106.698108,26.56839;106.698112,26.567917;106.698116,26.566762;106.698121,26.565938;106.698168,26.56546;106.698281,26.565169;106.698385,26.564978;106.698411,26.564939;106.698611,26.564688;106.698798,26.564514;106.699154,26.564258;106.699197,26.564206;106.699214,26.564188;106.699358,26.564102;106.699983,26.563728;106.700486,26.563433;106.701454,26.562826;106.70178,26.56263;106.702322,26.562348;106.702431,26.562296"
  }, {
      "road_name": "人民大道辅路",
      "orientation": "西南",
      "cost": {
          "duration": "63",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "823",
      "instruction": "沿人民大道辅路途径人民大道向西南行驶823米向右前方行驶",
      "polyline": "106.702431,26.562296;106.702352,26.562148;106.702279,26.562005;106.702157,26.56181;106.70191,26.561489;106.701523,26.560981;106.701402,26.560799;106.701345,26.560686;106.70125,26.560551;106.70102,26.56023;106.70079,26.559896;106.700087,26.55898;106.699214,26.557839;106.699054,26.557626;106.698524,26.556931;106.698338,26.556706;106.69816,26.556497;106.697977,26.556285;106.697795,26.556124"
  }, {
      "road_name": "三号山立交",
      "orientation": "西南",
      "cost": {
          "duration": "1",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "53",
      "instruction": "沿三号山立交向西南行驶53米靠左",
      "polyline": "106.697795,26.556124;106.697582,26.556029;106.697326,26.55589"
  }, {
      "road_name": "三号山立交",
      "orientation": "西南",
      "cost": {
          "duration": "26",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "220",
      "instruction": "沿三号山立交向西南行驶220米靠右",
      "polyline": "106.697326,26.55589;106.69714,26.555807;106.696619,26.555655;106.696098,26.555503;106.696003,26.555464;106.695911,26.555399;106.695868,26.55536;106.695833,26.555299;106.695812,26.555252;106.695803,26.555148;106.695812,26.555095;106.695833,26.555048;106.695872,26.554961;106.695951,26.554844"
  }, {
      "road_name": "三号山立交",
      "orientation": "东南",
      "cost": {
          "duration": "69",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "1",
          "tolls": "0"
      },
      "step_distance": "293",
      "instruction": "沿三号山立交向东南行驶293米左转",
      "polyline": "106.695951,26.554844;106.696098,26.554644;106.696241,26.554518;106.696359,26.554431;106.696476,26.554319;106.69671,26.554232;106.696836,26.55418;106.69694,26.55411;106.697027,26.554045;106.697109,26.553954;106.697396,26.553615;106.697652,26.553364;106.697817,26.553181;106.698008,26.552986"
  }, {
      "road_name": "玉厂路",
      "orientation": "东北",
      "cost": {
          "duration": "96",
          "toll_road": "",
          "toll_distance": "0",
          "traffic_lights": "0",
          "tolls": "0"
      },
      "step_distance": "509",
      "instruction": "沿玉厂路向东北行驶509米到达目的地",
      "polyline": "106.698247,26.553103;106.698863,26.553694;106.699132,26.553919;106.699175,26.553954;106.699214,26.553984;106.699349,26.554093;106.699813,26.554497;106.700161,26.554783;106.700438,26.555026;106.700872,26.555391;106.700903,26.555451;106.701003,26.555534;106.701181,26.555716;106.701402,26.555968;106.701484,26.556011;106.701593,26.556007;106.701714,26.555977;106.702018,26.555838"
  }]`

    let array = JSON.parse(step);
    let polyline = [];
    array.forEach(function (it) {
      //得到点
      let steps = it.polyline.split(";");
      steps.forEach(function (st) {
        polyline.push({
          longitude: parseFloat(st.split(',')[0]),
          latitude: parseFloat(st.split(',')[1])
        });
      });
    });

    _this = this;
    let markers = [];
    let car = {
      id: 3,
      latitude: _this.data.latitude,
      longitude: _this.data.longitude,
      iconPath: '/images/car.png',
      width: 25,
      height: 40,
      rotate: 0,
      anchor: {
        x: 0.5,
        y: 0.5
      },
      customCallout: {
        anchorY: 0,
        anchorX: 0,
        display: 'ALWAYS',
      },
    }
    markers.push(car);
    _this.setData({
      markers,
      dots:polyline,
      polyline: [{
        points: polyline,
        color: '#0091ff',
        width: 6,
        arrowLine: true
      }]
    });
  
    _this.startx();

  },

  startx: function (params) {
    setInterval(function () {
      let markers=_this.data.markers;
      //运动第一点
      if (i < _this.data.dots.length) {
        let dot = _this.data.dots[i];
        let startPoi = {
          lng: markers[0].longitude,
          lat: markers[0].latitude
        }
        //移动车辆
        markers[0].longitude = dot.longitude;
        markers[0].latitude = dot.latitude;

        let endPoi = {
          lng: markers[0].longitude,
          lat: markers[0].latitude
        }
        //计算角度
        let rotate = _this.getAnglex(startPoi, endPoi);
        rotate = Number(rotate).toFixed(0);
        markers[0].rotate=rotate;
        console.log("车辆当前角度", rotate);
        mapCtx.translateMarker({
          markerId: 3,
          autoRotate:false,
          rotate: rotate,
          duration: 1000,
          destination: {
            latitude: dot.latitude,
            longitude: dot.longitude
          },
          animationEnd() {
            _this.setData({
              markers
            })
          }
        });
      }

      i++;
    }, 3000)
  },

  getAnglex: function (startPoint, endPoint) {
    if (!(startPoint && endPoint)) {
      return 0;
    }
    let dRotateAngle = Math.atan2(
      Math.abs(startPoint.lng - endPoint.lng),
      Math.abs(startPoint.lat - endPoint.lat)
    );
    if (endPoint.lng >= startPoint.lng) {
      if (endPoint.lat >= startPoint.lat) {} else {
        dRotateAngle = Math.PI - dRotateAngle;
      }
    } else {
      if (endPoint.lat >= startPoint.lat) {
        dRotateAngle = 2 * Math.PI - dRotateAngle;
      } else {
        dRotateAngle = Math.PI + dRotateAngle;
      }
    }
    dRotateAngle = (dRotateAngle * 180) / Math.PI;
    return dRotateAngle;
  }

})