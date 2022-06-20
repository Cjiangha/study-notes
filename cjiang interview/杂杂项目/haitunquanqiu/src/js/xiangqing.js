(function () {
    //吸顶效果
    //吸顶对象$('.m-aside .mt'),$('#detail .tab-main')
    var k = 861;//获取第一次吸顶对象的距离顶部的高度
    // console.log($('#detail .tab-main').offset().top);236px
    $(window).scroll(function () {
        if ($(window).scrollTop() >= k) {
            $('.m-aside .mt').addClass('dingwei');
            $('#detail .tab-main').addClass('dingwei');
        } else {
            $('.m-aside .mt').removeClass('dingwei');
            $('#detail .tab-main').removeClass('dingwei');
        }
    });

    //点击商品详情和评价可以切换
    $('.detail .ETab div.large li').eq(0).click(function () {//点击商品详情
        $(this).addClass('current').siblings().removeClass('current');
        $('#detail .tab-con').css('display', 'block');
        $('.comment').css('display', 'none');
        if ($(window).scrollTop() >= k) {
            $(window).scrollTop(k - 1);
        }
    });
    $('.detail .ETab div.large li').eq(1).click(function () {//点击评价
        $(this).addClass('current').siblings().removeClass('current');
        $('#detail .tab-con').css('display', 'none');
        $('.comment').css('display', 'block');
        if ($(window).scrollTop() >= k) {
            $(window).scrollTop(k - 1);
        }
    });

    /* 渲染 */
    let gid = decodeURI(location.search.slice(1));//找到地址后面的参数
    setCookie('baby', gid);
    $.ajax({
        type: 'get',
        url: '../api/xiangqing.php',
        data: {
            gid
        },
        success: str => {
            let arr = JSON.parse(str);
            let smallpic = arr.smallpic.split(',');
            let lismallpic = smallpic.map(function (item) {
                return `<li>
                            <img src="${item}">
                        </li>`;
            }).join('');
            $('#litu').html(lismallpic);
            $('.preview .main-img img').prop('src', smallpic[0]);
            $('.zoomdiv').find('img').prop('src', smallpic[0]);
            $('.itemInfo-wrap .sku-name').html(arr.title);
            $('.itemInfo-wrap .news').html(arr.nameother);
            $('.itemInfo-wrap .summary-price-wrap .summary-price .p-price .price').html(arr.price);
            $('#buy-num').attr('data-kucun', `${arr.kucun}`);

            // 拖拽 click mousemove mouseup
            $('#spec-n1').mousemove(function (ev) {
                $('.preview .jqZoomPup').show();
                $('.preview .zoomdiv').show();
                // 鼠标在mian里滑动，mask不断计算left和top的值跟+着移动，
                var pic = $('.preview .main-img img').offset();
                let left = ev.pageX - pic.left - $('.jqZoomPup').innerWidth() / 2;
                let top = ev.pageY - pic.top - $('.jqZoomPup').innerHeight() / 2;
                if (left <= 0) {
                    left = 0;
                } else if (left > $('.preview .main-img img').innerWidth() - $('.preview .jqZoomPup').innerWidth()) {
                    left = $('.preview .main-img img').innerWidth() - $('.preview .jqZoomPup').innerWidth();
                }
                if (top <= 0) {
                    top = 0;
                } else if (top > $('.preview .main-img img').innerHeight() - $('.preview .jqZoomPup').innerHeight()) {
                    top = $('.preview .main-img img').innerHeight() - $('.preview .jqZoomPup').innerHeight();
                }

                $('.preview .jqZoomPup').css('left', left);
                $('.preview .jqZoomPup').css('top', top);
                let scale = ($('.preview .bigimg').innerWidth() - $('.preview .zoomdiv').innerWidth()) / ($('.preview .main-img img').innerWidth() - $('.preview .jqZoomPup').innerHeight());//
                $('.preview .bigimg').css('left', scale * -left);
                $('.preview .bigimg').css('top', scale * -top);
            })

            // 鼠标划出的时候，隐藏mask和marginpic
            $('#spec-n1').mouseout(function () {
                $('.preview .jqZoomPup').hide();
                $('.preview .zoomdiv').hide();
            })
            // 点击小图切换main里面的图 
            $('#litu li img').mouseenter(function () {
                let src = $(this).prop('src');
                $('.preview .main-img img').prop('src', src);
                $('.zoomdiv').find('img').prop('src', src);
            })

            // 点击左右箭头能移动图的列表
            function ullistmove(iw) {
                var listleft = parseInt($('.lh').css('left'));
                listleft += iw;
                $('#spec-backward').removeClass('disabled');
                $('#spec-forward').removeClass('disabled');
                if (listleft <= $('#spec-list').innerWidth() - $('.lh').innerWidth()) {//右移到头
                    listleft = $('#spec-list').innerWidth() - $('.lh').innerWidth();
                    $('#spec-backward').addClass('disabled');
                } else if (listleft > 0) {//左移到头
                    listleft = 0;
                    $('#spec-forward').addClass('disabled');
                }
                $('.lh').animate({ left: listleft }, 200);//移动
            }
            var liswidth = $('.preview .spec-items ul li').length * $('.preview .spec-items ul li').eq(0).outerWidth(true);
            $('.lh').css('width', liswidth + 'px');//根据小图个数决定ul的宽度
            var iw = $('.preview .spec-items ul li').eq(0).outerWidth(true);
            $('#spec-forward').click(function () {
                ullistmove(iw);
            });
            $('#spec-backward').click(function () {
                ullistmove(-iw);
            });

            // 点击增加购买数量，最低1，最高为库存量
            $('.btn-add').click(function () {
                let val = $('#buy-num').val();
                val++;
                val = fanwei(val);
                $('#buy-num').val(val);
            })

            $('.btn-reduce').click(function () {
                let val = $('#buy-num').val();
                val--;
                val = fanwei(val);
                $('#buy-num').val(val);
            })

            //键盘输入事件
            $('#buy-num').keyup(function () {
                let val = $('#buy-num').val();
                val = fanwei(val);
                $('#buy-num').val(val);
            })

            function fanwei(a) {
                let kucun = $('#buy-num').data('kucun') - 0;
                $('.choose-btns .choose-amount a').removeClass('disabled');//排他 清除disabled
                if (a <= 1) {
                    a = 1;
                    $('.btn-reduce').addClass('disabled');
                } else if (a >= kucun) {
                    a = kucun;
                    $('.btn-add').addClass('disabled');
                }
                return a;
            }
        }
    })


    /* 
        加入购物车
            建表：查询购物车表有没有该商品，没有-插入
                                         有-更新-一般更新数量就好了
                                         判断登录和登录  cookie值判断
            
    */

    let oldnum;//旧的数量
    let username = getCookie('username');
    console.log(gid, oldnum, username);
    $('#InitCartUrl').click(function () {
        let promise1 = new Promise(function (resolve) {
            $.ajax({
                type: 'post',
                url: '../api/getbuycartadd.php',
                data: {
                    gid: gid,
                    username: username
                },
                success: str => {
                    resolve(str);
                }
            })
        })
        promise1.then(function (data) {
            let arr = JSON.parse(data);
            if (arr.length > 0) {
                oldnum = arr[0].gnum - 0;
            } else {
                oldnum = 0;
            }
            let num = $('#buy-num').val() - 0;
            console.log(arr, oldnum, num);
            //第二个primise
            if (username) {//若登录的话，发送ajax
                $.ajax({
                    type: 'post',
                    url: '../api/addshopcart.php',
                    data: {
                        gid,
                        username: username,
                        gnum: oldnum + num
                    },
                    success: str => {
                        console.log(str);
                        if (str == 'update' || str == 'insert') {
                            location.href = 'cart.html?' + `${gid}`;
                        }
                    }
                })
            }
            else { //未登录状态
                alert('请登录你的用户');
                location.href = 'login.html';
            }

        })

    })

})();