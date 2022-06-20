(function () {

    let input1 = document.querySelector('#form-account');//用户名
    let input2 = document.querySelector('#form-pwd');//密码
    let input3 = document.querySelector('#form-equalTopwd');//确认密码
    let input4 = document.querySelector('#cbox');//
    let tishi1 = document.querySelector('#form-account-error');
    let tishi2 = document.querySelector('#form-pwd-error');
    let tishi3 = document.querySelector('#form-equalTopwd-error');
    var istrue1 = false;
    var istrue2 = false;
    var istrue3 = false;


    /* 点击登录按钮，记录url值为首页 */

    // 验证用户是否被注册过了。
    input1.onblur = function () {
        var value = input1.value;
        //用户名正则：4到16位（字母，数字，下划线，减号,=：
        var reg = /^[a-zA-Z]\w{3,15}$/;
        var istrue = reg.test(value);
        if (value) {
            if (!istrue) {
                tishi1.style = `display:block`;
                tishi1.innerHTML = `<i class="i-error"></i>用户名必须是长度4到16位（必须以字母为开头）`;
                istrue1 = false;
            } else {//输入正确
                istrue1 = true;
                $.ajax({
                    type: 'post',
                    url: '../api/regandlogin.php',
                    data: {
                        username: input1.value.trim(),
                        type: 'checkname'
                    },
                    success: str => {
                        //取节点
                        console.log(str);
                        if (str == 'yes') { //用户名没人用
                            tishi1.style = `display:block;color:#58bc58;`;
                            tishi1.innerHTML = `用户名没人用`;
                        }
                        else if (str == 'no') {
                            tishi1.style = `display:block;color: #f91;`;
                            tishi1.innerHTML = `<i class="i-error"></i>用户名被占用了`;
                        }
                    }
                })
            }
        }
    }

    // 验证密码 正则判断
    input2.onblur = function () {
        var value = input2.value;
        //密码长度  6 - 20    不能包含空格
        var reg = /^\S{6,20}$/;
        var istrue = reg.test(value);
        if (value) {
            if (!istrue) {
                tishi2.style = 'display:block;';
                tishi2.innerHTML = `<i class="i-error"></i>密码长度必须为6-20位`;
                istrue2 = false;
            } else if (input3.value == input2.value) {
                tishi2.style = 'display:block;';
                tishi3.style = 'color:#58bc58'
                tishi3.innerHTML = '输入正确';
                istrue2 = true;
                istrue3 = true;
            }
            else {//输入正确
                tishi2.style = 'display:block;';
                tishi2.innerHTML = ``;
                istrue2 = true;
            }
        }
    }


    // 确认密码和输入的密码不符合
    input3.onblur = function () {
        if (input3.value == '') {
            tishi3.classList.add('error');
            tishi3.style = 'display:block;';
            tishi3.innerHTML = '<i class="i-error"></i>输入为空';
            istrue3 = false;
        }
        else if (input3.value == input2.value) {
            tishi3.style = 'display:block;color:#58bc58'
            tishi3.innerHTML = '输入正确';
            istrue3 = true;
        } else {
            tishi3.style = 'display:block;color:red;';
            tishi3.innerHTML = '<i class="i-error"></i>您输入的密码不一致';
            istrue3 = false;
        }
    }

    /* data：用户名和密码传过去进行判断是否能注册  reg,传回来的值，
       success: 1、用户名存在：  'resultCode'=>500,
                                'message'=>'注册失败！'
                                       
                2、用户名不存在， 'resultCode'=>200,
                                'message'=>'注册成功！'
    */
    let btn = document.querySelector('#form-register');

    btn.onclick = function () {
        let yhmval = input1.value;
        let pswval = input2.value;
        console.log(istrue1, istrue2, istrue3, yhmval, pswval);
        if (istrue1 && istrue2 && istrue3 && yhmval != '' && pswval != '') {
            // 两个正则判断，复选框勾选判断，
            ajax({
                type: 'post',
                url: '../api/regandlogin.php',
                data: {
                    username: input1.value.trim(),
                    password: input2.value.trim(),
                    type: 'reginsert'
                },
                success: str => {
                    if (str == 0) {
                        alert('注册成功');
                        location.href = 'login.html';
                        input1.value = input2.value = input3.value = '';
                        // 拿到cookie值，判断是否为空
                        let url = getCookie('url');
                        if (url) {//存在url
                        } else {//不存在
                            setCookie('url', 'main.html', 7);
                        }
                    } else if (str == 1) {
                        alert('用户名已经存在');
                    }
                    else if (str == 2) {
                        alert('用户名有误');
                    }

                }
            })
        }
        else {
            alert('抱歉  注册的信息有误 请重新填写！！');
        }
    }



})();