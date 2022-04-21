// index.js
// 获取应用实例
const app = getApp()

Page({
  
    data: {
      data:
      [{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"787.36","name":"老街称盘麻辣烫-银川解放西街店","alias":"银川解放西街店","businessDays":"11","shopId":"200611","paidAmount":"569.06","paidAmountChainRatio":"-94.45","netProfit":"-21793.13","dayPaidAmount":"51.73","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"1682.46","name":"老街称盘麻辣烫-湖北恩施学院路店","alias":"湖北恩施学院路店","businessDays":"15","shopId":"201106","paidAmount":"1213.05","paidAmountChainRatio":"-19.57","netProfit":"-29560.88","dayPaidAmount":"80.87","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"167.00","name":"老街称盘麻辣烫-甘肃陇南武都区店","alias":"甘肃陇南武都区店","businessDays":"2","shopId":"201413","paidAmount":"167.00","paidAmountChainRatio":"-93.45","netProfit":"-3909.82","dayPaidAmount":"83.50","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"2577.40","name":"老街称盘麻辣烫-山东省德州市庆云县未来城店","alias":"山东省德州市庆云县未来城店","businessDays":"17","shopId":"201431","paidAmount":"1985.22","paidAmountChainRatio":"-78.18","netProfit":"-33200.38","dayPaidAmount":"116.78","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":"疑似外流(扫码支付过低)","forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"2997.83","name":"老街称盘麻辣烫-河南省商丘睢宁区归德路店","alias":"河南省商丘睢宁区归德路店","businessDays":"8","shopId":"201405","paidAmount":"1406.59","paidAmountChainRatio":"-48.68","netProfit":"-15972.41","dayPaidAmount":"175.82","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"3035.00","name":"老街称盘麻辣烫-凉山喜德凉山喜德春生金都宝邸店","alias":"凉山喜德凉山喜德春生金都宝邸店","businessDays":"15","shopId":"201225","paidAmount":"3035.00","paidAmountChainRatio":"-32.79","netProfit":"-28361.1","dayPaidAmount":"202.33","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"5159.04","name":"老街称盘麻辣烫-安徽六安霍山新天地店","alias":"安徽六安霍山新天地店","businessDays":"16","shopId":"201472","paidAmount":"3287.54","paidAmountChainRatio":"-24.45","netProfit":"-31085.62","dayPaidAmount":"205.47","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"5516.10","name":"老街称盘麻辣烫-山西太原古交义学路店","alias":"山西太原古交义学路店","businessDays":"17","shopId":"201108","paidAmount":"4427.92","paidAmountChainRatio":"15.78","netProfit":"-32109.49","dayPaidAmount":"260.47","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"5817.00","name":"老街称盘麻辣烫-泸州龙马潭商贸城店","alias":"泸州龙马潭商贸城店","businessDays":"17","shopId":"201309","paidAmount":"5635.54","paidAmountChainRatio":"32.46","netProfit":"-31040.28","dayPaidAmount":"331.50","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"3584.20","name":"老街称盘麻辣烫-厦门集美区天马路店","alias":"厦门集美区天马路店","businessDays":"10","shopId":"201209","paidAmount":"3462.27","paidAmountChainRatio":"-49.88","netProfit":"-18186.46","dayPaidAmount":"346.23","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"1733.00","name":"老街称盘麻辣烫-凉山德昌凤凰大道店","alias":"凉山德昌凤凰大道店","businessDays":"5","shopId":"201153","paidAmount":"1733.00","paidAmountChainRatio":"-66.97","netProfit":"-9064.18","dayPaidAmount":"346.60","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"5832.00","name":"老街称盘麻辣烫-河北邢台巨鹿县店","alias":"河北邢台巨鹿县店","businessDays":"16","shopId":"201426","paidAmount":"5747.28","paidAmountChainRatio":"-33.07","netProfit":"-28935.44","dayPaidAmount":"359.21","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":"疑似外流(扫码支付过低)","forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"3675.20","name":"老街称盘麻辣烫-江西九江店","alias":"江西九江店","businessDays":"10","shopId":"200649","paidAmount":"3675.20","paidAmountChainRatio":"74.02","netProfit":"-18015.39","dayPaidAmount":"367.52","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"4837.00","name":"老街称盘麻辣烫-广安陡石梯路店","alias":"广安陡石梯路店","businessDays":"13","shopId":"200612","paidAmount":"4837.00","paidAmountChainRatio":"-25.35","netProfit":"-23388.02","dayPaidAmount":"372.08","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"7117.00","name":"老街称盘麻辣烫-新都石油大学店","alias":"新都石油大学店","businessDays":"17","shopId":"200605","paidAmount":"7090.70","paidAmountChainRatio":"-1.32","netProfit":"-30183.12","dayPaidAmount":"417.10","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"10227.61","name":"老街称盘麻辣烫-南充蓝光COCO香江店","alias":"南充蓝光COCO香江店","businessDays":"17","shopId":"201134","paidAmount":"7094.69","paidAmountChainRatio":"-26.70","netProfit":"-31610.01","dayPaidAmount":"417.33","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"9071.80","name":"老街称盘麻辣烫-河北省张家口市建设西街店","alias":"河北省张家口市建设西街店","businessDays":"17","shopId":"201432","paidAmount":"7345.85","paidAmountChainRatio":"22.87","netProfit":"-30827.18","dayPaidAmount":"432.11","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"5829.20","name":"老街称盘麻辣烫-太原万柏林区和平花苑店","alias":"太原万柏林区和平花苑店","businessDays":"13","shopId":"201171","paidAmount":"5691.08","paidAmountChainRatio":"-33.61","netProfit":"-22990.35","dayPaidAmount":"437.78","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"10024.00","name":"老街称盘麻辣烫-哈尔滨南岗店","alias":"哈尔滨南岗店","businessDays":"17","shopId":"201101","paidAmount":"7864.48","paidAmountChainRatio":"-16.34","netProfit":"-30746.56","dayPaidAmount":"462.62","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":null,"forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"},{"specialFocus":"0","shopClassify":"亏损门店","foodAmount":"8090.90","name":"老街称盘麻辣烫-四川凉山冕宁县泸沽商业街店","alias":"四川凉山冕宁县泸沽商业街店","businessDays":"15","shopId":"201146","paidAmount":"7378.81","paidAmountChainRatio":"-19.13","netProfit":"-26343.0","dayPaidAmount":"491.92","orderGoodsPrice":"0.00","orderGoodsPriceChainRatio":"0.00","supplychainPercentage":"0.00","abnormalMessage":"疑似外流(扫码支付过低)","forcedPurchaseOrderAmount":"0","forcedPurchaseOrderAmountChainRatio":"0.00"}],
      dataAttribute: [
        {
          title: '第一列',
          key: 'specialFocus'
        },
        {
          title: '第2列',
          key: 'shopClassify'
        },
        {
          title: '第3列',
          key: 'foodAmount'
        },
        {
          title: '第4列',
          key: 'name'
        },
        {
          title: '第5列',
          key: 'alias'
        },
        {
          title: '第6列',
          key: 'businessDays'
        },
        {
          title: '第7列',
          key: 'shopId'
        },
        {
          title: '第8列',
          key: 'paidAmount'
        },
        {
          title: '第9列',
          key: 'paidAmountChainRatio'
        },
        {
          title: '第10列',
          key: 'netProfit'
        },
        {
          title: '第11列',
          key: 'dayPaidAmount'
        }
        ,
        {
          title: '第12列',
          key: 'orderGoodsPrice'
        }
        ,
        {
          title: '第13列',
          key: 'orderGoodsPriceChainRatio'
        },
        {
          title: '第14列',
          key: 'supplychainPercentage'
        },
        {
          title: '第15列',
          key: 'abnormalMessage'
        },
        {
          title: '第16列',
          key: 'forcedPurchaseOrderAmount'
        },
        {
          title: '第17列',
          key: 'forcedPurchaseOrderAmountChainRatio'
        }
      ],
      tableHeight: (20 + 1) * 96,
      tableWidth: 200 * 6 + 60
    }
  }
)
