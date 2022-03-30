(function () {
    //1、 最大的轮播图
    carouselimg({
        ele: 'box',//最外层id名(必选参数)
        iw: 100,//盒子的宽和高(可选参数)
        ih: 425,//盒子的宽和高(可选参数)
        imgdata: ['images/shouyelunbo1.jpg', 'images/shouyelunbo2.jpg', 'images/shouyelunbo3.jpg', 'images/shouyelunbo4.jpg'],//图片数据(必选参数)
        time: 2//切换图片的秒数(可选参数)
    });



    // let bigpic = box.getElementsByClassName('imglist')[0];
    // let light = box.getElementsByClassName('light')[0];
    // bigpic.style = box.style = `width:100%`;


    //2、右边选项卡一样的东西移入移出
    $('.hd ul li').eq(0).mouseenter(() => {
        // $('.news_top').find('div').eq(1).hide();
        $('.news_top').find('div').eq(0).stop().fadeIn(500).siblings().hide();
        $('.hd ul li').eq(0).addClass('on');
        $('.hd ul li').eq(1).removeClass('on');
    });

    $('.hd ul li').eq(1).mouseenter(() => {
        // $('.news_top').find('div').eq(0).show();
        $('.news_top').find('div').eq(1).stop().fadeIn(500).siblings().hide();
        $('.hd ul li').eq(1).addClass('on');
        $('.hd ul li').eq(0).removeClass('on');
    });

    // 轮播图封装
    easylunbo(
        opt = {
            ele: '#lunbo1',
            imgarr: ['images/1F_LUNBO1.jpg', 'images/1F_LUNBO2.jpg'],
        });
    easylunbo(
        opt = {
            ele: '#lunbo2',
            imgarr: ['images/1F_LUNBO1.jpg', 'images/1F_LUNBO2.jpg'],
        });
    easylunbo(
        opt = {
            ele: '#lunbo3',
            imgarr: ['images/1F_LUNBO1.jpg', 'images/1F_LUNBO2.jpg'],
        });
    easylunbo(
        opt = {
            ele: '#lunbo4',
            imgarr: ['images/1F_LUNBO1.jpg', 'images/1F_LUNBO2.jpg'],
        });



    //1F渲染
    arr = ['肺癌', '乳腺癌', '胃癌', '肝癌', '肾癌', '移植血病', '罕见病', '血液病', '男科肿瘤', '妇科肿瘤'];

    //1楼列表遍历
    var str2 = arr.map(function (item) {
        return ` <a href="###">${item}</a>`;
    }).join('');
    //1楼图遍历
    arr2 = ['images/1F_LOGO.jpg', 'images/1F_LOGO.jpg', 'images/1F_LOGO.jpg', 'images/1F_LOGO.jpg', 'images/1F_LOGO.jpg', 'images/1F_LOGO.jpg', 'images/1F_LOGO.jpg', 'images/1F_LOGO.jpg'];
    str2 += arr2.map(function (item) {
        return ` <a href="###"><img src="${item}"></a>`;
    }).join('');
    // 5个楼层一起渲染
    for (var i = 0; i < $('.drug_main .drug_mLeft').size(); i++) {
        $('.drug_main .drug_mLeft').eq(i).html(str2);
    }
    var imgs = $('.floor1 .drug_main .drug_mRig .dRig_drugList > ul li img');


    console.log($('.newsdiv'))
    $('.yaoguanggao-t li').hover(function () {
        $('.box-wrap .newsdiv').eq($(this).index()).show().siblings().hide();
        $(this).addClass('active').siblings().removeClass('active');
    });




})();