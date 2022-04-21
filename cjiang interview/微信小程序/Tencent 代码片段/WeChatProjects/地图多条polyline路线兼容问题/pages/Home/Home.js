import { anyui } from '@alife/anyui-wx-framework/index.js';
import { createPage } from "@alife/anyui-wx-framework/index.js";

import { containerCreatedQueryCache } from "../../common/cache/Cache";
import { containerFirstOnShowOptionsCache } from "../../common/cache/Cache";
createPage(
  createOptions({
    name: "Home",
    data: {
      onShowListeners: [],
      onHideListeners: [],
    },
    methods: {
      registerOnShow(listener) {
        this.onShowListeners.push(listener);
      },

      registerOnHide(listener) {
        this.onHideListeners.push(listener);
      },
    },

    created(...query) {
      containerCreatedQueryCache.set(query);
      anyui.navigateTo({
        url: '/onlineCar/online_going/page/OnlineSelectRoutes',
      })
    },

    onShow(...options) {
      if (!this.isFirstShowed) {
        this.isFirstShowed = true;
        containerFirstOnShowOptionsCache.set(options);
      } else {
        containerFirstOnShowOptionsCache.set([]);
        this.onShowListeners.forEach(
          (listener) => listener && listener(...options)
        );
      }

    },

    onHide(...options) {
      this.onHideListeners.forEach(
        (listener) => listener && listener(...options)
      );
    },

    mounted() {
      wx.hideHomeButton();
    },

    beforeDestroy() {
      containerCreatedQueryCache.set([]);
      containerFirstOnShowOptionsCache.set([]);
    },

    computed: {},
  })
);

function createOptions(opts = {}) {
  opts.methods["registerOnShow_custHd_1"] = function (e) {
    this.registerOnShow(...e.detail.$event);
  };

  opts.methods["registerOnHide_custHd_2"] = function (e) {
    this.registerOnHide(...e.detail.$event);
  };

  opts.methods.returnRef = function (e) {
    e.detail.ref.$parentComponentRef = this;
  };

  opts.$renderKeys = ["__ready__", "proputil"];
  return opts;
}
