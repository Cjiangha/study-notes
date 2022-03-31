<?php
    include 'conn.php';

    //用户名
    $account = isset($_REQUEST['acc'])?$_REQUEST['acc']:'小明';
    //密码 
    $password = isset($_REQUEST['psw'])?$_REQUEST['psw']:'1234567';

    //写sql语句
    $sql = "select * from user where username='$account' and password='$password'";
    // 找到结果集
    $res = $conn->query($sql);

    if($res ->num_rows){//找到条数,登录成功返回yes
       echo 'yes';
    }else{ // 账号和密码有其中一项错误
        $sql2 = "select * from user where username='$account'";
        $res2 = $conn->query($sql2);
        // 账号或者密码有一项错误，判断是否存在用户
        if($res2->num_rows){//存在用户
            echo 'passwordwrong';
        }
        else{
            echo 'accpswwrong' ;
        }
    }

?>