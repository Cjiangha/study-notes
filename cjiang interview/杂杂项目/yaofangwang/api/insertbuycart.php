<?php
    include 'conn.php';

    $uid = isset($_REQUEST['uid'])?$_REQUEST['uid']:'1';//uid，拿到详情页拿到的uid,uid——商品的id
    $num = isset($_REQUEST['num'])?$_REQUEST['num']:'1';//拿到点击的数量
    $cookie = isset($_REQUEST['cookie'])?$_REQUEST['cookie']:'1';//拿到点击的数量
    // $action = isset($_REQUEST['action'])?$_REQUEST['action']:'select';

    // 暴力插入
    $sql = "insert into buycart (uid,num) values($uid, $num)";
    // 先查找是否有该件商品，select，有改件商品，可以进行更新，没有的话，就插入到数据库中。
    $sql1 = "select * from buycart where uid = $uid";//查询是否有该商品
    $sql2 = "select total from buycart where uid = $uid";

    $res1 = $conn->query($sql1);
    $arr = $res1 ->fetch_all(MYSQLI_ASSOC);//提取查询到的数据
    
    $res2 = $conn->query($sql2);
    $arr2 = $res1 ->fetch_all(MYSQLI_ASSOC);//提取查询到的数据
    if($res1->num_rows){//有条数的时候就进行更新,没有就插入，用action判断值
            $sql11 = "UPDATE buycart set num = $num  where uid = $uid";//找到对应uid对数量进行更新
            $re11 = $conn->query($sql11);//能进行更新了

            // $sql12 = "UPDATE buycart set total = $total  where uid = $uid";//找到对应uid对数量进行更新
            // $re12 = $conn->query($sql12);//能进行更新了
            if($re11){
                echo 'update';
            }
            // if($re12){
            //     echo 'updatetotal';
            // }
    }else{//没有查到数据
        $res2 = $conn->query( $sql);
        if($res2){
            echo 'insert';
        }
    }
    $conn->set_charset('utf-8');
    
?>