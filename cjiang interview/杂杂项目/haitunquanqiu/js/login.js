(function () {
    /* 点击是二维码登录还是用户名密码登录 */
    $('.login-tab-l').click(function () {
        $('.erweima').show();
        $('.login-box').hide();
        $(this).find('a').addClass('checked');
        $(this).next().find('a').removeClass('checked');
    });

    $('.login-tab-r').click(function () {
        $('.erweima').hide();
        $('.login-box').show();
        $(this).find('a').addClass('checked');
        $(this).prev().find('a').removeClass('checked');
    })


    /* 清空文本框的数据 */
    $('.yonghuming').on('input', function () {
        if ($(this).val() != '') {
            $(this).next().show();
        } else {
            $(this).next().hide();
        }
    })
    $('.mima').on('input', function () {
        if ($(this).val() != '') {
            $(this).next().show();
        } else {
            $(this).next().hide();
        }
    })

    $('.item-fore1').on('click', '.clear-btn', function () {
        $(this).prev().val('');
        $(this).hide();
    })

    $('.item-fore2').on('click', '.clear-btn', function () {
        $(this).prev().val('');
        $(this).hide();
    })

    /* 注册按钮跳转  */
    $('.extra-r a').click(function () {
        location.href = 'register.html';
    })

    /* 登陆成功跳转页面，可以退出(查cookie是否含有该用户)
              * 如果是在注册页、首页跳转到登陆页；本来就在登陆页：登陆成功就跳转到首页 : window.open(url) location.href=url
              * 如果是非登陆页登陆的，跳转回上一页(localstorage存上一页路径)
    */

    let yhm = document.getElementById('yhm');//用户名
    let inf1 = document.querySelector('.msg-error span');//提示1
    let psw = document.getElementById('psw');//密码
    let btn = document.getElementById('btn');
    let yhmisok = false;//验证用户名是否存在,false-不存在，true-存在

    // 判断用户名是否存在
    yhm.onblur = function () {
        ajax({
            type: 'post',
            url: '../api/regandlogin.php',
            data: {
                username: yhm.value.trim(),
                type: 'checkname'
            },
            success: str => {
                // console.log(str); 
                if (str == 'yes') {
                    inf1.innerHTML = '用户不存在！';
                    yhmisok = false;
                    inf1.parentNode.style = 'display:block;';
                } else {
                    yhmisok = true;
                    inf1.parentNode.style = 'display:none;';
                }

            }
        })
    }


    btn.onclick = function () {
        //验证用户名和密码跟数据库是否匹配
        $.ajax({
            type: 'post',
            url: '../api/regandlogin.php',
            data: {
                username: yhm.value.trim(),
                password: psw.value.trim(),
                type: 'login'
            },
            success: str => {
                if (yhmisok == true) {//有该用户名
                    if (str == 1) {//验证用户名和密码正确
                        setCookie('username', yhm.value.trim(), 2);
                        let url = getCookie('url');//记录上一页的url地址
                        location.href = url;
                    } else if (str == 0) {//不正确
                        psw.value = '';
                        inf1.parentNode.style = 'display:block;';
                        inf1.innerHTML = '密码错啦！';
                    }
                } else {
                    // alert('用户名不存在，请重新输入！'); 
                    inf1.parentNode.style = 'display:block;';
                    inf1.innerHTML = '用户名不存在，请重新输入！';
                }

            }
        })
    }


})();