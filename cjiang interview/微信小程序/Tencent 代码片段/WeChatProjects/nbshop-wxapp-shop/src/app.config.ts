export default {
  entryPagePath: 'pages/index/index', // 默认打开页面
  pages: [
    'pages/index/index',
  ],

  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle": "black"
  },
  tabBar: {
    color: '#f7f7f7',
    borderStyle: 'white',
    backgroundColor: '#f7f7f7',
    selectedColor: '#f7f7f7',
    list: [
      {
        pagePath: 'pages/index/index',
        // text: '商品列表',
      },
      {
        pagePath: 'pages/index/index',
        // text: '我的',
      },
    ],
  },
  sitemapLocation: 'sitemap.json',
};
