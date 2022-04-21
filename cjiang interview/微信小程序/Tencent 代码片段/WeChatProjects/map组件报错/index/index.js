const app = getApp()
var util= require('../utils/util.js')
var sha1 = require('../utils/sha1')
Page({
    data: {
        userInfo:null,
        totals: [],
        normals: [],
        offlines: [],
        warnings: [],
        isShowNormal: true,
        isNormalImage:'/image/正常.png',
      
        isShowWarning:true,
        isWarningImage:'/image/报警.png',
      
        isShowOffline:true,
        isOfflineImage:'/image/离线.png',
    
        latitude: 23.099994,
        longitude: 113.324520,     
        markers: [{
            id: 1,
            latitude: 40.0873,
            longitude: 116.72,
            name: '啦啦啦',
            iconPath:'/image/地标2.png',
            width:48,
            height:48,
            // callout: {
            //     content: '文本内容',
            //     color: '#ff0000',
            //     fontSize: 14,
            //     borderWidth: 2,
            //     borderRadius: 10,
            //     borderColor: '#000000',
            //     bgColor: '#fff',
            //     padding: 5,
            //     display: 'BYCLICK',   // BYCLICK   ALWAYS
            //     textAlign: 'center'
            // },

            customCallout: {
                anchorY: 0,
                anchorX: 20,
                display: 'BYCLICK',    // BYCLICK   ALWAYS              
            }
        }]

    },

    onReady: function(e) {
        this.mapCtx = wx.createMapContext('myMap')        
        console.log("map onReady")        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log('map onShow');
        this.refresh();
    },


    getStatusList(){
        console.log('getStatusList execlute');
        var str = '[{"id":"960040663339831296","area":"2","areaName":"其他","sn":"001","name":"宏帆","lon":116.72,"lat":40.0873,"limit":2,"netStatus":0,"dataStatus":1,"addr":"永泰园111","user1":"shuke（1565）","user2":"shuke（156）","rtd01":"0.011","rtd02":"15.50","rtd03":"24.10","rtd04":"0.02","rtd05":"0.14","rtd06":"0.00","rate":"0.1000","releasetime":"2020-11-04 07:05:15","sta01":0,"sta02":0,"ele01":0.2,"ele02":0.1,"total01":"0小时0分钟","total02":"0小时0分钟","isvideo":null,"video_0":null,"video_1":null},{"id":"960308667017400320","area":"2","areaName":"其他","sn":"yy202110001","name":"唐山新贝拉","lon":116.694,"lat":40.0863,"limit":2,"netStatus":0,"dataStatus":1,"addr":"唐山滦县","user1":"1（1）","user2":"1（123）","rtd01":"0.026","rtd02":"29.50","rtd03":"25.50","rtd04":"0.00","rtd05":"0.00","rtd06":"0.00","rate":"0.0000","releasetime":"2021-07-11 06:02:00","sta01":0,"sta02":0,"ele01":0,"ele02":0,"total01":"0小时0分钟","total02":"0小时0分钟","isvideo":null,"video_0":null,"video_1":null}]';     
        this.buildAllMarkers(JSON.parse(str));      

    },

    buildAllMarkers(data){
        var that = this;
        var _totals = [];
        var _normals = [];
        var _offlines = [];
        var _warnings = [];
        
        for (var item of data) {         
            //执行代码
            var temp ={};
            temp.id=parseInt(item.id);
            temp.latitude = item.lat;
            temp.longitude = item.lon;
            temp.name = item.name;
            if(item.netStatus != 1){
                temp.iconPath = '/image/地标2.png'; 
                _offlines.push(temp);     
            }
            else if(item.dataStatus == 1){
                temp.iconPath = '/image/地标1.png'; 
                _normals.push(temp);    
            }else{
                temp.iconPath = '/image/地标3.png'; 
                _warnings.push(temp);    
            }
            
            temp.width=48;
            temp.height=48;
            temp.customCallout={};
            temp.customCallout.anchorY=0;
            temp.customCallout.anchorX=20;     
            temp.customCallout.addr = item.addr;

            temp.customCallout.netStatus = item.netStatus;
            temp.customCallout.dataStatus = item.dataStatus;
            temp.customCallout.user1 = item.user1;
            temp.customCallout.user2 = item.user2;
            temp.customCallout.rtd01=item.rtd01;
            temp.customCallout.rtd02=item.rtd02;
            temp.customCallout.rtd03=item.rtd03;
            temp.customCallout.rtd04=item.rtd04;
            temp.customCallout.rtd05=item.rtd05;
            temp.customCallout.rtd06=item.rtd06;
            temp.customCallout.rate=item.rate;
            temp.customCallout.releasetime=item.releasetime;
            temp.customCallout.sta01=item.sta01;
            temp.customCallout.sta02=item.sta02;
            temp.customCallout.ele01=item.ele01;
            temp.customCallout.ele02=item.ele02;
            temp.customCallout.total01=item.total01;
            temp.customCallout.total02=item.total02;
            temp.customCallout.display='BYCLICK';
            _totals.push(temp);
        }
       
        this.setData({
            totals:_totals,
            normals: JSON.parse(JSON.stringify(_normals)),
            offlines: JSON.parse(JSON.stringify(_offlines)),
            warnings: JSON.parse(JSON.stringify(_warnings))       

        });
        this.showStatus();
    },

    refresh:function(){
        var that = this;
        wx.getLocation({
          isHighAccuracy:true,
          success(res){
              console.log("定位后获取的信息：", res)
              that.setData({
                  latitude:res.latitude,
                  longitude:res.longitude
              })
          }
        })

    
        that.setData({
            userInfo: wx.getStorageSync('userInfo')
        })    
  
        this.getStatusList();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log('map onHide')
    },
    getCenterLocation: function() {
        this.mapCtx.getCenterLocation({
            success: function(res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },

    selectNormal:function(e){
        console.log('selectNormal execute');
        if(this.data.isShowNormal){
            this.setData({
                isShowNormal:false,
                isNormalImage:'/image/正常2.png'
            })
        }
        else{
            this.setData({
                isShowNormal:true,
                isNormalImage:'/image/正常.png'
            })
        }
        this.showStatus();
    },

    showStatus(){
        console.log("showStatus execute")
        this.data.markers.length = 0;
        var that = this;
        var _markers = [];
        if(this.data.isShowNormal){
            _markers = _markers.concat(this.data.normals);
        }
        if(this.data.isShowOffline){
            _markers = _markers.concat(this.data.offlines);        
        }
        if(this.data.isShowWarning){
            _markers = _markers.concat(this.data.warnings);
        }
        that.setData({
            markers :_markers
        })                  
    },


    selectOffline:function(e){
        console.log('selectOffline execute');
        if(this.data.isShowOffline){
            this.setData({
                isShowOffline:false,
                isOfflineImage:'/image/离线2.png'
            })
        }
        else{
            this.setData({
                isShowOffline:true,
                isOfflineImage:'/image/离线.png'
            })
        }
        this.showStatus();
    },


    selectWarning:function(e){
        console.log('selectWarning execute');
        if(this.data.isShowWarning){
            this.setData({
                isShowWarning:false,
                isWarningImage:'/image/报警2.png'
            })
        }
        else{
            this.setData({
                isShowWarning:true,
                isWarningImage:'/image/报警.png'
            })
        }
        this.showStatus();
    },

    markertap(e) {
        console.log('markertap execute', e)
        //$("")
    },
    
    callouttap(e) {
        console.log('callouttap execute', e)
    },
    
    labeltap(e) {
        console.log('labeltap execute', e)
    },

    moveToLocation: function() {
        this.mapCtx.moveToLocation()
    },
    translateMarker: function() {
        this.mapCtx.translateMarker({
            markerId: 1,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: 23.10229,
                longitude: 113.3345211,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    includePoints: function() {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    }
})