<?php
    include 'conn.php';
    // 1、取参数
    $username = isset($_REQUEST['username'])?$_REQUEST['username']:'小明3';
    $password = isset($_REQUEST['password'])?$_REQUEST['password']:'';
    $type = isset($_REQUEST['type'])?$_REQUEST['type']:'reginsert';

    //  switch  break..
    switch($type){
            // 检查用户名
        case "checkname":
            $sql = "select * from user WHERE username  = '$username'";
            //2、执行语句 获得结果集
            $res = $conn->query($sql);
            // $arr = $res->fetch_all(MYSQLI_ASSOC);
            if($res->num_rows){//数据库中有了
                echo 'no';
            }else{
                echo 'yes';
            }
            break;
        // 插入数据库
        case "reginsert":
        $sql = "select * from user WHERE username  = '$username'";
        //2、执行语句 获得结果集
        $res = $conn->query($sql);
            if($res->num_rows){//判断存在该用户,返回1
               echo 1;
            }else{ //不存在该用户,
                $sql2 = "insert into user (username,password) VALUES ('$username','$password')";
                $res = $conn->query($sql2);
                if($res){//注册成功 返回0
                    echo 0;
                }else{//注册失败 返回2
                    echo 2;
                }
            }
        break;

        // 检查用户名和密码
        case "login":
            // 2、执行语句
            $sql = "select * from user WHERE username  = '$username' and `password` = '$password'";
            // 3、提取结果
            $res = $conn->query($sql);//结果集
            $arr = $res->fetch_all(MYSQLI_ASSOC);
            if($res->num_rows){//存在条数
                echo 1;
            }else{
                echo 0;
            }
            break;

        default:
        echo "GG";
    }
    
    $conn->set_charset('utf8');//设置编码
    // 关闭连接
    // $res->close();
    // $conn->close();
?>