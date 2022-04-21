const app = getApp()

Page({
    data: {

    },

    onLoad() {
        // console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
        // console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
        wx.chooseMessageFile({
            count: 10,
            type: 'image',
            success (res) {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFiles
              console.log(res)
            
            }
          })


    },

    scrollToBottom: function () {
        wx.createSelectorQuery()
            .select('#scroll-test')
            .node()
            .exec((res) => {
                const scrollView = res[0].node;
                // scrollView.scrollEnabled = false;
                scrollView.scrollTo({
                    animated: true,
                    duration: 5000,
                    top: 500
                })
            })
    },

    scrollToTop: function () {
        wx.createSelectorQuery()
            .select('#scroll-test')
            .node()
            .exec((res) => {
                const scrollView = res[0].node;
                // scrollView.scrollEnabled = false;
                scrollView.scrollTo({
                    animated: true,
                    duration: 3000,
                    top: 0
                })
            })
    }
})
