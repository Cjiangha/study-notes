<?php
/* 查询购物车表中对应的该用户名和详情页该商品的数据 */ 
include 'conn.php';
//编写sql语句
$GLOBALS['conn']->set_charset('utf8');
$gid = isset($_REQUEST['gid'])?$_REQUEST['gid']:'';
$username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
$sql = "select * from shopcart where gid = $gid and username = '$username'";
//查询结果集
$res = $conn->query($sql);
//把结果集得到一个数组
$data = $res->fetch_all(MYSQLI_ASSOC);
//把输出结果输出到控制台
echo json_encode($data,JSON_UNESCAPED_UNICODE);
//释放结果集
$res->close();
//关闭连接
$conn->close();
?>