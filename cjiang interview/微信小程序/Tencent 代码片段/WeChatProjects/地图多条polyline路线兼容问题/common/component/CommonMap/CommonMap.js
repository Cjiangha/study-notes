import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "CommonMap",
    props: {
      // 是否在图面上展示推荐点
      showRecommendedPoints: {
        type: Boolean,
        default: false,
      },
      // 是否启用推荐点功能，开启后 onLocationChange 回调中会返回 recommendedPoints、isAdsorbed 数据
      // type: 事件触发类型 drag等, spots 推荐点列表；isAdsorbed 是否吸附到推荐点; locationInfo 经纬度等信息；areas 场站数据
      enableRecommendedPoints: {
        type: Boolean,
        default: false,
      },

      /* 隐藏 被吸附点的 名称 */
      hiddenAdsorbedPointName: {
        type: Boolean,
        default: false,
      },

      /** 中心地图Icon */
      showMapCenterIcon: {
        type: Boolean,
        default: false,
      },

      /**中心地图气泡 */
      showMapCenterCallout: {
        type: Boolean,
        default: false,
      },
      //放缩值
      scale: {
        type: Number,
      },
      //旋转值
      rotate: {
        type: Number,
      },
      //地图中心经度
      longitude: {
        type: String,
      },
      //地图中心纬度
      latitude: {
        type: String,
      },
      polygon: {
        //地图多边形
        type: Array,
        default: [],
      },
      polyline: {
        // 线
        type: Array,
        default: [],
      },
      includePoints: {
        //地图缩略图使用点
        type: Array,
        default: [],
      },
      markers: {
        //地图标记点
        type: Array,
        default: [],
      },
    },

    data() {
      return {
        _dragging: false,
        //拖拽中
        setting: Object.freeze({
          //地图基本配置信息
          tiltGesturesEnabled: 0,
          showScale: 0,
          showCompass: 0,
          markerCollision: {
            collisionDistance: 70,
          },
        }),
      };
    },

    methods: {
      /* 取地图缩放 */
      getMapScale() {
        const mapCtx = this.$refs.commonMap.getMapContext();

        if (!mapCtx || !mapCtx.getScale) {
          return Promise.resolve(null);
        }

        return new Promise((resolve) => {
          mapCtx.getScale({
            success({ scale }) {
              resolve(scale);
            },

            fail() {
              resolve(null);
            },
          });
        });
      },

      /* 取地图经纬度 */
      getMapCenterLocation() {
        const mapCtx = this.$refs.commonMap.getMapContext();
        return new Promise((resolve) => {
          mapCtx.getCenterLocation({
            success(res) {
              resolve(res);
            },

            fail() {
              resolve(null);
            },
          });
        });
      },

      /**
       * 地图change事件
       */
      async handleRegionChange(e) {
        let { longitude, latitude, scale } = e || {};
        const { type, causedBy, rotate } = e || {};
        /* 不能判断 causedBy !== update，因为微信在模拟器上返回的update字段写错了，写成了 upudate  */

        if (type === "begin" && causedBy === "gesture") {
          /* 记录是在拖拽中 */
          this._dragging = true;
          this.$emit("onRegionChange", {
            type,
            causedBy,
            longitude,
            latitude,
            scale,
            rotate,
          });
        }

        if (type === "end") {
          if (causedBy !== "update") {
          }

          if (causedBy === "scale") {
            /* 米8在微信 基础库2.12.2上，不会再detail返回 scale!!! 微信的坑 */
            if (!scale) {
              scale = await this.getMapScale();
            }

            if (scale && this.scale !== scale) {
              this.$emit("onRegionChange", {
                type,
                causedBy,
                longitude,
                latitude,
                scale,
                rotate,
              });
            }
          }

          if (causedBy === "rotate" && this.rotate !== rotate) {
            this.$emit("onRegionChange", {
              type,
              causedBy,
              longitude,
              latitude,
              scale,
              rotate,
            });
          }
          /* 
          1、拖拽结束后触发 
          2、缩放结束否触发（case：缩放后结束后，立即拖拽，causedBy会是scale，但是经纬度不同，所有要触发并比较经纬度，确定是否触发change。）
          注：为什么causedBy会是scale？因为上面缩放结束后设置了this.scale = scale，导致causedBy变成了scale，不清楚具体原因，把this.scale = scale改成异步执行也没用
        */

          let isFastManyTimesScale = false;
          let isMi8Drap = false;

          /* 快速多次缩放后 拖拽 causedBy 为 scale 微信的坑 ！！！ 对应是哪个的 第2项 */
          isFastManyTimesScale = causedBy === "scale" && this.scale === scale;
          /* 米8在微信 基础库2.12.2上，拖拽结束时，causedBy是update！！！微信的坑，用_dragging标识为拖拽 */

          isMi8Drap = causedBy === "update" && this._dragging;

          if (causedBy === "drag" || isFastManyTimesScale || isMi8Drap) {
            /* 记录是在拖拽结束 */
            this._dragging = false;
            /* 米8在微信 基础库2.12.2上，不会再detail返回 经纬度!!! 微信的坑 */

            if (!longitude || !latitude) {
              const locaRes = await this.getMapCenterLocation();

              if (locaRes) {
                longitude = locaRes.longitude;
                latitude = locaRes.latitude;
              }
            }

            this.$emit("onRegionChange", {
              type,
              causedBy: "drag",
              longitude,
              latitude,
              scale,
              rotate,
            });
          }
        }
      },

      /**
       * 处理点击marker的逻辑
       * @param {*} e 点击marker后获取到的marker实例
       */
      handleClickMarker(e) {
        this.$emit("onMarkerTap", e);
      },

      /**
       * 处理点击marker气泡的逻辑
       * @param {*} e 点击marker后获取到的marker实例
       */
      handleClickCallout(e) {
        this.$emit("onCalloutTap", e);
      },
    },
    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["handleClickMarker_custHd_1"] = function (e) {
    this.handleClickMarker(...e.detail.$event);
  };

  opts.methods["handleClickCallout_custHd_2"] = function (e) {
    this.handleClickCallout(...e.detail.$event);
  };

  opts.methods["handleRegionChange_custHd_3"] = function (e) {
    this.handleRegionChange(...e.detail.$event);
  };

  opts.methods["_saveRef1"] = function (ref) {
    if (!this.$refs) {
      this.$refs = {};
    }
    ref = ref.detail[0];
    this.$refs["commonMap"] = ref.$anyui;
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "setting",
    "scale",
    "rotate",
    "longitude",
    "latitude",
    "markers",
    "polygon",
    "polyline",
    "includePoints",
    "showMapCenterIcon",
    "showMapCenterCallout",
    "__slotObj",
  ];
  return opts;
}
