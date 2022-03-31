<?php
    // 更新的话，每一次点击那个按钮，他就会相应的改变数据库中，数量的数据
    include 'conn.php';
    $sid = isset($_REQUEST['sid'])?$_REQUEST['sid']:'0';
    $num = isset($_REQUEST['num'])?$_REQUEST['num']:'0';
    // num  旧的加新的

    $sql = "UPDATE buycart set num = $num  where sid = $sid";

    $res2 = $conn->query($sql);

    // 可以更新，yes，更新不了  no
    if($res2){
        echo 'yes';
    }else{
        echo 'no';
    }
?>