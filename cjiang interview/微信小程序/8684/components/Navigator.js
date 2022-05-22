var app = getApp()
let ps;
Component({
    /*  
        思路：
            1、左侧 
                第一种case：可以修改成对应的图标
                    第一个图标可以定位到当前的城市
                第二种case：可以修改成文字，//最普通的一种nav，即不引入自定义导航原生的导航
                    第三个tabbar的 nav 图标可以把定位的数据做个数据管理，然后把值传递过来
                第三种case：把她做成一个图标 + 返回按键，比如图标按钮里有收藏的功能
                第四种case:

                  1、只有title 值 最普通的，直接是原生的导航栏
                  2、我是自定义的标题，可以修改自定义标题title的值
                      <Navigator title=""></Navigator>
                  3、显示返回的按键以及返回的文字
                       <Navigator title="" buttonName="{{按键}}" tabbar="{{notabbar}}"></Navigator>
                  4、显示主页按钮
                       <Navigator title="" buttonName="{{主页}}" tabbar="{{notabbar}}">></Navigator>
                  5、主页不在tabbar上
                       <Navigator title="" buttonName="{{主页}}" tabbar="{{tabbar}}"></Navigator>
    */
    properties: {
      title: {
        type: String,
        value: '青团社兼职'
      },
      /*

      */ 
      type:{
        type:String,
        value:''
      }

    },
    data: {
        statusBarHeight: '',
        titleBarHeight: '',
    },

    attached() {
        console.log(111)
        ps = getCurrentPages();//当前页面栈
        // ps[ps.length-1].setData({
        //     addMiniTop: t.data.custom.top+t.data.custom.height+10,
        //     addMiniRight: Math.ceil(3*t.data.custom.width/4)-6
        //   })
        console.log('test')
        let pageContext = getCurrentPages()
        if (pageContext.length > 1) {
            this.setData({
                isShowHome: false
            })
        } else {
            this.setData({
                isShowHome: true
            })
        }
        this.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        })
        console.log(app.globalData.statusBarHeight)
        console.log(app.globalData.titleBarHeight)
    },

})