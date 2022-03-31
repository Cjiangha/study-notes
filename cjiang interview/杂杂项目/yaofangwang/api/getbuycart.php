<?php
    // 查询到订单表的所有的数据
    include 'conn.php';
    //购物车的需求：想要渲染，直接拿到购物车表的id, 再找到商品表的id，通过商品表id找购物车表内容。渲染的数据是商品表的东西
    
    // $sid = isset($_REQUEST['sid'])?$_REQUEST['sid']:'1';//找到购物车表的id
    // $uid = isset($_REQUEST['uid'])?$_REQUEST['uid']:'2';//找到商品表的id

    $sql1 = "select drug.uid,title,smallpic,specification,            company,price,stock,sid,num from drug,buycart where           drug.uid = buycart.uid";//获取购物车的所有的数据
    $res = $conn ->query($sql1);
    $arr = $res ->fetch_all(MYSQLI_ASSOC);

    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    $conn->set_charset('utf-8');

?>