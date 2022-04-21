let timer = null
Page({
  data: {
    
    img3DList:[
      {
        firstLoad: true,
        secondLoad: false,
        secondUrl: '',
        firstUrl: 'https://img.chenzhen.shop/2021/12/24/1ff28424-1ba1-4896-9561-f358bb3d4e65.jpg?x-oss-process=image/resize,m_lfit,h_250,w_250,color_FFFFFF,image/format,jpg'
      }
    ],

    startX: 0,
    startY: 0,
    imgIndex: 0,
    movingIndex: 0,
    loadingNum: 0,
    setLeftUp: false,
    moveLeft: false,
    moveUp: false,
    isMoveType: true
  },

  onLoad: function (options) {
    
  },

  moveTypeFn() {
    let {isMoveType} = this.data
    this.setData({
      isMoveType:!isMoveType
    })
  },

  firstImgLoadFn(e) {
    let {firsturl,index} = e.currentTarget.dataset
    this.setData({
      [`img3DList[${index}].secondLoad`]: true,
      [`img3DList[${index}].secondUrl`]: firsturl.split('?')[0]
    })
  },

  secondImgLoadFn(e) {
    let {index} = e.currentTarget.dataset,{loadingNum} = this.data
    this.setData({
      [`img3DList[${index}].firstLoad`]: false,
      loadingNum: 4.17 + loadingNum
    })
  }

})