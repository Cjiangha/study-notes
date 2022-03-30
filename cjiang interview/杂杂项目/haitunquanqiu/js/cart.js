(function () {
    /*
        需求：购物车
            * 点击加减可以修改数量和小计
            * 删除当行
            * 全选和不选
            * 全删

        接口：
            * 渲染数据接口：订单表（详情页点击购买的时候存的数据）
            * 数量加减
            * 删除当行、删除全部
            * 选做：保存总数量和价格
    */

    // 全局变量
    let type;
    let username = getCookie('username');
    class Car {
        constructor(id) {
            //构造函数
            this.carBox = $(id);
            this.init();
        }
        init() {
            //查找加点，绑定事件
            this.creatList();//渲染数据到购物车
            this.addNum();//点击加添加数量
            this.cutNum();//点击减少数量
            this.manual();//手动输入修改数量
            this.removeRow();//删除某行 3.ajax gid
            this.allCheck();//全选 
            this.checkRow();//勾选某一行复选框 4.ajax 要不要把总数量和总价存起来？如果多个页面要展示这个数据，就做接口存起来
            this.allRemove();
        }

        creatList() {
            //发送ajax获取数据，渲染到页面
            type = 'xuanrang';
            if (getCookie('username')) {
                $.ajax({
                    type: 'post',
                    url: '../api/cartxuanrang.php',
                    data: {
                        username,
                        type: 'xuanrang'
                    },
                    success: str => {
                        let arr = JSON.parse(str);
                        let buylist = arr.map(function (item, index) {
                            let price = item.gprice;
                            let num = item.gnum;
                            return `<li class="item-list" data-sid="${item.sid}">
                                        <div class="cell p-checkbox">
                                            <input type="checkbox" class="jdcheckbox">
                                        </div>
                                        <div class="cell p-goods">
                                            <div class="p-img">
                                                <img src=" ${item.gtu}" alt="">
                                            </div>
                                            <div class="p-name title">
                                                <a href="###">
                                                    <em class="jdint-icon"></em>
                                                    ${item.gtitle}
                                                </a>
                                            </div>
                                            <span class="clear">
                
                                            </span>
                                        </div>
                                        <div class="cell p-props">
                                            <div class="props-txt"></div>
                                            <div class="props-txt"></div>
                                        </div>
                                        <div class="cell p-price">
                                            <strong>${price}</strong>
                                        </div>
                                        <div class="cell p-quantity">
                                            <a href="###" class="decrement disabled">-</a>
                                            <input type="text" class="itxt" data-kucun="10" value="${item.gnum}">
                                            <a href="###" class="increment">+</a>
                                        </div>
                                        <div class="cell p-sum">
                                            <strong>${(price * num).toFixed(2)}</strong>
                                        </div>
                                        <div class="cell p-action">
                                            <a href="###" class="cart-remove">删除</a>
                                        </div>
                                        <span class="clear"></span>
                                    </li>`;
                        }).join('');
                        $('.liebiao').html(buylist);
                    }
                })
            } else {//未登录

            }

        }

        total(now, num, type) {
            let kuncun = $(now).parent().find('.itxt').data('kucun');//data-num
            if (num < 1) {
                num = 1;
            } else if (num > kuncun) {
                num = kuncun;
                //这里可以给个提示：您输入的值超过了库存量
            }
            //2.ajax 不用type更简单，把页面的num传到数据库，更新数据库
            $(now).parent().find('.itxt').val(num);
            //小计=数量*单价
            let price = $(now).parent().prev().text().slice(2);//单价
            let all = (num * price).toFixed(2);//小计
            $(now).parent().next().find('strong').html(all);

            // 发送更新的ajax
            let sid = $(now).parent().parent().data('sid');
            type = 'update';
            $.ajax({
                type: 'post',
                url: '../api/cartxuanrang.php',
                data: {
                    sid: sid,
                    gnum: num,
                    type
                },
                success: str => {
                }
            })
            this.allNum();
        }
        addNum() {
            //点击加添加数量
            let _this = this;
            this.carBox.on('click', '.increment', function () {
                let num = $(this).prev().val();
                num++;
                // console.log(num);
                _this.total($(this), num, 'add');//修改数量和单价
            });
        }
        cutNum() {
            let _this = this;
            this.carBox.on('click', '.decrement', function () {
                let num = $(this).next().val();
                num--;
                _this.total($(this), num, 'cut');
            });

        }
        manual() {
            let _this = this;
            this.carBox.on('input', '.itxt', function () {
                let num = $(this).val();
                _this.total($(this), num, 'change');
            });
        }
        removeRow() {
            let _this = this;
            this.carBox.on('click', '.cart-remove', function () {
                let ok = confirm('你真的要删我吗？');
                if (ok) {
                    let sid = $(this).parent().parent().data('sid');
                    console.log(sid);
                    $.ajax({
                        type: 'post',
                        url: '../api/deletecartitem.php',
                        data: {
                            sid: sid,
                        },
                        success: str => {
                        }
                    })
                    $(this).parent().parent().remove();
                }
                _this.allNum();
            })
        }
        allCheck() {
            let _this = this;
            $('.select-all .all').click(function () {
                let isok = $(this).prop('checked');
                $('.jdcheckbox').prop('checked', isok);
                // 全选记录反选的状态
                _this.allNum();
            })
        }
        checkArr() {//每一次勾选，就遍历一次勾选状态并push进去
            let arr = [];//存放勾选复选框的下标
            $('.p-checkbox input').each(function (index, item) {
                if ($(item).prop('checked')) {
                    //被勾选了
                    arr.push(index);
                }
            });
            return arr; //返回一个数组
        }
        allNum() {
            let checkall = this.checkArr();//被勾选的行的下标，存在数组里面
            let num = 0;//总数量
            let total = 0;//总价
            checkall.forEach(function (item, index) {
                num += $('#cart .itxt').eq(checkall[index]).val() * 1;//累加
                total += $('#cart .p-sum').eq(checkall[index]).text().slice(2) * 1;
                //数组
                let sid = $('#cart')
            });
            $('.amount-sum em').html(`${num}`);
            $('.sumPrice em').eq(1).html(`${total.toFixed(2)}`);
        }
        checkRow() {
            let _this = this;
            this.carBox.on('click', '.p-checkbox input', function () {
                let len = $('.p-checkbox input').size();
                let allchecknum = $('.p-checkbox input:checked').size();//返回的是个数
                if (len == allchecknum) {
                    $('.select-all .all').prop('checked', true);
                } else {
                    $('.select-all .all').prop('checked', false);
                }
                _this.allNum();
            })
        }
        allRemove() {
            let _this = this;
            $('.remove-batch').click(function () {
                let checkall = _this.checkArr().reverse();//要把数组倒过来遍历，从后往前面删
                let ok = confirm('你确定要删除我们吗？');
                if (ok) {
                    checkall.forEach(function (item, index) {//index为第几个，checkall里面的数字是从大往小排
                        let sid = $('.item-list').eq(checkall[index]).data('sid');//拿到所有sid遍历删除sid
                        $.ajax({
                            type: 'post',
                            url: '../api/deletecartitem.php',
                            data: {
                                sid: sid,
                            },
                            success: str => {

                            }
                        })
                        $('.item-list').eq(checkall[index]).remove();
                        _this.allNum();
                    })
                }
            })
        }
    }
    new Car('#cart');



})();