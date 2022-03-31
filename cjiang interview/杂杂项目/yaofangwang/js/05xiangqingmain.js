
(function () {

    // 选项卡
    $('.detail_parameter').on('click', '.tonglei li', function () {
        $(this).addClass('on').siblings().removeClass('on');;
        $('.tab_box div').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
    });
})();


(function () {

    //取节点
    let middleproperty = document.querySelector('#middle_property');
    let main = document.querySelector('#main');
    let num = ''
    let oldnum = '';//查询到旧的数量
    // 渲染函数
    function xuanrang(arr) {
        let str = arr.map(function (item) {
            return `<div class="info">
                    <h1>${item.title}</h1>
                    <p class="title" style="color:#CD6E00;height:auto;font-size:15px;">解表散热，舒肝和胃
                        胸胁苦满，食欲不振，心烦喜呕，口苦咽干。
                    </p>
                    <p>规 格： ${item.specification}
                        <br> 商品编码：112384
                        <br> 批准文号：国药准字Z36020674
                        <br> 生产厂家：${item.company}
                    </p>
                    <!-- 价格信息 -->
                    <dl>
                        <dt>
                            <span>会 员 价：</span>
                            <strong>￥${item.price}</strong>
                            <input type="hidden" id="price" value="10.40">
                        </dt>
                        <dd>
                            <span>促销信息：</span>
                            <strong>
                                <b>
                                    <i>包邮</i>
                                    购买本店商品满199元免基础配送费，偏远地区除外
                                </b>
                            </strong>
                        </dd>
                    </dl>
                </div>
                <!-- 选择的东东 -->
                <div class="select">
                    <dl>
                        <dt>配 送 至:</dt>
                        <!-- 省市区三级 -->
                        <dd>请选择</dd>
                    </dl>
                    <dl>
                        <dt>数 量:</dt>
                        <dd>
                            <div class="num">
                                <span class="minus">-</span>
                                <input class="am-num-text" id="numInp" type="text" value="1">
                                <span class="plus">+</span>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            库 存:
                        </dt>
                        <dd>
                            <span id="newKuc">${item.stock}</span>
                        </dd>
                    </dl>
                </div>
                <a  target="_self"  href="###" class="confirm_btn1 btnCart">
                    <i class="iconfont" style="display: inline-block;width:20px;">&#xe682;</i> 
                    加入需求清单
                </a>`;
        }).join('');
        middleproperty.innerHTML = str;


        // 2、渲染放大镜
        magniglass({
            ele: 'wrap', //最外层盒子的id(必填)
            imglist: [`${arr[0].smallpic}`, `${arr[0].smallpic}`, "", "",], //图片数据(必填)
            scal: 2, //大图放大倍数(选填，默认是2倍)
            speed: 1 //小图运动的图片个数(选填，默认是一次动一张图)
        });
        let smallpic = arr[0].smallpicjihe.split('?');
        let smaller = document.querySelector('.smaller');
        let html = '';
        for (let q = 0; q < smallpic.length; q++) {
            html += `    <li><img src="../images/${smallpic[q]}" alt=""></li>`;
        }
        smaller.innerHTML = html;
    }

    //购物车加减
    function jiajian() {
        $('.minus').click(function () {
            let shul = $('#numInp').val() - 0;
            shul--;
            let kucunval = $('#newKuc').html();
            if (shul <= 1) {
                shul = 1;
            }
            $('#numInp').val(shul);
        })

        // 失去焦点的时候，先拿到input标签的值，拿到之后，失去焦点,要转换为int型
        $('#numInp').blur(function () {
            let ss = $('#numInp').val() - 0;
            let kucunval = $('#newKuc').html() - 0;//库存量
            console.log(ss, kucunval);
            if (ss <= 1) {
                $(this).val(1);
            }
            if (ss >= kucunval) {
                $(this).val(kucunval);
            }
        })

        // ++
        $('.plus').click(function () {
            let shul = $('#numInp').val() - 0;
            shul++;
            let kucunval = $('#newKuc').html();//库存量
            if (shul >= kucunval) {
                //大于库存量
                shul = kucunval;
            }
            $('#numInp').val(shul);
        })
    }
    let url = decodeURI(location.search.slice(1));
    let good = strToobj(url);//转成一个对象 

    function init() {
        let xiangqingxuanran = new Promise(function (resolve) {
            ajax({
                type: "get",
                url: '../api/xiangqingxuanrang.php',
                data: {
                    uid: good.uid,
                },
                success: str => {
                    resolve(str); //resolve回调函数把参数回调传到下面then
                }
            })
        });
        xiangqingxuanran.then(function (data) {
            let arr = JSON.parse(data);//转成对象
            xuanrang(arr);
            jiajian();//购物车数量的加减乘除
            console.log(arr);

            let primise2 = new Promise(function (resolve) {
                //第二层Promise
                ajax({
                    type: 'post',
                    url: '../api/getbuycartadd.php',
                    data: {
                        //查找到数据
                        uid: good.uid - 0,
                    },
                    success: str => {
                        resolve(str);
                    }
                })
            })
            primise2.then(function (data) {
                let arr = JSON.parse(data);
                console.log(arr);
                // num = $('#numInp').val() - 0;
                //当找不到这条数据也执行下面的。。
                $('.btnCart').click(function () {
                    //找到它的uid的值，找到之后查询得到数量，更新先拿到原先的旧的数量值
                    if (arr.length >= 1) {
                        oldnum = arr[0].num - 0;
                    } else {
                        oldnum = 0;
                    }
                    let primise3 = new Promise(function (resolve) {
                        num = $('#numInp').val() - 0;
                        // 接口：没有就添加到购物车，有就更新。。
                        ajax({
                            type: 'post',
                            url: '../api/insertbuycart.php',
                            data: {
                                uid: good.uid - 0,
                                num: num + oldnum,
                                // action: 'select',
                            },
                            success: str => {
                                resolve(str);
                            }
                        })
                    });
                    primise3.then(function (data3) {
                        //返回参数  insert->插入  update->更新
                        let ck = getCookie('username');
                        if (ck) {
                            if (data3 == 'insert' || data3 == 'update') {
                                alert('添加购物车成功');
                                location.href = 'shop.html?uid=' + good.uid;
                            }
                            else {
                                alert('添加购物车失败');
                            }
                        } else {
                            alert('用户没登录,跳转到首页进行登录');
                            location.href = '../shouye.html';
                        }


                    })

                });
            });
        })
    }

    init();

})();







/*点击加入购物车之后，会把数据插入数据库，数据从数据库中拿出来，
    会传出来一个id值为商品的id，对应的id会插入到订单表中，从订单表中我们有可以判断
*/
(function () {
    //渲染完之后，数量更改跟库存的数量进行比较，比他大的时候回变成库存量那么大，两个事件：blur还有click
    // 

})();
