
const list = {
    english:"../data/english.js",
    javaScript:"../data/javaScriptData/javaScript.js",
    css:"../data/css.js",
    HTML:"../data/html5/HTML.js",
    "HTML5":"../data/html5/HTML5.js",
    canvas:"../data/html5/canvas.js",
    "h5媒体标签":"../data/html5/audio-video.js",
    "h5获取缓存、定位、陀螺仪":"../data/html5/cache-location-gyroscope.js",
    webpack:"../data/webpackData.js",
    "模块化":"../data/mode.js",
    es6:"../data/javaScriptData/es6.js",
    git:"../data/git.js",
    ajax:"../data/ajax.js",
    "异步编程":"../data/javaScriptData/async.js",
    "包管理器":"../data/nodePackageManager.js"
}
// let html = require(list.HTML)
// let html = require("../data/html5/HTML.js");

const data = {
};

for(let prop in list){
    data[prop] = require(list[prop]);
}

module.exports = data;