const app = getApp()
const gamago= require("../utils/gamago");

Page({
  data: {
    ccc_:0
  },
  onLoad() {
    console.log('drawImage执行到500多次时栈溢出，持续点击按钮画布消失时报错，次错误在ios手机上出现')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')

    // let ccc_ = 0;
    // let that =this;
    //此处模拟画面刷新次数，更改此处循环次数发现bug，微信ios版本测试
    for(let i=1; i<520; i++){
      this.drawQipan()
    }

  },

  drawQipan: function(){
    // console.log('循环次数===>'+i);
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    if(windowWidth > 500){
      windowWidth = 700;
    }
    this.setData({
      weiqiCW:windowWidth,
      weiqiCH: windowWidth*399/375
    });

    let query = wx.createSelectorQuery()
    let dpr = wx.getSystemInfoSync().pixelRatio;//像素比
    let cols = 19, rows = 19, boardBg = '/image/qipan.png';
    let minW, minWH, canvasH ;


    query.select('#weiqi')
    .fields({ node: true, size: true })
    .exec((res) => {
      let width = res[0].width * dpr
			let height = res[0].height * dpr
			let canvasRH = height
      let canvas = res[0].node 
      let img
			if(img == null || img === undefined){
				canvas.width = width 
				canvas.height = height
			}
			let canvasW = width
      minW = width/(cols+1)//最小单元格长度
			minWH = minW/2//棋子半径
			canvasH = minW*(rows+1)
			
      // showPan(); 
      let cxt = canvas.getContext('2d');
      img = canvas.createImage()
				img.src = boardBg;
	
				img.onload = () => {
          let ccc_=this.data.ccc_;
					console.log('ccc_===>'+ccc_);
          cxt.drawImage(img,0,0,canvasW,canvasRH);/**这里运行到一定次数栈溢出 */
          console.log('drawImage');
          ccc_++;
          this.setData({ccc_:ccc_});
					// showPanCxt(cxt);
          // drawKPS(cxt);
          return ccc_;
				}
		});
  }

})

function convert2Asc(c){
	let c_ = c.charCodeAt(0);
    if(c_ < 105){
      c_ = c_-97;
    }else{
      c_ = c_-97;
    }
    return c_;
}

function getiPan(r_, c_){
	let panRarr = new Array();
	for(let i=0; i<r_; i++){
		let panCarr = new Array();
		for(let j=0; j<c_; j++){
			panCarr[j] = 0;
		}
		panRarr[i] = panCarr;
	}
	return panRarr;
}
