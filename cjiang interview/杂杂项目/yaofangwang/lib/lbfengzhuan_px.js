/* 
    左边的图向右
*/


function carouselimg2(opt) {
    /*
        需求：
            * 自动轮播：开启定时器切换图片
            * 点击左右按钮可以切换图片
            * 点击焦点可以切换对应图片
    */
    let dafaultData = {//可选项，默认参数
        iw: 600,//宽度为500
        ih: 300,//高度为300
        time: 2 //切换时间默认为2S
    }
    Object.assign(dafaultData, opt);//用默认参数
    //找节点
    let box = document.getElementById(dafaultData.ele);
    let bigpic = box.getElementsByClassName('imglist')[0];//存大图的最外层盒子
    let light = box.getElementsByClassName('light')[0];
    // let prevBtn = box.getElementsByClassName('prev')[0];
    // let nextBtn = box.getElementsByClassName('next')[0];
    // let posibtn = box.getElementsByClassName('posibtn')[0];
    let timer = null;
    let num = 0;//可视区图片的下标
    let data = dafaultData.imgdata;//图
    let time = dafaultData.time * 1000;


    //1、图片的宽高的设置
    bigpic.style = box.style = `width:${dafaultData.iw}px;height:${dafaultData.ih}px;`;
    //设置按钮外面盒子的宽高，让它定死在左右两边
    // posibtn.style.width = light.style.width = `${dafaultData.iw}px`;

    //2、渲染数据
    var pj = data.map(function (item) {
        return `<li style ="width:${dafaultData.iw}px;height:${dafaultData.ih}px;"><img src="${item}" alt=""></li>`;
    }).join('');

    bigpic.innerHTML = pj;//往大图里面渲染数据
    //渲染完之后再取节点
    let imglist = bigpic.getElementsByTagName('li');
    let iw = imglist[0].offsetWidth;

    //全部图片放到右侧，第一张放在可视区
    for (let ele of imglist) {
        ele.style.left = iw + 'px';
    }
    imglist[0].style.left = 0;

    // 自动轮播  写一个方法，左图向右，右图向左，自动轮播，
    //3.自动轮播：开启定时器切换图片
    timer = setInterval(next, time);//每隔两秒切换一张图片

    function next() {
        //旧图挪走
        startMove(imglist[num], { 'left': -iw });
        //新图进场
        // num++;
        num = ++num > imglist.length - 1 ? 0 : num;//当数量>4的时候，就变为0；当
        imglist[num].style.left = iw + 'px';//确保新图在右侧:候场
        startMove(imglist[num], { 'left': 0 });
        liang();
    }

    function prev() {
        //旧图挪走
        startMove(imglist[num], { 'left': iw });
        //新图进场
        // num++;
        num = --num < 0 ? imglist.length - 1 : num;
        imglist[num].style.left = -iw + 'px';//确保新图在右侧:候场
        startMove(imglist[num], { 'left': 0 });
        liang();
    }

    //4.点击左右按钮可以切换图片
    box.onmouseover = () => {
        clearInterval(timer);
    }

    box.onmouseout = () => {
        clearInterval(timer);
        timer = setInterval(next, time);
    }

    // prevBtn.onclick = () => {
    //     //上一张
    //     prev();
    // }

    // nextBtn.onclick = () => {
    //     //下一张
    //     next();
    // }

    //5.点击焦点可以切换对应图片
    let html = '';
    for (let i = 0; i < imglist.length; i++) {
        html += `<span>${i + 1}</span>`;
    }
    light.innerHTML = html;
    light.children[0].className = 'active';

    //焦点跟随
    function liang() {
        for (let i = 0; i < imglist.length; i++) {//排他
            light.children[i].className = '';
        }
        light.children[num].className = 'active';
    }

    //6、利用事件委托给焦点绑定事件
    light.onclick = ev => {

        if (ev.target.tagName.toLowerCase() == 'span') {
            let index = ev.target.innerHTML - 1;
            if (index > num) {
                //新图从右侧进入
                //旧图挪走
                startMove(imglist[num], { 'left': -iw });
                imglist[index].style.left = iw + 'px';
                startMove(imglist[index], { 'left': 0 });
            }
            if (index < num) {
                //新图从左侧进入
                startMove(imglist[num], { 'left': iw });
                imglist[index].style.left = -iw + 'px';
                startMove(imglist[index], { 'left': 0 });

            }
            num = index;
            liang();
        }

    }
}