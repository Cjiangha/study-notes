// plugin/components/Video/index.js

Component({
    /**
     * Component properties
     */
    properties: {
        src: {
            type: String,
        },
        duration: {
            type: Number,
        },
        controls: {
            type: Boolean,
        },
        danmuList: {
            type: Array,
        },
        danmuBtn: {
            type: Boolean,
        },
        enableDanmu: {
            type: Boolean,
        },
        autoplay: {
            type: Boolean,
        },
        loop: {
            type: Boolean,
        },
        muted: {
            type: Boolean,
        },
        initialTime: {
            type: Number,
        },
        pageGesture: {
            type: Boolean,
        },
        direction: {
            type: Number,
        },
        showProgress: {
            type: Boolean,
        },
        showFullscreenBtn: {
            type: Boolean,
        },
        showPlayBtn: {
            type: Boolean,
        },
        showCenterPlayBtn: {
            type: Boolean,
        },
        enableProgressGesture: {
            type: Boolean,
        },
        objectFit: {
            type: String,
        },
        poster: {
            type: String,
        },
        showMuteBtn: {
            type: Boolean,
        },
        title: {
            type: String,
        },
        playBtnPosition: {
            type: String,
        },
        enablePlayGesture: {
            type: Boolean,
        },
        autoPauseIfNavigate: {
            type: Boolean,
        },
        autoPauseIfOpenNative: {
            type: Boolean,
        },
        vslideGesture: {
            type: Boolean,
        },
        vslideGestureInFullscreen: {
            type: Boolean,
        },
        adUnitId: {
            type: String,
        },
        posterForCrawler: {
            type: String,
        },
        className: {
            type: String,
        },
        classStyle: {
            type: String,
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
        this.context = wx.createVideoContext('video', this);
        this.triggerEvent('videocontext', this.context);
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
        handlePlay(event) {
            this.triggerEvent('play', event.detail);
        },
        handlePause(event) {
            this.triggerEvent('pause', event.detail);
        },
        handleEnded(event) {
            this.triggerEvent('ended', event.detail);
        },
        handleTimeUpdate(event) {
            this.triggerEvent('timeupdate', event.detail);
        },
        handleFullScreenChange(event) {
            this.triggerEvent('fullscreenchange', event.detail);
        },
        handleWaiting(event) {
            this.triggerEvent('waiting', event.detail);
        },
        handleError(event) {
            this.triggerEvent('error', event.detail);
        },
        handleProgress(event) {
            this.triggerEvent('progress', event.detail);
        },
        handleLoadedMetaData(event) {
            this.triggerEvent('loadedmetadata', event.detail);
        },

        play(options) {
            this.context.play(options);
        },
        stop(options) {
            this.context.stop(options);
        },
        pause(options) {
            this.context.pause(options);
        },
        seek(options) {
            this.context.seek(options);
        },
        sendDanmu(options) {
            this.context.sendDanmu(options);
        },
        showStatusBar(options) {
            this.context.showStatusBar(options);
        },
        requestFullScreen(options) {
            this.context.requestFullScreen(options);
        },
        exitFullScreen(options) {
            this.context.exitFullScreen(options);
        },
        hideStatusBar(options) {
            this.context.hideStatusBar(options);
        },
        playbackRate(options) {
            this.context.playbackRate(options);
        },
    },
});
