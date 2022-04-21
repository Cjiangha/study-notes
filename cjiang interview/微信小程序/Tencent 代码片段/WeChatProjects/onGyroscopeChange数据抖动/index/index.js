const app = getApp()

Page({
  data: {

	},
	error(e){
		console.log(e)
	},
  onLoad() {
    const that = this
	// wx.startGyroscope({
	// 	interval:"normal",
	// 	success:function(res){
	// 		that.testGyroscope()
	// 		// console.log(res,'测试数据')
	// 	}
	// },this)
  // },

  // testGyroscope(){//测试陀螺仪
	//   wx.onGyroscopeChange((res)=>{
	// 	  console.log(`x:${res.x}`,`y:${res.y}`,`z:${res.z}`,res)
	//   })
  },

})
