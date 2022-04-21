import { createComponent } from "@alife/anyui-wx-framework/index.js";

import * as lodash from "../../tool/lodashUtil";
import * as mapUtils from "../CustomizeMap/mapUtils";
import { locationPinInfoCache } from "../../cache/Cache";

/** 默认缩放值 */

let DEFAULT_SCALE = 16.8; // 微信

createComponent(
  createOptions({
    name: "SelectLocationMap",
    props: {
      // 是否在图面上展示中心点气泡
      showMapCenterCallout: {
        type: Boolean,
        default: true,
      },
      // 是否在图面上展示推荐点
      showRecommendedPoints: {
        type: Boolean,
        default: false,
      },
      // 是否在图面上展示附近的小车
      showNearbyCars: {
        type: Boolean,
        default: false,
      },
      // 是否启用推荐点功能，开启后 onLocationChange 回调中会返回 recommendedPoints、isAdsorbed 数据
      // type: 事件触发类型 drag等, spots 推荐点列表；isAdsorbed 是否吸附到推荐点; locationInfo 经纬度等信息；areas 场站数据
      enableRecommendedPoints: {
        type: Boolean,
        default: false,
      },

      /* 页面来源 key */
      pageKey: {
        type: String,
        default: "",
      },

      /* 隐藏 被吸附点的 名称 */
      hiddenAdsorbedPointName: {
        type: Boolean,
        default: false,
      },

      /* 场站选择弹层 默认处于第几层 */
      stationPopDefaultStep: {
        type: String,
        default: "",
      },

      /* 推荐点吸附的距离  */
      adsorbDistance: {
        type: Number,
        default: 10, // 米
      },
      // 是否是助老模式
      isShowAssistOld: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        setting: Object.freeze({
          // trafficEnabled: 1,
          tiltGesturesEnabled: 0,
          showScale: 0,
          showCompass: 0,
          markerCollision: {
            collisionDistance: 70,
          },
        }),
        mapData: {
          longitude: "",
          latitude: "",
          scale: DEFAULT_SCALE,
          rotate: 0,
        },
        recommendedPoints: [],
        // 推荐上车点
        polygon: null,
        // 场站图形
        includePoints: [],
        // 全览区域
        nearbyCars: [],
        // 附近的车辆
        triggerType: '',
        // 默认是未知，对应的拖拽、我的位置，会手动设置
        isShowStationPop: true,
        // 是否显示场站选择弹层
        pickupSpotsData: {
          // 推荐点接口返回的数据
          areas: [],
          // 场站信息
          spots: [], // 推荐点数据
        },
        selectedSpot: {},
        // 用户选择的点，可能是推荐点，也可能是用户自主选择的点
        defaultStationSubAreaId: "",
        // 场站弹层第一层id
        canShowControlAreaPop: true, // 是否允许展示弹层
      };
    },

    created() {
      
    },

    computed: {
      markers() {
        // 根据 showRecommendedPoints 判断是否在图面上展示推荐点
        let recommendedPoints = this.showRecommendedPoints
          ? this.recommendedPoints
          : [];
        /* 处理微信下推荐点的显示和隐藏 */

        recommendedPoints = recommendedPoints.filter((v) => !v.hide);
        /* 处理隐藏 吸附点 隐藏 lable文案 */

        if (this.hiddenAdsorbedPointName) {
          recommendedPoints = mapUtils.getHiddenTextPoints(recommendedPoints);
        } // 根据 showNearbyCars 判断是否在图面上展示附近的小车

        const nearbyCars = this.showNearbyCars ? this.nearbyCars : [];
        return [...recommendedPoints, ...nearbyCars];
      },

      // 区域线 管制区域实现虚线边框
      polyline() {
        if (this.pickupSpotsData.controlAreaMatch) {
          return mapUtils.polygonToPolylineFn(this.polygon, {
            color: "#FF993B",
          });
        }

        return null;
      },
    },
    watch: {
      "pickupSpotsData.areas": {
        immediate: true,

        handler(val) {
          const boo = Boolean(val && val.length);
          this.isShowStationPop = boo;
        },
      },
    },
    methods: {
      // 设置全览区域
      async includePointsFn(points) {
        this.includePoints = []; // 清空includePoints，否则再次设置时，不起作用

        this.$nextTick(() => {
          // 太恶心了
          this.includePoints = mapUtils.processIncludePointsFn(points);
        });
        await new Promise((reslove) => {
          setTimeout(reslove, 1000);
        });
        /* 这里拿到缩放值不能直接 */

        const scale = await this.getMapScale();
        this.includePoints = [];

        if (scale) {
          return scale < 13 ? 13 : scale;
        }

        return "";
      },

      /* 校验是否是场站区域 */
      checkIsStationArea() {
        return Boolean(
          this.pickupSpotsData &&
            this.pickupSpotsData.areas &&
            this.pickupSpotsData.areas.length
        );
      },

      /* 校验当前点是否是管制区域 */
      checkIscontrolArea() {
        return Boolean(
          this.pickupSpotsData &&
            this.pickupSpotsData.controlAreaMatch &&
            this.pickupSpotsData.controlArea
        );
      },

      /* 展示场站区域弹层 */
      showStationPop() {
        /* 场站显示时 */
        this.$emit("onStationPopShow");
        this.isShowStationPop = true;
      },

      handleCloseStation() {
        this.isShowStationPop = false;
      },

      emitLocationChange(data) {
        this.selectedSpot = data.locationInfo;
        this.$emit("onLocationChange", {
          ...data,

          /* pickupSpotsData 主要是给 起点确认页使用 */
          pickupSpotsData: {
            subAreaId: data.subAreaId,
            // 场站第一层选中的 楼层id
            lon: data && data.locationInfo ? data.locationInfo.lon : "",
            // 当前位置
            lat: data && data.locationInfo ? data.locationInfo.lat : "",
            // 当前位置
            data: lodash.cloneDeep(this.pickupSpotsData), // 推荐点接口数据 需要缓存起来
          },
        });
      },

      /**
       * 图面初始化：移动到当前位置触发change 、添加小车 、添加推荐点
       */
      init(location) {
        
      },

      /* 起点确认页 初始化渲染点 */
      async confirmationPageInit(location, pickupData) {
        const { longitude, latitude, id } = location;
        let pickupSpotsData = lodash.get(pickupData, "data", null);
        const lon = lodash.get(pickupData, "lon");
        const lat = lodash.get(pickupData, "lat");
        this.canShowControlAreaPop = false; // 起点确认页，初始时置位false

        this.defaultStationSubAreaId = lodash.get(pickupData, "subAreaId", "");
        /* 如果没有传推荐点数据 或 两边起点不一致 则重新请求渲染 */

        if (
          !pickupSpotsData ||
          Number(lon) !== Number(longitude) ||
          Number(lat) !== Number(latitude)
        ) {
          const { positionSource } = locationPinInfoCache.get() || {};
          this.setTriggerType(positionSource);
          pickupSpotsData = await this.getPickupSpotsPromise({
            longitude,
            latitude,
          });
          /* TODO: 起点确认页也需要 判断管制区域 */
        }

        this.pickupSpotsData = pickupSpotsData; // eslint-disable-next-line prefer-const

        let { spots = [], controlAreaMatch, controlArea } = pickupSpotsData;
        /* 如果是管制区域，则用 controlArea 渲染 */

        if (controlAreaMatch && controlArea) {
          spots = controlArea.pickupSpots || [];
          this.polygon = this.processControlAreaPolygon(controlArea.areaShape);
        }

        if (id) {
          // 如果有推荐点id 记录吸附的推荐点
          this.selectedSpot = spots.find((v) => v.id === id);
        }

        if (!this.selectedSpot.areaId) {
          // 不是场站则手动绘制推荐点 场站弹层show默认会绘制推荐点
          this.recommendedPoints = this.getProcessedPoints(
            spots,
            DEFAULT_SCALE
          );
        }

        this.moveTo({
          longitude,
          latitude,
        });
      },

      /**
       * 对外方法，移动图面方法，(longitude, latitude 为空，移到到当前位置)
       * @param {*} longitude 经度
       * @param {*} latitude 纬度
       */
      moveTo({ longitude, latitude, scale } = {}) {
        /* 1、移动到当前位置 */
        if (longitude && latitude) {
          this.setMapData({
            longitude,
            latitude,
            scale,
          });
        } else {
          this.setTriggerType('');
          this.moveToLocation();
          /* 回到当前位置时，如果未传入 scale，则方法到16 */

          this.setMapData({
            scale: scale || DEFAULT_SCALE,
          });
        }
      },

      /** 移动到当前位置，并触发推荐点吸附 */
      moveToLocation(obj) {
        const mapCtx = this.$refs.map.getMapContext();

        if (mapCtx) {
          mapCtx.moveToLocation(obj);
        }
      },

      /* 重新定位并请求推荐点 */
      async reRequestLocationSpot() {
      },

      /**
       * 移动到指定位置(longitude, latitude 为空，移到到当前位置)且 触发regionChange
       * 如果params中forceUpdate存在，需要将推荐数据清空，重新请求服务端接口去吸附
       */
      async moveToAndChange(params) {
        // eslint-disable-next-line prefer-const
        let {
          longitude,
          latitude,
          scale,
          poiId,
          positionSource,
          forceUpdate = false,
        } = params || {};

        if (
          Number(this.mapData.longitude) === Number(longitude) &&
          Number(this.mapData.latitude) === Number(latitude)
        ) {
          return;
        } else if (positionSource !== undefined) {
          // 触发来源
          this.setTriggerType(positionSource);
        } else if (poiId) {
          // TODO: 目前搜索时会传poiId, 其他环境不确定
        }

        if (longitude && latitude) {
          this.setMapData({
            longitude,
            latitude,
            scale,
          });

          if (forceUpdate) {
            this.recommendedPoints = [];
          }

          await this.regionChangeFun({
            latitude,
            longitude,
            poiId,
          });
          /* 加延迟，给数据渲染到dom上一点时间，让子弹飞一会... */

          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      },

      /** 设置mapdata: longitude, latitude, scale, rotate */
      setMapData({ longitude, latitude, scale, rotate } = {}) {
        longitude = Number(longitude);
        latitude = Number(latitude);

        if (longitude && latitude) {
          this.mapData.longitude = longitude;
          this.mapData.latitude = latitude;
        }

        if (scale) {
          this.mapData.scale = scale;
        }

        if (rotate) {
          this.mapData.rotate = rotate;
        }
      },

      /** 强制设置渲染缩放值，当mapData的值和地图里的值无法对应时，可以尝试这个方式， scale = 类型为 number */
      forceSetScale(scale) {
        if (!scale) {
          return;
        }

        if (typeof this.mapData.scale === "string") {
          this.mapData.scale = scale;
        } else {
          this.mapData.scale = scale.toString();
        }
      },

      /** 恢复默认缩放 对外 页面onShow调用 */
      resetMapScale() {
        if (this.checkIsStationArea()) {
          return;
        }

        this.mapData.scale = DEFAULT_SCALE;
      },

      /**
       * 监听场站区域和推荐点选择
       * spot 选中的推荐点
       * newSpots 新推荐点数据
       * newSubArea 新子场站数据
       * forceRender 强制渲染刷新推荐点 代表场站第一次渲染
       * subAreaId 场站第一层 选中的 subAreaId
       */
      async handleAreaChange({
        spot,
        newSpots,
        newSubArea,
        forceRender,
        subAreaId,
      }) {
        if (!spot) {
          return;
        }
        /* 处理场站区域 */

        if (newSubArea) {
          this.polygon = mapUtils.processPolygonFn(
            newSubArea ? [newSubArea] : []
          );
        } else {
          /* 缩放到正常 */
          this.setMapData({
            scale: DEFAULT_SCALE,
          });
        }

        let scale;

        if (forceRender) {
          this.recommendedPoints = this.getProcessedPoints(
            newSpots,
            DEFAULT_SCALE
          );
          scale = await this.includePointsFn(
            lodash.get(this.polygon, "[0].points"),
            []
          );
        } else {
          /** 处理推荐点的权重 */
          const index = this.recommendedPoints.findIndex(
            (v) =>
              Number(v.longitude) === Number(spot.lon) &&
              Number(v.latitude) === Number(spot.lat)
          );

          if (index > -1) {
            this.recommendedPoints = mapUtils.getProcessedRankPoints(
              this.recommendedPoints,
              index,
              true,
              this.mapData.scale
            );
          } else if (newSpots) {
            this.recommendedPoints = this.getProcessedPoints(
              newSpots,
              DEFAULT_SCALE
            );
          }
        }
        /* 移动到推荐点 */

        this.moveTo({
          longitude: spot.lon,
          latitude: spot.lat,
        });
        /* 强制设缩放值需要在 设置经纬度后面 */

        scale && this.forceSetScale(scale);
        /* 更新小车 */

        this.updateNearbyCarsAsync({
          longitude: spot.lon,
          latitude: spot.lat,
          name: spot.name,
        });
        this.emitLocationChange({
          subAreaId,
          locationInfo: {
            ...spot,
            lon: spot.lon,
            lat: spot.lat,
            name: spot.name,
            id: spot.id,
            parentId: newSubArea ? newSubArea.parentId : "",
          },
          isAdsorbed: true,
        });
      },

      /**
       * 手动渲染推荐点 外部使用
       */
      renderSpots(spots) {
        /* 渲染默认推荐点 */

        if (spots && spots.length) {
          // 存到缓存，保持推荐点数据内容统一
          this.pickupSpotsData = {
            spots,
          };
          this.recommendedPoints = mapUtils.processRecommendMarkerFn(
            spots,
            SPOT_ID_PREFIX
          );
        }
      },

      /* 过去地图缩放 */
      getMapScale() {
        const mapCtx = this.$refs.map.getMapContext();

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

      /* 过去地图经纬度 */
      getMapCenterLocation() {
        const mapCtx = this.$refs.map.getMapContext();
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

      /* 获取推荐点，格式化参数 */

      /**
       * @description 新拉取数据后，处理推荐点 格式化参数
       * @param {any[]} spots 接口返回的推荐点
       * @param {number?} scale 当前的缩放
       * @return {any[]}
       */
      getProcessedPoints(spots, scale) {
        return mapUtils.getProcessedPoints(
          spots,
          SPOT_ID_PREFIX,
          scale || this.mapData.scale
        );
      },

      /**
       * 处理地图区域变化时的回调
       */
      // eslint-disable-next-line complexity
      async handleRegionChange(e) {
        // eslint-disable-next-line prefer-const
        let { type, causedBy, longitude, latitude, scale, rotate } = e || {};
        /* 不能判断 causedBy === update，因为微信在模拟器上返回的update字段写错了，写成了 upudate  */

        if (type === "begin" && causedBy === "gesture") {
          /* 记录是在拖拽中 */
          this._dragging = true;
        }

        if (type === "end") {
          if (causedBy !== "update") {
          }

          if (causedBy === "scale") {
            /* 米8在微信 基础库2.12.2上，不会再detail返回 scale!!! 微信的坑 */
            if (!scale) {
              scale = await this.getMapScale();
            }

            if (scale && this.mapData.scale !== scale) {
              /* 更新vue中scale数据 */
              this.mapData.scale = scale;
              /* 处理微信下推荐点碰撞逻辑 */

              this.recommendedPoints = mapUtils.getProcessedScalePointsForWx(
                this.recommendedPoints,
                scale
              );
              return;
            }
          }

          if (causedBy === "rotate" && this.mapData.rotate !== rotate) {
            /* 更新vue中rotate数据 */
            this.mapData.rotate = rotate;
          }
          /* 
          1、拖拽结束后触发 
          2、缩放结束否触发（case：缩放后结束后，立即拖拽，causedBy会是scale，但是经纬度不同，所有要触发并比较经纬度，确定是否触发change。）
          注：为什么causedBy会是scale？因为上面缩放结束后设置了this.mapData.scale = scale，导致causedBy变成了scale，不清楚具体原因，把this.mapData.scale = scale改成异步执行也没用
        */

          let isFastManyTimesScale = false;
          let isMi8Drap = false;

          /* 快速多次缩放后 拖拽 causedBy 为 scale 微信的坑 ！！！ 对应是哪个的 第2项 */
          isFastManyTimesScale =
            causedBy === "scale" && this.mapData.scale === scale;
          /* 米8在微信 基础库2.12.2上，拖拽结束时，causedBy是update！！！微信的坑，用_dragging标识为拖拽 */

          if (causedBy === "drag" || isFastManyTimesScale || isMi8Drap) {
            /* 记录是在拖拽结束 */
            this._dragging = false;
            /* 米8在微信 基础库2.12.2上，不会再detail返回 经纬度!!! 微信的坑 */

            if (!longitude || !latitude) {
              const locaRes = await this.getMapCenterLocation();

              if (locaRes) {
                longitude = locaRes.longitude;
                latitude = locaRes.latitude;
              } // console.log('scale', scale);
            }
            /* 当经纬度相同 不在此触发吸附 */

            if (
              mapUtils.isAlmostSame(this.mapData.latitude, latitude) &&
              mapUtils.isAlmostSame(this.mapData.longitude, longitude)
            ) {
              return;
            }

            this.setMapData({
              longitude,
              latitude,
            });
            this.regionChangeWithDebounce({
              causedBy: "drag",
              latitude,
              longitude,
            });
          }
        }
      },

      /**
       * 位置改变获取推荐点，处理吸附
       * @param {*} { causedBy, longitude, latitude} 经纬度，手势类型
       **/
      async regionChangeFun({
        causedBy,
        longitude = "",
        latitude = "",
        poiId,
      } = {}) {
        if (!longitude && !latitude) {
          return;
        }
        /* 如果未开启推荐不执行后续逻辑，直接触发change事件 */

        if (!this.enableRecommendedPoints) {
          this.emitLocationChange({
            causedBy,
            locationInfo: {
              lon: longitude,
              lat: latitude,
            },
          });
          return;
        }
        /*
         *  flag-1：为每次change添加唯一标识 flag;
         *  目的：最后一次接口可能比上次慢，造成显示不准
         *  为什么 debounce？当 drag-end-drag；drag时间较长，end可能会触发
         */

        this.changeFlag = 1 + (this.changeFlag || 0);
        /* flag-2：缓存最后一次执行的 flag */

        const nowChangeFlag = this.changeFlag;
        let adsorbResult = {};
        let newAreas = []; // 场站数据

        let isNewPoints = false; // 是否是接口请求的
        // console.log('this.recommendedPoints', this.recommendedPoints);

        /* 1、如果推荐点已存在 先尝试做吸附 */

        if (this.recommendedPoints.length > 0) {
          /* 如果有管制区域 则处理管制区域的吸附 */
          if (this.pickupSpotsData.controlAreaMatch) {
            /* inControlArea 判断 是否在管制区域内*/
            const inControlArea = mapUtils.checkPointInPolygon(
              [longitude, latitude],
              this.polygon || []
            );

            if (inControlArea) {
              adsorbResult = this.getControlAreaAdsorbResult({
                longitude,
                latitude,
                controlArea: this.pickupSpotsData.controlArea,
                recommendedPoints: this.recommendedPoints,
              });
            }
          } else {
            adsorbResult = this.getAdsorbResult({
              spotsData: this.pickupSpotsData,
              longitude,
              latitude,
              recommendedPoints: this.recommendedPoints,
              polygon: this.polygon,
            });
          }
        }
        /* 2、当前无推荐点，或者当前推荐点吸附不了，触发接口拉去新推荐点  */

        if (!adsorbResult.isAdsorbed) {
          // 缓存最新的推荐点数据
          const spotsData = await this.getPickupSpotsPromise({
            longitude,
            latitude,
            poiId,
          });
          /* flag-3：比较当前是否是最后一次，如果不是，return */

          /* _dragging：如果是拖拽中，也return */

          if (nowChangeFlag !== this.changeFlag || this._dragging) {
            return;
          }

          this.pickupSpotsData = spotsData;
          isNewPoints = true;
          /* 如果是管制区域 则处理管制区域的吸附 */

          if (this.pickupSpotsData.controlAreaMatch) {
            const controlArea = this.pickupSpotsData.controlArea || {};
            this.polygon = this.processControlAreaPolygon(
              controlArea.areaShape
            );
            adsorbResult = this.getControlAreaAdsorbResult({
              longitude,
              latitude,
              controlArea,
              recommendedPoints: this.getProcessedPoints(
                controlArea.pickupSpots || []
              ),
              isNewPoints,
            });
          } else {
            // eslint-disable-next-line prefer-const
            let { spots = [], areas = [] } = this.pickupSpotsData; // 刷新场站图形

            newAreas = areas;
            this.polygon = mapUtils.processPolygonFn(
              areas[0] ? [areas[0]] : []
            );
            /* 当有场站数据时，只显示 当前场站的推荐点数据 */

            if (areas[0] && areas[0].areaId) {
              spots = spots.filter((v) => v.areaId === areas[0].areaId);
            }

            adsorbResult = this.getAdsorbResult({
              spotsData: this.pickupSpotsData,
              longitude,
              latitude,
              recommendedPoints: this.getProcessedPoints(spots),
              isNewPoints,
              // 是否是最新接口拉去的推荐点
              polygon: this.polygon,
            });
          }
        }

        try {
        } catch (error) {
          // eslint-disable-next-line no-empty
        }
        /* flag-3：比较当前是否是最后一次，如果不是，return */

        /* _dragging：如果是拖拽中，也return */

        if (nowChangeFlag !== this.changeFlag || this._dragging) {
          return;
        }

        if (newAreas.length > 0) {
          // 刷新场站图形
          this.polygon = mapUtils.processPolygonFn([newAreas[0]]);
        }
        /* 拿到吸附结果，开始处理 */

        const { isAdsorbed, locationInfo, recommendedPoints, spots } =
          adsorbResult;

        if (isAdsorbed) {
          /* 移动到推荐点位置 */
          this.$nextTick(() => {
            this.setMapData({
              longitude: locationInfo.lon,
              latitude: locationInfo.lat,
            });
          });
        } // 更新图面上的推荐点

        this.recommendedPoints = recommendedPoints; // 异步更新图面上小车数据

        this.updateNearbyCarsAsync({
          longitude: locationInfo.lon,
          latitude: locationInfo.lat,
          name: locationInfo.name,
        }); // 触发 onLocationChange 事件

        this.emitLocationChange({
          causedBy,
          locationInfo,
          isAdsorbed,
          areas: newAreas,
          spots,
        });
      },

      regionChangeWithDebounce: lodash.debounce(function (...args) {
        this.regionChangeFun(...args);
      }, 150),

      /**
       * 处理吸附逻辑，获取吸附结果：
       *  1.判断是否吸附
       *  2.吸附、不吸附分别做一些事情
       *  3.返回最后的地址信息、推荐点
       * @param {*} spotsData 处理过的推荐点数组
       * @param {*} recommendedPoints 处理过的推荐点数组
       * @param {*} longitude 经度
       * @param {*} latitude 纬度
       * @param {Boolean} isNewPoints 是否是从接口新拉去的推荐点
       * @return {Object}
       * {
       *   isAdsorbed: true,
       *   locationInfo: { lon, lat, name, tips },
       *   recommendedPoints,
       *   spots
       * }
       */
      getAdsorbResult({
        spotsData = {},
        longitude,
        latitude,
        recommendedPoints,
        isNewPoints,
        polygon,
      }) {
        /* 推荐距离从小到大排序，
          TODO: 
          1、Spots 数组中的distance能否直接用；（拖动时，第一次校验吸附，没有请求接口，这个值不准，需要端上算）目前端上手动算的
          2、isRecommend 字段代表是否吸附。
          3、支付宝小程序有三次吸附校验(未实现)
          4、当前位置name信息，从推荐点返回的location数据中获取，而不请求逆地理
      */
        const { spots = [], location = {} } = spotsData;
        let recommendAdsorbedSpot = null;

        if (isNewPoints) {
          /* 1、如果是重新拉去服务推荐点，取服务推荐的吸附点 */
          recommendAdsorbedSpot = spots.find((v) => v.isRecommend === 1);

          if (recommendAdsorbedSpot) {
            // 处理吸附后的推荐点marker权重
            const recomIndex = recommendedPoints.findIndex(
              (v) =>
                Number(v.longitude) === Number(recommendAdsorbedSpot.lon) &&
                Number(v.latitude) === Number(recommendAdsorbedSpot.lat)
            );

            if (recomIndex > -1) {
              recommendedPoints = mapUtils.getProcessedRankPoints(
                recommendedPoints,
                recomIndex,
                true,
                this.mapData.scale
              );
            }

          }

        } else {
          /* 2、如果是拖动的，获取距离最小的点 */
          const { minIdx, min } = mapUtils.getMinDistanceMarkerFn({
            markers: recommendedPoints,
            longitude,
            latitude,
          }); // console.log('areas.length', areas.length, min);

          /* 吸附条件
          2-1：最近点距离小于20
          2-2：处于场站区域内，且有最近点，直接吸附
        */

          const isArea = mapUtils.checkPointInPolygon(
            [longitude, latitude],
            polygon || []
          );
          const nowPoint = recommendedPoints[minIdx]; // console.log('isArea', isArea, nowPoint, );

          const adsorbDistance = this.adsorbDistance || 10; // 米

          if (nowPoint && (min <= adsorbDistance || (isArea && min))) {
            /* 在接口返回的数据中获取 对应的推荐点 */
            recommendAdsorbedSpot = spots.find(
              (v) =>
                Number(v.lon) === Number(nowPoint.longitude) &&
                Number(v.lat) === Number(nowPoint.latitude)
            );

            recommendedPoints = mapUtils.getProcessedRankPoints(
              recommendedPoints,
              minIdx,
              true,
              this.mapData.scale
            );
          }

        }

        if (recommendAdsorbedSpot) {
          return {
            isAdsorbed: true,
            locationInfo: {
              // lon: recommendAdsorbedSpot.lon,
              // lat: recommendAdsorbedSpot.lat,
              // name: recommendAdsorbedSpot.name,
              // tips: recommendAdsorbedSpot.tips,
              ...recommendAdsorbedSpot,
            },
            recommendedPoints,
            spots,
          };
        }

        return {
          isAdsorbed: false,
          locationInfo: {
            lon: location.lon,
            lat: location.lat,
            name: location.name,
            id: location.id,
          },
          recommendedPoints,
          spots,
        };
      },

      /**
       * 管制区域内吸附
       * 1.如果是服务下发，先根据服务推荐吸附
       * 2.最近的一个推荐点上
       */
      getControlAreaAdsorbResult({
        longitude,
        latitude,
        controlArea,
        recommendedPoints,
        isNewPoints,
      }) {
        const { pickupSpots } = controlArea;
        let recommendAdsorbedSpot = null;

        if (isNewPoints) {
          /* 1、如果是重新拉去服务推荐点，取服务推荐的吸附点 */
          recommendAdsorbedSpot = pickupSpots.find((v) => v.isRecommend === 1);

          if (recommendAdsorbedSpot) {
            // 处理吸附后的推荐点marker权重
            const recomIndex = recommendedPoints.findIndex((v) => {
              return (
                Number(v.longitude) === Number(recommendAdsorbedSpot.lon) &&
                Number(v.latitude) === Number(recommendAdsorbedSpot.lat)
              );
            });

            if (recomIndex > -1) {
              recommendedPoints = mapUtils.getProcessedRankPoints(
                recommendedPoints,
                recomIndex,
                true,
                this.mapData.scale
              );
            }

          }

        }
        /* 如果服务未推荐吸附 */

        if (!recommendAdsorbedSpot) {
          const { minIdx, min } = mapUtils.getMinDistanceMarkerFn({
            markers: recommendedPoints,
            longitude,
            latitude,
          });
          const nowPoint = recommendedPoints[minIdx];

          if (nowPoint) {
            /* 在接口返回的数据中获取 对应的推荐点 */
            recommendAdsorbedSpot = pickupSpots.find((v) => {
              return (
                Number(v.lon) === Number(nowPoint.longitude) &&
                Number(v.lat) === Number(nowPoint.latitude)
              );
            });

            recommendedPoints = mapUtils.getProcessedRankPoints(
              recommendedPoints,
              minIdx,
              true,
              this.mapData.scale
            );
          }
        }

        if (recommendAdsorbedSpot) {
          return {
            isAdsorbed: true,
            locationInfo: { ...recommendAdsorbedSpot },
            recommendedPoints,
          };
        }

        return {
          isAdsorbed: false,
          recommendedPoints,
          locationInfo: {
            lon: longitude,
            lat: latitude,
          },
        };
      },

      processControlAreaPolygon(shape) {
        return mapUtils.processPolygonFn([
          {
            shape,
            data: {
              color: "transparent",
              fillColor: "#ff993b1a",
            },
          },
        ]);
      },

      /**
       * 处理点击marker的逻辑
       * @param {*} e 点击marker后获取到的marker实例
       */
      handleClickMarker(e) {
        const { markerId } = e || {};

        if (
          Object.prototype.toString.call(markerId) === "[object String]" &&
          markerId.indexOf(SPOT_ID_PREFIX) === 0
        ) {
          const pointIndex = this.recommendedPoints.findIndex(
            (v) => v.id === markerId
          );
          const { longitude = "", latitude = "" } =
            this.recommendedPoints[pointIndex] || {}; // eslint-disable-next-line prefer-const

          let {
            spots = [],
            controlAreaMatch,
            controlArea,
          } = this.pickupSpotsData || {};
          /* 如果是管制区域 从 controlArea获取值 */

          if (controlAreaMatch && controlArea) {
            spots = controlArea.pickupSpots || [];
          }

          const spot = spots.find(
            (v) =>
              Number(v.lon) === Number(longitude) &&
              Number(v.lat) === Number(latitude)
          );

          if (!spot) {
            return;
          }
          /* 移动到推荐点 */

          this.moveTo({
            longitude,
            latitude,
          });
          /** 处理推荐点的权重 */

          this.recommendedPoints = mapUtils.getProcessedRankPoints(
            this.recommendedPoints,
            pointIndex,
            true,
            this.mapData.scale
          );
          /* 更新小车 */

          this.updateNearbyCarsAsync({
            longitude: spot.lon,
            latitude: spot.lat,
            name: spot.name,
          });
          this.emitLocationChange({
            locationInfo: {
              ...spot,
              lon: spot.lon,
              lat: spot.lat,
              name: spot.name,
              id: spot.id || "",
              source: ''
            },
            isAdsorbed: true,
            spots,
          });
        }
      },

      /* 管制区域确认按钮点击ok */
      hardleControlAreaOk() {
      },

      /**
       * 逆地理（转换 经纬度 为 地址信息）
       * @param {Object} lonAndLatObj 经纬度信息
       * @param {*} lonAndLatObj.lon 经度
       * @param {*} lonAndLatObj.lat 纬度
       */
      async transformLonLatToAdress(lonAndLatObj) {
      },

      /** 根据当前小程序类型和pageKey 获取对应的页面值 */
      getPageValue() {
        
      },

      /**
       * 获取推荐点
       * @param {*} longitude 经度
       * @param {*} latitude 纬度
       * @param {*} triggerType 触发获取推荐点的类型： unknow-未知；myLocation-点击我的位置；mapOperation-拖动、放大等图面操作
       */
      async getPickupSpotsPromise({ longitude, latitude, poiId }) {
        
      },

      /* 获取当前点是否在管制区域内，当前点是起点 */
      getPointControlArea(lon, lat) {
        
      },

      /**
       * 异步更新小车；做了防抖避免频繁无意义的更新小车
       */
      updateNearbyCarsAsync: lodash.throttle(
        function ({ longitude, latitude, name }) {
          if (!this.showNearbyCars || !longitude || !latitude) {
            return;
          }

          const params = {
            startLon: longitude,
            startLat: latitude,
            startName: name,
          };
          
        },
        1000,
        {
          leading: true,
          trailing: false,
        }
      ),

      /**
       * 设置推荐点接口的触发类型
       */
      setTriggerType(type =' ') {
        this.triggerType = type;
        /* 更新缓存中的 positionSource */

        locationPinInfoCache.set({
          ...locationPinInfoCache.get(),
          positionSource: this.triggerType,
        });
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods["handleClickMarker_custHd_1"] = function (e) {
    this.handleClickMarker(...e.detail.$event);
  };

  opts.methods["handleRegionChange_custHd_2"] = function (e) {
    this.handleRegionChange(...e.detail.$event);
  };

  opts.methods["_saveRef1"] = function (ref) {
    if (!this.$refs) {
      this.$refs = {};
    }
    ref = ref.detail[0];
    this.$refs["map"] = ref.$anyui;
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.methods["handleAreaChange_custHd_3"] = function (e) {
    this.handleAreaChange(...e.detail.$event);
  };

  opts.methods["handleCloseStation_custHd_4"] = function (e) {
    this.handleCloseStation(...e.detail.$event);
  };

  opts.methods["hardleControlAreaOk_custHd_5"] = function (e) {
    this.hardleControlAreaOk(...e.detail.$event);
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "setting",
    "mapData",
    "markers",
    "polygon",
    "polyline",
    "includePoints",
    "showMapCenterCallout",
    "__slotObj",
    "isShowAssistOld",
    "pickupSpotsData",
    "isShowStationPop",
    "selectedSpot",
    "stationPopDefaultStep",
    "defaultStationSubAreaId",
    "pageKey",
    "canShowControlAreaPop",
  ];
  return opts;
}
