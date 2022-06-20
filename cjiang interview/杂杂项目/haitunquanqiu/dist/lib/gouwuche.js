(function () {
    /*
        需求：
            * 点击加减可以修改数量和小计
            * 删除当行
            * 全选不选
            * 全删
            
        接口：
            * 渲染数据接口：订单表(详情页点击购买的时候存的数据)
            * 数量加减
            * 删除当行、删除全部
            * 选做：保存总数量和总价格
    */


    //封装成函数，传两个值，节点，和数量
    function priceChange(ele, num) {
        let kucun = $(ele).parent().find('.nownum').data('num');//data-num，找到库存量。
        if (num < 1) {
            num = 1;
        }
        else if (num > kucun) {
            num = kucun;
        }
        $(ele).parent().find('.nownum').val(num);//从母亲节点中找到元素.nnownum

        //价格相应的改变,总价=单价 * 数量
        let price = $(ele).parent().parent().find('.good_price').text().slice(2);//单价  
        //价格渲染,
        let totalprice = num * price;
        let goodtotal = $(ele).parent().parent().find('.good_total');
        goodtotal.html(`￥ ${totalprice.toFixed(2)}`);
    }

    //加
    $('#cart').on('click', '.addnum', function () {
        let num = $(this).prev().val();
        num++;
        priceChange(this, num);
        create();
    })

    // 减
    $('#cart').on('click', '.cutnum', function () {
        let num = $(this).next().val();
        num--;
        priceChange(this, num);
        create();
    })


    //手动输入
    $('#cart').on('input', '.nownum', function () {
        let num = $(this).val();
        priceChange(this, num);
        create();
    })

    //删除当行,删除
    $('#cart').on('click', '.good_del', function () {
        let isok = confirm('你的真的要删除吗？？');
        if (isok) {
            $(this).parent().remove();
        }
        if ($('#cart .goods').size() == 0) {
            //当商品条数为0的时候，把下面的信息删除了
            $('#del').css('display', 'none');
        }
    });

    // 复选框控制总量和总价,返回一个数组，存入索引值
    function checkedArr() {
        let arr = [];
        //遍历，完再push
        $('.good_check input').each(function (index, item) {
            //item 指的是节点   index指的是索引值
            if ($(item).prop('checked')) {
                //被勾选就记录下标
                arr.push(index);
            }
        });
        // console.log(arr);
        return arr;
    }


    // 计算总价格，总商品数量，和多个单选控制全选的方法，在单选，全选，删除，全删，增加减少数量，改变数量事件中都要运用。
    function create() {
        let checkearr = checkedArr();//数组下标
        // console.log(checkearr);
        let num = 0;//总量
        let totalprice = 0;//总价格
        checkearr.forEach(function (item, index) {
            num += $('#cart .nownum').eq(checkearr[index]).val() * 1;
            totalprice += $('.good_total').eq(checkearr[index]).text().slice(2) * 1;
        })

        //拿出数量num和价格tatalprice,进行渲染
        $('#del #totalprice').html(`总计（不含运费）：￥${totalprice.toFixed(2)}`);
        $('#del #allnum').html(`已选 ${num} 件商品`);

        let length = $('.good_check input').length;
        let achecknum = $('.good_check input:checked').length;
        //多个复选框按钮控制全选按钮
        if (length == achecknum) {
            $('#allchecked input').prop('checked', true);
        }
        else {
            $('#allchecked input').prop('checked', false);
        }
    }


    //全选功能
    $('#allchecked input').click(function () {
        let isok = $('#allchecked input').prop('checked');
        $('.good_check input').prop('checked', isok);
        create();
    });

    //全删：删除被选中行
    $('#delall').click(function () {
        let checkall = checkedArr().reverse();//返回被勾选的下标数组, reverse() 方法用于颠倒数组中元素的顺序。
        let ok = confirm('您确定要删除我们？');
        if (ok) {
            console.log(checkall);
            checkall.forEach(function (item, index) { //index是取到数组的下标，所选第几个它的下标相应是第几
                console.log(index);
                $('#cart .goods').eq(checkall[index]).remove();
            });
        }
        create();
        if ($('#cart .addnum').size() == 0) {
            //已经没有数据,条数为0的时候
            $('#del').css('display', 'none');
        }
    });
    //点击之后执行事件,相应的总数量和价格改变
    $('#cart').on('click', '.good_check input', function () {
        create();
    });

})();