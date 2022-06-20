(function () {
    carouselimg({
        ele: 'lunbo',//最外层id名(必选参数)
        iw: 726,//盒子的宽和高(可选参数)
        ih: 369,//盒子的宽和高(可选参数)
        imgdata: ['../images/banner/lunbo1.jpg', '../images/banner/lunbo2.jpg', '../images/banner/lunbo3.jpg', '../images/banner/lunbo4.jpg', '../images/banner/lunbo5.jpg', '../images/banner/lunbo6.jpg'],
        time: 2//切换图片的秒数(可选参数)
    });

    // 给轮播图添加功能
    /*轮播图出现左右按钮 */
    $('#lunbo').mouseenter(function () {
        $('.prev').show();
        $('.next').show();
    }).mouseleave(function () {
        $('.prev').hide();
        $('.next').hide();
    })

    /* 安心购划入移动 */
    // 高亮事件
    let width = $('.lunbo-top ul li').eq(0).width();
    let marginleft;
    $('.lunbo-top .light a').eq(0).addClass('curr');
    $('.lunbo-top .light a').mouseenter(function () {
        $(this).addClass('curr').siblings().removeClass('curr').delay(500);
        let index = $(this).index();
        marginleft = - width * index;
        console.log(marginleft);
        $('.lunbo-top ul').stop().animate({
            'margin-left': marginleft
        }, 500);
    })

    /* 特卖渲染 */
    let arr = [
        {
            "image": "../images/main-top/temai1.jpg",
            "name": "Amane 天音淋浴花洒 花洒喷头增压 恒温花洒 莲蓬头 洗澡洗浴沐浴淋雨器单喷头 手持花洒卫浴 0.19mm节水增压喷头 ",
            "price": "599",
            "del": "980"
        },
        {
            "image": "../images/main-top/temai2.jpg",
            "name": "日本进口 城野医生（Dr.ciLaboLabo）毛孔收敛化妆水200ml/瓶 细致毛孔 清爽控油",
            "price": "229",
            "del": "245"
        },
        {
            "image": "../images/main-top/temai3.jpg",
            "name": "【海外旗舰店 JD配送】澳洲爱他美Aptamil金装版幼儿配方奶粉 900g 新西兰原装进口 4段（24-36个月）【保质期至",
            "price": "135",
            "del": "200"
        },
        {
            "image": "../images/main-top/temai4.jpg",
            "name": "圣罗兰（YSL）小金条口红细管哑光雾面唇膏套装礼盒 小金条21#复古正红（海报色）",
            "price": "270",
            "del": "1998"
        }, {
            "image": "../images/main-top/temai5.jpg",
            "name": "双莲 Twin Lotus 冰糖即食燕窝75ml*6",
            "price": "180",
            "del": "398"
        }
    ];
    let html = arr.map(function (item) {
        return `<li>
                    <a href="###" class="imgbox">
                            <img src="${item.image}">
                    </a>
                    <h2 class="name">${item.name}</h2>
                    <span class="salePrice">
                        <span class="label">特卖价:</span>
                        <span class="price">
                            <span><b>¥</b>${item.price}</span>
                            <del>¥${item.del}</del>
                        </span>
                    </span>
                </li>`;
    }).join('');
    $('.temai .tab-cnt ul').html(html);


    /* 
        * 倒计时功能
            *setInterval，
                10点到 22点 倒计时  12个小时倒计时
                22点到10点 22-0  0-8 倒计时  12个小时倒计时
            * 设置现在的时间 距离八点的秒数，多少秒在转换成时分秒
    */

    // 0——10  12——22 22
    // 倒计时
    setimer();
    function setimer() {
        let time = new Date();
        let timeobj = changeTime(time, 'obj');//返回对象
        let hour = time.getHours();
        let end;//结束时间
        let month = toDb(timeobj.month - 0); //补0月
        let date = toDb(timeobj.date) - 0;//补0日
        if (hour >= 10 && hour <= 21) {
            end = `${timeobj.year}-${month}-${date} 22:00:00`;
        } else if (hour >= 22 && hour <= 24) {
            end = `${timeobj.year}-${month}-${date + 1} 10:00:00`;
        } else if ((hour <= 9 && hour >= 0)) {
            end = `${timeobj.year}-${month}-${date} 10:00:00`;
        }
        var js = Date.parse(end);//结束时间转换为时间戳
        let now = Date.now();//现在的时间
        let ses = parseInt((js - now) / 1000);//时间差 毫秒数 要转化为秒数
        let timer = setInterval(() => {
            ses--;
            if (ses <= 0) {
                ses = 0;
            }
            let obj = formatSeconds2(ses);//转成对象的形式。
            let hour = toDb(obj.hourTime);
            let minute = toDb(obj.minuteTime);
            let second = toDb(obj.ses);
            let html = `<div class="bg hour">${hour}</div>
                        <div class="semicolon">:</div>
                        <div class="bg minute">${minute}</div>
                        <div class="semicolon">:</div>
                        <div class="bg second">${second}</div>
                       `;
            $('.tab ul .time').html(html);
        }, 1000);
    }



    /* 全球特卖渲染 */
    let html2 = '';
    let zhicimg = ['../images/main-top/bottom1.jpg', '../images/main-top/bottom2.jpg', '../images/main-top/bottom3.jpg', '../images/main-top/bottom4.jpg', '../images/main-top/bottom5.jpg', '../images/main-top/bottom6.jpg', '../images/main-top/bottom7.jpg'];
    let zhictitle = ['飞利浦（PHILIPS）S7370/12 ', '戴森 DYSON V8 Absolute 家用手持无线大功率强力 除螨吸尘器 6吸头', ' 日本进口 乐敦（ROHTO）Melano CC 药用美白精华液 20ml / 支 淡斑淡痘印祛黄美白', '韩国进口 VIDIVICI女神蚕丝洗面奶 120ml / 支 温和补水 滋润保湿', '日本 肌美精（Kracie）立体3D高浸透胶原蛋白保湿弹力面膜（玫红）4片（新版）', '日本进口 凡尔赛玫瑰（versaillesrose）红色款面膜安东尼特白金特级保湿面膜光泽1片']
    let zhicaip = [715, 100, 39, 145, 75, 49];
    for (let i = 0; i < 6; i++) {
        html2 += `<li><img src="${zhicimg[i]}">
                    <span class="topNum">3</span>
                    <span class="name">${zhictitle[i]}</span>
                    <span class="price">
                        <span>
                            <b>¥</b>${zhicaip[i]}
                        </span>
                    </span>
                    <span class="comment">
                        <span class="cNum">
                            <b class="comment_num">
                                9300+
                            </b>
                            条评价
                        </span>
                    </span>
                </li>`;
    }
    $('.otherItem ul').html(html2);

    /* 直采渲染 */
    let tabtop2 = ['zhicai-top1.jpg', 'zhicai-top2.jpg', 'zhicai-top2.jpg', 'zhicai-top3.jpg', 'zhicai-top3.jpg', 'zhicai-top4.jpg', 'zhicai-top5.jpg', 'zhicai-top6.jpg', 'zhicai-top7.jpg', 'zhicai-top8.jpg', 'zhicai-top9.jpg', 'zhicai-top1.jpg', 'zhicai-top2.jpg'];
    let shangpinlist = '';
    for (let i = 0; i < 6; i++) {
        shangpinlist = ` <a href="###" class="item">
                                <img src="../images/main-top/${tabtop2[i * 2]}" alt="">
                                <span class="details">
                                    <span class="area">
                                        <img data-original="" src="../images/main-top/arealogo.jpg" class="flag">
                                        <span class="brandName">a2</span>
                                        <span class="split"></span>
                                    </span>
                                    <span class="itemName">澳洲a2 Platinum 白金版婴幼儿奶粉3段900g（1-3岁）新西兰原装进口</span>
                                    <span class="comment">
                                        <span class="commstar">
                                            <span class="star star1 "></span>
                                        </span>
                                        <span class="cNum"></span>
                                        <span class="cNum">
                                            <b class="comment_num">
                                                90万+
                                            </b>
                                            条评价
                                        </span>
                                    </span>
                                    <div class="clear"></div>
                                    <span class="tips">为了获取珍贵的a2蛋白质，每一头奶牛，都刚经过DNA的检测，造就了奶粉中的黄金贵族~</span>
                                    <span class="price">
                                        <span><b>¥</b>210</span>
                                        <del>¥288</del>
                                    </span>
                                </span>
                            </a>
                            <a href="###" class="item">
                            <img src="../images/main-top/${tabtop2[(i * 2) + 1]}" alt="">
                            <span class="details">
                                <span class="area">
                                    <img data-original="" src="../images/main-top/arealogo.jpg" class="flag">
                                    <span class="brandName">a2</span>
                                    <span class="split"></span>
                                </span>
                                <span class="itemName">澳洲a2 Platinum 白金版婴幼儿奶粉3段900g（1-3岁）新西兰原装进口</span>
                                <span class="comment">
                                    <span class="commstar">
                                        <span class="star star1 "></span>
                                    </span>
                                    <span class="cNum"></span>
                                    <span class="cNum">
                                        <b class="comment_num">
                                            90万+
                                        </b>
                                        条评价
                                    </span>
                                </span>
                                <div class="clear"></div>
                                <span class="tips">为了获取珍贵的a2蛋白质，每一头奶牛，都刚经过DNA的检测，造就了奶粉中的黄金贵族~</span>
                                <span class="price">
                                    <span><b>¥</b>210</span>
                                    <del>¥288</del>
                                </span>
                            </span>
                        </a>`;
        $('.tab-cnt .top2').eq(i).html(shangpinlist);
    }

    $('.zhicai .tab-cnt .top2').eq(1).hide();
    $('.tab ul li').click(function () {
        /* 高亮事件 */
        $(this).addClass('curr').siblings().removeClass('curr');
        /* 兄弟都隐藏  自己出现 */
        let index = $(this).index();
        $('.zhicai .tab-cnt').eq(index).removeClass('hide').siblings().addClass('hide');
        console.log($('.zhicai .tab-cnt .top2').eq(1));
    })


    /* 全球名店 */
    $('.mingdian .control .ct').mouseover(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        // 兄弟接线排他
        for (let i = 0; i < $('.mingdian .sale a img').size(); i++) {
            $('.mingdian .sale a img').hide();
        }
        $('.mingdian .sale a img').eq($(this).index()).show();
    }).mouseout(function () {
        // $('.mingdian .sale img').eq($(this).index()).hide();
    });






    /* 全球名店渲染 */
    let mingdianarr = [{
        "img": "../images/mingdian/shanpin10.jpg",
        "title": "泰国7-11合作伙伴",
        "price": "59",
        "aItem": "../images/mingdian/shanpin11.jpg",
        "aItem2": '../images/mingdian/shanpin12.jpg'
    }, {
        "img": "../images/mingdian/shanpin20.jpg",
        "title": "京东印尼官方旗舰店",
        "price": "89",
        "aItem": "../images/mingdian/shanpin21.jpg",
        "aItem2": '../images/mingdian/shanpin22.jpg'
    }, {
        "img": "../images/mingdian/shanpin10.jpg",
        "title": "香港莎莎旗舰店",
        "price": "408",
        "aItem": "../images/mingdian/shanpin11.jpg",
        "aItem2": '../images/mingdian/shanpin12.jpg'
    }, {
        "img": "../images/mingdian/shanpin20.jpg",
        "title": "山姆会员店全球购",
        "price": "169",
        "aItem": "../images/mingdian/shanpin21.jpg",
        "aItem2": '../images/mingdian/shanpin22.jpg'
    }, {
        "img": "../images/mingdian/shanpin10.jpg",
        "title": "日本COSMOS药妆店",
        "price": "123",
        "aItem": "../images/mingdian/shanpin11.jpg",
        "aItem2": '../images/mingdian/shanpin12.jpg'
    }, {
        "img": "../images/mingdian/shanpin20.jpg",
        "title": "京东泰国官方旗舰店",
        "price": "269",
        "aItem": "../images/mingdian/shanpin21.jpg",
        "aItem2": '../images/mingdian/shanpin22.jpg'
    }];
    let mdhtml = mingdianarr.map(function (item) {
        return `<li>
                    <div class="detail">
                        <b class="brandLogo">
                            <img src="${item.img}" alt="">
                        </b>
                        <span class="txt">${item.title}</span>
                        <span class="tips">
                            品牌官方授权
                            <i></i>
                        </span>
                    </div>
                    <div class="items">
                        <span class="wp">
                            <a href="javascript;" class="Item">
                                <img src="${item.aItem}" alt="">
                                <span class="line"></span>
                                <span class="price">
                                    <span><b>¥</b>${item.price}</span>
                                </span>
                            </a>
                            <a href="javascript;" class="Item">
                                <img src="${item.aItem2}" alt="">
                                <span class="line"></span>
                                <span class="price">
                                    <span><b>¥</b>${item.price}</span>
                                </span>
                            </a>
                        </span>
                    </div>
                    </li>`;
    }).join('');
    $('.mingdian .r-cnt ul').html(mdhtml);


    /* 家有萌宝渲染 */
    let mengbaoarr = ['../images/mengbao/itemimg1.jpg', '../images/mengbao/itemimg2.jpg', '../images/mengbao/itemimg3.jpg', '../images/mengbao/itemimg4.jpg', '../images/mengbao/itemimg5.jpg', '../images/mengbao/itemimg6.jpg'];
    let mblhtml = mengbaoarr.map(function (item, index) {
        return `<li>
                    <img src="${mengbaoarr[index]}"  class="imgitems">
                    <span class="name">澳洲爱他美白金版奶粉9 3段</span>
                    <span class="price">
                        <span><b>¥</b>209</span>
                    </span>
                </li>`;
    }).join('');
    $('.mengbao .bottom-left-tall .items').html(mblhtml);
    let mbmhtml = '';
    for (let i = 0; i < 4; i++) {
        mbmhtml += `<li>
                        <img src="${mengbaoarr[i]}"  class="imgitems">
                        <span class="name">澳洲爱他美白金版奶粉9 3段</span>
                        <span class="price">
                            <span><b>¥</b>209</span>
                        </span>
                    </li>`;
    }
    $('.mengbao .bottom-middle-tall .items').html(mbmhtml);

    let mbrhtml = '';
    for (let i = 0; i < 2; i++) {
        mbrhtml += `<li>
                        <img src="${mengbaoarr[i]}" class="imgitems">
                        <span class="name">澳洲爱他美白金版奶粉9 3段</span>
                        <span class="price">
                            <span><b>¥</b>209</span>
                        </span>
                    </li>`;
    }
    $('.mengbao .bottom-right-tall .items').html(mbrhtml);

    $('.bottom-half .brands .brand').hover(function () {
        $(this).find('.name').removeClass('hide');
        $(this).find('img').addClass('hide');
        // $('.name').removeClass('hide');
    }, function () {
        $(this).find('.name').addClass('hide');
        $(this).find('img').removeClass('hide');
    })


    /* 服饰渲染 */
    var subtitle = '';
    var baobao = '';
    var peishi = '';
    var subtitledata = ['潮流女包', '热销吊坠'];
    for (var i = 0; i < subtitledata.length; i++) {
        subtitle += ` <li class="tag">
                            <span class="bg lf"></span>
                            <span class="bg ri"></span>
                            <a href="###">${subtitledata[i]}</a>
                        </li>`;
    }
    $('.fushi .cat .sub-title').html(subtitle);
    var tabcontent = '';
    for (var i = 0; i < 15; i = i + 5) { //循环生成三个
        tabcontent += `<div class="tab-contents hide">
                        <div class="left">
                            <a href="###" class="item cls1">
                                <span class="triangle-container">
                                    <span class="triangle-dowm"></span>
                                </span>
                                <span class="name">Calvin Klein 内衣T恤 CK男士棉质圆领短袖T恤打底衫 Black L</span>
                                <span class="price">
                                    <span>
                                        <b>￥</b>
                                        278
                                    </span>
                                </span>
                                <img src="../images/fushi/fushi${i + 4}.jpg" class="itemImg">
                            </a>
                            <a href="###" class="item cls2">
                                <div class="name">Comme des Garcons Play 日本潮牌 短袖经典款红心T恤男女情侣款 T108 白色 M</div>
                                <div class="price"></div>
                                <span class="triangle-container">
                                    <span class="triangle-dowm"></span>
                                </span>
                                <img src="../images/fushi/fushi${i + 5}.jpg" class="itemImg">
                            </a>
                        </div>
                        <div class="left">
                            <a href="###" class="item cls3"> <img src="../images/fushi/fushi${i + 6}.jpg"
                                    class="itemImg">
                                <span class="triangle-container">
                                    <span class="triangle-up"></span>
                                </span>
                                <span class="name">全球购阿玛尼ARMANI男装短袖T恤圆领上衣男士打底衫2件装 黑色+白色 175/95 L</span>
                                <span class="price">
                                    <span>
                                        <b>￥</b>
                                        389
                                    </span>
                                </span></a>
                            <a href="###" class="item cls4">
                                <img src="../images/fushi/fushi${i + 7}.jpg" class="itemImg">
                                <span class="triangle-container">
                                    <span class="triangle-up"></span>
                                </span>
                                <span class="name">Champion短袖T恤 正品美版 草写经典字母印花 刺绣 纯棉圆领情侣打底衫 薄款 白色（新款黑字）
                                    L（体重158-178）</span>
                                <span class="price">
                                    <span>
                                        <b>￥</b>
                                        287
                                    </span>
                                </span>
                            </a>
                        </div>
                        <span class="clr"></span>
                        <img src="../images/fushi/fushi${i + 3}.jpg" class="bg">
                    </div> `;
    }
    $('.fushi .middle .tabs').html($('.fushi .tabs').html() + tabcontent);
    $('.fushi .middle .tabs .tab-contents:first').removeClass('hide');
    $('.fushi .middle .tab').click(function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        $('.fushi .middle .tabs .tab-contents').addClass('hide');
        $('.fushi .middle .tabs .tab-contents').eq($(this).index()).removeClass('hide');
    })
    for (var p = 0; p < 5; p++) {
        baobao += `<a href="###" class="item">
                    <img src="../images/fushi/baobao${p + 1}.png" class="itemImg">
                    <div class="name">Louis Vuitton/路易威登LV男女同款手拿包经典帆布老花钱包lv梳洗包 M47542</div>
                    <div class="price">
                        <span>
                            <b>￥</b>
                            ${(p + 1) * 3500}
                        </span>
                    </div>
                </a>`;
    }
    $('.fushi .top-right .tab-contents').eq(0).html(baobao);
    for (var p = 0; p < 5; p++) {
        peishi += `<a href="###" class="item">
                    <img src="../images/fushi/peishi${p + 1}.png" class="itemImg">
                    <div class="name">Louis Vuitton/路易威登LV男女同款手拿包经典帆布老花钱包lv梳洗包 M47542</div>
                    <div class="price">
                        <span>
                            <b>￥</b>
                            ${(p + 1) * 3500}
                        </span>
                    </div>
                </a>`;
    }
    $('.fushi .top-right .tab-contents').eq(1).html(peishi);
    $('.fushi .top-right .tabs .shop').click(function () {
        $(this).addClass('curr');
        $(this).siblings().removeClass('curr');
        let index = $(this).index();
        $('.fushi .top-right .tab-contents').hide();
        $('.fushi .top-right .tab-contents').eq(index).show();
    })

    var brandname = ['宝格丽', '施华洛世奇', '万宝龙', 'LEE', 'Burberry', 'coach', 'Gucci', 'furla'];
    var brand = '';
    for (var q = 0; q < brandname.length; q++) {
        brand += `<a href="###" class="brand">
                        <div class="name">${brandname[q]}</div>
                        <img src="../images/fushi/brand${q + 1}.jpg" alt="">
                    </a>`;
    }

    $('.fushi .brand').hover(function () {
        $(this).find('.name').removeClass('hide');
        $(this).find('img').hide();
    }, function () {
        $(this).find('.name').addClass('hide');
        $(this).find('img').show();
    })

    /* 猜你喜欢 */
    var guesslike = '';
    for (var t = 0; t < 9; t++) {
        guesslike += `<li>
                        <img src="../images/guesslike/guesslike${t + 1}.jpg" class="itemImg">
                        <span class="name">
                            日本进口 资生堂(Shiseido) FINO发膜 230g/盒 深层滋养护发修护免蒸改善毛躁高效渗透、
                        </span>
                        <span class="price">
                            <span>
                                <b>¥</b>${85 + t * 50}
                            </span>
                        </span>
                    </li>`;
    }
    $('.guesslike #hScroll').html(guesslike);

    /* 猜你喜欢下面 */
    let bothtml = '';
    for (var t = 0; t < 7; t++) {
        bothtml += ` <div class="img">
                        <img src="../images/guesslike/gobottom${t + 1}.png" alt="">
                        <span class="txt">母婴优选</span>
                        <span class="line"></span>
                    </div>`
    }
    $('.links .container').html(bothtml);

    let botarr = ['京东海囤全球与Attent战略合作', '京东海囤全球与雀巢营养品战略合作', '京东海囤全球与日本MTG集团战略合作', '京东海囤全球与Culturelle 康萃乐战略合作', '京东全球购实施最严跨境电商监管举措']
    let bothtml2 = ``;
    for (var t = 0; t < 5; t++) {
        bothtml2 += `<a href="###" class="pic_container">
                        <img src="../images/guarantee/guarantee${t + 1}.png" alt="" class="main_img">
                        <img src="../images/guarantee/mohu.png" class="dec" alt="">
                        <span class="info">${botarr[t]}</span>
                    </a>`
    }
    console.log(bothtml2);
    $('.guarantee .more_info').before(bothtml2);

    /* 楼层跳跃渲染 */
    /* 楼层导航渲染 */
    let loucengarr = ['全球特卖', '全球直采', '全球名店', '家有萌宝', '美妆个护', '吃遍全球', '营养保健', '3C数码', '汽车用品', '服饰鞋帽', '居家生活', '运动户外', '钟表奢品', '玩具乐器'];
    let loucenghtml = '';
    loucengarr.forEach(function (item, index) {
        loucenghtml += `<a href="###" class="lou" data-id="${index + 1}">${item}</a>`;
    });
    loucenghtml += `<a href="###" class="j-go-top"><i></i></a>`;
    $('.go-top .cart').after(loucenghtml);


    let gotop = document.querySelector('.go-top');
    window.read = function () {
        console.log(window.innerWidth);
    }

    let num = 262;
    let right = 262;
    $(window).resize(function (ev) {
        let kuandu = window.innerWidth;
        let mainwidth = $('.main').innerWidth();
        let scal = ((((mainwidth - 880) / kuandu).toFixed(2)) * (1 / 0.53)).toFixed(2);
        right = (scal * right).toFixed(2);
        if (window.innerWidth < 1300) {
            $('.go-top').hide();
        } else {
            $('.go-top').show();
        }
        num = num - 1;
        $('.go-top').animate({
            'right': right
        }, 80)
    })

    $('.go-top .lou').click(function () {
        let index = $(this).index();
        let theight = $('.floor').eq(index - 1).offset().top + 'px';
        $('html,body').animate({//动作对象是html和body
            scrollTop: theight
            // "scrollTop": theight
        }, 800)
        // 高亮
        $(this).addClass('hover').siblings().removeClass('hover');
    })
    gun();

    function gun() {
        let alis = document.querySelectorAll('.floor');
        let btns = document.querySelectorAll('.go-top .lou');
        // 滚动高亮
        $(window).scroll(function () {
            var topheight = window.scrollY;//距离顶部的高度
            for (var i = 0; i < alis.length; i++) {
                alis[i].index = i;//绑定索引值
                if (topheight >= alis[i].offsetTop) {//比他大的时候 排他法
                    for (var j = 0; j < btns.length; j++) {
                        btns[j].className = '';
                    }
                    //经过滚动事件，然后每个可视高度可以获得相应的
                    btns[i].className = 'hover';
                }
            }
        });
    }

    //回到顶部
    $('.j-go-top').click(function () {
        $('html,body').animate({
            scrollTop: 0 + 'px'
        }, 800)
    });

})();