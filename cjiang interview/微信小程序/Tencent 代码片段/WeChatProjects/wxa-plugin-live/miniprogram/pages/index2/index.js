var plugin = requirePlugin('LiveService');

const systemInfo = wx.getSystemInfoSync();
const windowHeight = systemInfo.windowHeight;

Page({

    data: {
        playerWidth: 'width: 750rpx;',
        playerHeight: 'height: ' + windowHeight + 'px;',
        playerStyle: 'width: 750rpx;height: ' + windowHeight / 2 + 'px;',
        videoStyle: 'width: 750rpx;',
    },

    onLoad: function () {
        // plugin.getData();
    },

    onReady() {
        // setTimeout(() => {
        //     this.player = this.selectComponent('#livePlayer');
        //
        //     console.log(this.player);
        //
        //     this.player.play();
        // }, 1000)

    },

    onShow() {

    },

    handlePlayerContext(event) {
        this.context = event.detail;
        console.log(event);

        this.context.play({
            success(res) {
                console.log('success', res);
            },
            fail(res) {
                console.log('fail', res);
            }
        });
    },

    handleVideoContext(event) {
        this.videoContext = event.detail;
        this.videoContext.play();
    },

    handleNavigate() {
        console.log('stop')
        this.context.pause({
            success(res) {
                console.log(res)
            },
            fail(res) {
                console.log(res)
            },
        });
    },

    methods: {

    }
});
