<?php
    /* 设置参数，建立连接 */
    $severname = 'localhost';/* 本地服务器名字 */
    $username = 'root';/* 默认登录数据库的名字 */
    $password = 'root';
    $dbname = 'test2';/* 连接的数据库名字 */
    /* 创建连接 */
    $conn = new mysqli($severname, $username, $password, $dbname);
    /* 检测是否连接成功 */
    if ($conn->connect_error) {/* connect_error存在值则连接失败 */
        die("连接失败：".$conn->connect_error);
    }/*  else {
        die ("连接成功");
    } */
?>