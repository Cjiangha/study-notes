(function () {

    // 头部导航部分，移入移出，让相应盒子出现消失
    let myyaofang = document.getElementById('myyaofang');
    let qingdan = document.getElementsByClassName('qingdan')[0];

    myyaofang.onmouseover = (ev) => {
        ev.stopPropagation();//阻止冒泡
        qingdan.style.display = 'block';
    }
    myyaofang.onmouseout = ev => {
        qingdan.style.display = 'none';
    }

    $('#phoneli').mouseenter(function () {
        $(".iphonebanben").show()
    });
    $('#phoneli').mouseleave(function () {
        $(".iphonebanben").hide();

    });

    $('.daohang').mouseenter(function () {
        $(".hidedaohang ").show()
    });
    $('.daohang').mouseleave(function () {
        $(".hidedaohang ").hide()
    });


    // 1、顶部的热线渲染
    arr = ['食品药品投诉举报热线：12331', '互联网药品交易服务资格证书：京C20160005', '京丰食药监械经营许20150100号', '增值电信业务经营许可证：京B2-20180434', '食品药品投诉举报热线：12331'];
    let str = '';
    arr.map(function (item) {
        str += `<li class="clone" style="height: 31px;">
                     <a href="javascript:;" style="color:#5b5b5b;cursor:default;">
                      <i class="iconfont">&#xe630;</i>
                     ${item}
                      </a>
                    </li>`
    })
    $('.tempWrap .rexian').html(str);



    //2、 二级导航部分,和选项卡一样
    let first = `  
    <!--  重大疾病、肿瘤、肺癌 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;">重大疾病、</a>

        <a href="javascript:;">三高、</a>

        <a href="javascript:;">肺癌</a>
    </li>
    <!--  新药特药、血液、罕见病 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">新药特药、</a>
        <a href="javascript:;" name="">血液、</a>
        <a href="javascript:;" name="">罕见病</a>
    </li>
    <!--  慢性疾病、三高、男性健康-->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">慢性疾病、</a>
        <a href="javascript:;" name="">三高、</a>
        <a href="javascript:;" name="">男性健康</a>
    </li>
    <!-- 家庭常备、妇科、儿科 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">家庭常备、</a>
        <a href="javascript:;" name="">妇科、</a>
        <a href="javascript:;" name="">儿科</a>
    </li>
    <!-- 中医养生、草药、参茸礼品 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">中医养生、</a> <a href="javascript:;" name="">草药、</a>
        <a href="javascript:;" name="">参茸礼品</a>

    </li>
    <!-- 医疗器械、康复、血压监测 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">医疗器械、</a>
        <a href="javascript:;" name="">康复、</a>
        <a href="javascript:;" name="">血压监测</a>
    </li>
    <!--  营养保健、减肥、亚健康 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name=""> 营养保健、</a>
        <a href="javascript:;" name=""> 减肥、</a>
        <a href="javascript:;" name="">亚健康</a>
    </li>
    <!-- 健康超市、母婴、化妆品 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">健康超市、</a>
        <a href="javascript:;" name=""> 母婴、</a>
        <a href="javascript:;" name=""> 化妆品</a>
    </li>
    <!--  健康服务、挂号、每康卡 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">健康服务、</a>
        <a href="javascript:;" name="">挂号、</a>
        <a href="javascript:;" name="">每康卡</a>
    </li>
    <!--  隐形眼镜、美瞳、护理液 -->
    <li><i class="iconfont">&#xe60a;</i>
        <a href="javascript:;" name="">隐形眼镜、</a>
        <a href="javascript:;" name="">美瞳、</a>
        <a href="javascript:;" name="">护理液</a>
    </li>`;
    $('.left-Head .pullDownList').html(first);


    // 3、三级导航

    // 标题
    // let arr3 = [
    //     '肿瘤',
    //     '调节免疫力',
    //     '器官移植',
    // ];

    // // 内容
    // let arr4 = [{
    //     1: ['其他病症', '肝癌', '骨髓瘤', '胃癌', '肺癌', '肾癌', '前列腺癌', '肿瘤病辅助', '乳腺癌', '卵巢癌', '淋巴肿瘤', '食道癌', '细胞瘤', '肾脏病']
    // },
    // { 2: '免疫调节药物' },
    // { 3: '抗排异药物' }];

    // let html = [];

    // // 1、先渲染left里面的dl>dt+dd   然后找到dt 和dd 再将数据进行渲染。。
    // // left渲染arr3 多少个就渲染多少个，所以循环出的dl次数为arr3的循环次数

    // for (let i = 0; i < arr3.length; i++) {
    //     html.push(`<dl><dt class='${i}'></dt><dd></dd></dl>`);
    // }
    // let dl = '';
    // for (let i = 0; i < html.length; i++) {
    //     // i是一个一个的元素
    //     dl += html[i];
    // }
    // dl += `  <dl class="see_more">
    //             <a href="###"></a>
    //             <dd>查看更多
    //                 <!-- 右箭头 -->
    //                 <i class="iconfont icon-youjiantou">
    //                     &#xe60a;
    //                 </i>
    //             </dd>
    //                 </dl>   `;
    // $('.yMenuListConin .left').html(dl);

    // let str3 = '';
    // //遍历数组每一条信息
    // arr3.forEach(function (item, index) {
    //     str3 = ` <a href="" target="_blank"> ${item} 
    //     <i class="iconfont icon-youjiantou"> &#xe60a;</i>
    //     </a>`;
    //     // console.log(str3, $('.yMenuListConin .left dl').eq(index));
    //     $('.yMenuListConin .left dl').eq(index).find
    //         ('dt').html(str3);
    // })

    // let str4 = '';
    // arr4.map(function (item, index) {
    //     str4 = `<a href="###" target="_blank">${item}</a>`
    //     console.log(str4);
    //     $('.yMenuListConin .left dl dd').eq(index).html(str4);
    // })

    // 对象数组遍历？？map方法？

    // 4、选项卡事件
    $('.pullDownList li').mouseenter(function () {
        //兄弟节点排他
        $(this).addClass('active').siblings().removeClass('active');
        $('.yMenuListCon .yMenuListConin').eq($(this).index()).show().siblings().hide();
        $('.yMenuListCon').show();
    })

    $('.pullDownList li').mouseleave(function () {
        //兄弟节点排他
        $(this).removeClass('active');
        $('.yMenuListCon').css('display', 'none');
    })

    //让右边盒子移入出现
    $('.yMenuListCon').mouseenter(function () {
        $('.yMenuListCon').css('display', 'block');
    })
    $('.yMenuListCon').mouseleave(function () {
        $('.yMenuListCon').css('display', 'none');
    })


    var i = 0;//准备一个变量作为倍数
    $('.rexian li').innerHeight();
    // 把第一个元素插入到第五个元素后面
    $('.rexian li').eq(0).clone(true).appendTo('.rexian');

    //找到里面的节点，让ul一直向上移动1个innerheight
    function next() {
        let diejia = $('.rexian li').innerHeight();
        if (i > $('.rexian li').size() - 1) {
            i = 1;
            $('.rexian').css('top', 0);
            // $('.rexian').animate({ top: 0 });
        }
        $('.rexian').animate({ top: (-(diejia - 1) * i) + 'px' });
        i++;
    }
    setInterval(next, 2000);

})();