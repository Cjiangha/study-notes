import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
import { createComponent } from "@alife/anyui-wx-framework/index.js";

createComponent(
  createOptions({
    name: "StationSelectPop",
    props: {
      areas: {
        // 场站推荐区域数据
        type: Array,
        default: () => [],
      },
      isShow: {
        // 是否关闭弹窗
        type: Boolean,
        default: false,
      },
      spots: {
        // 场站推荐区域数据
        type: Array,
        default: () => [],
      },
      selectedSpot: {
        type: Object,
        default: () => ({}),
      },

      /* 默认处于第几层 */
      stationPopDefaultStep: {
        type: String,
        default: "",
      },

      /* 第一层默认选中的 subAreaId */
      defaultStationSubAreaId: {
        type: String,
        default: "",
      },

      /* 页面来源 */
      pageKey: {
        type: String,
        default: "",
      },
    },
    data: {
      step: "first",
      // 第几步弹层 first or second
      firstSelectValue: [0],
      // 第一层 picker 的value
      secondSelectValue: [0], // 第二层 picker 的value
    },
    computed: {
      /* 第一层场站选择 */
      firstPickerData() {
        return this.areas.reduce((arr, item) => {
          if (item.subAreas && item.subAreas.length) {
            item.subAreas.forEach((sub) => {
              arr.push({
                name: sub.name,
                areaId: item.areaId,
                parentId: item.parentId,
                subAreaId: sub.id,
                recommendSpotId: sub.recommendSpotId,
              });
            });
          }

          return arr;
        }, []);
      },

      /* 第一层 picker 的选中的数据 */
      firstItem() {
        return this.firstPickerData[this.firstSelectValue[0]] || {};
      },

      /* 第二层弹层 选择推荐点 */
      secondPickerData() {
        const { areaId, subAreaId } = this.firstItem;
        return this.spots.reduce((arr, item) => {
          if (
            item.areaId === areaId &&
            this.subAreaIdIncludes(item.subAreaIds, subAreaId)
          ) {
            arr.push({ ...item });
          }

          return arr;
        }, []);
      },

      /* 第二层 picker 的选中的数据 */
      secondItem() {
        return this.secondPickerData[this.secondSelectValue[0]] || {};
      },

      calloutTime() {
        const walkTime = Number(this.secondItem.walkTime);

        if (walkTime) {
          return Math.ceil(walkTime / 60);
        }

        return 0;
      },

      /** 场站标题 */
      parentName() {
        return this.areas[0] ? this.areas[0].parentName : "";
      },
    },
    watch: {
      selectedSpot: {
        handler(val, oldVal) {
          /* 防止重复执行 */
          if (!val || !oldVal || val.id === oldVal.id) {
            return;
          }
          /* 为了 适配在地图上拖拽后吸附后 处理第二次选择 */

          const secondIndex = this.secondPickerData.findIndex(
            (v) => v.id === val.id
          );
          /* TODO: secondIndex === -1 时，此时传进来的点不是推荐点，然后会直接触发吸附到卡片列表的第一个点。某些场景下，服务不希望吸附时，会有问题。
          这里需要重新设计，目前的设计，会造成在首都机场T1和T2切换时，重新请求接口，且服务没有下发吸附，然后造成secondIndex === -1。后面这个场站选择卡片只做渲染，不处理数据。
        */

          if (secondIndex > -1) {
            this.$nextTick(() => {
              if (this.secondSelectValue[0] !== secondIndex) {
                this.secondSelectValue = [secondIndex];
              }
            });
          }
        },
      },
      areas: {
        immediate: true,

        handler(val) {
          if (val) {
            // 场站数据初次或者变化后，都要重新初始化
            this.$nextTick(() => {
              this.initSelectedSpot();
              /* 初始 emitAreaChange 依赖 initSelectedSpot的计算  */

              this.emitAreaChange(this.getFirstSelectSpot(), true);
            });
          }
        },
      },
    },

    mounted() {
      if (this.stationPopDefaultStep) {
        this.step = this.stationPopDefaultStep;
      }
    },

    methods: {
      /** 初始化时执行处理 主要处理第一层，因为不同楼层会有相同的推荐点，导致watch时执行 会错乱 */
      initSelectedSpot() {
        this.firstSelectValue = [0]; // 重置为第1个

        this.secondSelectValue = [0]; // 重置为第1个

        if (!this.selectedSpot) {
          /* 处理服务推荐的第二层场站吸附点index */
          this.secondSelectValue = [this.getServiceRecommendSpotIndex()];
          return;
        }

        const { areaId, subAreaIds, id } = this.selectedSpot;
        let index = -1;

        if (this.defaultStationSubAreaId) {
          index = this.firstPickerData.findIndex(
            (v) => v.subAreaId === this.defaultStationSubAreaId
          );
        } else {
          index = this.firstPickerData.findIndex(
            (v) =>
              v.areaId === areaId &&
              this.subAreaIdIncludes(subAreaIds, v.subAreaId)
          );
        }

        if (index > -1) {
          this.firstSelectValue = [index];
          const secondIndex = this.secondPickerData.findIndex(
            (v) => v.id === id
          );

          if (secondIndex > -1) {
            this.secondSelectValue = [secondIndex];
          }
        }
      },

      /** 检验字符串是否包含id */
      subAreaIdIncludes(subAreaIds, subAreaId) {
        const subAreaIdArr = subAreaIds
          ? subAreaIds.split("|").map((v) => v.trim())
          : [];
        return subAreaIdArr.includes(subAreaId);
      },

      /**
       * 场站区域和推荐点选择变化
       * spot 选中的推荐点
       * newSpots 新推荐点数据
       * forceRender 强制渲染推荐点
       */
      emitAreaChange(spot, forceRender) {
        const newSpots = this.secondPickerData.map((v) => ({ ...v }));
        const newSubArea = this.areas.find((v) => v.areaId === spot.areaId);
        /* 第一层 选中的subAreaId */

        const subAreaId = this.firstItem.subAreaId; // console.log(newSubArea);

        this.$emit("onAreaChange", {
          spot,
          newSpots,
          newSubArea,
          forceRender,
          subAreaId,
        });
      },

      /* 获取第一层选中时的 对应的推荐点 */
      getFirstSelectSpot() {
        return this.secondPickerData[this.secondSelectValue[0]];
      },

      /* 根据服务接口推荐的第二层 点的 Index 服务字段是 recommendSpotId */
      getServiceRecommendSpotIndex() {
        const selectArea = this.firstPickerData[this.firstSelectValue[0]] || {};
        let sIndex = 0; // 默认选择 0

        if (selectArea.recommendSpotId) {
          sIndex = this.secondPickerData.findIndex(
            (v) => selectArea.recommendSpotId === v.id
          );
        }

        return sIndex > -1 ? sIndex : 0;
      },

      /**
       * @description: 关闭场站选项卡
       */
      closeStation() {
        this.$emit("onCloseStation");
      },

      firstPickerChange(value) {
        this.firstSelectValue = value;
        /* 把第二层数据重置 服务推荐的上车点的index 如果没有 重置为0 */

        this.secondSelectValue = [this.getServiceRecommendSpotIndex()];
        this.emitAreaChange(this.getFirstSelectSpot());
      },

      secondPickerChange(value, item) {
        this.secondSelectValue = value;
        this.emitAreaChange({ ...item });
      },

      /* 第一层弹层 点击 按钮 */
      handleFirstStepClick() {
        this.step = "second"; // 跳转到第二页
      },

      /* 第二层弹层 点击 返回 */
      handleBackFirstStep() {
        this.step = "first"; // 跳转到第二页
      },

      /* 第二层弹层 点击 按钮 */
      handleSecondStepClick() {
        this.closeStation();
        this.$emit("onSelectAreaSpot", { ...this.secondItem });
      },

      /**
       * @description: 起点不在该区域，跳去search页面搜索
       */
      goSeach() {
        
      },
    },
  })
);

function createOptions(opts = {}) {
  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.methods["firstPickerChange_custHd_1"] = function (e) {
    this.firstPickerChange(...e.detail.$event);
  };

  opts.methods["secondPickerChange_custHd_2"] = function (e) {
    this.secondPickerChange(...e.detail.$event);
  };

  opts.$renderKeys = [
    "__ready__",
    "proputil",
    "isShow",
    "step",
    "firstSelectValue",
    "firstPickerData",
    "parentName",
    "secondSelectValue",
    "secondPickerData",
    "firstItem",
    "calloutTime",
  ];
  return opts;
}
