let app = getApp()
function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
    }
  }
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form:{
            code:'',
            bindCode:'',
            time:0,
            notime:0,
            times:0
        },
        isLight:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    inputForm:function(data){
        let name = data.currentTarget.dataset.name
        let value = data.detail.value
        let node = `form.${name}`
        this.setData({
            [node]:value
        })
    },
    takePhotos:function(){
        if(this.data.form.code == ''){
            return app.toast("请输入设备编码");
        }
        let arr = app.stringB(this.data.form.code)
        let str = arr.join("").padStart(32,0);
        str = str.split('').reverse().join('');
        this.setData({
            ['form.bindCode']:str
        })
        /*****************执行闪光功能*************/
        this.lightDispose(1)
        sleepFor(500);
        this.lightDispose(2);
        sleepFor(1000);

        let list = str.split("")
        
        for(let i = 0 ; i<list.length;i++){
            let item = list[i]
            if(item == 0){
                this.lightDispose(1)
                sleepFor(400);
                this.lightDispose(2)
                sleepFor(300);
            }else{
                this.lightDispose(1)
                sleepFor(400);
                this.lightDispose(2)
                sleepFor(800);
            }
        }
        this.lightDispose(1)
        sleepFor(200);
        this.lightDispose(2)
        /************************************** */
        
    },
    takePhoto:function(){
        if(this.data.form.code == ''){
            return app.toast("请输入设备编码");
        }
        let arr = app.stringB(this.data.form.code)
        let str = arr.join("").padStart(32,0);
        str = str.split('').reverse().join('');
        this.setData({
            ['form.bindCode']:str
        })
        /*****************执行闪光功能*************/
        this.lightDispose(1)
        sleepFor(900);
        this.lightDispose(2);
        sleepFor(4500);

        let list = str.split("")
        
        for(let i = 0 ; i<list.length;i++){
            let item = list[i]
            if(item == 0){
                this.lightDispose(1)
                sleepFor(600);
                this.lightDispose(2)
                sleepFor(600);
            }else{
                this.lightDispose(1)
                sleepFor(600);
                this.lightDispose(2)
                sleepFor(1800);
            }
        }
        this.lightDispose(1)
        sleepFor(600);
        this.lightDispose(2)
        /************************************** */
        
    },
    takeTest(){
        if(this.data.form.time == ''){
            return app.toast("请输入光亮时长");
        }
        let times = this.data.form.times
        let time = this.data.form.time
        let notime = this.data.form.notime
        let i = 0
        let selff = function(obj,times,time,notime,i){
            if(i<times){
                obj.lightDispose(1)
                obj.sleepFor(parseInt(time));
                obj.lightDispose(2)
                obj.sleepFor(parseInt(notime));
                selff(obj,times,time,notime,i+1);
            }
            return 0;
        }
        selff(this,times,time,notime,i);
    },
   sleepFor(sleepDuration){
        var now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ 
        }
        return sleepDuration
    },

    lightDispose(type = 1){
        if(type == 1){
            this.setData({
                ['isLight']:true
            })
        }else{
            this.setData({
                ['isLight']:false
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})