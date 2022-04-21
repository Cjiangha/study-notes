import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_createMapContext from '@alife/anyui-wx-api/lib/createMapContext.js';
anyui._wrapApi('createMapContext', _a_u_createMapContext)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

import { mapCache } from "../../../cache/Cache.js";
import { WX_MAP_SUBKEY } from "../../../dataConfig";
createComponent(
  createOptions({
    name: "CustomizeMap",
    props: {
      // 在华为P40上 跳入页面会一闪而过一个滚动条 https://work.aone.alibaba-inc.com/issue/35543946
      hideScrollStyle: {
        type: Boolean,
        default: false,
      },
      // 是否展示 map 中心点扎标
      showMapCenterIcon: {
        type: Boolean,
        default: false,
      },
      // 是否展示 map 中心点气泡
      showMapCenterCallout: {
        type: Boolean,
        default: false,
      },
      // 是否开启定位并展示定位点
      showLocation: {
        type: Boolean,
        default: false,
      },
      // map唯一ID
      id: {
        type: String,
        require: true,
      },
      // map设置
      setting: {
        type: Object,
      },
      // 经度
      longitude: {
        type: String,
      },
      // 纬度
      latitude: {
        type: String,
      },
      // 比例尺
      scale: {
        type: String,
        default: "",
      },
      // 顺时针旋转的角度，范围 0 ~ 360，默认为 0。
      rotate: {
        type: Number,
        default: 0,
      },
      // 视野将进行小范围延伸包含传入的坐标
      includePoints: {
        type: Array,
      },
      // 视野在地图 padding 范围内展示
      includePadding: {
        type: Object,
      },
      // marker：推荐点、小车、起终点等
      markers: {
        type: Array,
        default: () => {
          return [];
        },
      },
      // 线： 行程
      polyline: {
        type: Array,
      },
      // 图形： 场站
      polygon: {
        type: Array,
      },
    },
    computed: {},
    watch: {
      markers: {
        deep: true,
        immediate: true,

        handler(markers) {
          // 排除特殊情况
          if (!markers || !markers.length) {
            this.mapMarkers = [];
            this.customizeMarkerData = {};
            return;
          }

          // 处理微信自定义渲染marker的数据
          const { _mapMarkers, _customizeMarkerData } =
            this.processMarkersArrFn(markers);
          this.mapMarkers = _mapMarkers;
          this.customizeMarkerData = _customizeMarkerData;
        },
      },
    },
    data: {
      subkey: WX_MAP_SUBKEY,
      // 微信地图需要的key
      mapMarkers: [],
      // 地图的marker
      // 微信高阶自定义气泡数：目前共5种 { [type1]: [{markeriD, ...}, {markeriD, ...}, ...]}
      customizeMarkerData: {},
    },
    methods: {
      /** 对外方法：获取地图实例 */
      getMapContext() {
        if (!this.mapCtx) {
          // TODO: 临时方案：anyui中微信用ref, ref没取到再使用createMapContext， @易凯 后续会统一处理
          if (
            this.$refs &&
            this.$refs.myMap &&
            this.$refs.myMap.getMapContext
          ) {
            this.mapCtx = this.$refs.myMap.getMapContext();
          } else {
            this.mapCtx = anyui.createMapContext(`${this.id}`);
          }
        }

        return this.mapCtx;
      },

      /**
       * 对外方法：回到当前位置
       */
      moveToLocation() {
        const ctx = this.getMapContext();
        ctx.moveToLocation();
      },

      /**
       * 处理地图
       */
      handleRegionchange(e) {
        this.$emit("onRegionChange", e);
      },

      /**
       * 处理点击气泡的事件
       */
      handleCallouttap(e) {
        //微信地图marker上盖有view，点击事件同时相应解决处理,bug号：31658893
        if (!mapCache.get()) {
          this.$emit("onCalloutTap", e);
        }

        mapCache.set(false);
      },

      /**
       * 处理点击marker的事件
       */
      handleMarkertap(e) {
        console.log(e);
        this.$emit("onMarkerTap", e);
      },

      /**
       * 微信小程序中，将marker中的自定义渲染数据剥离
       */
      processMarkersArrFn(markers = []) {
        const _customizeMarkerData = {
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          "intercity-cp": [],
          "online-modify-location": [],
          "online-modify-location-tip": [],
        };
        const _mapMarkers = [];
        markers.forEach((marker) => {
          const { customizeParams, ..._marker } = marker; // customizeType 微信的自定义渲染模板：https://yuque.antfin-inc.com/sharedtrip/dhqg09/rfgh6h

          const customizeType =
            customizeParams && customizeParams.customizeType;

          switch (customizeType) {
            case 1:
              _customizeMarkerData[1].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case 2:
              _customizeMarkerData[2].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case 3:
              _customizeMarkerData[3].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case 4:
              _customizeMarkerData[4].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case 5:
              _customizeMarkerData[5].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case 6:
              _customizeMarkerData[6].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case 7:
              _customizeMarkerData[7].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case "intercity-cp":
              _customizeMarkerData["intercity-cp"].push(customizeParams);

              _mapMarkers.push(_marker);

              break;

            case "online-modify-location":
              _customizeMarkerData["online-modify-location"].push(
                customizeParams
              );

              _mapMarkers.push(_marker);

              break;

            case "online-modify-location-tip":
              _customizeMarkerData["online-modify-location-tip"].push(
                customizeParams
              );

              _mapMarkers.push(_marker);

              break;

            default:
              _mapMarkers.push(marker);
          }
        });
        return {
          _mapMarkers,
          _customizeMarkerData,
        };
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods["_saveRef1"] = function (ref) {
    if (!this.$refs) {
      this.$refs = {};
    }
    ref = ref.detail[0];
    this.$refs["myMap"] = ref.$anyui;
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "hideScrollStyle",
    "__ready__",
    "proputil",
    "id",
    "setting",
    "longitude",
    "latitude",
    "scale",
    "rotate",
    "mapMarkers",
    "polyline",
    "polygon",
    "includePoints",
    "includePadding",
    "showLocation",
    "subkey",
    "customizeMarkerData",
    "showMapCenterCallout",
    "showMapCenterIcon",
  ];
  return opts;
}
