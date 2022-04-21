"use strict";
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        listPage: {
            observer: function (newVal) {
                this.setData({ loaddingStr: "点击加载下一页" });
            }
        },
        listLength: {
            value: 0,
            observer: function (newVal) {
                this.setData({ listLen: newVal || 0 });
            }
        },
        hideNoList: {
            type: Boolean,
            value: false,
        },
        filter: null,
        tip: {
            type: String,
            value: "",
        }
    },
    data: {
        listLen: 0,
        listPage: {
            page: 0,
            page_count: 1,
        },
        loaddingStr: "点击加载下一页"
    },
    methods: {
        getList: function () {
            this.triggerEvent('getList');
        },
        listLoadding: function (hasStorageList) {
            if (hasStorageList != undefined) {
                if (hasStorageList) {
                    this.setData({
                        listPage: {
                            page: 1,
                            page_count: 2,
                        }
                    });
                }
                else {
                    this.setData({
                        listPage: {
                            page: 1,
                            page_count: 1,
                        }
                    });
                }
            }
            this.setData({ loaddingStr: "加载中，请稍后..." });
        }
    }
});
