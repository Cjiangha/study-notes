function easylunbo(opt) {
    let dafaultData = {//可选项，默认参数
        ele: '#box',
        imgarr: ['images/1F_LUNBO1.jpg', 'images/1F_LUNBO2.jpg'],
        iw: 600,//宽度为500
        ih: 300,//高度为300
        time: 2 //切换时间默认为2S
    };

    Object.assign(dafaultData, opt);//用默认参数
    let width = $(`${dafaultData.ele}`).eq(0).innerWidth();//盒子的宽度大小
    let box = document.querySelector(dafaultData.ele);//最大的盒子
    let yuandian = box.querySelectorAll('.light2 span');//找到高亮节点
    let i = 1;//i用来和长度进行判断的。
    let time2 = null;
    let num = 0;

    dafaultData.imgarr = ['images/1F_LUNBO1.jpg', 'images/1F_LUNBO2.jpg'];
    // 渲染
    let ul = $(`${dafaultData.ele} .imageul`);
    var str = dafaultData.imgarr.map(function (item) {
        return ` <li><img src="${item}" alt=""></li>`;
    }).join('');
    str += `<div class="clear"></div>`;
    ul.html(str);

    // 1、下方两个圆点按钮高亮方法
    function light(str) {
        // 排他，在加类名
        for (var i = 0; i < yuandian.length; i++) {
            yuandian[i].className = '';
        }
        yuandian[str].className = 'on';
    }

    //2、 对ul进行移动方法
    function yidong() {
        i++;
        if (i >= $(`${dafaultData.ele} ul li`).size()) {
            i = 0;
            $(`${dafaultData.ele} ul`).animate({ 'left': '-605px' });
        }
        else {
            $(`${dafaultData.ele} ul`).animate({ 'left': '0PX' });
        }
    }
    // 对让他高亮方法
    function time() {
        yidong()
        num = ++num > 1 ? 0 : num;//当数量>4的时候，就变为0；当
        light(num);
    }
    // 初始化
    time2 = setInterval(time, 2000);

    // 3、最大盒子移入移出事件，为了清除定时器
    $(`${dafaultData.ele}`).mouseenter(function () {
        clearInterval(time2);
    })
    // 移出的时候初始化
    $(`${dafaultData.ele}`).mouseleave(function () {
        time2 = setInterval(time, 2000);
    })

    // 4、高亮按钮鼠标移入事件
    $(`${dafaultData.ele}`).on('mouseenter', '.light2 span', function (e) {
        // 高亮
        $(e.target).addClass('on').siblings().removeClass('on');
        let index = $(this).index();
        $(`${dafaultData.ele} ul`).animate({ 'left': -(index * 605) + 'PX' }, 'normal');
    });

    // 5、高亮按钮鼠标移出事件
    $('.light2 span').mouseleave(function () {
        clearInterval(time2);
    })


}

