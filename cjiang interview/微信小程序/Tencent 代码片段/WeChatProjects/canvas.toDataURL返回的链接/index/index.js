Page({
  data: {
    src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202011%2F17%2F20201117105437_45d41.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639305186&t=f84306a8c8465cc8080f95fad427ff2c',
    cHeight: 0, cWidth: 0,
    img: ''
  },
  onLoad() {
    var _this = this, maxWH = 200
    const query = wx.createSelectorQuery()
    wx.getImageInfo({
      src: _this.data.src,
      success: function (res) {
        console.log(res)
        var cW = res.width, cH = res.height;
        if (cW <= maxWH && cH <= maxWH) {
          wx.hideLoading();
          _this.setData({ maskFlag: true })
          return;
        }
        var cWidth = cW;
        var cHeight = cH;
        if (cWidth > maxWH) {
          cHeight = cHeight * (maxWH * 1.00 / cWidth);
          cWidth = maxWH;
        }
        if (cHeight > maxWH) {
          cWidth = cWidth * (maxWH * 1.00 / cHeight);
          cHeight = maxWH;
        }
        _this.setData({ cHeight: cHeight, cWidth: cWidth });
        console.log(cHeight)
        // const imagePath=new Image();
        // imagePath.src=res.path;
        // var imagePath = res.path;
        query.select('#myCanvas')
          .fields({ node: true, size: true })
          .exec((r) => {
            console.log(r)
            const canvas = r[0].node
            const ctx = canvas.getContext('2d')
            var seal = canvas.createImage();
            seal.src = res.path;
            seal.onload = () => {
              ctx.drawImage(seal, 0, 0, cW, cH, 0, 0, cWidth, cHeight);
            }
            var url = canvas.toDataURL('image/jpeg', 1);
            console.log(url)
            _this.setData({
              img: url
            })
          })
      },
    });
  }
})