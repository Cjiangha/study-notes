module.exports = {
  lintOnSave: false,
  devServer: {
    //跨域
    proxy: { //配置多个跨域
      "/api": {
         //目标路径
        target: "https://shopapi.smartisan.com",
        //允许跨域
        changeOrigin: true,
        // ws: true,//websocket支持
        // secure: false,
        //重写路径
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
};
