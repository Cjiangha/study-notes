// plugin/components/LiveRoom/index.js

Component({
    /**
     * Component properties
     */
    properties: {
        src: {
            type: String,
        },
        mode: {
            type: String,
        },
        autoplay: {
            type: Boolean,
        },
        muted: {
            type: Boolean,
        },
        orientation: {
            type: String,
        },
        objectFit: {
            type: String,
        },
        minCache: {
            type: Number,
        },
        maxCache: {
            type: Number,
        },
        soundMode: {
            type: String,
        },
        autoPauseIfNavigate: {
            type: Boolean,
        },
        autoPauseIfOpenNative: {
            type: Boolean,
        },
        className: {
            type: String,
        },
        classStyle: {
            type: String,
        },
        pictureInPictureMode: {
            type: [String, Array],
        },
    },

    /**
     * Component initial data
     */
    data: {
        // roomPlayUrl: 'http://live-test.wanwudezhi.com/wwdz/100005.flv',
        // groupId: '100005',
        // windowHeight,
    },

    created() {
    },
    attached() {
        this.context = wx.createLivePlayerContext('player', this);
        this.triggerEvent('playercontext', this.context);
    },
    ready() {
    },
    moved() {
    },
    detached() {
    },

    /**
     * Component methods
     */
    methods: {
        handleEnterpictureinpicture(event) {
            this.triggerEvent('enterpictureinpicture', event.detail);
        },
        handleLeavepictureinpicture(event) {
            this.triggerEvent('leavepictureinpicture', event.detail);
        },
        handleStateChange(event) {
            this.triggerEvent('statechange', event.detail);
        },
        handleFullScreenChange(event) {
            this.triggerEvent('fullscreenchange', event.detail);
        },
        handleNetStatus(event) {
            this.triggerEvent('netstatus', event.detail);
        },
        handleError(event) {
            this.triggerEvent('error', event.detail);
        },

        play(options) {
            this.context.play(options);
        },
        stop(options) {
            this.context.stop(options);
        },
        mute(options) {
            this.context.mute(options);
        },
        pause(options) {
            this.context.pause(options);
        },
        resume(options) {
            this.context.resume(options);
        },
        requestFullScreen(options) {
            this.context.requestFullScreen(options);
        },
        exitFullScreen(options) {
            this.context.exitFullScreen(options);
        },
    },
});
