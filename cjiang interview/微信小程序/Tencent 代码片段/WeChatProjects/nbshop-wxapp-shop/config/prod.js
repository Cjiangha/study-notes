
export default {
  env: {
    NODE_ENV: '"production"',
    BASE_URL: 'https://nbshop-customer-dev.icc.link',
    OSS_URL:'https://nbshop-dev-public.oss-cn-beijing.aliyuncs.com'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
};
