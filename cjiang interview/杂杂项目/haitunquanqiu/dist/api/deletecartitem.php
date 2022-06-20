<?php
    include 'conn.php';
    $GLOBALS['conn']->set_charset('utf8');
    $sid = isset($_REQUEST['sid'])?$_REQUEST['sid']:'';
    $sql = "DELETE from shopcart WHERE sid = $sid"; //删除对应那条
    $res = $conn->query($sql);
    if($res){
        echo 1;
    }else{
        echo 0;
    }
    //释放结果集
    $res->close();
    //关闭连接
    $conn->close();

?>