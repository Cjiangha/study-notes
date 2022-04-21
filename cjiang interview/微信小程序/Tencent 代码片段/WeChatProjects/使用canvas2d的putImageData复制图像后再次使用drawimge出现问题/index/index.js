const app = getApp()

Page({
  data: {

  },
  onLoad() {
  },

  frameSelect:function(tempFilePaths){
    var that = this,
    imgRatio = 1,
    dots = [];
    const maxWeight = 680;

    wx.createSelectorQuery().select('#cvs').fields({ node: true, size: true }).exec((res) => {
        const dpr = 750 / wx.getSystemInfoSync().windowWidth;
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        canvas.width = res[0].width*dpr;
        canvas.height = res[0].height*dpr;
        ctx.scale(dpr, dpr);
        const count = 4;
        
        that._canvas = res[0].node;
        that._ctx = res[0].node.getContext('2d');

        var img = canvas.createImage();
        img.onload = () => {
          
            var img_w = img.width,
            img_h = img.height;
          
            if (img_w > maxWeight) {
                imgRatio = maxWeight / dpr / img_w;
                img_h *= imgRatio;
                img_w = maxWeight / dpr;
            }
            var left = (canvas.width - img_w*dpr) / 2 /dpr;
            var top = (canvas.height - img_h*dpr) / 2 /dpr;

            dots = [
            { x: left, y: top },
            { x: left + img_w, y: top },
            { x: left + img_w, y: top + img_h },
            { x: left, y: top + img_h },
            ];
            console.log(img.width*imgRatio/dpr);
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                dots[0].x,
                dots[0].y,
                img.width*imgRatio,
                img.height*imgRatio,
            );
            var dataImg = ctx.getImageData(dots[0].x*dpr,dots[0].y*dpr,(dots[1].x-dots[0].x)*dpr,(dots[2].y-dots[1].y)*dpr);
            ctx.clearRect(0,0,canvas.width,canvas.height);

            ctx.putImageData(dataImg,dots[0].x*dpr,dots[0].y*dpr,0,0,(dots[1].x-dots[0].x)*dpr*dpr,(dots[2].y-dots[1].y)*dpr);
            var imgSrc = canvas.toDataURL("image/png");

            that._img = img;

            var img2 = canvas.createImage();
            img2.src = imgSrc;
            img2.onload  = function(){
                ctx.clearRect(0,0,canvas.width,canvas.height);
                var w = img2.width / 4;
                var h = img2.height / 4;
                ctx.drawImage(
                    img2,
                    0,
                    0,
                    w*1,
                    h*1,
                    0,
                    0,
                    w/dpr,
                    h/dpr,
                );
            }
          }
          img.src = "pic/test.jpg";
          

            
        

        
        
        //ctx.clip();
                
        /*wx.getImageInfo({
            src: tempFilePaths[0].path,
            success: function (img2) {
                
            }
        })*/
    })

    
},

        
        
        

        
})
