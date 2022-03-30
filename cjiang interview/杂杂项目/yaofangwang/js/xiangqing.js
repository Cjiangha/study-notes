(function () {
    // 全部、收起
    var html1 = `  <span>郑重声明：</span>尊敬的顾客，药房网受各门店委托为其发布药品信息。您的用药需求信息提交后，将由离您较近的药房网门店为您提<a
    class="more iconfont icon-xiala">&#xe60a;全部</a>`;
    var html2 = `<span>郑重声明：</span>尊敬的顾客，药房网受各门店委托为其发布药品信息。您的用药需求信息提交后，将由离您较近的药房网门店为您提供所需药品配送及药学服务，药房网处方药品不提供邮寄服务。
    <br>药品监管部门提示：如发现本网站有任何直接或变相销售处方药行为，请保留证据，拨打12331举报，举报查实给予奖励。  <a class="shou iconfont icon-xiangshang">&#xe614;收起</a>`;

    // 显示更多 show more和收起 shou
    $(".branddesc").off('click').on('click', '.more', function () {
        $('.branddesc p').html(html2);
    }).on('click', '.shou', function () {
        $('.branddesc p').html(html1);
    });


    // 客服变颜色
    let num = 0;
    function changecolor() {
        num++;
        if (num == 2) {
            $('.Shake').css('color', 'rgb(255,0,0)');
            $('.Shake i').css('color', 'rgb(255,0,0)');
            num = 0;
        }
        else if (num == 1) {
            $('.Shake').css('color', 'rgb(91,91,91)');
            $('.Shake i').css('color', 'rgb(91,91,91)');
        }
    }
    setInterval(changecolor, 1000);

})();