<template>
	<cover-view class="tab-bar">
	  <cover-view class="tab-bar-border"></cover-view>
	  <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path="item.pagePath" :data-index="index" @tap="switchTab">
	    <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath"></cover-image>
	    <cover-view :style="{color:selected === index ? selectedColor : color}">{{item.text}}</cover-view>
	  </cover-view>
	</cover-view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// selected: 0,
				color: "#999999",
				selectedColor: "#000000",
				list: [{
					"pagePath": "/pages/project/list/list",
					"iconPath": "/static/tabBar/project.png",
					"selectedIconPath": "/static/tabBar/project_current.png",
					"text": "项目"
				},
				{
					"pagePath": "/pages/backletter/list/list",
					"iconPath": "/static/tabBar/backletter.png",
					"selectedIconPath": "/static/tabBar/backletter_current.png",
					"text": "保函"
				}, {
					"pagePath": "/pages/mine/index/index",
					"iconPath": "/static/tabBar/mine.png",
					"selectedIconPath": "/static/tabBar/mine_current.png",
					"text": "我的"
				}]
				// list: [{
				//   pagePath: "/index/index",
				//   iconPath: "/image/icon_component.png",
				//   selectedIconPath: "/image/icon_component_HL.png",
				//   text: "组件"
				// }, {
				//   pagePath: "/index/index2",
				//   iconPath: "/image/icon_API.png",
				//   selectedIconPath: "/image/icon_API_HL.png",
				//   text: "接口"
				// }]
			}
		},
		computed: {
			...mapState({
				selected: state => state.tabSelected,
			})
		},
		created() {
		},
		methods: {
			...mapMutations(['setTabSelected','setTabRefresh']),
			switchTab(e) {
			  const data = e.currentTarget.dataset
			  const url = data.path
			  this.setTabSelected(data.index)
			  this.setTabRefresh(true)
			  uni.switchTab({url})
			}
		}
	}
</script>

<style>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 22px;
  height: 22px;
}

.tab-bar-item cover-view {
  font-size: 10px;
}

</style>
