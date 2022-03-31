<?php
// 这个接口作用：查询到相应的uid的所对应的购物车表里面的信息，为了更新做准备。。


// 最初渲染页面的操作
include 'conn.php';
// $order =  issert($_GET['mohu'])?$_GET['mohu']:'';
//编写sql语句
$uid = isset($_REQUEST['uid'])?$_REQUEST['uid']:'1';
$sql = "select * from buycart where uid = $uid";
//查询结果集
$res = $conn->query($sql);

//把结果集得到一个数组
$data = $res->fetch_all(MYSQLI_ASSOC);

//把输出结果输出到控制台
echo json_encode($data,JSON_UNESCAPED_UNICODE);
// var_dump($data);

// $conn->set_chareset('utf-8');
//释放结果集
$res->close();
//关闭连接
$conn->close();


?>