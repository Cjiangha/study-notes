<?php
include 'conn.php';
//编写sql语句
$GLOBALS['conn']->set_charset('utf8');
$type = isset($_REQUEST['type'])?$_REQUEST['type']:'';//类型
$username = isset($_REQUEST['username'])?$_REQUEST['username']:'';//用户名
$sid = isset($_REQUEST['sid'])?$_REQUEST['sid']:'';//购物车该商品列的id
$sidpin = isset($_REQUEST['sidpin'])?$_REQUEST['sidpin']:'';
$gnum= isset($_REQUEST['gnum'])?$_REQUEST['gnum']:''; //购物车该列的数量
switch($type){
    case 'xuanrang':
    $sql = "select * from shopcart where  username = '$username'";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
    break;
    
    case 'update':
    $sql = "update shopcart set gnum = $gnum where sid = $sid";
    $res = $conn->query($sql);
    if($res){
        echo 'updatesuccess';
    }else{
        echo 'updatefalse';
    }
    break;

    /* where 后面的条件用 OR拼接起来 where sid = 1 or sid = 2 */ 
    case 'del':
        $sql3 = "DELETE from shopcart WHERE $sidpin";
        $res = $conn->query($sql3);
        if($res){
            echo 'del1';
        }else{
            echo 'del0';
        }
    break;

    default:
    'GG';
}

// $res->close();
// $conn->close();
?>