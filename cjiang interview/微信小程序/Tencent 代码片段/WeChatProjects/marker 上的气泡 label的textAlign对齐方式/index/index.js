
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 34.7681097764,
    longitude: 113.7693285942,
    markers: [{
      id: 1,
      latitude: 34.7681097764,
      longitude: 113.7693285942,

      //气泡label
      label: {
        content: '金水区绿地\n原盛国际1号楼A座9楼',
        color: '#FF0202',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FF0202',
        bgColor: '#ffffff',
        padding: 5,
        textAlign: 'center'  //文本对齐方式
      },
    }],

  },
})