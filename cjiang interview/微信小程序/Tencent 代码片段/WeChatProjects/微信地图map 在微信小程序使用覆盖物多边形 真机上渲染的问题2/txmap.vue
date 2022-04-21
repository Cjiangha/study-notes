<template>
	<view class="base_body">
		<!-- <image src="../../static/uview/common/bg_login.png" mode="widthFix" style="width: 100%;"></image> -->
		<map class="myMap" :latitude="latitude" :longitude="longitude" :markers="markerList" :polygons="polygons"
			:scale="scale" subkey="U3XBZ-KDUWP-76CDY-LKVOX-SXK7J-XPBXB">

		</map>

		<!-- <cover-view slot="callout">
				<block v-for="(item,index) in markerList" :key="index">
					<cover-view class="customCallout" :marker-id="item.id">
						<cover-view class="content">
							{{item.title}}
						</cover-view>
					</cover-view>
				</block>
			</cover-view> -->
		<!-- <map :style="'width: 100%;'+ 'height:'+screenHeight" :latitude="latitude" :longitude="longitude" :scale="scale"
			:markers="markerList" :polygon="polygons">
			<cover-view slot="callout">
				<block v-for="(item,index) in markerList" :key="index">
					<cover-view class="customCallout" :marker-id="item.id">
						<cover-view class="content">
							{{item.title}}
						</cover-view>
					</cover-view>
				</block>
			</cover-view>
		</map> -->
		<view style="position: absolute; top: 96px; left:0px;width: 100%;z-index:999999">
			<view style="padding: 0 18px;display: flex;flex-direction: column;">
				<view class="header__input" style="width: 100%;">

					<u-input placeholder="输入园区名称关键字" border="surround" prefixIcon="search"
						prefixIconStyle="font-size: 28px;color:#909a9b" clearable shape="circle"
						style="background-color: #FFFFFF;" v-model="searchName">
						<template slot="suffix">
							<u-button color="#755EFC" shape="circle" @click="seach"
								style="width: 64px; box-shadow:0px 2px 10px 1px rgba(0, 0, 0, 0.12156862745098039);font-weight: 600;">
								查找</u-button>
						</template>
					</u-input>
				</view>


				<image src="../../static/uview/common/bt_street_68_68.png" mode=""
					style="width:68px;height:68px;margin-top:10px" @click="showstree=true">
				</image>

				<image src="../../static/uview/common/bt_level_68_68.png" mode="" style="width:68px;height:68px;"
					@click="showrank=true">
				</image>

				<image src="../../static/uview/common/bt_clear_68_68.png" mode="" style="width:68px;height:68px;"
					@click="refresh" v-show="showrefres">
				</image>


			</view>
			<u-picker ref="uTree" :show="showstree" :columns="streeList" title="所属街道" keyName="areaName"
				@confirm="selectstreeClick" @cancel="close" v-model="stree" z-index="9999"></u-picker>

			<u-picker ref="uRank" :show="showrank" :columns="rankList" title="评价等级" keyName="value" v-model="rank"
				@confirm="selectrankClick" @cancel="rankclose"></u-picker>

		</view>

		<view style="position: absolute; bottom: 34px; width: 100%;">
			<u-scroll-list :indicator="indicator">
				<view class="scroll-list" style="flex-direction: row;">
					<view class="scroll-list__goods-item" v-for="(item, index) in parklist" :key="index"
						@click="detail(item)">
						<image class="scroll-list__goods-item__image"
							:src="'https://wx.yjzx.net.cn:13475/bmzx/' + item.coverPicUrl" mode="scaleToFill">
						</image>
						<view class="scroll-list__goods-item__text">
							<text>{{ item.name }}</text>
						</view>
						<view class="scroll-list__goods-item__area">
							<text v-if="item.areaName">{{ item.areaName+ '，'}}</text>
							<text v-if="item.address">{{item.address}}</text>
						</view>
					</view>

				</view>
			</u-scroll-list>
		</view>

	</view>
</template>
<script>
	// var scPhotoJson = require('@/static/songjiang.json');
	// var scPhotoJson = require('@/static/song.json');
	var webapiaddress = "https://wx.yjzx.net.cn:13475";
	// var QQMapWX = require('@/common/js/qqmap-wx-jssdk.min.js');
	// var qqmapsdk;
	export default {
		data() {
			return {
				showrefres: false,
				showstree: false,
				indicator: false,
				streeList: [],
				showrank: false,
				rankList: [],

				searchshow: false,
				searchName: "",
				rank: "",
				stree: "",
				scale: 10,
				lat: "",
				longit: "",
				show: true,
				latitude: 31.015194, //纬度
				longitude: 121.220231, //经度
				screenHeight: '100%',
				parklist: [],
				markerList: [{
						"id": "1",
						"name": " 上海临港松江科技城",
						"areaName": "九亭镇&新桥镇",
						"address": "莘砖公路518号",
						"evaluGrade": "市级特色、五星级",
						"longitude": "121.316019",
						"latitude": "31.092595",
						"coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/127547fb-74d6-4877-9a1e-3ed64a3d33e1.jpg",
						"jumpPath": "bmZHYQ"
					}, {
						"id": "2",
						"name": "G60电子信息国际创新产业园",
						"areaName": "经济开发区",
						"address": "文翔东路58号",
						"evaluGrade": "市级特色",
						"longitude": "121.294435",
						"latitude": "31.019473",
						"coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/3cd26a22-ea54-4c57-a4b9-afd52223cf94.png"
					}, {
						"id": "3",
						"title": "G60佘山智能制造园区",
						"areaName": "佘山镇",
						"address": "强业路801弄",
						"evaluGrade": "培育型",
						"longitude": "121.185649",
						"latitude": "31.112243",
						"coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/e0bf90fa-6e74-4b54-816c-3953b2ffae62.jpg",
						"jumpPath": ""
					}, {
						"id": "4",
						"title": "G60生物医药产业基地",
						"areaName": "经济开发区",
						"address": "广富林路5000号",
						"evaluGrade": "市级特色",
						"longitude": "121.145038",
						"latitude": "31.041644",
						"coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/a81ad634-dd8c-4856-8fbe-5f6db03f3e98.png"
					}, {
						"id": "5",
						"title": "M创工坊·泗泾科技创新中心",
						"areaName": "泗泾镇",
						"address": "永强路68号",
						"evaluGrade": "培育型",
						"longitude": "121.303232",
						"latitude": "31.0884",
						"coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/779a7519-7229-4d4f-a269-8a0b938d4a0c.jpg"
					}, {
						"id": "6",
						"title": "创异工房",
						"areaName": "洞泾镇",
						"address": "沈砖公路6000号",
						"evaluGrade": "四星级",
						"longitude": "121.259612",
						"latitude": "31.09205",
						"coverPicUrl": "/bfiles/31FQrNAJsfQBCOQMvNE/coverPics/8dea68e1-fe6c-47ff-9f1e-eff68bb9a10c.jpg"
					},
					// {
					// 	latitude: 39.7,
					// 	longitude: 116.7,
					// 	iconPath: '../../static/uview/common/dot_20_28.png',
					// 	title: '内容'
					// },
					// {
					// 	id: 7,
					// 	latitude: 30.264786,
					// 	longitude: 120.20775,
					// 	iconPath: '../../static/uview/common/dot_20_28.png', //显示的图标        
					// 	rotate: 0, // 旋转度数
					// 	width: 20, //宽
					// 	height: 20, //高
					// 	title: '我在这里', //标注点名
					// 	alpha: 0.8, //透明度
					// 	// 	joinCluster: true,//聚合点
					// 	//   　　 label:{//为标记点旁边增加标签   //因背景颜色H5不支持
					// 	//   　　 content:'Hello,I am here',//文本
					// 	// 　　　　color:'red',//文本颜色
					// 	// 　　fontSize:24,//文字大小
					// 	//    x:5,//label的坐标，原点是 marker 对应的经纬度
					// 	//    y:1,//label的坐标，原点是 marker 对应的经纬度 
					// 	//    borderWidth:12,//边框宽度
					// 	//    borderColor:'pink',//边框颜色    
					// 	// 　　borderRadius:20,//边框圆角                        
					// 	// 　　bgColor:'black',//背景色
					// 	// 　　padding:5,//文本边缘留白
					// 	//    textAlign:'right'//文本对齐方式。
					// 	// },
					// 	callout: { //自定义标记点上方的气泡窗口 点击有效  
					// 		content: '硅谷广场B座', //文本
					// 		color: '#000000', //文字颜色
					// 		fontSize: 14, //文本大小
					// 		borderRadius: 2, //边框圆角
					// 		bgColor: '#ffffff', //背景颜色
					// 		display: 'ALWAYS', //常显
					// 		// 		textAlign: "left",
					// 		// 		padding: '10',
					// 	},
					// 	// 	customCallout: {
					// 	// 		anchorY: 0, // Y轴偏移量
					// 	// 		anchorX: 100, // X轴偏移量
					// 	// 		display: "ALWAYS" // 一直展示
					// 	// 	},
					// 	// anchor:{//经纬度在标注图标的锚点，默认底边中点
					// 	//     x:0,    原点为给出的经纬度
					// 	//     y:0,
					// 	// }

					// },
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
						"strokeWidth": 1,
						zIndex: 0,
					}


				],
				location: "",
				mapAggreSwitch: null
			}
		},

		onLoad() {
			// var that = this;
			// var AggreSwitch = webapiaddress + '/bmzx/sys/gen/getGenConfig'
			// wx.request({
			// 	url: AggreSwitch,
			// 	header: {
			// 		'Authorization': uni.getStorageSync('Authorization')
			// 	},
			// 	data: {},
			// 	method: 'POST',
			// 	success(res) {
			// 		if (res.data.code == 200) {
			// 			that.mapAggreSwitch = res.data.data.mapAggreSwitch;

			// 		}

			// 	}
			// })
			
			// qqmapsdk = new QQMapWX({
			// 	key: 'U3XBZ-KDUWP-76CDY-LKVOX-SXK7J-XPBXB'
			// });
			// this.mapCtx = wx.createMapContext('myMap')

		},
		created() {
			this.getStreet();
			this.getParkGrade();
		},
		mounted() {

			this.init();
			// this.jsonscPhotoJson()

		},

		methods: {

			getStreet() {
				var that = this;
				var addgreen = webapiaddress + '/bmzx/bs/app/getStreetList'
				wx.request({
					url: addgreen,
					header: {
						'Authorization': uni.getStorageSync('Authorization')
					},
					data: {},
					method: 'POST',
					success(res) {
						if (res.data.code == 200) {
							that.streeList.push(res.data.data);
						}

					}
				})
			},
			getParkGrade() {
				var that = this;
				var addgreen = webapiaddress + '/bmzx/bs/app/getParkGradeList'
				wx.request({
					url: addgreen,
					header: {
						'Authorization': uni.getStorageSync('Authorization')
					},
					data: {},
					method: 'POST',
					success(res) {
						if (res.data.code == 200) {
							that.rankList.push(res.data.data);
						}

					}
				})
			},
			init() {
				// 
				var that = this;
				var addgreen = webapiaddress + '/bmzx/bs/park/getIndusParkInfoList'
				wx.request({
					url: addgreen,
					header: {
						'Authorization': uni.getStorageSync('Authorization')
					},
					data: {
						"districtId": "310117000000",
						"name": that.searchName,
						"areaId": that.stree,
						"dictId": that.rank
					},
					method: 'POST',
					success(res) {
						if (res.data.code == 200) {
							if (res.data.data.length > 0) {
								that.parklist = res.data.data;
								that.latitude = res.data.data[0].lat; //纬度
								that.longitude = res.data.data[0].lng;

								// that.point(res.data.data)
							} else {
								that.parklist = res.data.data;
								that.markerList = []
							}

						}

					}
				})
			},
			point(data) {

				var markers = [];
				var that = this;
				data.forEach((item, index) => {
					markers.push({
						address: item.address,
						areaName: item.areaName,
						coverPicUrl: item.coverPicUrl,
						evaluGrade: item.evaluGrade,
						id: index,
						jumpPath: item.jumpPath,
						latitude: item.lat,
						longitude: item.lng,
						name: item.name,
						joinCluster: that.mapAggreSwitch == '1' ? true : false,
						iconPath: '../../static/uview/common/dot_20_28.png',
						rotate: 0,
						width: 20,
						height: 28,
						zIndex: 9999,
						callout: {
							content: item.name,
							color: '#ffffff',
							fontSize: 14,
							borderRadius: 2,
							bgColor: '#000000',
							padding: 5

						},

					})

				})
				// 						joinCluster: true,
				//自定义标记点上方的气泡窗口 点击有效
				// display: 'ALWAYS', //常显
				// 		textAlign: "left",
				// 		padding: '10',
				that.markerList = markers;
			},
			selectrankClick(e) {
				this.rank = '';
				e.value.map((val, index) => {
					this.rank = val.key
				})
				this.showrank = false
				this.init()
				this.showrefres = true
			},
			rankclose() {
				this.showrank = false
			},
			selectstreeClick(e) {
				// this.form.kind=this.typeList[e].value;
				this.stree = '';
				e.value.map((val, index) => {
					this.stree = val.areaId
				})
				this.showstree = false;
				this.init()
				this.showrefres = true

			},
			close() {
				this.showstree = false
			},

			detail(item) {
				wx.redirectTo({
					url: '../parkmap/parkmap?id=' + item.id
				})
			},
			// mapTap(e) {
			// 	// detail: {
			// 	// 	latitude,
			// 	// 	longitude
			// 	// }	
			// 	// 点击地图
			// 	this.latitude = e.detail.latitude;
			// 	this.longitude = e.detail.longitude;
			// },
			seach() {
				this.init()
				this.showrefres = true
			},
			refresh() {
				this.searchName = "";
				this.stree = "";
				this.rank = "";
				this.init()
				this.showrefres = false
			},

			// // 	//逆地址解析
			jsonscPhotoJson() {
				let that = this;
				let jsonArr = [];
				jsonArr = scPhotoJson.geometry
				that.polygons = jsonArr
				// jsonArr = scPhotoJson.features;
				// for (let i = 0; i < jsonArr.length; i++) {

				// 	that.polygons = jsonArr[i].geometry

				// }
			}
		},

		onReady() {}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8f9ff;
		width: 100%;
		height: 100%
	}

	.myMap {
		width: 100%;
		height: 100%
	}

	.base_body {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.customCallout {
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 30px;
		width: 150px;
		height: 40px;
		display: inline-flex;
		padding: 5px 20px;
		justify-content: center;
		align-items: center;
	}

	.header__input {
		margin-left: 10px;

		/deep/.u-input {
			width: 82.6666666vw;
			background: #ffffff;
			padding-top: 4px !important;
			padding-bottom: 4px !important;
			padding-left: 12px !important;
			padding-right: 4px !important;
		}

		/deep/ .u-border {
			border: none !important;
			box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.12156862745098039) !important;
		}

		/deep/ .u-button {
			width: 64px !important;
			font-weight: 600 !important;
			box-shadow: 0px 2px 6px 1px rgba(117, 94, 252, 0.4) !important;
		}

	}

	.u-popup-slot {
		width: 200px;
		height: 150px;
		@include flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		flex: 0 1 auto;
		margin: 0 10px;
		font-size: 14px;
	}

	.scroll-list {
		padding: 14px 0;
		@include flex(column);

		&__goods-item {
			margin: 10px;
			width: 140px;
			height: 150px;
			background: #FFFFFF;
			box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.12156862745098039);
			border-radius: 12px 12px 12px 12px;
			padding: 5px;

			&__image {
				width: 100%;
				height: 68px;
				border-radius: 8px;
			}

			&__text {
				margin-top: 7px;
				color: #131736;
				font-size: 12px;
				font-weight: 600;
				padding: 0 5px;
				// display: -webkit-box;
				// overflow: hidden;
				// -webkit-line-clamp: 2;
				// -webkit-box-orient: vertical;
			}

			&__area {
				margin-top: 2px;
				color: #909BAB;
				font-size: 10px;
				padding: 0 5px;
				// overflow: hidden;
				// text-overflow: ellipsis;
				// white-space: nowrap
			}
		}

		// &__show-more {
		// 	background-color: #fff0f0;
		// 	border-radius: 3px;
		// 	padding: 3px 6px;
		// 	@include flex(column);
		// 	align-items: center;


		// }
	}

	// .scroll-list {
	// 	display: flex;
	// 	flex-direction: column;

	// 	&__line {
	// 		display: flex;
	// 		flex-direction: row;

	// 		&__item {
	// 			width: 140px;
	// 			height: 150px;
	// 			background: #FFFFFF;
	// 			box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.12156862745098039);
	// 			border-radius: 12px 12px 12px 12px;
	// 			margin-right: 10px;
	// 			padding: 5px;

	// 			&__image {
	// 				width: 130px;
	// 				height: 68px;
	// 			}

	// 			&__text {
	// 				margin-top: 7px;
	// 				color: #131736;
	// 				font-size: 12px;
	// 				font-weight: 600;
	// 			}

	// 			&__area {
	// 				margin-top: 2px;
	// 				color: #909BAB;
	// 				font-size: 10px;
	// 			}

	// 			&--no-margin-right {
	// 				margin-right: 0;
	// 			}
	// 		}
	// 	}

	// }
</style>
