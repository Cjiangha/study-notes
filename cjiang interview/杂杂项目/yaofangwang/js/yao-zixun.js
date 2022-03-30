var pullDownList = document.getElementsByClassName('pullDownList');


var medben1 = $('.medben1').eq(0);
var medben2 = $('.medben2').eq(0);
var bd_news_dl = $('.bd_news_dl').eq(0);
var html1 = '';
var html2 = '';
// medben2.css();

for (var i = 0; i < 5; i++) {
    html1 += `<dl class="">
                    <dt>
                        <img src="images/yoxinpin1.png" alt="">
                    </dt>
                    <dd>
                        <span>佳膳优选全营养配方粉</span>
                        <strong>
                            <b>￥168.00</b>
                            <i>￥168.00</i>
                        </strong>
                    </dd>
                </dl> `;

    html2 += `<dl>
                    <dt>
                        <img src="images/yoshihui1.png" alt="">
                    </dt>
                    <dd>
                        <span>复方板蓝根颗粒</span>
                        <strong>
                            <b>￥23.80</b>
                            <i>￥26.80</i>
                        </strong>
                    </dd>
                </dl>`;
}

var html3 = ` <dl>
                    <dt>
                        <img src="images/yaozixun1.png">
                    </dt>
                    <dd>
                        <h4>集中释疑：如何给肿瘤患者补营养？</h4>
                        <p>
                            目前没有科学证据证实吃无鳞鱼或鸡肉等会促进肿瘤生长或转移，但是如果在各种疾病急性期，如发热、出疹子时还是应注意不吃或少吃，以免加重病情。另外吃中药时应问问中医大夫有何饮食禁忌。
                            ...
                        </p>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <img src="images/yaozixun1.png">
                    </dt>
                    <dd>
                        <h4>集中释疑：如何给肿瘤患者补营养？</h4>
                        <p>
                            目前没有科学证据证实吃无鳞鱼或鸡肉等会促进肿瘤生长或转移，但是如果在各种疾病急性期，如发热、出疹子时还是应注意不吃或少吃，以免加重病情。另外吃中药时应问问中医大夫有何饮食禁忌。
                            ...
                        </p>
                    </dd>
                </dl>`;
medben1.html(html1);
medben2.html(html2);
bd_news_dl.html(html3);


//渲染。
var arr =
    [{ "feel": "肿瘤", "title": "集中释疑：如何给肿瘤患者补营养？" }, { "feel": "肿瘤", "title": "肿瘤患者不戒烟，会有什么后果？" }, { "feel": "乳腺癌", "title": "乳腺癌问题集锦" }, { "feel": "乳腺癌", "title": "哪些人需要小心乳腺癌？" }, { "feel": "肿瘤", "title": "肝癌可以早发现！" }, { "feel": "乙肝", "title": "乙肝疾病的防与养" }, { "feel": "乙肝", "title": "肝病应该这样吃" }, { "feel": "肿瘤", "title": "防癌也要从娃娃抓起！" }];

//返回一个相等的数组
var str = arr.map(function (item) {
    return `  <div>
                 <span>${item.feel}</span>
                 <a href="###"> ${item.title}</a>
              </div>`
}).join('');
$('.newsdiv3_bg .news_ul_list').html(str);