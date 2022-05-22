App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: (res) => {
                console.log(res)
                let totalTopHeight = wx.getMenuButtonBoundingClientRect().bottom + wx.
                getMenuButtonBoundingClientRect().top
                console.log(wx.getMenuButtonBoundingClientRect())
                // bottom -> 底部的位置  top-> 顶部的位置  这两个加起来 就会多出两个状态栏的位置，要算出胶囊的高度
                // bottom + height  56 + 24 = 80  statusBarHeight 20
                this.globalData.statusBarHeight = res.statusBarHeight // 状态栏的高度
                this.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight * 2
            },
            fail: () => {
                this.globalData.statusBarHeight = 20 
                this.globalData.titleBarHeight = 44
            }
        })
    },
    globalData: {
        statusBarHeight: 20,
        titleBarHeight:44
    },
})