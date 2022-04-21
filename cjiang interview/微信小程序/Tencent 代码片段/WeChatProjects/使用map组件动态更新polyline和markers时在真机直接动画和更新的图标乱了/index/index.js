// pages/trackMap/trackMap.js
//获取应用实例
const app = getApp()
// const WXBizDataCrypt = require('../../utils/crpty/WXBizDataCrypt'); 

Page({
  data: {
    points: [],
    markers: [{
      longitude: 117.671485,
      latitude: 36.211435,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 1
    }, {
      longitude: 117.672252,
      latitude: 36.212424,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 2
    }, {
      longitude: 117.673567,
      latitude: 36.214639,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 3
    }, {
      longitude: 117.673937,
      latitude: 36.219039,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 4
    }, {
      longitude: 117.673784,
      latitude: 36.220564,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 5
    }, {
      longitude: 117.670323,
      latitude: 36.220491,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 6
    }, {
      longitude: 117.671626,
      latitude: 36.218369,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 7
    }, {
      longitude: 117.670374,
      latitude: 36.214969,
      iconPath: '../imgs/ico_address.png',
      width: '40rpx',
      height: '40rpx',
      id: 8
    }], // 标记点集合
    polyline: [], // 坐标点集合
    satellite: false, // 是否开启卫星图
    building: false, // 是否显示建筑物
    zoom: false, // 是否支持缩放
    scroll: false, // 是否支拖动
    poi: false, // 是否展示 POI 点
    longitude: 117.672073, // 中心经度
    latitude: 36.216638, //  中心纬度
    i: 0, // 用于循环
  },
  onReady: function () {
    this.mapCtx = wx.createMapContext('map'); // 创建 map 上下文 MapContext 对象
  },
  onLoad: function () {
    wx.startLocationUpdate();
    let that = this;
    wx.onLocationChange(function (res) {
      // 坐标集合
      let points = [{
        longitude: 117.671485,
        latitude: 36.211435
      }, {
        longitude: 117.672252,
        latitude: 36.212424
      }, {
        longitude: 117.673567,
        latitude: 36.214639
      }, {
        longitude: 117.673937,
        latitude: 36.219039
      }, {
        longitude: 117.673784,
        latitude: 36.220564
      }, {
        longitude: 117.670323,
        latitude: 36.220491
      }, {
        longitude: 117.671626,
        latitude: 36.218369
      }, {
        longitude: 117.670374,
        latitude: 36.214969
      }, {
        longitude: 117.671485,
        latitude: 36.211435
      }];
      // 标记点集合
      let markers = points;
      markers.map((value, index) => {
        markers[index].id = index + 1;
        markers[index].iconPath = '../imgs/ico_address.png';
        markers[index].width = '40rpx';
        markers[index].height = '40rpx';
      });
      that.setData({
        polyline: [{
          points: [],
          color: "#FF0000DD",
          width: 4,
          dottedLine: true
        }],
      });
      that.translateMarker(markers);
    })
  },
  // 平移marker，带动画
  translateMarker: function (markers) {
    let that = this;
    let markerId = that.data.markers[that.data.i].id;
    let destination = {
      longitude: markers[that.data.i + 1].longitude,
      latitude: markers[that.data.i + 1].latitude
    };
    let getDistance = that.getDistance(markers[that.data.i].latitude, markers[that.data.i].longitude, markers[that.data.i + 1].latitude, markers[that.data.i + 1].longitude);
    let duration = getDistance * 10; // 根据距离计算平移的速度，看起来保持匀速
    let arr = that.data.points;
    let markersCop = markers;
    markersCop[that.data.i].iconPath = '../imgs/ico_zan.png';
    arr.push(markers[that.data.i]);
    that.setData({
      markers: markersCop,
      polyline: [{
        points: (arr.length > 1) ? arr : [],
        color: "#FF0000DD",
        width: 4,
        dottedLine: true
      }]
    })
    this.mapCtx.translateMarker({
      markerId: markerId,
      destination: destination,
      autoRotate: true,
      rotate: 30,
      duration: duration,
      success(res) {
        that.setData({
          points: arr,
          i: that.data.i + 1,
        });
        // 小于长度减1才执行
        if (that.data.i < markers.length - 1) {
          that.translateMarker(markers);
        } else {
          let arr = that.data.points;
          markersCop[markers.length - 1].iconPath = '../imgs/ico_zan.png';
          arr.push(markers[0]);
          that.setData({
            markers: markersCop,
            points: arr,
            polyline: [{
              points: arr,
              color: "#FF0000DD",
              width: 4,
              dottedLine: true
            }]
          });
          console.log(that.data.markers)
        }
      },
      fail(err) {
        console.log('fail', err)
      }
    });

  },
  // 计算两坐标点之间的距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    let rad1 = lat1 * Math.PI / 180.0;
    let rad2 = lat2 * Math.PI / 180.0;
    let a = rad1 - rad2;
    let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    let r = 6378137;
    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
  }
})
