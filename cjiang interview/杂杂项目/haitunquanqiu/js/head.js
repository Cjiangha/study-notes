
(function () {

    $('.xjiantou').hide();
    /* 顶部下拉菜单 移入移出*/
    $('.guanzhu').mouseenter(function () {
        $('.erweima').show();
        $('.erweima').css('border', '1px solid #ccc').css('border-top', '');
        $('.guanzhu .dt').css('border', '1px solid #ccc').css('border-bottom', '').css('color', '#7d256e');
        $('.xjiantou').show();
        $('.sjiantou').hide();
    }).mouseleave(function () {
        $('.erweima').hide();
        $('.erweima').css('border', '');
        $('.guanzhu .dt').css('border', '').css('color', '');
        $('.xjiantou').hide();
        $('.sjiantou').show();
    })

    /*  登陆登出功能  保存url和cookie */
    let welcome = document.getElementById('welcome');
    function init() {
        let usernamecookie = getCookie('username');
        if (usernamecookie) { //登陆中
            welcome.innerHTML = `<a href="###">${usernamecookie},欢迎你</a>
                        <a style="color: red; cursor: pointer; class="quit"">退出</a>`;
        } else {
            welcome.innerHTML = `
                <a href="###" >你好,请登录</a>
                <a href="###" style="color: red; cursor: pointer;">免费注册</a>`;
        }
    }
    init();
    welcome.onclick = function (ev) {
        if (ev.target.innerHTML == '退出') {//点击退出
            removeCookie('username');
            removeCookie('url');
        }
        if (ev.target.innerHTML == '你好,请登录') {
            location.href = 'login.html';
            //把当前这个页面的url记录到cookie
            setCookie('url', location.href, 7);
        }
        if (ev.target.innerHTML == '免费注册') {
            location.href = 'register.html';
        }
        init();//重新渲染   
    }



    /*1、搜素渲染 */

    let arr = ['浪琴', '运动', 'JM面膜', '未来驱蚊施', '华洛世奇天鹅系列', '爱车呵护', '施华洛世奇'];
    let html = '';
    for (let item of arr) {
        html += `<span>${item}</span>`;
    }
    $('.form .keyword').html(html);

    /* 导航*/
    let dharr2 = ['../images/header/d1.png', '../images/header/d2.png', '../images/header/d3.png', '../images/header/d4.png'];
    let html2 = '';
    for (let item of dharr2) {
        html2 += `<li><a href="###"><img src="${item}"></a></li>`;
    }
    $('.nav-r ul').append(html2);

    /* 渲染二级导航 */
    let dharr3 = [{ "h3": "奶粉辅食", "title1": "奶粉", "title2": "辅食" }, { "h3": "尿裤用品", "title1": "尿裤", "title2": "用品" }, { "h3": "个护美妆", "title1": "护肤", "title2": "香水" }, { "h3": "营养保健", "title1": "减肥", "title2": "美容" }, { "h3": "进口美食", "title1": "水饮", "title2": "冲调" }, { "h3": "数码家电", "title1": "游戏机", "title2": "数码" }, { "h3": "钟表首饰", "title1": "男表", "title2": "女表" }, { "h3": "服饰箱包", "title1": "自营", "title2": "服装" }, { "h3": "运动户外", "title1": "运动", "title2": "户外" }, { "h3": "家居日用", "title1": "净水壶", "title2": "乳胶枕" }, { "h3": "汽车用品", "title1": "机油", "title2": "清洁剂" }, { "h3": "潮流奢品", "title1": "箱包", "title2": "饰品" }];
    let dhhtml3 = '';
    dhhtml3 = dharr3.map(function (item, index) {
        return `<li>
                    <h3>
                        <i class="i${index + 1}"></i>
                        <a href="list.html" > ${item.h3}</a>
                    </h3>
                    <h4>${item.title1}</h4>
                    <h4 class="rt">${item.title2}
                        <b class="youjiantou"></b>
                    </h4>
                </li>      
                `
    }).join('');
    $('.three-nav .left-ul').append(dhhtml3);
    // console.log($('.three-nav .left-ul'));

    // 准备好12个li，每个li下拼接一个div，怎么识别对应的每一个div？渲染，$('li').eq(0).append(firstitem1);,在每一楼的li里面，添加两个div
    let lidiv = `<div class="sub-menu">
                      <div class="sub-list">
                      </div>
                      <div class="sub-right">
                      </div>
                </div>`;
    $('.three-nav .left-ul li').append(lidiv);


    // 右边图片每一楼拼接一个
    let rightdiv = `  <ul class="clearfix">
        <li><img src="../images/nav/three-nav1.jpg"></li>
        <li><img src="../images/nav/three-nav2.jpg"></li>
        <li><img src="../images/nav/three-nav3.jpg"></li>
        <li><img src="../images/nav/three-nav4.jpg"></li>
        <li><img src="../images/nav/three-nav5.jpg"></li>
        <li><img src="../images/nav/three-nav6.jpg"></li>
        <li><img src="../images/nav/three-nav7.jpg"></li>
        <li><img src="../images/nav/three-nav8.jpg"></li>
        </ul>
        <a href="###" class="bigpic"><img src="../images/nav/three-nav-big.jpg">
        </a>`;
    $('.three-nav .left-ul li .sub-right').append(rightdiv);

    // 3级导航  12楼
    let threearr1 = [{ "title": "婴儿奶粉", "span2": ["1段", "2段", "3段", "4段", "孕妈奶粉", "有机奶粉", "特殊配方"] }, { "title": "宝宝辅食", "span2": ["米粉/菜粉", "果汁/果泥", "宝宝零食"] }, { "title": "宝宝营养", "span2": ["益生菌/初乳", "DHA", "钙铁锌/维生素"] }, { "title": "孕妈必备", "span2": ["孕期营养", "孕妈护肤", "待产/新生", "产后塑身", "妈咪包"] }];

    //每一楼遍历一个
    let firsthtmllist = threearr1.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(0).append(firsthtmllist);





    let threearr2 = [{ "title": "尿裤湿巾", "span2": ["NB", "S", "M", "L", "XL", "XXL", "拉拉裤", "湿巾", "成人尿裤"] }, { "title": "洗护用品", "span2": ["洗发沐浴", "洗澡用具", "洗衣液/皂", "坐便器", "宝宝护肤", "日常护理", "理发器", "口腔护理", "驱蚊防晒"] }, { "title": "喂养用品", "span2": ["喂养用品", "牙胶安抚", "食物存储", "碗盘叉刀", "围兜/防溅衣", "水杯水壶", "辅食料理机", "吸奶机", "防溢乳垫"] }, { "title": "童车童床", "span2": ["安全座椅", "婴儿床", "婴儿推车", "学步车"] }, { "title": "玩具乐器", "span2": ["积木拼插", "毛绒布艺", "娃娃玩具"] }, { "title": "孕妈必备", "span2": ["吸奶器", "产后塑身", "孕妈美容"] }];

    let secondhtmllist = threearr2.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(1).append(secondhtmllist);

    let threearr3 = [{ "title": "面部护肤", "span2": ["面膜", "面霜", "保湿", "卸妆", "紧致", "洁面", "美白", "爽肤水", "精华", "防晒", "眼霜", "套装"] }, { "title": "香水彩妆", "span2": ["口红", "眉笔", "睫毛膏", "男士香水", "女士香水", "粉底", "眼线", "眼影", "腮红", "唇膏", "套装", "美妆工具"] }, { "title": "洗护清洁", "span2": ["洗发", "造型", "护发", "染发", "精油", "沐浴露", "润肤", "洗衣液", "洗衣凝珠", "厨房清洁"] }, { "title": "口腔护理", "span2": ["牙刷", "漱口水", "牙线", "美白", "牙贴", "替换刷头", "牙膏"] }, { "title": "女性护理", "span2": ["卫生巾", "日用", "夜用", "乐而雅", "干爽网面", "纯棉", "女性洗液", "脱毛膏"] }];

    let thirdhtmllist = threearr3.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(2).append(thirdhtmllist);

    let threearr4 = [{ "title": "营养健康", "span2": ["调节免疫", "骨骼健康", "调节三高", "美容养颜", "养肝护肝", "改善贫血", "减肥塑身", "明目益智", "改善睡眠", "明目益智", "运动营养", "改善发育", "补肾强身", "肠胃养护", "婴儿营养", "缓解疲劳"] }, { "title": "营养成分", "span2": ["维生素/矿物质", "鱼油", "氨糖", "辅酶Q10", "蛋白质", "胶原蛋白", "益生菌", "玛咖", "酵素", "葡萄籽", "叶酸", "左旋肉碱", "膳食纤维", "番茄红素", "叶黄素", "褪黑素", "螺旋藻", "增肌粉", "牛初乳"] }, { "title": "传统滋补", "span2": ["燕窝", "蜂胶", "红参"] }];

    let fouthhtmllist = threearr4.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(3).append(fouthhtmllist);

    let threearr5 = [{ "title": "进口牛奶", "span2": ["德运", "雀巢Nestle"] }, { "title": "冲调饮品", "span2": ["果汁冲饮", "卡乐比", "咖啡", "蜂蜜/茶", "营养谷物"] }, { "title": "休闲零食", "span2": ["坚果炒货", "糖巧甜品", "柯克兰", "费列罗", "瑞士莲"] }, { "title": "粮油调味", "span2": ["方便速食", "意面/酱", "调味品", "橄榄油"] }, { "title": "进口红酒", "span2": ["进口红酒", "加州乐事"] }];

    let fifthhtmllist = threearr5.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(4).append(fifthhtmllist);

    let threearr6 = [{ "title": "电脑办公", "span2": ["游戏机", "笔记本", "游戏本", "游戏软件", "电脑外设", "平板电脑", "电纸书", "打印机"] }, { "title": "数码音响", "span2": ["耳机/耳麦", "音箱/音响", "单反/微单", "智能手表", "便携/无线音箱"] }, { "title": "家用电器", "span2": ["吸尘器", "电风扇", "空气净化器", "净水器", "扫地机器人", "咖啡机", "榨汁机", "电水壶", "面包机", "料理机"] }, { "title": "个护健康", "span2": ["美容仪", "洁面仪", "电吹风", "卷发棒", "剃须刀", "剃/脱毛器", "电动牙刷", "水牙线", "血压计", "按摩器"] }, { "title": "手机", "span2": ["手机", "充电器"] }];

    let sixhtmllist = threearr6.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(5).append(sixhtmllist);

    let threearr7 = [{ "title": "瑞士品牌", "span2": ["天梭", "浪琴", "欧米茄", "美度", "卡地亚", "积家", "万国", "劳力士", "梅花", "沛纳海", "雷达"] }, { "title": "欧美品牌", "span2": ["ARMANI", "汉密尔顿", "Daniel WEllington", "颂拓", "Calvin Klein", "迪赛", "fossil"] }, { "title": "日韩品牌", "span2": ["卡西欧", "西铁城", "精工", "ALBA雅柏"] }, { "title": "运动智能", "span2": ["CASIO", "SUUNTO", "Fossil", "雷美诺时"] }];

    let seventhhtmllist = threearr7.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(6).append(seventhhtmllist);

    let threearr8 = [{ "title": "经典箱包", "span2": ["MK", "Calvin Klein", "芙拉", "龙骧", "菲拉格慕", "Coach"] }, { "title": "配饰腕表", "span2": ["潘多拉", "施华洛世奇", "派克", "apm", "欧米茄"] }, { "title": "精选服装", "span2": ["汤米", "李维斯", "添柏岚", "Prada", "Jeep"] }, { "title": "精品鞋靴", "span2": ["Timberland", "Dr. Martens", "ECCO", "UGG"] }];

    let eighthhtmllist = threearr8.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(7).append(eighthhtmllist);

    let threearr9 = [{ "title": "运动鞋包", "span2": ["跑步鞋", "板鞋", "篮球鞋", "帆布鞋", "运动服", "运动裤", "运动包"] }, { "title": "户外服饰", "span2": ["T恤", "冲锋衣裤", "羽绒服", "登山包", "登山鞋"] }];

    let ninthhtmllist = threearr9.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="list.html">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="list.html">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(8).append(ninthhtmllist);

    let threearr10 = [{ "title": "厨具", "span2": ["杯具", "酒具", "刀剪菜板", "厨房配件", "茶具", "餐具"] }, { "title": "家纺", "span2": ["床垫/床褥", "乳胶枕", "纤维被", "记忆枕", "羊毛/驼毛被", "羽绒/羽毛被", "羽绒枕", "四件套"] }, { "title": "电脑、办公", "span2": ["笔类", "本册/便签", "学生文具", "办公文具", "纸类", "计算器", "墨盒"] }, { "title": "家庭清洁", "span2": ["驱蚊驱虫", "家庭环境清洁", "清洁纸品", "皮具护理", "衣物清洁"] }];

    let tenthhtmllist = threearr10.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(9).append(tenthhtmllist);

    let threearr11 = [{ "title": "维修保养", "span2": ["汽机油", "摩托车机油", "变速箱油", "添加剂"] }, { "title": "美容清洗", "span2": ["清洁剂", "玻璃水", "车蜡"] }, { "title": "汽车装饰", "span2": ["车载香水", "车载烟灰缸", "除味剂"] }, { "title": "车载电器", "span2": ["车载净化器", "行车记录仪", "车载充电器", "车载蓝牙", "车载吸尘器", "车载影音"] }];

    let eleventhhtmllist = threearr11.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(10).append(eleventhhtmllist);

    let threearr12 = [{ "title": "箱包", "span2": ["COACH", "BURBERRY", "BOTTEGAVENETA", "MK", "IsseyMiyake", "Tory Burch", "KateSpade", "日默瓦", "新秀丽", "RIMOWA", "Ferragamo", "FENDI", "Chloe", "DIESEL", "Ferragamo"] }, { "title": "饰品", "span2": ["施华洛世奇", "潘多拉", "APM", "daisy", "MichaelMichaud", "Tiffany", "DW 手环"] }];


    let twelvethhtmllist = threearr12.map(function (item, index) {
        let fhtml1 = `<dl class="slBlock">
                        <dt class="liTitle">
                            <a href="###">${item.title}</a>
                        </dt>
                    `;
        let length = item.span2.length;
        // console.log(item.span2);//遍历4次
        let fhtml2 = '';
        for (let i = 0; i < length; i++) {
            fhtml2 += ` <dd class="liItem ">
                            <a href="###">
                                ${item.span2[i]}
                            </a>
                        </dd>`;
        }
        fhtml1 += fhtml2;
        //加上这条线
        fhtml1 += `   </dl><div class="line"></div>`;
        // console.log(fhtml1);
        return fhtml1;
    });
    $('.three-nav .left-ul li .sub-list').eq(11).append(twelvethhtmllist);

    let lousize = $('.three-nav .left-ul li').size();
    // 给dl加样式


    $('.bignav .three-nav ul li .sub-menu').hide();

    $('.left-ul').on('mouseenter', 'li', function () {
        $(this).find('.sub-menu').show();
    }).on('mouseleave', 'li', function () {
        $(this).find('.sub-menu').show();
        $(this).find('.sub-menu').hide();
    });

    for (let i = 0; i < lousize; i++) {
        $('.three-nav .left-ul li .sub-menu').eq(i).css('top', -9 + -(i * 43));
    }
})();