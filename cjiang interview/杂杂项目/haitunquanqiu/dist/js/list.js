(function () {
    let html = ``;
    for (let i = 0; i < 10; i++) {
        html += `  <div class="item">
                        <a href="###">
                            <img src="../images/list/t1.jpg" alt="">
                        </a>
                        <div class="price">
                            <em>特价：</em>
                            <span>¥25.00</span>
                        </div>
                        <a href="###" class="name">德国 贺本清小甘菊修护唇膏4.8g/支 防止干裂 滋润保湿
                            润唇膏</a>
                    </div>`;
    }
    $('.cnt-wrapper .recommend .r-list').html(html);
    let h = $('.r-list .item').height();
    $('.r-list').height((h + 40) * 5);
    /* 鼠标划入事件  价格出现*/
    $('.price-chose').mouseenter(function () {
        $(this).find('.price-edit').show();
    }).mouseleave(function () {
        $(this).find('.price-edit').hide();
    })



    /* 数据渲染 */

    /* 1、找节点，渲染页面（封装函数，函数里面传入的值为一个json对象，把渲染函数丢回到ajax成功回调里进行函数调用）
                 其中，渲染数据的分页：主要有三个值  
                 * 当前页数，
                 * 当前页数的数量，
                 * 总页数 = （总数量 /每页多个数量） 再向上取整。
                 分页的接口，
                   * 前端传的数据：
                       ipage: ipage,
                       num: num,
                       paixv: paixv,
                       type: type,
                       left: leftval,
                       right: rightval,
                       mohu: mohuvalue
                    * 地址url: list.php
                    * 返回的数据：    
                    * $data = array(
                    *  'total'=>$res->num_rows, //总条数
                    * 'list' =>$arr, //拿到的数据，存为一个json     对象
                    * ipage'=>$ipage, //当前页数
                    * 'num'=>$num
                    *  );
           
           */


    let type = 'fenye';//默认为初始化分页
    let ipage = 1;//当前页数
    let num = 40;//每页多少个个数
    let paixv = '';
    let leftval;//左边的价格，要转换成数字类型
    let rightval;//右边价格
    let pinglun;//评论数
    let mohuvalue;//模糊查询
    let chushuhtml = '';
    let gid;//拿到的gid的值

    init();
    function init() {
        $.ajax({
            type: 'get',
            url: '../api/list.php',
            data: {
                ipage: ipage,
                num: num,
                paixv: paixv,
                type: type,
                left: leftval,
                right: rightval,
                mohu: mohuvalue
            },
            success: str => {
                let arr = JSON.parse(str);
                create(arr);
            }
        })
    }

    /*  1、渲染列表页 */
    function create(data) {
        let html = ``;
        let yeshuhtml = ``;
        data.list.forEach(function (item) {
            /* 渲染列表 */
            let arr = item.smallpic.split(',');
            let str = arr.map(function (img) {
                return `<li><img src="${img}" alt=""></li>`;
            }).join('');
            html += `<li class="gl-item" data-id="${item.gid}">
                                <a href="###" class="pic">
                                    <div class="p-img">
                                        <img src="${item.pic}" alt="">
                                    </div>
                                    <div class="p-scroll">
                                        <div class="ps-wrap">
                                            <ul class="ps-main">
                                               ${str}
                                        </ul></div>
                                    </div>
                                </a>
                                <div class="price">
                                    <span>
                                        <b>￥</b>
                                        ${item.price}
                                    </span>
                                </div>
                                <div class="p-name">
                                    <em>
                                        <i class="name-icon-glo">海囤全球</i>
                                        ${item.title}
                                    </em>
                                </div>
                                <div class="p-buy">
                                    <span class="cNum">
                                        <b>  ${item.command}</b>
                                        条评论
                                    </span>
                                </div>
                                <div class="p-shop-name">
                                    <a href="###">
                                      ${item.shopname}
                                    </a>
                                    <a href="###" class="shop-logo">
        
                                    </a>
                                </div>
                            </li>`;
        });
        $('.goods-list .gl-wrap').html(html);

        /*第一张图高亮,小图换大图,高亮事件 */
        let size = $('.gl-item').size();
        for (let i = 0; i < size; i++) {
            $('.gl-item').eq(i).find('.ps-main li').eq(0).addClass('curr');
            //找到第几个item
            $('.gl-item').eq(i).on('mouseover', '.ps-main li img', function () {
                let src = $(this).attr('src');
                $(this).parent().parent().parent().parent().prev().find('img').attr('src', src);
                $(this).parent().addClass('curr');
                $(this).parent().siblings().removeClass('curr');
            })
        }

        /* 渲染页码数 */
        let totalnum = data.total;//总数量
        let num = data.num;//每一页的数量
        let zongyeshu = Math.ceil(totalnum / num);//向上取整得到页数
        // console.log(zongyeshu);
        yeshuhtml = `<a href="###" class="prev">
                                <i>&lt;</i>
                                <em>上一页</em>
                            </a> 
                            <a href="###" data-id="1" class="yeshu">1</a>`;
        for (var j = 2; j < zongyeshu + 1; j++) {
            yeshuhtml += `<a href="###" data-id="${j}" class="yeshu" >${j}</a>`;
        }
        yeshuhtml += `<a href="###" class="next">
                                    <em>下一页</em>
                                    <i>&gt;</i>
                              </a>`;
        $('.p-num').html(yeshuhtml);

        $('.st-ext span').html(totalnum);//渲染上方的商品数量 
        $('.fp-text').find('b').html(ipage);//当前页
        $('.fp-text').find('i').html(zongyeshu);//总页数




        function yeshuinit() {
            $('.yeshu').eq(ipage - 1).addClass('curr');
            if (ipage == 1) {
                $('.prev').addClass('disabled');
                $('.fp-prev').addClass('disabled');//上方左边
            } else if (ipage == zongyeshu) {
                $('.next').addClass('disabled');
                $('.fp-next').addClass('disabled');//上方右边
            }
            else {
                $('.prev').removeClass('disabled');
                $('.next').removeClass('disabled');
                $('.fp-prev').removeClass('disabled');//上方左边
                $('.fp-next').removeClass('disabled');//上方右边
            }
        }
        yeshuinit();


        let yeshu = document.querySelector('.page .p-num');

        //点击对应的页数  
        yeshu.onclick = function (ev) {
            if (ev.target.className == 'yeshu') {
                ipage = ev.target.dataset.id;
                init();
            }
        }


        /* 上一页和下一页
            要找到上一页和下一页的索引值
        */
        $('.prev').click(function () {
            if (ipage > 1 && ipage <= zongyeshu) {
                ipage--;
            }
            else if (ipage == 1) {
                ipage = 1;
            }
            else if (ipage == zongyeshu) {
                ipage = zongyeshu;
            }
            init();//重新渲染
        })

        $('.next').click(function () {
            if (ipage >= 1 && ipage < zongyeshu) {
                ipage++;
                console.log(ipage);
            }
            else if (ipage == zongyeshu) {
                ipage = zongyeshu;
            }
            init();//重新渲染
        })
    }


    let isok = true;
    /* 2、价格升降序 */
    $('.price').click(function () {
        ipage = 1;
        type = 'paixv';
        if (isok == true) { //升序 
            paixv = 'asc';
            $(this).addClass('up').removeClass('down');
        } else if (isok == false) {//降序 
            paixv = 'desc';
            $(this).addClass('down').removeClass('up');
        }
        isok = !isok;
        init();
    })

    /* 3、评论升降序 */
    $('.command').click(function () {
        ipage = 1;
        type = 'pinglunpaixv';
        paixv = 'desc';
        $(this).addClass('curr');
        init();
    })

    /* 4、价格区间 */
    $('#priceBtn').click(function () {
        ipage = 1;
        if ($('#priceMin').val() == '') {
            $('#priceMin').val() = '0';
        }
        if ($('#priceMax').val() == '') {
            $('#priceMax').val() = '0';
        }
        leftval = $('#priceMin').val();
        rightval = $('#priceMax').val();
        type = "qujian";
        init();
    })

    /* 5、模糊查询 */
    $('#resultSearchBtn').click(function () {
        ipage = 1;
        let val = $('#resultSearchTxt').val();
        // console.log(val);
        mohuvalue = val;
        type = 'mohu';
        init();
    })
    $('.input-txt').keydown(function (ev) {
        if (ev.keyCode == 13) {//回车
            ipage = 1;
            let val = $('#resultSearchTxt').val();
            // console.log(val);
            mohuvalue = val;
            type = 'mohu';
            init();
        }
    })


    $('.gl-wrap').on('click', '.gl-item', function () {
        let id = $(this).data('id');
        location.href = 'xiangqing.html' + '?' + id;// 跳转到详情页  
    })


})();