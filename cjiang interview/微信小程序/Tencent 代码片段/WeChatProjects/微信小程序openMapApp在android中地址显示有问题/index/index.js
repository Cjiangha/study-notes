// pages/map/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        longitude:106.33,
        latitude:26.60322,
        destination:'天一国际广场',
        map:null,
        circles:[],
        backBtnTop:20
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this
        self.setMapData( self.data.latitude,self.data.longitude,self.data.destination)
        const map = wx.createMapContext('map-h5', wx.createSelectorQuery().select('#map-h5'))
        const MBtn = wx.getMenuButtonBoundingClientRect()
        this.setData({
            map,
            backBtnTop:MBtn.top + (MBtn.height-26)/2
        })
    },
    setMapData(latitude,longitude,destination){
        this.setData({
            latitude,
            longitude,
            destination,
            circles:[{
                longitude,
                latitude,
                radius:60,
                color:'#bae7ff88',
                fillColor:'#bae7ff88'
            }]
        })
    },
    openMapApp(){
        this.data.map.openMapApp({
            latitude:this.data.latitude,
            longitude:this.data.longitude,
            name:this.data.destination,
            destination:this.data.destination||'',
            fail(){
                wx.showModal({
                  title: '打开失败',
                  content:'请检查你的网络或者打开定位服务'
                })
            }
        })
    },
    goBack(){
        wx.navigateBack()
    },
    onMoveToLocation(){
        this.data.map.moveToLocation();
    },
})