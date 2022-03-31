/*
    

     渲染部分：1、全部商品（xxx）
                2、xx公司
                3、商品列表。。（图片、规格、标题、价格，总价（JS算，算完点击存进数据库里面。），删除（JS））
                4、共计x件商品， 优惠 （0元）， 总计  xx钱。。
            
     对比详情页：
               商品名称，厂家，规格，价格，图片

    全选：控制全部下面的下标，
         单个单个控制全选->全勾了的时候->全选勾。
    删除：

    数量增加：和库存比较（库存是渲染出来的，比库存量大，不能购买），库存渲染在data-kucun
*/

//渲染页面
(function () {
    function create(arr2) {
        let html = '';
        let str2 = arr2.map(function (item) {
            return `<div class="listlast" data-id="${item.sid}">
                        <input type="checkbox" name="" id="" class="cbox2">
                        <dl>
                            <dt>
                                <img src="${item.smallpic}" alt="">
                            </dt>
                            <dd>
                                <span><b>${item.title}</b><em style="color: #CD6E00;">[特例]</em></span>
                                <strong>6g/${item.specification}</strong>
                            </dd>
                        </dl>
                        <div class="price">￥${item.price}</div>
                        <div class="num" >
                            <input type="button" value="-" class="btn prev" id="reduce">
                            <input type="text" name="" class="shuliang" data-num="${item.stock}" value="${item.num}" >
                            <input type="button" value="+" class="btn next" id="add">
                        </div>
                        <div class="total"> ￥${item.num * item.price}</div>
                        <div class="available">
                            有货
                        </div>
                        <a href="###" class="del">删除</a>
                    </div>`;
        }).join('');

        html += str2;
        $('.imfor_box').html(html);

    }

    let pmise1 = new Promise(function (resolve) {
        ajax({
            type: 'get',
            url: '../api/getbuycart.php',
            // data:{
            //     username:'小明',
            // },
            success: str => {
                resolve(str);
            }
        })
    });
    pmise1.then(function (data) {
        let arr = JSON.parse(data);
        create(arr);//渲染数据
        //拿到数据再渲染一次

        // 按每一个都选了 点击会全选
        $('.w1 input').click(function () {
            if ($(this).prop('checked') == true) {
                $('.title3 input').prop('checked', true);
                $('.listlast .cbox2').prop('checked', true);
            }
            else {
                $('.title3 input').prop('checked', false);
                $('.listlast .cbox2').prop('checked', false);
            }
        })

        // 拿到uid来渲染数据。
        let a = location.search.split(2);
        let b = encodeURI(a);
        console.log(b);

        function aj(uid, value) {
            let Promise2 = new Promise(function (resolve) {
                //再一次请求ajax
                ajax({
                    type: "post",
                    url: '../api/insertbuycart.php',
                    data: {
                        uid: uid,
                        num: value
                    },
                    success: str => {
                        resolve(str);
                    }
                })
            })
            Promise2.then(function (data) {
                //把数据丢到外面去  防止异步
                if (data == 'update') {
                    console.log('刷新成功！');
                }
            });
        }


        // 封装加号和减号的函数
        function jiajian(now, value, uid) {
            let kucun = $(now).parent().find('.shuliang').data('num');
            if (value < 1) {
                value = 1
            }
            if (value >= kucun) {
                value = kucun;
            }
            $(now).parent().find('.shuliang').val(value);

            let price = $(now).parent().prev().text();
            let chuliprice = price.slice(1);
            let total = chuliprice * $(now).parent().find('.shuliang').val();//总价 计算完赋值
            $(now).parent().next().text('￥' + total);
        }
        // 点击减号，数量一直递减，用到事件委托，就能单独的找到相应的每一列的数据。
        $('.listlast').on('click', '.prev', function (ev) {
            let value = $(this).next().val();//传的参数  另个都字里面
            value--;
            let uid = $(this).parent().parent().data('id');
            jiajian(this, value);
            aj(uid, value);
        })


        //点击加号
        $('.listlast').on('click', '.next', function () {
            let value = $(this).prev().val();
            let kucun = $(this).prev().data('num');
            value++;
            jiajian(this, value);
            let uid = $(this).parent().parent().data('id');
            aj(uid, value);
        })

        $('.listlast').on('blur', '.shuliang', function () {
            let value = $(this).val();
            let kucun = $(this).data('num');
            jiajian(this, value);
            let uid = $(this).parent().parent().data('id');
            aj(uid, value);
        })

        //删除一整行
        $('.imfor_box').on('click', '.del', function () {
            console.log($(this).siblings('.cbox2'));
            let fuqin = $(this).parent();
            let id = fuqin.data('id');
            let ps = new Promise(function (resolve) {
                ajax({
                    type: 'post',
                    url: '../api/delete.php',
                    data: {
                        sid: id
                    },
                    success: str => {
                        resolve(str);
                    }
                })
            });
            let ok = confirm('你真的不要我了吗？？');
            if ($(this).siblings('.cbox2')) {
                if (ok) {//判断为真删掉当行
                    fuqin.remove();
                    fuqin.data('id');
                    ps.then(function (data) {
                        if (data == 'yes') {
                            alert('删除成功');
                        } else if (data == 'no') {
                            //返回no不删除

                        }

                    })
                }
            }



        })

        //复选框控制全选框 ,返回勾选的下标
        function checkedArr() {
            let arr = [];
            $('.imfor_box .listlast input').each(function (index, item) {
                // 遍历 再push
                if ($(item).prop('checked')) {
                    arr.push(index);
                }
            })
            return arr;
        }




        //如果下面的选项都勾选了，则全选按钮会高亮。
        $('.imfor_box .listlast input').click(function () {
            if ($('.imfor_box .listlast input').prop('check')) {

            }
        })



    })

})();




(function () {

})();


