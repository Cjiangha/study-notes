var plugin = requirePlugin('LiveService');

const systemInfo = wx.getSystemInfoSync();
const windowHeight = systemInfo.windowHeight;

Page({

    data: {
        playerWidth: 'width: 750rpx;',
        playerHeight: 'height: ' + windowHeight + 'px;',
        playerStyle: 'width: 750rpx;height: ' + windowHeight / 2 + 'px;',
        videoStyle: 'width: 750rpx;',
        pictureMode: ["push", "pop"],
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
        console.log('test')
        Object.defineProperty(Array.prototype, 'toString', {
            value: '1',
            writable: false
        });
    },

    handleEnterpictureinpicture(e) {
        console.log('handleEnterpictureinpicture', e);
    },

    handleLeavepictureinpicture(e) {
        console.log('handleLeavepictureinpicture', e);
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
        // this.context.pause({
        //     success(res) {
        //         console.log(res)
        //     },
        //     fail(res) {
        //         console.log(res)
        //     },
        // });
        wx.navigateTo({
            url: '/pages/index2/index',
        });
    },

    methods: {

    }
});
