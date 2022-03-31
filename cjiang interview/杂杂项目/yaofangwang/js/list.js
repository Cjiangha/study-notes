(function () {
    $('.ding').load('0405list-xq-dingbu.html', function () {
        //划入的时候显示，委托事件,把二级列表委托给标题，让标题
        $('.first-nav').on('click', '.left-Head', function () {
            console.log(this);
            $('.left-Head').css('display', 'block');
        })
    });
    $('.head').load('0405header.html');
    $('.foot').load('0405list-xq-footer.html');
})();

(function () {
    // main部分
    $('.main').load('04list_main.html', function () {
        //手风琴，思路：animate，让高度撑开，点击哪个让哪个撑开，其他缩；在点击一次的时候，让自己缩
        $('.classify_fold-item ul li').hide();//让下面的高度为0
        $('.classify_fold-item').delegate('.updown', 'click', function () {
            //slidetoggle——高度撑开
            $(this).siblings().find($('li')).slideToggle().siblings().find($('li')).hide();
        })

        //一共多少商品 直接返回一个值num就好了
        let big = $('.cla_drug_border');//列表的节点
        let topPage = $('.main .topPage');//
        let btn = $('.fSort a').eq(1);//找到升降序的节点
        let paging = document.getElementsByClassName('paging')[0];//页面的最大盒子
        let ipage = 1;//当前页数
        let num = 40;//条数
        let index = (ipage - 1) * num;
        let order;//传到后台的数据
        let price = $('.fSort').children().eq(1);// 找到价格节点的内容
        let isok = true;
        let shengxv;//升降序。。。
        let html = '';

        //1、渲染方法,DOM操作,渲染列表页和分页按钮
        function init(arr2) {
            //40个每一页
            let str = arr2.data.map(function (item) {
                return `<div class="drug_item" data-id="${item.uid}">
                    <!-- 图片 -->
                    <div class="drug_item_img">
                        <!-- 用来跳转的标签 a -->
                        <a href="###">
                            <img src="${item.smallpic}" alt="">
                        </a>
                    </div>
                    <i>￥${item.price}</i>
                    <!-- 用来跳转的标签 a -->
                    <a href="###" target="_blank">${item.title}</a>
                    <span>规格：${item.specification}/</span>
                    <span>${item.company}</span>
                    <!-- 收藏、查看信息大盒子 -->
                    <div class="drug_action">
                        <a class="collect_btn">
                            <!-- 爱心iconfont -->
                            <i class="iconfont icon-shoucang"></i>
                            <em>收藏</em>
                        </a>
                        <a class="collect_btn">
                            <!-- 爱心iconfont -->
                            <i class="iconfont icon-shoucang"></i>
                            <em>查看商品详情</em>
                        </a>
                    </div>
         </div>`;
            }).join('');
            big.html(str);
            //渲染页码
            let yema = Math.ceil(arr2.total / arr2.num);//总页数除以数量在向上取整。
            let html2 = ' <a href="###" id="prev2">上一页</a>';
            for (let i = 0; i < yema; i++) {
                html2 += `<a href="###" class="number" data-id='${i + 1}'>${i + 1}</a>`
            }
            html2 += ` <a href="###" id="next2">下一页</a>`;
            paging.innerHTML = html2;
            paging.children[ipage - 1].className = 'active';//当前页属性名为active ipage-1 为下标，下标高亮。

            //渲染上边的上一页和下一页 
            let ss = `  <span class="fp_total">共${arr2.total}件商品</span>
                <span class="fp_text">
                    <b>${ipage}</b>
                    <em>/</em>
                    <i>${yema}</i>
                </span>
                &nbsp;
                <a href="###" id="prev1">上一页</a> &nbsp;
                <a href="###" id="next1">下一页</a> &nbsp;`;
            topPage.html(ss);
        }


        function clk() {
            let dd = document.querySelectorAll('.drug_item');
            for (let i = 0; i < dd.length; i++) {
                dd[i].onclick = function () {
                    let uid = dd[i].dataset.id;
                    console.log(uid);
                    location.href = 'xiangqingye.html?uid=' + uid;
                }
            }
        }

        // 2、分页功能,把第一页的内容渲染到页面
        function fenye() {
            ajax({
                type: 'get',
                url: '../api/getlist.php',
                data: {
                    page: ipage,
                    num: num
                },
                success: str => {
                    //拿过来的值是一个字符串
                    var arr = JSON.parse(str);
                    init(arr);
                    let aaa = paging.getElementsByClassName('a');
                    for (let i = 0; i < aaa.length; i++) {
                        aaa.className = '';
                        aaa.style = 'background:white';
                    }
                    clk();
                }
            })
            paging.onclick = function (ev) {
                if (ev.target.tagName.toLowerCase = 'a') {
                    ipage = ev.target.innerHTML;//ipage一直在变

                    // ev.target.style = 'background:#4095d4';//这个目标让它加类名高亮
                    // console.log(ipage);
                    fenye();
                }
                if (ev.target.id == 'prev2') {//点击向前
                    fenye();
                }
                if (ev.target.id == 'next2') {
                    fenye();
                }
            }
        }
        fenye();


        price.click(function () {
            // 点击第一次 升序 asc
            if (isok == true) {
                shengxv = 'asc';
                price.html('价格↑');
                price.css('color', 'red').css('background', 'white');
            }
            // 点击第二次 降序 desc
            else if (isok == false) {
                shengxv = 'desc';
                price.html('价格↓');
                price.css('color', 'red').css('background', 'white');
            }
            shengjiangxv();
            paging.onclick = function (ev) {
                if (ev.target.tagName.toLowerCase = 'a') {
                    ipage = ev.target.innerHTML;//ipage一直在变
                    // console.log(ipage);
                    shengjiangxv();//再重新渲染一次
                }
            }
            // 高亮。。。
            isok = !isok;
        });


        /*
        接口详情:
            url: priceanddown.php 
            type：get / post , 
            data:  order,和page和num
            success: 'total' =>  $res2->num_rows,//总量,num_rows为多少条记录
                     'data' => $arr,//查询当前页的数据
                     'page'=> $page,//当前页数
                     'num' =>$num,//条数
        */

        // 3、升降序传ajax和渲染的函数
        function shengjiangxv() {
            ajax({
                type: 'get',
                url: '../api/priceupanddown.php',
                data: {
                    order: shengxv,
                    page: ipage,
                    num: num
                },
                success: str => {
                    var arr2 = JSON.parse(str);//解析数据成为字符串
                    console.log(arr2);
                    init(arr2);
                    clk();
                }
            });
        }
    });


})();