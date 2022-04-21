// import { CONFIG } from "../../../config/index";
// import wechatService from "../../../service/wechatService/index";
// import chargeService from "../../../service/chargeService/index";
// import userService from "../../../service/userService/index";
// import { queryDom, getLocation } from "../../../utils/util";
// Page({
//   mapCtx: null,
//   data: {
//     title: CONFIG.title,
//     pageIndex: 1,
//     latitude: "",
//     longitude: "",
//     screenType: [
//       {
//         value: 0,
//         name: "智能筛选",
//         defaultScreen: "0",
//         options: [
//           {
//             id: 0,
//             name: "智能筛选",
//           },
//           {
//             id: 1,
//             name: "停车免费",
//           },
//           {
//             id: 2,
//             name: "卫生间",
//           },
//         ],
//         action: false,
//       },
//       {
//         value: 1,
//         name: "10km",
//         defaultScreen: "10",
//         options: [
//           {
//             id: 1,
//             name: "1km",
//           },
//           {
//             id: 2,
//             name: "2km",
//           },
//           {
//             id: 3,
//             name: "3km",
//           },
//         ],
//         action: false,
//       },
//       {
//         value: 2,
//         name: "快充",
//         defaultScreen: 1,
//         options: [
//           {
//             id: 1,
//             name: "快充",
//           },
//           {
//             id: 2,
//             name: "慢充",
//           },
//         ],
//         action: false,
//       },
//     ],
//     mapHeight: 600,
//     markers: [],
//     showCard: false,
//     station: {},
//   },
//   onReady() {
//     this.mapCtx = wx.createMapContext("myMap");
//   },
//   onLoad() {
//     const system = wx.getSystemInfoSync();
//     console.log(system.windowHeight);
//     console.log(system, "en");
//     getLocation().then((res: any) => {
//       console.log(res, "resss");
//       this.setData(
//         {
//           latitude: res.latitude,
//           longitude: res.longitude,
//         },
//         () => {
//           console.log(this.mapCtx, "mapCtx");
//           this.initData().then((list) => {
//             this.setMarkers(list);
//           });
//         }
//       );
//     });
 
//     this.setNavSize();
//     wx.setNavigationBarTitle({
//       title: CONFIG.title,
//     });
//   },
//   selectChange(res): void {
//     this.setData({
//       screenType: res.detail.screenType,
//     });
//     if (res.detail.init) {
//       this.clearData();
//       this.initData();
//     }
//   },
//   clearData() {
//     this.setData({
//       pageIndex: 1,
//       loaded: false,
//       loadingType: "more",
//     });
//   },
//   handleToDetail(e: Weapp.Event): void {
//     const {
//       czbStationId,
//       distance,
//       stationLat,
//       stationLng,
//       czbStationName,
//       address,
//     } = e.currentTarget.dataset.item;
//     wx.navigateTo({
//       url: `/pages/home/stationDetail/index?czbStationId=${czbStationId}&userLatStr=${stationLat}&userLngStr=${stationLng}&distance=${distance}&name=${czbStationName}&address=${address}`,
//     });
//   },
//   handleNavigation(e: Weapp.Event): void {
//     const { stationLat, stationLng, czbStationName, address } =
//       e.currentTarget.dataset.item;
//     wx.openLocation({
//       name: czbStationName,
//       address: address,
//       latitude: Number(stationLat),
//       longitude: Number(stationLng),
//     });
//   },
//   handleMarker(e) {
//     console.log("@@@ handleMarker", e);
//     return new Promise((resolve) => {
//       this.data.markers.map((v) => {
//         if (v.id === e.markerId) {
//           resolve(v);
//         }
//       });
//     }).then((res: any) => {
//       console.log(res, "res");
//       this.setData({
//         showCard: true,
//         station: res.station,
//       });
//     });
//   },
//   handleChangeMap(e) {
//     const that = this;
//     console.log(e);
//     this.setData({
//       dataList: [],
//       markers: [],
//       showCard: false,
//     });
//     if (e.type === "end") {
//       this.mapCtx.getCenterLocation({
//         success: function (res) {
//           console.log(res, "ressss");
//           that.data.latitude = res.latitude;
//           that.data.longitude = res.longitude;
//           that.initData().then((list) => {
//             that.setMarkers(list);
//           });
//         },
//       });
//     }
//   },
//   setMarkers(list) {
//     // wx.showLoading({
//     //   title: "加载中...",
//     // });
//     const mark: any = [];
//     list.map((v, i) => {
//       mark.push({
//         width: 109,
//         height: 34,
//         id: i + 1,
//         latitude: v.stationLat * 1,
//         longitude: v.stationLng * 1,
//         alpha: 0,
//         station: {
//           ...v,
//         },
//         customCallout: {
//           color: "#262626",
//           display: "ALWAYS",
//           fontSize: "14",
//           anchorY: 10,
//           anchorX: 0,
//         },
//       });
//       console.log(v.stationLat * 1, v.stationLng * 1, '坐标')
//     });
//     console.log(mark, "markmark");
//     console.log(this.mapCtx)
//     // this.mapCtx.addMarkers({
//     //   markers: mark,
//     //   clear: false,
//     //   complete(res) {
//     //     console.log('addMarkers', res)
//     //   }
//     // })
//     this.setData(
//       {
//         markers: mark,
//       });
//   },
//   initData<T>(hasData = false): Promise<{}> | T | undefined {
//     const { pageSize } = this.data;
//     this.setData({
//       isLoading: false,
//     });
//     if (this.data.loadingType === "noMore") {
//       this.setData({
//         isLoading: true,
//       });
//       return;
//     }
//     type DataType = {
//       [propName: string]: number;
//     };
//     const data: DataType = {
//       userLatStr: this.data.latitude,
//       userLngStr: this.data.longitude,
//       pageSize: 50,
//       distance: this.data.screenType[1].defaultScreen,
//       pageIndex: this.data.pageIndex,
//       chargeType: this.data.screenType[2].defaultScreen,
//     };
//     console.log(data, "data");
//     if (this.data.screenType[0].defaultScreen != 0) {
//       data.tagId = this.data.screenType[0].defaultScreen;
//     }
//     return new Promise((resolve) => {
//       wechatService
//         .getStationPageList({
//           data,
//           special: true,
//         })
//         .then((res) => {
//           const result = res.result.chargeStationInfoList;
//           this.data.loaded = true;
//           if (result) {
//             if (result.length < pageSize) {
//               this.data.loadingType = "noMore";
//             } else {
//               this.data.loadingType = "more";
//             }
//             result.map((item) => {
//               (item.chargeTypes = this.data.screenType[2].defaultScreen),
//                 (item.direct =
//                   item.directCount > 0 || item.directLeftCount > 0),
//                 (item.alternate =
//                   item.alternateCount > 0 || item.alternateLeftCount > 0),
//                 (item.dealPay = this.dealPay(item));
//               item.dealOldPay = this.dealOldPay(item);
//               return item;
//             });
//             if (hasData) {
//               this.setData(
//                 {
//                   isLoading: this.data.loadingType === "noMore" ? true : false,
//                   dataList: [...this.data.dataList, ...result],
//                 },
//                 () => {
//                   const mark: any = [];
//                   this.data.dataList.map((v, i) => {
//                     mark.push({
//                       width: 109,
//                       height: 34,
//                       id: i + 1,
//                       latitude: v.stationLat * 1,
//                       longitude: v.stationLng * 1,
//                       alpha: 0,
//                       station: {
//                         ...v,
//                       },
//                       customCallout: {
//                         color: "#262626",
//                         display: "ALWAYS",
//                         fontSize: "14",
//                         anchorY: 10,
//                         anchorX: 0,
//                       },
//                     });
//                   });
//                   this.setData({
//                     markers: mark,
//                   });
//                 }
//               );
//               return;
//             }
//             this.setData({
//               isLoading: this.data.loadingType === "noMore" ? true : false,
//               dataList: result,
//             });
//           } else {
//             this.setData({
//               dataList: [],
//               isLoading: true,
//             });
//           }
//           resolve(this.data.dataList);
//         })
//         .catch((err) => {
//           this.setData({
//             isLoading: true,
//           });
//           wx.showToast({
//             title: err.message,
//             icon: "none",
//           });
//         });
//     });
//   },

//   setNavSize() {
//     let that = this,
//       sysinfo = wx.getSystemInfoSync(),
//       statusHeight = sysinfo.statusBarHeight,
//       isiOS = sysinfo.system.indexOf("iOS") > -1,
//       navHeight;
//     if (!isiOS) {
//       navHeight = 48;
//     } else {
//       navHeight = 44;
//     }
//     that.setData(
//       {
//         statusBarHeight: statusHeight,
//         navHeight: navHeight,
//       },
//       () => {
//         queryDom("station").then((res: any) => {
//           this.setData(
//             {
//               top: res.height,
//             },
//             () => {
//               this.setData(
//                 {
//                   mapHeight:
//                     wx.getSystemInfoSync().windowHeight -
//                     this.data.statusBarHeight -
//                     this.data.navHeight -
//                     res.height -
//                     60,
//                 },
//                 () => {
//                   console.log(this.data.mapHeight, "mapHeight");
//                 }
//               );
//             }
//           );
//         });
//       }
//     );
//   },
//   handleSearch() {
//     wx.navigateTo({
//       url: "/pages/home/search/index",
//     });
//   },
//   handleClickTabbar() {
//     wx.reLaunch({
//       url: "/pages/index/stationList/index",
//     });
//   },
//   dealPay(item) {
//     // 处理数据  先展示快充 后显示慢充
//     let directFeeRemark = item.directFeeRemark; //直流 快充
//     let alternateFeeRemark = item.alternateFeeRemark; //交流 慢充
//     let pay,
//       chargeType = this.data.screenType[2].defaultScreen;
//     if (chargeType == 1) {
//       pay = directFeeRemark ? directFeeRemark : "--";
//     } else if (chargeType == 2) {
//       pay = alternateFeeRemark ? alternateFeeRemark : "--";
//     } else if (chargeType == 0) {
//       pay =
//         directFeeRemark !== "--"
//           ? directFeeRemark
//             ? directFeeRemark
//             : "--"
//           : alternateFeeRemark
//           ? alternateFeeRemark
//           : "--";
//     }
//     return pay;
//   },
//   dealOldPay(item) {
//     // 处理数据  先展示快充 后显示慢充
//     let originalDirectFeeRemark = item.originalDirectFeeRemark; //直流 快充
//     let originalAlternateFeeRemark = item.originalAlternateFeeRemark; //交流 慢充
//     let pay,
//       chargeType = this.data.screenType[2].defaultScreen;
//     if (chargeType == 1) {
//       pay = originalDirectFeeRemark ? originalDirectFeeRemark : "--";
//     } else if (chargeType == 2) {
//       pay = originalAlternateFeeRemark ? originalAlternateFeeRemark : "--";
//     } else if (chargeType == 0) {
//       pay =
//         originalDirectFeeRemark !== "--"
//           ? originalDirectFeeRemark
//             ? originalDirectFeeRemark
//             : "--"
//           : originalAlternateFeeRemark
//           ? originalAlternateFeeRemark
//           : "--";
//     }
//     return pay;
//   },
// });
